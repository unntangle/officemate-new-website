import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "That name looks too long"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20, "That number looks too long")
    .regex(/^[+()\-\s\d]+$/, "Use digits and + ( ) - only"),
  company: z.string().max(120).optional().or(z.literal("")),
  product: z.string().min(1),
  message: z
    .string()
    .max(1000, "Keep it under 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export const contactSchema = enquirySchema.omit({ product: true }).extend({
  subject: z.string().min(2, "Add a short subject"),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});

export type ContactValues = z.infer<typeof contactSchema>;
