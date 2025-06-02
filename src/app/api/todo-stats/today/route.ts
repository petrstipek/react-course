import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todosToday = await prisma.todo.findMany({
        where: {
            DueDate: {
                gte: todayStart,
                lte: todayEnd,
            },
        },
    });

    const totalToday = todosToday.length;
    const remainingToday = todosToday.filter((todo) => !todo.completed).length;

    return NextResponse.json({ totalToday, remainingToday });
}