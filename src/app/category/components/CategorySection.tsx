"use client"

import { Category } from "@prisma/client";
import { CategoryItem } from "./CategoryItem";

type CategoryProps = {
    categories: Category[];
}

export const CategorySection = ({ categories }: CategoryProps) => {
    return (
        <div className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
            <h3 className="text-white text-lg font-semibold">Categories:</h3>
            <ul>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))
                ) : (
                    <li className="text-gray-400 text-sm mt-2">No categories found.</li>
                )}
            </ul>
        </div>
    )
}