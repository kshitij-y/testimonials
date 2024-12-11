import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return NextResponse.json({ message: 'User not found' });
            }
            if (!user.passwordHash) {
                return NextResponse.json({
                    message: 'You have logged in with google'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET as string
            );

            const response = NextResponse.json({
                token,
                message: 'User signed in successfully'
            }, { status: 200 });
            response.cookies.set('token', token, { httpOnly: true, secure: true, maxAge: 3600 });
            response.headers.set('Authorization', `Bearer ${token}`);
            return response;
        } catch (error) {
            return NextResponse.json({ message: 'Database error', error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Invalid request body', error }, { status: 400 });
    }
};