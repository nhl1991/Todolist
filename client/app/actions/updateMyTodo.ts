"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { TodoActionResponse } from "@/types/todo";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateMyTodo(formData: FormData): Promise<TodoActionResponse> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) return { success: false };

  const id = formData.get("id") as string;
  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isPublic = formData.get("public") === "on";
  const body = {
    title: title,
    content: content,
    published: true,
    public: isPublic,
  };

  const response = await fetch(`${SERVER_URL}/todo/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (response.status === 401) {
    redirect("/signin");
  }

  if (!response.ok) return { success: false };

  updateTag(`todo/${userId}`);
  return { success: true };
}
