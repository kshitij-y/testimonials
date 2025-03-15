import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/response";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { params } = context;
    const { id } = await params;
    const spaceId = id;
    console.log("Received request for space ID:", spaceId);

    if (!(spaceId)) {
      console.error("Invalid Space ID");
      return NextResponse.json(errorResponse("Invalid Space ID"), {
        status: 400,
      });
    }

    const testimonials = await prisma.testimonial.findMany({
      where: { spaceId },
      select: {
        id: true,
        name: true,
        content: true,
        videoUrl: true,
        show: true,
      },
    });

    if (testimonials.length === 0) {
      return NextResponse.json(
        successResponse("No testimonials found for this space", {
          testimonials,
        }),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse("Testimonials fetched successfully", {testimonials}),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(errorResponse("Internal Server Error", error), {
      status: 500,
    });
  }
}