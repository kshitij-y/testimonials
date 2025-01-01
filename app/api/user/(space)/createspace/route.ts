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
        { message: "Unauthorized: Missing token in cookies." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded as { userId: number };

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, description, logoUrl, title, Questions, thankGif, thankTitle, thankMsg, redirectUrl } = body;

    if (!name || !description || !title) {
      return NextResponse.json(
        { message: "Missing required fields: name, description, or title." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }
    console.log(body);
    await prisma.space.create({
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
        redirectUrl
      },
    });

    return NextResponse.json(
      { message: "success" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating space:", error);
    return NextResponse.json(
      { message: "Failed to create space. Please try again later." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect().catch((e) => {
      console.error("Error disconnecting Prisma client:", e);
    });
  }
}
