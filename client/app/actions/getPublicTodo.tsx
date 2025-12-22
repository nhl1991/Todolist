import { SERVER_URL } from "@/lib/serverUrl";

export async function getPublicTodo() {
  const response = await fetch(`${SERVER_URL}/todo`, {
    method: "GET",
  });
}
