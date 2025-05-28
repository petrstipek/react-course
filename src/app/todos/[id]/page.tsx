import { Header } from "@/components/header/header";
import prisma from "@/lib/prisma";
import { TodoDetailButtons } from "@/app/todos/[id]/components/todoDetailButtons";
import { Metadata } from "next";

async function getTodo(id: number) {
  const todo = await prisma.todo.findUnique({ where: { id }, });
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
}

export const metadata: Metadata = {
  title: "Todo Detail",
  description: "View details of a specific todo item",
};

const TodoDetailPage = async ({ params }: { params: { id: string } }) => {
  const queryParams = await params;
  const todo = await getTodo(Number(queryParams.id));
  console.log("Todo detail:", todo);

  return (
    <>
      <Header title="Todo Detail" subtitle="Here is detail of todo" />

      <div className="mx-auto mt-6 p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold">{todo.name}</h2>

        <div className="text-sm">
          <span className="font-semibold">Status:</span>{" "}
          <span className={todo.completed ? "text-green-400" : "text-yellow-400"}>
            {todo.completed ? "Completed" : "Active"}
          </span>
        </div>

        <div className="text-sm">
          <span className="font-semibold">Priority:</span>{" "}
          <span className="text-blue-300">{todo.priority}</span>
        </div>

        {todo.description && (
          <div className="text-sm">
            <span className="font-semibold">Description:</span>
            <p className="text-sm text-gray-300">{todo.description}</p>
          </div>
        )}

        <div className="border-t border-gray-600 pt-4">
          <h3 className="text-lg font-semibold mb-2">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <TodoDetailButtons todo={todo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoDetailPage;
