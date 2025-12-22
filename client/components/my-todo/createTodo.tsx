"use client";
import Form from "next/form";
import { todoContentSchema, todoTitleSchema } from "@/lib/formValidators";
import z, { ZodError } from "zod";
import FormItem from "./FormItem";

export default function CreateTodo({
  userId,
  action,
}: {
  userId: string;
  action: (formDate: FormData) => Promise<void>;
}) {
  const handleOnAction = async (formData: FormData) => {
    const title = formData.get("title");
    const content = formData.get("content");
    try {
      todoTitleSchema.parse(title);
      todoContentSchema.parse(content);
      await action(formData);
    } catch (err) {
      if (err instanceof ZodError) {
        const result = z.prettifyError(err);
        alert(result);
      }
    }
  };

  return (
    <div>
      {/* <h2 className="text-xl font-bold">{username}&apos;s Todo</h2> */}
      <Form
        className="flex flex-col max-w-2xl w-full justify-center min-h-96 px-8 py-4 rounded-xl gap-4 box-shadow"
        action={handleOnAction}
      >
        <FormItem userId={userId} />
        {/* <input name="public" type="checkbox" defaultChecked={false} />
        <input type="submit" /> */}
      </Form>
    </div>
  );
}
