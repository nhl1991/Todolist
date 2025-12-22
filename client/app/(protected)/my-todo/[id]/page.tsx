
import TodoWrapper from "@/components/common/ui/todoContainer";
import CreateTodo from "@/components/my-todo/createTodo";
import { SERVER_URL } from "@/lib/serverUrl";
import { Todo } from "@/types/todo";
import MyTodoList from "@/components/my-todo/myTodoList";
import { createMyTodo } from "@/app/actions/createMyTodo";
import { updateMyTodo } from "@/app/actions/updateMyTodo";
import { deleteMyTodo } from "@/app/actions/deleteMyTodo";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${SERVER_URL}/todo/my-todo/${id}`, {
      method: "GET",
      credentials: "include",
      next: {
        tags: [`todo/${id}`],
      },
    });

if (response.ok) {
    const data = await response.json();

    return(
    <TodoWrapper>
        <CreateTodo userId={id} action={createMyTodo} />
        {
          data.map((item:Todo) => <MyTodoList key={item.id} userId={id} userTodo={item} updateAction={updateMyTodo} deleteAction={deleteMyTodo} />)
        }
    </TodoWrapper>
  )
  } else return <p>Response says "I'm not Okay"</p>;
  
}
