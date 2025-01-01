import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("code");

        if (!code) {
            return NextResponse.json({ message: "Authorization code not provided." }, { status: 400 });
        }

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2",
        });

        const userInfo = await oauth2.userinfo.get();
        const { email, name, picture } = userInfo.data;

        if (!email) {
            return NextResponse.json({ message: "Email not available from Google." }, { status: 400 });
        }
        
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || "Unknown User",
                    avatarUrl: picture || "",
                },
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const response = NextResponse.redirect(new URL("/dashboard", req.url));
        response.cookies.set("token", token, { httpOnly: true });
        response.cookies.set("avatarUrl", picture || "", { httpOnly: true });
        return response;
    } catch (error) {
        console.error("Error in Google callback:", error);
        return NextResponse.json({ message: "Authentication failed." }, { status: 500 });
    }
}
