"use client";
import { SERVER_URL } from "@/lib/serverUrl";

import Form from "next/form";

export default function CompleteButton({
  id,
  title,
  userId,
  action,
}: {
  id: string;
  title: string;
  userId: string;
  action: (formData: FormData) => Promise<void>;
}) {

  const handleOnAction = async (formData:FormData) => {
     const ok = confirm(`本当にこの「${title}」を削除しますか？`)
     if(!ok) return;
     await action(formData);

  };
  const deletePost = async () => {
    // Delete
    try {
      const response = await fetch(`${SERVER_URL}/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        // setTodo((prev) => prev.filter((todo) => todo.id !== id))
      }
    } catch (err) {}
  };

  return (
    <>
      <Form action={handleOnAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="userId" value={userId} />
        <input type="submit" className="btn-hover" value={"完了"} />
      </Form>
    </>
  );
}
