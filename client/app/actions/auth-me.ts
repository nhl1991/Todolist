import { SERVER_URL } from "@/lib/serverUrl";
import { cookies } from "next/headers";

export async function AuthMe() {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const response = await fetch(`${SERVER_URL}/auth/me`, {
    method: "GET",
    headers: {
      Cookie: `access_token=${accessToken}`,
    },

    credentials: "include",
  });
  if(response.ok) return true;
  else return false;
}
