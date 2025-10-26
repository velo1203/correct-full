import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface Device {
    id: number;
    name: string;
    battery_level: number;
    is_active: boolean;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface PostureData {
    id: number;
    device_id: number;
    posture_score: string;
    statistics_hours: number;
    chart_data: number[];
    created_at: string;
    updated_at: string;
}

export interface StretchingRecommendation {
    id: number;
    device_id: number;
    recommendation_text: string;
    stretch_type: string;
    duration_seconds: number;
    frequency: string;
    created_at: string;
    updated_at: string;
}

// 장치 데이터 가져오기
export async function getDevice(deviceId: number) {
    const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("id", deviceId)
        .single();

    if (error) throw error;
    return data as Device;
}

// 모든 장치 가져오기
export async function getAllDevices() {
    const { data, error } = await supabase
        .from("devices")
        .select("*")
        .order("id", { ascending: true });

    if (error) throw error;
    return data as Device[];
}

// 자세 데이터 가져오기
export async function getPostureData(deviceId: number) {
    const { data, error } = await supabase
        .from("posture_data")
        .select("*")
        .eq("device_id", deviceId)
        .single();

    if (error) throw error;
    return data as PostureData;
}

// 스트레칭 추천 가져오기
export async function getStretchingRecommendation(deviceId: number) {
    const { data, error } = await supabase
        .from("stretching_recommendations")
        .select("*")
        .eq("device_id", deviceId)
        .single();

    if (error) throw error;
    return data as StretchingRecommendation;
}

// 장치 전체 데이터 가져오기 (상세 페이지용)
export async function getDeviceFullData(deviceId: number) {
    const [device, postureData, stretchingRecommendation] = await Promise.all([
        getDevice(deviceId),
        getPostureData(deviceId),
        getStretchingRecommendation(deviceId),
    ]);

    return {
        device,
        postureData,
        stretchingRecommendation,
    };
}
