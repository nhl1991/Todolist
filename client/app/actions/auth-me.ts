import { SERVER_URL } from "@/lib/serverUrl";
import { cookies } from "next/headers";

export async function AuthMe() {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  try {
    const response = await fetch(`${SERVER_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: `access_token=${accessToken}`,
      },

      credentials: "include",
      signal: AbortSignal.timeout(8000),
    });
    return response.ok;
  } catch (err) {
    console.error("AuthMe: failed to reach auth server", err);
    return false;
  }
}
