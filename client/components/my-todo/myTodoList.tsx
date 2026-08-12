"use client";
import { Todo, TodoActionResponse } from "@/types/todo";
import { useState } from "react";
import UpdateForm from "./updateForm";
import TodoItem from "../common/components/todoItem";
import TodoItemWrapper from "../common/ui/todoItemWrapper";
import CompleteButton from "./completeButton";

export default function MyTodoList({
  userId,
  userTodo,
  updateAction,
  deleteAction,
}: {
  userId: string;
  userTodo: Todo;
  updateAction: (formData: FormData) => Promise<TodoActionResponse>;
  deleteAction: (formData: FormData) => Promise<TodoActionResponse>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleOnCancel = () => setIsEditing(false);

  if (isEditing)
    return (
      <UpdateForm
        userId={userId}
        userTodo={userTodo}
        action={updateAction}
        onCancel={handleOnCancel}
      />
    );

  const { id, title } = userTodo;

  return (
    <TodoItemWrapper>
      <TodoItem item={userTodo} />
      <div className="w-full flex justify-end items-center gap-x-1">
        <button className="btn-hover" onClick={() => setIsEditing(true)}>
          修正
        </button>
        <CompleteButton id={id} title={title} userId={userId} action={deleteAction} />
      </div>
    </TodoItemWrapper>
  );
}
