"use client"
import TodoContainer from "../common/ui/todoContainer";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/QueryClient";
import PublicTodoList from "./PublicTodoList";

export default function PublicTodoListSection(){
    return (
          <TodoContainer>
            <QueryClientProvider client={queryClient}>
              <PublicTodoList />
            </QueryClientProvider>
          </TodoContainer>
        )
}