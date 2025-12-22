"use client";

import { useState } from "react";

export default function CheckBox({ label, defaultChecked }: { label: string, defaultChecked?: boolean}) {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked ?? false);
  return (
    <div
      className={`flex gap-2 font-bold text-base text-white px-3 py-1.5 cursor-pointer rounded-xl ${
        isChecked ? "bg-sky-400  dark:bg-slate-800 " : "bg-slate-400"
      }`}
    >
      <input
        id="public"
        name="public"
        className=""
        type="checkbox"
        defaultChecked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label htmlFor="public">{label}</label>
    </div>
  );
}
