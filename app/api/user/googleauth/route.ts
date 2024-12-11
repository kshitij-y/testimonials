import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export async function GET(req: NextRequest) {
    try {
        if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
            return NextResponse.json(
                { message: "Google OAuth environment variables are not set." },
                { status: 500 }
            );
        }

        const url = oauth2Client.generateAuthUrl({
            access_type: "offline", 
            scope: ["profile", "email"],
        });

        return NextResponse.json({ url }, { status: 200 });
    } catch (error) {
        console.error("Error generating Google OAuth URL:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
