import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/response";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, props: { params: Promise<{ spaceId: string }> }) {
  const params = await props.params;
  const spaceId = params.spaceId;
  if (!(spaceId)) {
    return NextResponse.json(errorResponse("Invalid space ID"), {
      status: 400,
    });
  }

  try {
    const space = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!space) {
      return NextResponse.json(errorResponse("Space not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      successResponse("Space fetched successfully", {
        description: space.description,
        logoUrl: space.logoUrl,
        title: space.title,
        Questions: space.Questions,
        thankGif: space.thankGif,
        thankTitle: space.thankTitle,
        thankMsg: space.thankMsg,
        redirectUrl: space.redirectUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching space:", error);
    return NextResponse.json(errorResponse("Internal Server Error"), {
      status: 500,
    });
  } finally {
    await prisma.$disconnect().catch((e) => {
      console.error("Error disconnecting Prisma client:", e);
    });
  }
}