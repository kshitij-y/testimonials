import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const { id } = await params;

  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        spaceId: Number(id),
      },
    });
    // console.log(testimonials);
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Error fetching testimonials" }, { status: 500 });
  }
}
