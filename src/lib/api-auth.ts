import { NextRequest, NextResponse } from "next/server";

const API_SECRET_KEY = process.env.API_SECRET_KEY || "hello";

export function validateApiKey(request: NextRequest): boolean {
    const apiKey = request.headers.get("X-API-Key");
    return apiKey === API_SECRET_KEY;
}

export function createUnauthorizedResponse() {
    return NextResponse.json(
        {
            success: false,
            error: "Unauthorized",
            message: `Invalid or missing API key. Required header: X-API-Key`,
        },
        { status: 401 }
    );
}
