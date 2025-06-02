import { Header } from "@/components/header/header";
import { TodosSection } from "@/components/todos/todos-section";
import prisma from "@/lib/prisma";

const fetchTodos = async () => {
  const response = await prisma.todo.findMany();
  return response;
};

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <>
      <Header title="Todo List" subtitle="Manage your tasks efficiently" />
      <TodosSection todos={todos} />
      <footer>
      </footer>
    </>
  );
}
