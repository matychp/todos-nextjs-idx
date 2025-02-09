"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to Vercel", completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">My To-Do List</h1>
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 mb-2 rounded shadow"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                className="mr-4 w-5 h-5 accent-blue-500"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
