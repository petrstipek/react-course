"use client";

import { toggleTodo, deleteTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
    todo: Todo;
};

export const TodoDetailButtons = ({ todo }: Props) => {
    const router = useRouter();
    const handleToggleTodo = () => {
        toggleTodo(todo.id);
    };
    const handleDeleteTodo = () => {
        deleteTodo(todo.id);
        router.push("/");
    }
    return (
        <>
            <button onClick={handleToggleTodo} className="bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-md">
                {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={handleDeleteTodo} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Delete
            </button>
        </>
    )
};
