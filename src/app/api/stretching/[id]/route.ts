import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateApiKey, createUnauthorizedResponse } from "@/lib/api-auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables");
}

const supabaseAdmin =
    supabaseUrl && supabaseServiceKey
        ? createClient(supabaseUrl, supabaseServiceKey)
        : null;

// PUT: 스트레칭 추천 업데이트
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // API 키 검증 (hello로 고정)
    if (!validateApiKey(request)) {
        return createUnauthorizedResponse();
    }

    try {
        const deviceId = parseInt(params.id);
        const body = await request.json();

        const {
            recommendation_text,
            stretch_type,
            duration_seconds,
            frequency,
        } = body;

        // 업데이트할 데이터
        const updateData: any = {};
        if (recommendation_text !== undefined)
            updateData.recommendation_text = recommendation_text;
        if (stretch_type !== undefined) updateData.stretch_type = stretch_type;
        if (duration_seconds !== undefined)
            updateData.duration_seconds = duration_seconds;
        if (frequency !== undefined) updateData.frequency = frequency;

        // Supabase가 설정되어 있으면 실제로 업데이트
        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from("stretching_recommendations")
                .update(updateData)
                .eq("device_id", deviceId)
                .select()
                .single();

            if (error) throw error;

            return NextResponse.json({
                success: true,
                message: "Stretching recommendation updated successfully",
                data,
            });
        }

        // Supabase 없어도 성공 응답 반환 (시연용)
        return NextResponse.json({
            success: true,
            message:
                "Stretching recommendation update request received (demo mode)",
            data: {
                device_id: deviceId,
                ...updateData,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
