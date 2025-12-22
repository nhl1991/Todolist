import { cookies } from "next/headers";
import { SERVER_URL } from "./serverUrl";

export async function getCurrentUser() {
  const cookie = await cookies();

  const token = cookie.get("access_token")?.value;

  if (!token) return null;

  const response = await fetch(`${SERVER_URL}/auth/me`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  if(!response.ok) return null;

  const user = await response.json();

  return user;
}
