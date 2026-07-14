"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { enquirySchema, type EnquiryValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: string;
}

export function EnquiryModal({ isOpen, onClose, product }: EnquiryModalProps) {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const lastActive = useRef<Element | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { product },
  });

  useEffect(() => setMounted(true), []);

  // Keep the auto-filled product in sync each time the modal opens.
  useEffect(() => {
    if (isOpen) {
      setValue("product", product);
      setSubmitted(false);
      lastActive.current = document.activeElement;
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
  }, [isOpen, product, setValue]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset({ product });
      setSubmitted(false);
      (lastActive.current as HTMLElement | null)?.focus?.();
    }, 250);
  };

  const onSubmit = async (data: EnquiryValues) => {
    // Simulate a network round-trip — no backend required for the showcase.
    await new Promise((r) => setTimeout(r, 1100));
    // eslint-disable-next-line no-console
    console.log("Enquiry submitted:", data);
    setSubmitted(true);
  };

  const { ref: nameRef, ...nameField } = register("name");

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <motion.div
            className="absolute inset-0 bg-ink/25 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-card shadow-lift"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={handleClose}
              aria-label="Close enquiry form"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center px-8 py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 16,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white"
                  >
                    <Check size={30} strokeWidth={3} />
                  </motion.div>
                  <h3
                    id="enquiry-title"
                    className="display mt-6 text-2xl font-semibold"
                  >
                    Enquiry received
                  </h3>
                  <p className="mt-3 max-w-sm text-muted">
                    Thanks — a product specialist will reach out about the{" "}
                    <span className="font-medium text-ink">{product}</span>{" "}
                    within one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={handleClose}
                  >
                    Done
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="border-b border-line px-7 pb-5 pt-7">
                    <span className="eyebrow">Enquire</span>
                    <h3
                      id="enquiry-title"
                      className="display mt-2 text-2xl font-semibold"
                    >
                      Request a quote
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Tell us a little about your needs and we&apos;ll be in touch.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-h-[62vh] space-y-4 overflow-y-auto px-7 py-6"
                    noValidate
                  >
                    <Field label="Name" error={errors.name?.message} required>
                      <Input
                        {...nameField}
                        ref={(el) => {
                          nameRef(el);
                          firstFieldRef.current = el;
                        }}
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" error={errors.email?.message} required>
                        <Input
                          type="email"
                          {...register("email")}
                          placeholder="you@company.com"
                          aria-invalid={!!errors.email}
                        />
                      </Field>
                      <Field label="Phone" error={errors.phone?.message} required>
                        <Input
                          type="tel"
                          {...register("phone")}
                          placeholder="+91 …"
                          aria-invalid={!!errors.phone}
                        />
                      </Field>
                    </div>

                    <Field label="Company" error={errors.company?.message}>
                      <Input
                        {...register("company")}
                        placeholder="Optional"
                      />
                    </Field>

                    <Field label="Product">
                      <Input
                        {...register("product")}
                        readOnly
                        className="cursor-default bg-surface text-muted"
                      />
                    </Field>

                    <Field label="Message" error={errors.message?.message}>
                      <Textarea
                        {...register("message")}
                        placeholder="Quantities, timelines, questions…"
                      />
                    </Field>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="accent"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending
                          </>
                        ) : (
                          "Submit enquiry"
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn("mt-1.5 text-xs text-red-600")}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
