import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }
        if(!user.passwordHash){
            return NextResponse.json({
                message: 'You have logged in with google'
            }, {
                status: 404
            });
            
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' });
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
        return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    }
};