import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "username required",
    }),
    email: string({
      required_error: "email required",
    }).email(),
    password: string({
      required_error: "password required",
    })
      .min(6)
      .max(64),
    confirmPassword: string({
      required_error: "confirm password required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
