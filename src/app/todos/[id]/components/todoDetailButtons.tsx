"use client";

import { toggleTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";
import Link from "next/link";

type Props = {
    todo: Todo;
};

export const TodoDetailButtons = ({ todo }: Props) => {
    const handleToggleTodo = () => {
        toggleTodo(todo.id);
    };
    return (
        <>
            <button onClick={handleToggleTodo} className="bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-md">
                {todo.completed ? "Undo" : "Complete"}
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Delete
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Edit
            </button>
        </>
    )
};
