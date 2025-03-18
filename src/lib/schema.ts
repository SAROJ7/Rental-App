import * as z from "zod";
export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid Email Address"),
  phoneNumber: z.string().min(10, "Phone Number must be atleast 10 digits"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
