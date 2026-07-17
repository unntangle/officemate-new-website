"use client";

import { createContext, useContext, useState } from "react";

type ProductColor = { name: string; hex: string };

type ColorContextValue = {
  colors: ProductColor[];
  active: ProductColor;
  setActive: (c: ProductColor) => void;
};

/* Undefined default so useProductColor can tell "no provider" apart from
   "provider with no colours" and fail loudly rather than silently. */
const ColorContext = createContext<ColorContextValue | undefined>(undefined);

/**
 * Holds the selected colourway for a product detail page.
 *
 * This is a client component, but `children` are passed through untouched —
 * so the server-rendered product page keeps its layout and stays a server
 * component. Only the leaves that actually need the state (ColorPicker,
 * ProductGallery) call useProductColor().
 */
export function ColorProvider({
  colors,
  children,
}: {
  colors: ProductColor[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<ProductColor>(colors[0]);

  return (
    <ColorContext.Provider value={{ colors, active, setActive }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useProductColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) {
    throw new Error("useProductColor must be used inside a <ColorProvider>");
  }
  return ctx;
}
