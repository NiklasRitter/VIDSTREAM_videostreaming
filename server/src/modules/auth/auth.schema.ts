import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email(),
    password: string({
      required_error: "password is required",
    })
      .min(6)
      .max(64),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
