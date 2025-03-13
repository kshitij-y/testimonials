import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    

    try {
        const { params } = context;
        const { id } = await params;

        const space = await prisma.space.findUnique({
            where: { id: parseInt(id) }
        });

        if (!space) {
            return NextResponse.json({
                status: 404,
                body: 'Space not found'
            });
        }

        const { name, email, content, rating, videoUrl } = await req.json();
        const newTestimonial = await prisma.testimonial.create({
            data: {
                spaceId: parseInt(id),
                name,
                email,
                content,
                rating: parseInt(rating),
                show: false,
                videoUrl: videoUrl || null
            }
        });

        return NextResponse.json({
            status: 200,
            body: newTestimonial
        });
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            body: 'Internal Server Error'
        });
    }
}

