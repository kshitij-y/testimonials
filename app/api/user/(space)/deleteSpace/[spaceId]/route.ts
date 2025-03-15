import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { errorResponse, successResponse } from "@/utils/response";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, context: { params: Promise<{ spaceId: string }> }) {
    const { params } = context;
    const { spaceId } = await params;

    console.log("delete req for spaceId", spaceId);
    try {
        await prisma.testimonial.deleteMany({
          where: { spaceId: spaceId },
        });
        const res = await prisma.space.delete({
            where: { id: spaceId }
        });

        if (res) {
            return NextResponse.json(successResponse("Space deleted successfully", null));
        }
    } catch (error) {
        return NextResponse.json(errorResponse("Failed to delete Space", error));
    }
}