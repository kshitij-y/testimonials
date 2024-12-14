import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_code';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Missing token in cookies." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded as { userId: number };

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, logoUrl, title, Questions, thankGif, thankTitle, thankMsg } = body;

    if (!name || !description || !title) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, or title." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const space = await prisma.space.create({
      data: {
        userId,
        name,
        description,
        logoUrl,
        title,
        Questions,
        thankGif,
        thankTitle,
        thankMsg,
      },
    });

    return NextResponse.json(space, { status: 201 });
  } catch (error) {
    console.error("Error creating space:", error);
    return NextResponse.json(
      { error: "Failed to create space. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect().catch((e) => {
      console.error("Error disconnecting Prisma client:", e);
    });
  }
}
