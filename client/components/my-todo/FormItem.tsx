"use client"
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../common/ui/loadingSpinner";
import CheckBox from "../common/components/checkBox";

export default function FormItem({ userId }: { userId: string }) {
  const status = useFormStatus();

  return (
    <>
      {status.pending ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <input type="hidden" name="userId" defaultValue={userId} />
            <label htmlFor="title" className="font-bold">
              TODO タイトル
            </label>
            <input
              type="text"
              id="title"
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
              className="resize-none"
            />
          </div>
          <div className="w-full flex justify-between p-2">
            <CheckBox label="公開" />
            <input type="submit" className="btn-hover" value={"登録"} />
          </div>
        </>
      )}
    </>
  );
}
