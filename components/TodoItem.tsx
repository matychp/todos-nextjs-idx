import { Button } from "@/components/ui/button";
import { useTodos } from "../context/TodosContext";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { onToggle, onDelete } = useTodos();
  return (
    <li className="flex items-center justify-between bg-white p-4 mb-2 rounded shadow">
      <div className="flex items-center justify-between w-full">
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          className="mr-4 w-5 h-5 accent-blue-500"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`text-lg ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.text}</label>
          
      
      
        <Button
          variant="destructive"
          size="icon"
            onClick={() => onDelete(todo.id)}
          className="ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    </li>
  );
};
