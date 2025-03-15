import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/response";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { params } = context;
  const { id } = await params;


try {
    const existingTestimonial = await prisma.testimonial.findUnique({
        where: { id },
    });


    if (!existingTestimonial) {
        return NextResponse.json(errorResponse("Testimonial not found"), {
          status: 404,
        });
    }

    await prisma.testimonial.update({
        where: { id },
        data: { show: { set: !existingTestimonial.show } },
    });

    return NextResponse.json(
      successResponse("Testimonial updated successfully", null),
      { status: 200 }
    );

} catch (error) {
    return NextResponse.json({ error: "Testimonial not found or update failed" }, { status: 404 });
}
}