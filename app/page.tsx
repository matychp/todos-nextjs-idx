"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";


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
  
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };
  

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">My To-Do List</h1>
      <div className="w-full max-w-md mb-4 flex">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-l"
          placeholder="Add a new to-do"
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button  onClick={handleAddTodo} className="rounded-r">
         Add
        </Button>
      </div>

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
              <Button variant="destructive" size="icon"
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-4"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></Button>
              

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
