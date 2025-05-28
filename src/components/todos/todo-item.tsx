"use client";
import Link from "next/link";
import { toggleTodo, deleteTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem = ({ todo }: TodoItemProps) => {
  const handleDeleteTodo = () => {
    // deleteTodo({ id: todo.id });
    deleteTodo(todo.id);
  };

  const handleToggleTodo = () => {
    // toggleTodo({ id: todo.id, completed: !todo.completed });
    toggleTodo(todo.id);
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? "Undo" : "Completed"}
      </button>
      <Link href={`/todos/${todo.id}`} className="link">
        Go to Detail
      </Link>
    </li>
  );
};
