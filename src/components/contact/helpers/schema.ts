import z from "zod";
export const schema = z.object({
  fullName: z
    .string()
    .nonempty("Full name required")
    .min(5, "This field should be min 5 characters")
    .max(30, "This field has a max of 30 characters"),
  email: z
    .string()
    .nonempty("Email required")
    .max(50, "This field has a max of 50 characters")
    .email("Please enter a valid email"),
  phone: z.string().max(15, "This field has a max of 15 characters").optional(),
  workType: z
    .string()
    .nonempty("Please select a work type")
    .max(50, "This field has a max of 50 characters"),
  message: z
    .string()
    .max(500, "This field has a max of 500 characters")
    .optional(),
});
