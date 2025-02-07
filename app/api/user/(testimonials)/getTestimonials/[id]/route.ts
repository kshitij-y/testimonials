import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log("Received request for space ID:", params.id);

        const spaceId = parseInt(params.id);

        if (isNaN(spaceId)) {
            console.error("Invalid Space ID");
            return new NextResponse("Invalid Space ID", { status: 400 });
        }

        // Fetch testimonials for the given spaceId
        const testimonials = await prisma.testimonial.findMany({
            where: { spaceId },
            select: { name: true, content: true, videoUrl: true }
        });


        if (testimonials.length === 0) {
            console.error("No testimonials found for space ID:", spaceId);
            return new NextResponse("No testimonials found for this space", { status: 404 });
        }

       
        return new NextResponse(
            "abcd"
        );

    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
