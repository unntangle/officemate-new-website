import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * <model-viewer> is a custom element, so TSX has no idea it exists. React 19
 * dropped the global JSX namespace in favour of React.JSX, hence augmenting
 * the "react" module here rather than `declare global`.
 *
 * Only the attributes actually used are declared — the element accepts many
 * more, and they can be added as needed.
 */
type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  "ios-src"?: string;
  alt?: string;
  poster?: string;
  ar?: boolean;
  "ar-modes"?: string;
  "ar-scale"?: string;
  "ar-placement"?: "floor" | "wall";
  "camera-controls"?: boolean;
  "disable-pan"?: boolean;
  "disable-zoom"?: boolean;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  "touch-action"?: string;
  "shadow-intensity"?: string;
  "environment-image"?: string;
  exposure?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  "interaction-prompt"?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "manual";
};

/** The subset of the element's runtime API this app calls. */
export interface ModelViewerElement extends HTMLElement {
  /** True once the glTF has finished loading. */
  loaded: boolean;
  canActivateAR: boolean;
  activateAR: () => Promise<void>;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
