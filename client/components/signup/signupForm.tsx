"use client";
import { useRouter } from "next/navigation";
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "@/lib/formValidators";
import Form from "next/form";
import FormSubmitButton from "../common/components/FormSubmitButton";
import { useState } from "react";
import { SignUpResponse } from "@/types/todo";

export default function SignUpForm({
  action,
}: {
  action: (formData: FormData) => Promise<SignUpResponse>;
}) {
  const router = useRouter();
  const [error, setError] = useState({message: "", id: 0});
  const showError = (message: string) => setError((prev)=> ({ message, id: prev.id + 1 }));

  const handleSignUp = async (formData: FormData) => {
    const parsed = [
      emailSchema.safeParse(formData.get("email")),
      passwordSchema.safeParse(formData.get("password")),
      usernameSchema.safeParse(formData.get("username")),
    ].find((r) => !r.success);
    if (parsed) {
      showError(parsed.error.issues[0].message);
      return;
    }

    const result = await action(formData);
    if (!result.success) {
      showError(
        result.statusCode === 409
          ? "メールアドレスまたはユーザー名は既に使用されています。"
          : "登録に失敗しました。",
      );
      return;
    }
    router.push("/signup/success");
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
          <label htmlFor="username" className="font-bold text-xs block">
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
        {error.message ? <p key={error.id} role="alert" className="text-[0.625rem] text-red-500">{error.message}</p> : null}
      </Form>
    </>
  );
}
