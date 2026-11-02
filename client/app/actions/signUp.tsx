"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { SignUpResponse } from "@/types/todo";
import { cookies } from "next/headers";

export async function signup(formData: FormData): Promise<SignUpResponse> {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  let response: Response;
  try {
    response = await fetch(`${SERVER_URL}/user/create`, {
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
  } catch {
    return { success: false, statusCode: 503, message: "server unreachable" };
  }

  if (response.ok) {
    (await cookies()).set("signup_ok", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60,
    });

    return { success: true, statusCode: 200, message: "Signup successful" };
  } else {
    const result = await response.json().catch(() => null);
    return {
      success: false,
      statusCode: response.status,
      message: result?.message ?? "",
    };
  }
}
