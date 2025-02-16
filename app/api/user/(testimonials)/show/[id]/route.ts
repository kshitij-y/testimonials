import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const { id } = await params;

try {
    const existingTestimonial = await prisma.testimonial.findUnique({
        where: { id: parseInt(id) },
    });

    if (!existingTestimonial) {
        throw new Error("Testimonial not found");
    }

    await prisma.testimonial.update({
        where: { id: parseInt(id) },
        data: { show: { set: !existingTestimonial.show } },
    });

    return NextResponse.json({
        massage : "Testimonial updated successfully",
    });
} catch (error) {
    return NextResponse.json({ error: "Testimonial not found or update failed" }, { status: 404 });
}
}