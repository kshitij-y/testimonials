import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, props: { params: Promise<{ spaceId: string }> }) {
    const params = await props.params;
    const spaceId = parseInt(params.spaceId);
    console.log(spaceId);
    if (isNaN(spaceId)) {
        return NextResponse.json({
            status: false
        });
    }

    try {
        const space = await prisma.space.findUnique({
            where: {
                id: spaceId
            },
        });

        if (!space) {
            return NextResponse.json({ error: "Space not found" }, { status: 404 });
        }

        return NextResponse.json({
            description: space.description,
            logoUrl: space.logoUrl,
            title: space.title,
            Questions: space.Questions,
            thankGif: space.thankGif,
            thankTitle: space.thankTitle,
            thankMsg: space.thankMsg,
            redirectUrl: space.redirectUrl
        }); 
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}