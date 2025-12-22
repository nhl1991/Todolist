"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  const response = await fetch(`${SERVER_URL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    console.log(result);
  }

  if (response.ok) {
    (await cookies()).set("signup_ok", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60,
    });

    redirect("/signup/success");
  }
}
