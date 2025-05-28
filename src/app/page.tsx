import { Header } from "@/components/header";
import { TodosSection } from "@/components/todos/todos-section";

const API_URL = "https://eli-workshop.vercel.app/api/users/stip05/todos";

const fetchTodos = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <>
      <Header title="My Todo List" subtitle="Add your tasks" />
      <TodosSection todos={todos} />
      <footer>
        <p>Click on a task to mark it as completed</p>
      </footer>
    </>
  );
}
