import * as z from 'zod';

export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/.*[A-Z].*/, { message: "One uppercase character required" })
    .regex(/.*[0-9].*/, { message: "One number required" })
    .regex(/.*[!@#$%^&*].*/, { message: "One special character required" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  city: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string()
    .regex(/^\+\d{1,3}\d{4,14}$/, { message: "Invalid phone number (must start with + country code)" })
    .optional()
    .or(z.literal('')),
});

export type RegisterFormValues = z.infer<typeof formSchema>;
