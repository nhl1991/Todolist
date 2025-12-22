import { Dispatch, SetStateAction } from "react";

export default function InputTitle({title, setTitle}: {
    title:string,
    setTitle: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="title" className="font-bold">
        TODO タイトル
      </label>
      <input
        type="text"
        id="title"
        value={title}
        className="inputField"
        placeholder="Title Input"
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>0</p>
    </div>
  );
}
