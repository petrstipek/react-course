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
          className="bg-gray-900 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="todo-description"
          placeholder="Description (optional)"
          className="bg-gray-900 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="todo-priority"
          defaultValue=""
          required
          className="appearance-none bg-gray-900 text-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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