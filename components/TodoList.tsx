import React, { useState } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useTodos } from '../context/TodosContext';
import { TodoItem } from './TodoItem';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const { todos: initialTodos, setTodos } = useTodos();
  const [todos, setLocalTodos] = useState<Todo[]>(initialTodos);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id.toString() === active.id);
      const newIndex = todos.findIndex((todo) => todo.id.toString() === over.id);
      const updatedTodos = arrayMove(todos, oldIndex, newIndex);
      setLocalTodos(updatedTodos);
      setTodos(updatedTodos)
    }
  };

  const SortableTodoItem = ({ todo }: { todo: Todo }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: todo.id.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TodoItem todo={todo} />
      </li>
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map(todo => todo.id.toString())}>
        <ul className="w-full max-w-md">
          {todos.map((todo) => (
            <SortableTodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
          </ul>
      </SortableContext>
    </DndContext>
  );
};
