import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { categoryName, categoryColor } = body;

        const newCategory = await prisma.category.create({
            data: {
                name: categoryName,
                color: categoryColor
            },
        });

        revalidatePath('/category');

        return NextResponse.json({ success: true, newCategory }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 });
    }
}