"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export const CategoryForm = () => {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            categoryName: formData.get("category-text") as string,
            categoryColor: formData.get("category-color") as string,
        };

        const res = await fetch("/api/category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            console.error("Failed to create category!");
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
                Create new Category!
            </h2>

            <div className="flex gap-4 items-center">
                <input
                    name="category-text"
                    placeholder="Category name?"
                    required
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />

                <input
                    type="color"
                    name="category-color"
                    defaultValue="#808080"
                    className="w-18 h-12 p-0 cursor-pointer border-2 border-gray-600 rounded-lg"
                    title="Pick category color"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Add Category
            </button>

            {success && (
                <div className="text-green-400 text-sm animate-bounce mt-2 text-center">
                    ✅ Category added successfully!
                </div>
            )}
        </form>
    );
};