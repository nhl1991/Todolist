"use client";
import { Todo } from "@/types/todo";
import { useEffect, useRef, useState } from "react";

export default function TodoItem({ item }: { item: Todo }) {
  const { id, User, title, content } = item;
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(()=>{
    const el = ref.current
    if(!el) return;
    setIsOverflow(el.scrollHeight > el.clientHeight);
  },[])
  return (
    <>
      <div className={`flex flex-col justify-start px-1`}>
        <header className="md:max-w-3xl w-full flex flex-col justify-between items-center">

          <div className="w-full flex md:flex-row flex-col md:items-center">
            <>
              <h3 className="md:px-3 py-1.5 text-sm md:text-xl flex items-center gap-2">
                {title}
              </h3>
              <p className="px-4 md:px-0 text-gray-500 text-sm py-4">
                @{User.username}
              </p>
              
            </>
          </div>
        </header>
        <section>
          <p ref={ref} className={`px-6 py-1.5 whitespace-pre-wrap ${isExpanded ? 'h-96 transition-all duration-100':'max-h-20 line-clamp-2'} h-full  `}>{content}</p>
        </section>
        <footer className="flex items-center justify-center">
          {isOverflow ? <button className="hover:text-gray-500 text-xs cursor-pointer" onClick={()=> setIsExpanded(!isExpanded)}>{isExpanded ? '閉じる':'もっと見る'}</button> : null}
        </footer>
      </div>
    </>
  );
}
