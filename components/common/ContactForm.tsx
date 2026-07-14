"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactValues } from "@/lib/validation";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactValues) => {
    await new Promise((r) => setTimeout(r, 1100));
    // eslint-disable-next-line no-console
    console.log("Contact submitted:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-line bg-card px-8 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white"
        >
          <Check size={30} strokeWidth={3} />
        </motion.div>
        <h3 className="display mt-6 text-2xl font-semibold">Message sent</h3>
        <p className="mt-3 max-w-sm text-muted">
          Thanks for reaching out — we&apos;ll get back to you within one business day.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-line bg-card p-6 sm:p-8"
      noValidate
    >
      <div className="space-y-4">
        <Field label="Name" error={errors.name?.message} required>
          <Input {...register("name")} placeholder="Your full name" aria-invalid={!!errors.name} />
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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company" error={errors.company?.message}>
            <Input {...register("company")} placeholder="Optional" />
          </Field>
          <Field label="Subject" error={errors.subject?.message} required>
            <Input
              {...register("subject")}
              placeholder="How can we help?"
              aria-invalid={!!errors.subject}
            />
          </Field>
        </div>

        <Field label="Message" error={errors.message?.message} required>
          <Textarea
            {...register("message")}
            placeholder="Tell us what you're looking for…"
            className="min-h-32"
            aria-invalid={!!errors.message}
          />
        </Field>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
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
            className="mt-1.5 text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
