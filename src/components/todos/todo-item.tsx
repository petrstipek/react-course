"use client";
import Link from "next/link";
import { toggleTodo, deleteTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem = ({ todo }: TodoItemProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleToggleTodo = async () => {
    await toggleTodo(todo.id);
    window.dispatchEvent(new Event("refresh-today-stats"));
  };

  const togglePinned = async (todoid: number) => {
    await fetch(`/api/todos/${todoid}/pin`, {
      method: "PATCH",
    });
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      <span>{todo.name}</span>
      <div className="flex gap-2 mt-2 flex-wrap">
        <button
          onClick={() => togglePinned(todo.id)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
    ${todo.pinned
              ? "bg-yellow-500 text-black hover:bg-yellow-400"
              : "bg-gray-700 text-white hover:bg-gray-600"}
    `}
        >
          {todo.pinned ? "Unpin 📌" : "Pin 📌"}
        </button>
        <button
          onClick={handleDeleteTodo}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          Delete
        </button>

        <button
          onClick={handleToggleTodo}
          className={`min-w-[100px] text-center ${todo.completed
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-600 hover:bg-green-700"
            } text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors`}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <Link
          href={`/todos/${todo.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors inline-block"
        >
          Go to Detail
        </Link>
      </div>
    </li>
  );
};
