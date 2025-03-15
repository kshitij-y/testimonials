import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { errorResponse, successResponse } from '@/utils/response';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(errorResponse("Email and password are required"), { status: 400 });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return NextResponse.json(errorResponse("User not found"));
            }
            if (!user.passwordHash) {
                return NextResponse.json(
                  errorResponse("You have logged in with google")
                );
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                return NextResponse.json(errorResponse("wrong password"));
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET as string
            );

            const response = NextResponse.json(
              successResponse("User signed in successfully", {token}),
              { status: 200 }
            );
            response.cookies.set('token', token, { httpOnly: true });
            response.cookies.set('avatarUrl', user.avatarUrl || "", { httpOnly: true });
            response.headers.set('Authorization', `Bearer ${token}`);
            return response;
        } catch (error) {
            return NextResponse.json({ message: 'Database error', error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body', error }, { status: 400 });
    }
};