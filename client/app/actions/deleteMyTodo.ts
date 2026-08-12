"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteMyTodo(formData: FormData) {
  const id = formData.get("id");
  const userId = formData.get("userId");
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  const response = await fetch(`${SERVER_URL}/todo/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirect("/signin");
    }
  }
  updateTag(`todo/${userId}`);
}
