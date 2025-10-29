// route.ts (정상버전)
import { NextResponse } from "next/server";

const UPSTREAM = "https://correct.lyj.kr/data";

export async function GET() {
    const r = await fetch(UPSTREAM, { cache: "no-store" });
    const text = await r.text();

    let data: any;
    try {
        data = JSON.parse(text);
    } catch {
        // 혹시 따옴표로 감싼 문자열이라면 한 번 더 파싱
        if (typeof text === "string" && text.startsWith('"[')) {
            data = JSON.parse(JSON.parse(text));
        } else {
            const numbers = text.match(/-?\d+(\.\d+)?/g);
            data = numbers ? numbers.map(Number) : [];
        }
    }

    console.log(data);

    return NextResponse.json(data, {
        headers: { "Cache-Control": "no-store" },
    });
}
