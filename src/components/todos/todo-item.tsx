"use client";
import Link from "next/link";
import { toggleTodo, deleteTodo } from "@/actions/todo-actions";
import { Category, Todo } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type TodoWithCategory = Todo & {
  category: Category | null;
};

type TodoItemProps = {
  todo: TodoWithCategory;
};
export const TodoItem = ({ todo }: TodoItemProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!todo.categoryId) return;
      const res = await fetch(`/api/category/${todo.categoryId}`);
      if (res.ok) {
        const data = await res.json();
        setCategory(data.category);
      }
    };
    fetchCategory();
  }, [todo.categoryId]);


  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleToggleTodo = async () => {
    await toggleTodo(todo.id);
    window.dispatchEvent(new Event("refresh-today-stats"));
  };

  const togglePinned = async (todoid: number) => {
    try {
      const response = await fetch(`/api/todos/${todoid}/pin`, {
        method: "PATCH",
      });
      if (!response.ok) {
        const text = await response.text();
        alert(`Error when using pin: ${text}`);
        return;
      }
    } catch (error) {
      console.error("Error toggling pinned status:", error);
      alert("Server communication error.");
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      <span>{todo.name}</span>
      <div className="flex gap-2 mt-2 flex-wrap">
        {todo.category && (
          <span
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
            style={{
              backgroundColor: todo.category.color,
              textAlign: "center",
            }}
          >
            🏷 {todo.category.name}
          </span>
        )}
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
    </li >
  );
};
