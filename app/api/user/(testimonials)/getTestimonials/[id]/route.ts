import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { params } = context; // Access params inside the function
        console.log("Received request for space ID:", params.id);

        const spaceId = await parseInt(params.id, 10);

        if (isNaN(spaceId)) {
            console.error("Invalid Space ID");
            return NextResponse.json({ error: "Invalid Space ID" }, { status: 400 });
        }

        // Fetch testimonials for the given spaceId
        const testimonials = await prisma.testimonial.findMany({
            where: { spaceId },
            select: { name: true, content: true, videoUrl: true }
        });

        if (testimonials.length === 0) {
            console.error("No testimonials found for space ID:", spaceId);
            return NextResponse.json({ error: "No testimonials found for this space" }, { status: 404 });
        }

        // Return testimonials as JSON
        return NextResponse.json({ testimonials }, { status: 200 });

    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
