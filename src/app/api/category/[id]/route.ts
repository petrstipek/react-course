// /app/api/category/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const deleted = await prisma.category.delete({
            where: { id: Number(params.id) },
        });

        return NextResponse.json({ success: true, deleted }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
};

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const category = await prisma.category.findUnique({
        where: { id: Number(params.id) },
    });

    if (!category) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
};