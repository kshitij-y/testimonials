import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        message: "Signed out successfully",
        success: true
    });

    response.cookies.set("auth_token", "", { httpOnly: true, maxAge: 0, path: "/" });
    response.cookies.set("avatarUrl", "", { httpOnly: true, maxAge: 0, path: "/" });
    response.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" });
    response.headers.set("Authorization", "");

    return response;
}
