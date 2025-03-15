import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(errorResponse("Email and password are required"), {
      status: 400,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(errorResponse("Email is already in use"), {
        status: 400,
      });
    }

    console.log("Received password:", password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    const response = NextResponse.json(
      successResponse("User created successfully", { token }),
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600,
    });
    response.cookies.set("avatarUrl", "", { httpOnly: true });
    response.headers.set("Authorization", `Bearer ${token}`);

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(errorResponse("Internal server error"), {
      status: 500,
    });
  }
}
