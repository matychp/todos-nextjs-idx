"use client";
import { useState } from "react";
import {AddTodo} from "@/components/AddTodo";
import {TodoList} from "@/components/TodoList";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to Vercel", completed: false },
  ]);

  const onToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const onDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (newTodo:string) => {
    setTodos([
      ...todos,
      {
        id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
        text: newTodo,
        completed: false,
      },
    ])
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">My To-Do List</h1>
      <AddTodo onAdd={handleAddTodo}/>
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}
