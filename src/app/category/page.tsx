import { Header } from "@/components/header/header";
import { CategoryForm } from "./components/CategoryForm";
import prisma from "@/lib/prisma";
import { CategorySection } from "./components/CategorySection";

const fetchCategories = async () => {
    const response = await prisma.category.findMany();
    return response;
};

const createCategoryPage = async () => {
    const categories = await fetchCategories();
    return (
        <>
            <Header title="Create new category" subtitle="Create new categorie for todos!" />
            <CategoryForm />
            <CategorySection categories={categories} />
        </>
    )
};

export default createCategoryPage;