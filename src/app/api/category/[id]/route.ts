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
}