"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { toNamespacedPath } from "path";

export async function createTodo(formData: FormData) {
  const todoName = formData.get("todo-text") as string;
  const newTodo = {
    name: todoName,
  };
  await prisma.todo.create({ data: newTodo });
  revalidatePath("/");
};

export async function toggleTodo(todoId: number) {
  const todo = await prisma.todo.findUnique({ where: { id: todoId } });
  if (!todo) {
    throw new Error("Todo not found");
  }
  const updatedTodo = {
    ...todo,
    completed: !todo.completed,
  }
  await prisma.todo.update({
    where: { id: todoId },
    data: updatedTodo,
  });
  revalidatePath("/");
};

export async function deleteTodo(todoId: number) {
  await prisma.todo.delete({ where: { id: todoId } });
  revalidatePath("/");
};
