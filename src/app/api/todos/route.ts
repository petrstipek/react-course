import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { name, description, priority, dueDate, categoryId } = body;

        const newTodo = await prisma.todo.create({
            data: {
                name,
                description: description || '',
                priority,
                DueDate: dueDate ? new Date(dueDate) : null,
                category: categoryId ? { connect: { id: categoryId } } : undefined,
            },
        });

        revalidatePath('/');

        return NextResponse.json({ success: true, todo: newTodo }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to create todo' }, { status: 500 });
    }
}