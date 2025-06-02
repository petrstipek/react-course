"use client";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

export const TodoForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("todo-text"),
      description: formData.get("todo-description"),
      priority: formData.get("todo-priority"),
      dueDate: formData.get("todo-due"),
      categoryId: Number(formData.get("todo-category")),
    };

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to create todo");
      return;
    }

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
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="todo-category"
          defaultValue=""
          required
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="todo-due"
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
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