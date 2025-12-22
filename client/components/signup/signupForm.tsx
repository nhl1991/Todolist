"use client";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/lib/formValidators";
import Form from "next/form";
import z, { ZodError } from "zod";
import FormSubmitButton from "../common/components/FormSubmitButton";

export default function SignUpForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  
  const handleSignUp = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      usernameSchema.parse(username);
      action(formData);
    } catch (err) {
      if (err instanceof ZodError) {
        const result = z.prettifyError(err);
        alert(result);
      }
    }
  };
  return (
    <>
      <Form action={handleSignUp} className="flex flex-col gap-4 ">
        <div>
          <label htmlFor="email" className="font-bold text-xs block">
            EMAIL
          </label>
          <input
            className="inputField"
            type="email"
            id="email"
            name="email"
            placeholder="EMAIL"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold text-xs block">
            PASSWORD
          </label>
          <input
            className="inputField"
            type="password"
            id="password"
            name="password"
            placeholder="PASSWORD"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold text-xs block">
            USERNAME
          </label>
          <input
            className="inputField"
            type="text"
            id="username"
            name="username"
            placeholder="USERNAME"
          />
        </div>{" "}
        <FormSubmitButton label="SIGN UP" />
      </Form>
    </>
  );
}
