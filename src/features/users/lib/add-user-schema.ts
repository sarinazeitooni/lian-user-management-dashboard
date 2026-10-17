import { z } from "zod";

const trimmedRequired = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`);

export const addUserSchema = z.object({
  name: trimmedRequired("Full name"),
  username: trimmedRequired("Username"),
  email: trimmedRequired("Email").email("Enter a valid email address"),
  phone: z.string().trim(),
  website: z.string().trim(),
  companyName: z.string().trim(),
  street: z.string().trim(),
  city: z.string().trim(),
  zipcode: z.string().trim(),
});

export type AddUserFormValues = z.infer<typeof addUserSchema>;

export const ADD_USER_DEFAULT_VALUES: AddUserFormValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  companyName: "",
  street: "",
  city: "",
  zipcode: "",
};
