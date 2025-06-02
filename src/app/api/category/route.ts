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

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json({ categories });
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}