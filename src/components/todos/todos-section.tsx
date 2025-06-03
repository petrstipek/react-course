"use client";

import { useMemo, useState } from "react";
import { Category, Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";
import { TodoListSection } from "./todos-section-list";

type TodoWithCategory = Todo & {
  category: Category | null;
};

type Props = {
  todos: TodoWithCategory[];
};

export const TodosSection = ({ todos }: Props) => {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("all");
  const [dueFilter, setDueFilter] = useState("all");
  const [completedFilter, setCompletedFilter] = useState<"all" | "not-completed">("all");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesName = todo.name.toLowerCase().includes(query.toLowerCase());

      const matchesPriority =
        priority === "all" || (todo.priority && todo.priority.toLowerCase() === priority);

      const matchesCompleted =
        completedFilter === "all" ? true : !todo.completed;

      const matchesDue = (() => {
        if (!todo.DueDate) return true;

        const dueDate = new Date(todo.DueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dueFilter === "all") return true;
        if (dueFilter === "today") {
          if (todo.completed) return false;
          return (
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getDate() === today.getDate()
          );
        }
        if (dueFilter === "overdue") {
          if (todo.completed) return false;
          return dueDate < today;
        }
        return true;
      })();

      return matchesName && matchesPriority && matchesDue && matchesCompleted;
    });
  }, [todos, query, priority, dueFilter, completedFilter]);

  const pinnedTodos = filteredTodos.filter((todo) => todo.pinned);
  const unpinnedTodos = filteredTodos.filter((todo) => !todo.pinned);

  return (
    <main>
      <div className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        <div>
          <input
            type="text"
            placeholder="Search todos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white"
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={dueFilter}
            onChange={(e) => setDueFilter(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white"
          >
            <option value="all">All due dates</option>
            <option value="today">Due today</option>
            <option value="overdue">Overdue</option>
          </select>

          <button
            onClick={() =>
              setCompletedFilter((prev) =>
                prev === "not-completed" ? "all" : "not-completed"
              )
            }
            className={`w-full sm:w-1/3 px-4 py-2 rounded-lg border-2 ${completedFilter === "not-completed"
              ? "bg-green-700 border-green-500"
              : "bg-gray-700 border-gray-600"
              } text-white shadow-md hover:brightness-110 transition-all`}
          >
            {completedFilter === "not-completed"
              ? "Showing only uncompleted"
              : "Showing all"}
          </button>
        </div>
      </div>
      {/* Pinned Section */}
      {pinnedTodos.length > 0 && (
        <TodoListSection
          title="📌 Pinned"
          todos={pinnedTodos}
          bgClassName="bg-yellow-800"
        />
      )}
      {/* Unpinned Section */}
      <TodoListSection
        title="All"
        todos={unpinnedTodos}
        bgClassName="bg-gray-800"
      />
    </main>
  );
};