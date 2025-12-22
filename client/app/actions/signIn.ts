"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { SignInResponse } from "@/types/todo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(formData: FormData):Promise<SignInResponse> {
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });
  if (response.ok) {
    const { userId } = await response.json();
    const cookieStore = await cookies();
    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach((cookieStr) => {
      const [rawCookie] = cookieStr.split(";"); // "access_token=xxxx"
      const [name, value] = rawCookie.split("=");

      cookieStore.set(name, value, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    });
    // return { code: response.status, message: 'Login Success', success: true}
    redirect(`/my-todo/${userId}`); // redirect to user todo.
  }else {
    const result = await response.json();
    return { code: response.status, message: result, success: false}
  }
}
