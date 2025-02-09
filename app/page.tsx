"use client";
import {AddTodo} from "@/components/AddTodo";
import {TodoList} from "@/components/TodoList";
import { useTodos } from "../context/TodosContext";

export default function Home() {
  const { todos } = useTodos();

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">My To-Do List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}
