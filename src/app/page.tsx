import { Header } from "@/components/header/header";
import TodayOverviewCard from "@/components/stats/todo-today-overview-card";
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
      <TodayOverviewCard />
      <TodosSection todos={todos} />
      <footer>
      </footer>
    </>
  );
}
