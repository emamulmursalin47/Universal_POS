// src/validations/subscription.validation.ts
import { z } from "zod";

export const TSubscriptionStatus = z.enum(["active", "expired", "cancelled"]);
export const TBillingCycle = z.enum(["monthly", "yearly", "quarterly"]);
export const TSupportLevel = z.enum(["basic", "standard", "premium"]);

export const SubscriptionSchemaValidation = z.object({
  planName: z
    .string()
    .min(1, { message: "Plan name is required" })
    .max(100, { message: "Plan name must be less than 100 characters" }),
  price: z
    .number()
    .min(0, { message: "Price must be a positive number" })
    .max(100000, { message: "Price must be less than 100,000" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  billingCycle: TBillingCycle,
  maxProducts: z
    .number()
    .int()
    .min(1, { message: "Max products must be at least 1" })
    .max(100000, { message: "Max products must be less than 100,000" }),
  maxUsers: z
    .number()
    .int()
    .min(1, { message: "Max users must be at least 1" })
    .max(1000, { message: "Max users must be less than 1,000" }),
  supportLevel: TSupportLevel,
  features: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Feature cannot be empty" }),
      })
    )
    .min(1, { message: "At least one feature is required" }),
  status: TSubscriptionStatus,
});

// Update subscription schema (all fields optional)
export const updateSubscriptionSchemaValidation = z.object({
  planName: z
    .string()
    .min(1, { message: "Plan name is required" })
    .max(100, { message: "Plan name must be less than 100 characters" })
    .optional(),
  price: z
    .number()
    .min(0, { message: "Price must be a positive number" })
    .max(100000, { message: "Price must be less than 100,000" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  billingCycle: TBillingCycle.optional(),
  maxProducts: z
    .number()
    .int()
    .min(1, { message: "Max products must be at least 1" })
    .max(100000, { message: "Max products must be less than 100,000" })
    .optional(),
  maxUsers: z
    .number()
    .int()
    .min(1, { message: "Max users must be at least 1" })
    .max(1000, { message: "Max users must be less than 1,000" })
    .optional(),
  supportLevel: TSupportLevel.optional(),
  features: z
    .array(z.string().min(1, { message: "Feature cannot be empty" }))
    .min(1, { message: "At least one feature is required" })
    .optional(),
  status: TSubscriptionStatus.optional(),
});

// Feature update schema (for adding/removing features)
export const featureUpdateSchema = z.object({
  features: z.array(
    z.union([
      z.string().min(1, { message: "Feature cannot be empty" }),
      z
        .string()
        .startsWith("-", { message: "Remove prefix must start with '-'" }),
    ])
  ),
});

export const SubscriptionValidation = {
  SubscriptionSchemaValidation,
  updateSubscriptionSchemaValidation,
  featureUpdateSchema,
};
