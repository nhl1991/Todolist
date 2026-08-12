import { cookies } from "next/headers";
import { SERVER_URL } from "./serverUrl";

export async function getCurrentUser() {
  const cookie = await cookies();

  const token = cookie.get("access_token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(`${SERVER_URL}/auth/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const user = await response.json();

    return user;
  } catch (err) {
    console.error("getCurrentUser: failed to reach auth server", err);
    return null;
  }
}
