import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { errorResponse, successResponse } from "@/utils/response";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { params } = context;
    const { id } = await params;


    try {
        const res = await prisma.testimonial.delete({
            where: { id }
        });

        if (res) {
            return NextResponse.json(successResponse("Testimonial deleted successfully", null));
        }
    } catch (error) {
        return NextResponse.json(errorResponse("Failed to delete testimonial", error));
    }
}