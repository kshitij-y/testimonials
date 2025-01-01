import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();
    console.log(name,email,password);

    if (!email || !password) {
        return NextResponse.json({
            message: 'Email and password are required',

        }, {
            status: 400
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json({
                message: 'Email is already in use',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            },
        });

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        const response = NextResponse.json({
            token,
            message: 'User created successfully',
            success: true
        }, {
            status: 201
        });
        response.cookies.set('token', token, { httpOnly: true, secure: true, maxAge: 3600 });
        response.cookies.set('avatarUrl', "", { httpOnly: true });
        response.headers.set('Authorization', `Bearer ${token}`);

        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: 'Internal server error',
            success: false,
        }, { status: 500 });
    }
}
