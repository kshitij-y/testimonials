import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "@/utils/response";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret_code";

export async function GET(req: NextRequest) {
  try {
    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        errorResponse("Unauthorized: Missing token in cookies."),
        {
          status: 401,
        }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const { userId } = decoded as { userId: number };

    if (!userId) {
      return NextResponse.json(errorResponse("Unauthorized: Invalid token."), {
        status: 401,
      });
    }

    // Fetch user's spaces
    const spaces = await prisma.space.findMany({
      where: { userId },
    });

    return NextResponse.json(
      successResponse("Spaces fetched successfully", spaces),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching spaces:", error);

    return NextResponse.json(
      errorResponse("Failed to fetch spaces. Please try again later.", error),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect().catch((err) => {
      console.error("Error disconnecting Prisma client:", err);
    });
  }
}
