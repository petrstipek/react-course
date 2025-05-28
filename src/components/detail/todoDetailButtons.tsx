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
            <button onClick={handleToggleTodo} className="complete-button">
                {todo.completed ? "Undo" : "Complete"}
            </button>
        </>
    )
};
