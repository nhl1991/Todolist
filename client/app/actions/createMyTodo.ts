"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createMyTodo(formData: FormData) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  if (!accessToken) return;

  const userId = formData.get("userId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isPublic = formData.get("public") === "on";
  const body = {
    userId: Number(userId),
    title: title,
    content: content,
    published: true,
    public: isPublic,
  };

  const response = await fetch(`${SERVER_URL}/todo/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    if (response.status === 401) {
      alert(
        "ログイン有効期限が切れました。お手数ですが、もう一度ログインしてください"
      );
      redirect("/signin");
    }
  }

  updateTag(`todo/${userId}`);
}
