import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_code';


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const token = req.cookies.get('token')?.value;
        console.log(token);
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

        const spaces = await prisma.space.findMany({
            where: {
                userId,
            },
        });
        return NextResponse.json(spaces, { status: 200 });
          
    } catch (error) {
        console.log("Error fetching spaces:", error);
        return NextResponse.json({
            error: "Failed to fetch spaces. Please try again later."
        },{
            status: 500
        });
    } finally {
        await prisma.$disconnect().catch((err) => {
            console.log("Error disconnecting Prisma client:", err);
        });
    }
}
