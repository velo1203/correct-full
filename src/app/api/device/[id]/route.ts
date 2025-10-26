import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateApiKey, createUnauthorizedResponse } from "@/lib/api-auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 환경 변수 확인
if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables");
}

// 서비스 키로 Supabase 클라이언트 생성 (쓰기 권한)
const supabaseAdmin =
    supabaseUrl && supabaseServiceKey
        ? createClient(supabaseUrl, supabaseServiceKey)
        : null;

// PUT: 장치 데이터 업데이트
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

        const { battery_level, is_active, status } = body;

        // 업데이트할 데이터
        const updateData: any = {};
        if (battery_level !== undefined)
            updateData.battery_level = battery_level;
        if (is_active !== undefined) updateData.is_active = is_active;
        if (status !== undefined) updateData.status = status;

        // Supabase가 설정되어 있으면 실제로 업데이트
        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from("devices")
                .update(updateData)
                .eq("id", deviceId)
                .select()
                .single();

            if (error) throw error;

            return NextResponse.json({
                success: true,
                message: "Device updated successfully",
                data,
            });
        }

        // Supabase 없어도 성공 응답 반환 (시연용)
        return NextResponse.json({
            success: true,
            message: "Device update request received (demo mode)",
            data: {
                id: deviceId,
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
