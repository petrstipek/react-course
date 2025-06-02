import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//currently not in use
export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    const todoId = parseInt(params.id, 10);
    if (isNaN(todoId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.todo.delete({ where: { id: todoId } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
}