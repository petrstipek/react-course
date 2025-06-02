"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";


type CategoryItemProps = {
    category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        await fetch(`/api/category/${category.id}`, {
            method: "DELETE",
        });

        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <li className="flex items-center justify-between p-3 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
                <div
                    className="w-6 h-6 rounded-sm border border-gray-600"
                    style={{ backgroundColor: category.color }}
                    title={category.color}
                />
                <span className="text-white font-medium">{category.name}</span>
            </div>

            <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
                Delete
            </button>
        </li>
    );
};