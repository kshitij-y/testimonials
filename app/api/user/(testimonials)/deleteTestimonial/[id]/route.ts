import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { params } = context;
    const { id } = await params;
    console.log("Deleting testimonial with ID:", id);


    try {
        await prisma.testimonial.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete testimonial' });
    }
}