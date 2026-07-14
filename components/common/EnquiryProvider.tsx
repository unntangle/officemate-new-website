"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { EnquiryModal } from "@/components/common/EnquiryModal";

interface EnquiryContextValue {
  open: (productName?: string) => void;
  close: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<string>("General enquiry");

  const open = useCallback((productName?: string) => {
    setProduct(productName ?? "General enquiry");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={close} product={product} />
    </EnquiryContext.Provider>
  );
}
