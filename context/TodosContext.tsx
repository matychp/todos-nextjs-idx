"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosContextProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: (text: string) => void;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  const onAdd = (text: string) => {
    setTodos([
      ...todos,
      {
        id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
        text: text,
        completed: false,
      },
    ]);
  };

  const contextValue: TodosContextProps = {
    todos,
    onToggle,
    onDelete,
    onAdd,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
};