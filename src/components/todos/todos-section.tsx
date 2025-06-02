"use client";

import { useMemo, useState } from "react";
import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";

type Props = {
  todos: Todo[];
};

export const TodosSection = ({ todos }: Props) => {
  const [query, setQuery] = useState("");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [todos, query]);

  return (
    <main>
      <div className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
      </div>
      <div className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        <ul>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <li className="text-gray-400 text-sm mt-2">No todos found.</li>
          )}
        </ul>
      </div>
    </main>
  );
};