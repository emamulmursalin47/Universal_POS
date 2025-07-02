import { z } from "zod";

export const shopFormSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  shopOwnerName: z.string().min(1, "Owner name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNumber: z.string().min(1, "Contact number is required"),
  address: z.string().min(1, "Address is required"),
  subscriptionPlan: z.string().min(1, "Subscription plan is required"),
  subscriptionDeadline: z.string().min(1, "Subscription deadline is required"),
});

export const editShopValidationSchema = z.object({
  shopOwnerName: z.string().min(1, "Owner name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  contactNumber: z.string().min(1, "Contact number is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  subscriptionPlan: z
    .string()
    .min(1, "Subscription plan is required")
    .optional(),
  subscriptionDeadline: z
    .string()
    .min(1, "Subscription deadline is required")
    .optional(),
});

export type ShopFormValues = z.infer<typeof shopFormSchema>;
export type EditShopFormValues = z.infer<typeof editShopValidationSchema>;
