import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/response";
const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(errorResponse("Invalid space ID"), {
        status: 400,
      });
    }

    const space = await prisma.space.findUnique({
      where: { id: parseInt(id) },
    });

    if (!space) {
      return NextResponse.json(errorResponse("Space not found"), {
        status: 404,
      });
    }

    const { name, email, content, rating, videoUrl } = await req.json();
    const newTestimonial = await prisma.testimonial.create({
      data: {
        spaceId: parseInt(id),
        name,
        email,
        content,
        rating: parseInt(rating),
        show: false,
        videoUrl: videoUrl || null,
      },
    });

    if (!newTestimonial) {
      return NextResponse.json(errorResponse("failed to create testimonial"));
    }

    return NextResponse.json(
      successResponse("Testimonial created successfully", null),
      { status: 201 }
    );
  } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json(errorResponse("Internal Server Error", error), {
        status: 500,
        });
  } finally {
        await prisma
        .$disconnect()
        .catch((err) => console.error("Error disconnecting Prisma client:", err));
  }
}
