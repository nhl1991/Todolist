"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import TodoItemWrapper from "../common/ui/todoItemWrapper";
import TodoItem from "../common/components/todoItem";
import { Todo } from "@/types/todo";
import ThreeDotsBounce from "../common/Icons/3-dots-bounce";
import InitialLoadingComponent from "../common/components/LoadingComponent";

const fetchPublicTodo = async ({ pageParam }: { pageParam: string | null }) => {
  const url = pageParam ? `/api/todo/public?next=${pageParam}` : '/api/todo/public'
  const response = await fetch(
    url,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const { data, next } = await response.json();
    return { data, next };
  } else {
    const { error } = await response.json();
    throw new Error(error);
  }
};

export default function PublicTodoList() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["todo", "public"],
    queryFn: fetchPublicTodo,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.next ?? null,
  });
  if (status === "pending") return <InitialLoadingComponent />
  if (status === "success")
    return (
      <>
        {data.pages.map((page) => {
          return page.data.map((item: Todo) => (
            <TodoItemWrapper key={item.id}>
              <TodoItem item={item} />
            </TodoItemWrapper>
          ));
        })}
        <div className="flex items-center justify-center py-8">
        {hasNextPage ? (
          isFetchingNextPage ? (
            <ThreeDotsBounce className="w-8 h-8" />
          ) : (
            <button className="btn-hover" onClick={() => fetchNextPage()}>もっと見る</button>
          )
        ) : (
          <p>これ以上表示する項目はありません。</p>
        )}
        </div>
      </>
    );
}
