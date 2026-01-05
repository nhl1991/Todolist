"use client";
import { Todo } from "@/types/todo";
import { useEffect, useRef, useState } from "react";

export default function TodoItem({ item }: { item: Todo }) {
  const { User, title, content } = item;
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
      <div className={`flex flex-col px-1 min-h-32`}>
        <header className="md:max-w-3xl w-full flex flex-col md:flex-row md:items-center justify-between">
              <h3 className="md:px-3 py-1.5 text-sm md:text-xl flex items-center gap-2">
                {title}
              </h3>
              <p className="px-4 md:px-0 text-gray-500 text-sm py-4">
                @{User.username}
              </p>
        </header>
        <section className="">
          <p ref={ref} className={`px-6 py-1.5 whitespace-pre-wrap ${isExpanded ? 'h-96 transition-all duration-100':'max-h-20 line-clamp-2'} h-full  `}>{content}</p>
          <div className="relative bottom-0 flex items-center justify-center">
          {isOverflow ? <button className="hover:text-gray-500 text-xs cursor-pointer" onClick={()=> setIsExpanded(!isExpanded)}>{isExpanded ? '閉じる':'もっと見る'}</button> : null}
        </div>
        </section>
        
      </div>
    </>
  );
}
