"use client";

import { createTodo } from "@/actions/todo-actions";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export const TodoForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    await createTodo(formData);

    startTransition(() => {
      router.refresh();
    });

    setSuccess(true);
    form.reset();

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-center text-2xl font-semibold mb-4">
        Create new Todo!
      </h2>

      <div className="space-y-2">
        <input
          name="todo-text"
          placeholder="What needs to be done?"
          required
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />

        <input
          name="todo-description"
          placeholder="Description (optional)"
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />

        <select
          name="todo-priority"
          defaultValue=""
          required
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Todo
      </button>

      {success && (
        <div className="text-green-400 text-sm animate-bounce mt-2 text-center">
          ✅ Todo added successfully!
        </div>
      )}
    </form>
  );
};