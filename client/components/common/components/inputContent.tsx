import { Dispatch, SetStateAction } from "react";

export default function InputContent({
  content,
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="content" className="font-bold">
        TODO 内容
      </label>
      <textarea
        rows={5}
        cols={50}
        id="content"
        value={content}
        className=""
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
