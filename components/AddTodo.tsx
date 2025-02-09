"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      onAdd(newTodo);
      setNewTodo("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <form
      className="w-full max-w-md mb-4 flex"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
    >
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-l"
        placeholder="Add a new to-do"
        value={newTodo}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button className="rounded-r" type="submit">
        Add
      </Button>
    </form>
  );
}