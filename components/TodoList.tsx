import React from 'react';
import { useTodos } from '../context/TodosContext'; 
import {TodoItem} from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <ul className="w-full max-w-md">
      {todos.map((todo) => ( 
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
