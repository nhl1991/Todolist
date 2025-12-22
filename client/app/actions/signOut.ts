"use server";

import { SERVER_URL } from "@/lib/serverUrl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignOut() {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const response = await fetch(`${SERVER_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
  });
  if(!response.ok) {
    if(response.status === 401) return {code: response.status, message: 'Expired.', success: false}
    return {code: response.status, message: 'Error', success: false}
  }
  cookie.delete('access_token')
  redirect('/');
}
