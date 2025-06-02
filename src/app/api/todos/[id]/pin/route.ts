import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const todoId = parseInt(params.id);
    if (isNaN(todoId)) {
        return new Response("Invalid ID", { status: 400 });
    }

    const todo = await prisma.todo.findUnique({ where: { id: todoId } });
    if (!todo) {
        return new Response("Todo not found", { status: 404 });
    }

    const updated = await prisma.todo.update({
        where: { id: todoId },
        data: { pinned: !todo.pinned },
    });

    return Response.json(updated);
}