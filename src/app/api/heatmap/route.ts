import { NextResponse } from "next/server";

const UPSTREAM = "https://correct.lyj.kr/data";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const u = searchParams.get("u") || UPSTREAM;

    try {
        const r = await fetch(u, { cache: "no-store" });
        const text = await r.text();

        // 그대로 전달 (JSON이든 CSV든 클라이언트에서 파싱)
        return new NextResponse(text, {
            status: 200,
            headers: {
                "Content-Type": guessContentType(text),
                // 굳이 CORS 열 필요 없음(동일 오리진 /api 호출이므로). 그래도 열고 싶으면 아래 주석 해제.
                // "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (e: any) {
        return NextResponse.json(
            { error: "fetch_failed", message: e?.message ?? "unknown error" },
            { status: 502 }
        );
    }
}

function guessContentType(s: string) {
    const trimmed = s.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("["))
        return "application/json; charset=utf-8";
    return "text/plain; charset=utf-8";
}
