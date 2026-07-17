"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Scan } from "lucide-react";
import type { ProductModel } from "@/constants/products";
import type { ModelViewerElement } from "@/types/model-viewer";
import { cn } from "@/lib/utils";
import { useProductColor } from "@/components/products/ColorProvider";
import { ARHowTo } from "@/components/products/ARHowTo";

/**
 * <model-viewer> is loaded from unpkg rather than bundled, so the project
 * carries no npm dependency for it. The version is pinned deliberately —
 * unpkg's unversioned URL follows @latest, which would let an upstream release
 * change the viewer's behaviour in production without a commit here.
 *
 * ~1MB (it bundles its own three.js), which is why this only ever runs on click.
 */
const MODEL_VIEWER_SRC =
  "https://unpkg.com/@google/model-viewer@4.3.1/dist/model-viewer.min.js";

/** Injects the script once per page, then resolves when the element is ready. */
function loadModelViewer(): Promise<unknown> {
  if (!document.querySelector("script[data-model-viewer]")) {
    const script = document.createElement("script");
    script.type = "module";
    script.src = MODEL_VIEWER_SRC;
    script.dataset.modelViewer = "true";
    document.head.appendChild(script);
  }
  /* Resolves whether this call injected the script or an earlier one did. */
  return customElements.whenDefined("model-viewer");
}

type XRCapable = Navigator & {
  xr?: { isSessionSupported(mode: string): Promise<boolean> };
};

/**
 * Can this device place a model in a real room?
 *
 * Answered from the platform alone — no model-viewer, no .glb. That matters:
 * a desktop visitor should never wait on a 25MB download only to be told their
 * machine has no camera-based AR.
 */
async function detectAR(): Promise<boolean> {
  /* iOS: Quick Look advertises itself through <a rel="ar"> support. */
  const anchor = document.createElement("a");
  if (anchor.relList?.supports?.("ar")) return true;

  /* Android: WebXR immersive-ar, present once ARCore is installed. */
  const xr = (navigator as XRCapable).xr;
  if (!xr?.isSessionSupported) return false;
  try {
    return await xr.isSessionSupported("immersive-ar");
  } catch {
    return false;
  }
}

/**
 * 3D / AR viewer, shown as a modal panel over a blurred page.
 *
 * Portalled to <body> for the same reason the image lightbox is: the gallery's
 * `lg:sticky` wrapper creates a stacking context that would otherwise trap the
 * overlay beneath the fixed navbar.
 */
export function ModelViewerOverlay({
  model,
  name,
  autoAR = false,
  onClose,
}: {
  model: ProductModel;
  name: string;
  /** Jump straight into AR once loaded — the "View in room" entry point. */
  autoAR?: boolean;
  onClose: () => void;
}) {
  const ref = useRef<ModelViewerElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [qr, setQr] = useState<string | null>(null);

  /* Opened via "View in room" — hold everything until we know AR is possible. */
  const [checking, setChecking] = useState(autoAR);
  /* Show the QR hand-off instead of the model. */
  const [noAR, setNoAR] = useState(false);

  /* Context reaches through the portal — it follows the React tree, not the
     DOM — so the swatches here drive the same state as the ones in the buy
     column, and the `model` prop above swaps with them. */
  const { colors, active, setActive } = useProductColor();

  /* Gate 1 — is AR even on the table? Skipped entirely for the "3D view"
     button, which always wants the model. */
  useEffect(() => {
    if (!autoAR) return;
    let live = true;
    detectAR().then((ok) => {
      if (!live) return;
      if (!ok) setNoAR(true);
      setChecking(false);
    });
    return () => {
      live = false;
    };
  }, [autoAR]);

  /* Gate 2 — only now fetch the library. Skipped while checking, and skipped
     altogether when we've settled on the QR, so the .glb is never requested on
     a device that can't use it. */
  useEffect(() => {
    if (checking || noAR) return;
    let live = true;
    loadModelViewer()
      .then(() => live && setReady(true))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [checking, noAR]);

  /* Escape to close, plus a scroll lock while open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  /* Enter AR once the model is ready.
   *
   * The listener is attached by hand rather than via an onLoad prop: React's
   * onLoad is a synthetic event bound for known host elements like <img>, and
   * it does not reliably reach a custom element's own 'load' event.
   *
   * Auto-entry can still be refused. WebXR needs transient user activation,
   * and a large model may take longer to download than that activation lasts,
   * in which case the browser rejects the session — hence the fallback button
   * rather than a silent failure.
   */
  useEffect(() => {
    if (!ready || !autoAR || noAR) return;
    const mv = ref.current;
    if (!mv) return;

    const enter = () => {
      if (!mv.canActivateAR) {
        setNoAR(true);
        return;
      }
      mv.activateAR().catch(() => setNeedsTap(true));
    };

    /* A cached model may already be loaded before this effect runs, in which
       case the event has been and gone. */
    if (mv.loaded) {
      enter();
      return;
    }

    mv.addEventListener("load", enter);
    return () => mv.removeEventListener("load", enter);
  }, [ready, autoAR, noAR]);

  /* Encode the page's own URL. Dynamically imported so the library stays out
     of the bundle for the vast majority of visits that never open this. */
  useEffect(() => {
    if (!noAR) return;
    let live = true;
    import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(window.location.href, {
          width: 320,
          margin: 1,
          errorCorrectionLevel: "M",
          color: { dark: "#2D2D2DFF", light: "#FFFFFFFF" },
        })
      )
      .then((url) => live && setQr(url))
      .catch(() => {
        /* No QR is survivable — the copy below still explains what to do. */
      });
    return () => {
      live = false;
    };
  }, [noAR]);

  const showModel = !noAR && ready;

  return createPortal(
    /* Scrim — the tint is what gives the blur something to read against; a
       backdrop-filter over plain white barely registers. Click to dismiss. */
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-md md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} in 3D`}
    >
      {/* Panel. Stops propagation so dragging the model doesn't close it.
         Sized to its purpose: the model wants a big stage, the QR hand-off is
         a small card and looks lost in one. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative flex max-h-full overflow-hidden rounded-3xl bg-canvas shadow-lift",
          noAR ? "max-w-2xl" : "h-full w-full max-w-5xl"
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close 3D view"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-ink/10 transition-colors hover:bg-ink/5"
        >
          <X size={20} />
        </button>

        {/* Stage */}
        <div className="relative flex flex-1 items-center justify-center">
          {!ready && !failed && !noAR && (
            <span className="flex items-center gap-2.5 text-sm text-muted">
              <Loader2 size={16} className="animate-spin" />
              Loading 3D model…
            </span>
          )}

          {failed && (
            <p className="max-w-xs text-center text-sm leading-relaxed text-muted">
              The 3D viewer couldn&apos;t load. Check your connection and try
              again — the photos above show every angle in the meantime.
            </p>
          )}

          {showModel && (
            <model-viewer
              ref={ref as never}
              src={model.glb}
              ios-src={model.usdz}
              alt={`${name} — interactive 3D model`}
              camera-controls
              disable-pan
              /* Orbit only: full 360° horizontally (theta is unbounded by
                 default, which "auto" preserves) and a true 180° vertically.
                 The vertical range has to be spelled out — model-viewer
                 otherwise clamps phi to 22.5–157.5°, i.e. 135°. */
              min-camera-orbit="auto 0deg auto"
              max-camera-orbit="auto 180deg auto"
              touch-action="pan-y"
              shadow-intensity="1"
              exposure="1"
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-placement="floor"
              ar-scale="fixed"
              className="h-full w-full"
              style={{ backgroundColor: "transparent" }}
            />
          )}

          {/* AR was available but the browser wanted a fresh tap for it */}
          {needsTap && (
            <button
              onClick={() => {
                setNeedsTap(false);
                ref.current?.activateAR().catch(() => setNeedsTap(true));
              }}
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-azure px-5 py-3 text-sm font-semibold text-white shadow-lift"
            >
              <Scan size={16} />
              Place in your room
            </button>
          )}

          {/* No AR here — hand the visitor to a device that has it. Nothing of
             the model has been downloaded at this point. */}
          {noAR && (
            <div className="flex flex-col items-center gap-8 p-8 sm:flex-row sm:gap-10">
              <ARHowTo />

              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                {qr ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={qr}
                    alt="QR code linking to this page"
                    width={144}
                    height={144}
                    className="h-36 w-36 rounded-xl ring-1 ring-ink/10"
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center">
                    <Loader2 size={20} className="animate-spin text-muted" />
                  </div>
                )}
                <p className="mt-4 font-semibold text-ink">
                  Scan to view in your room
                </p>
                <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted">
                  Placing the {name} in your space needs a phone or tablet
                  camera. Scan this code to open the page on your device, then
                  tap View in room.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Colourways — switching here reloads the model for that finish.
           Padded clear of the close button, which shares this edge. */}
        {showModel && colors.length > 1 && (
          <div className="flex shrink-0 flex-col items-center justify-center gap-3 px-5 pt-16">
            <span className="text-xs font-medium text-muted">{active.name}</span>
            <div
              className="flex flex-col items-center gap-3"
              role="radiogroup"
              aria-label="Colour"
            >
              {colors.map((c) => {
                const selected = c.name === active.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={c.name}
                    title={c.name}
                    onClick={() => setActive(c)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full transition",
                      selected
                        ? "ring-2 ring-accent"
                        : "ring-1 ring-ink/15 hover:ring-ink/40"
                    )}
                  >
                    <span
                      className="h-7 w-7 rounded-full"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
