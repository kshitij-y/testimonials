import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { params } = context;
        const { id } = await params;
        const spaceId = parseInt(id, 10);
        console.log("Received request for space ID:", spaceId);

        if (isNaN(spaceId)) {
            console.error("Invalid Space ID");
            return NextResponse.json({ error: "Invalid Space ID" }, { status: 400 });
        }

        const testimonials = await prisma.testimonial.findMany({
            where: { spaceId },
            select: {id: true , name: true, content: true, videoUrl: true, show: true }
        });

        if (testimonials.length === 0) {
            console.error("No testimonials found for space ID:", spaceId);
            return NextResponse.json({ error: "No testimonials found for this space" }, { status: 404 });
        }


        return NextResponse.json({ testimonials }, { status: 200 });

    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
