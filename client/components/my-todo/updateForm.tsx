"use client";
import Form from "next/form";
import CheckBox from "../common/components/checkBox";
import { Todo } from "@/types/todo";
import { todoContentSchema, todoTitleSchema } from "@/lib/formValidators";

import z, { ZodError } from "zod";

export default function UpdateForm({
  userTodo,
  userId,
  onCancel,
  action,
}: {
  userTodo: Todo;
  userId: string;
  onCancel: () => void;
  action: (formData: FormData) => Promise<void>;
}) {
  const { id, title, content } = userTodo;
  const handleAction = async (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');
    try{
      todoTitleSchema.parse(title);
      todoContentSchema.parse(content);
      await action(formData);
      onCancel();
    }catch(err){
      if(err instanceof ZodError){
        const result = z.prettifyError(err);
        alert(result);
      }
    }
     // 서버 액션 실행 (updateMyTodo)
     // 수정 완료 후 edit 모드 종료
  };


  return (
    <div>
      {/* <h2 className="text-xl font-bold">{username}&apos;s Todo</h2> */}
      <Form
        className="flex flex-col max-w-2xl w-full min-h-96 px-8 py-4 rounded-xl gap-4 box-shadow"
        action={handleAction}
      >
        <div className="flex flex-col gap-1">
          <input type="hidden" name="id" defaultValue={id} />
          <input
            type="text"
            name="userId"
            defaultValue={userId}
            className="hidden"
          />
          <label htmlFor="title" className="font-bold">
            TODO タイトル
          </label>
          <input
            type="text"
            id="title"
            defaultValue={title}
            name="title"
            className="inputField"
            placeholder="Title Input"
          />
          
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="font-bold">
            TODO 内容
          </label>
          <textarea
            rows={5}
            cols={50}
            id="content"
            name="content"
            defaultValue={content}
            className="resize-none"
          />
        </div>
        <div className="w-full flex justify-between p-2">
          <CheckBox label="公開" defaultChecked={userTodo.public} />
          <div className="flex gap-x-2">
            <button type="button" className="btn-hover" onClick={onCancel}>
              キャンセル
            </button>
            <input type="submit" className="btn-hover" value={"登録"} />
          </div>
        </div>
        {/* <input name="public" type="checkbox" defaultChecked={false} />
        <input type="submit" /> */}
      </Form>
    </div>
  );
}
