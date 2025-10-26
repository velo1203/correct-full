"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBatteryThreeQuarters,
    faChevronLeft,
    faGear,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    getDeviceFullData,
    Device,
    PostureData,
    StretchingRecommendation,
} from "@/lib/supabase";

// Battery Card Component
const BatteryCard = ({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon?: React.ReactNode;
}) => (
    <div className="bg-white rounded-xl p-4 border border-border flex items-center justify-between hover:border-primary hover:ring-2 hover:ring-primary hover:ring-opacity-10 transition-all">
        <div>
            <p className="text-xs text-gray mb-1">{label}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
        {icon && <div>{icon}</div>}
    </div>
);

// Toggle Switch Component
const ToggleSwitch = ({
    enabled,
    onClick,
}: {
    enabled: boolean;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={`w-16 h-8 rounded-full relative transition-colors active:scale-95 ${
            enabled ? "bg-primary" : "bg-gray-light"
        }`}
    >
        <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                enabled ? "right-1" : "left-1"
            }`}
        ></div>
    </button>
);

// Chart Component
const PostureChart = ({ chartData }: { chartData: number[] }) => {
    return (
        <div className="h-32 bg-blue-light bg-opacity-20 rounded-lg flex items-end justify-around px-3 pb-3 relative border border-border-light">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-border-light"></div>
                ))}
            </div>

            {/* Chart bars */}
            {chartData.map((height, index) => (
                <div
                    key={index}
                    className="w-1.5 bg-primary rounded-t relative transition-all hover:bg-opacity-80 animate-slide-up"
                    style={{
                        height: `${height}%`,
                        animationDelay: `${index * 0.05}s`,
                    }}
                ></div>
            ))}
        </div>
    );
};

// Section Component
const Section = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section className="animate-slide-up">
        <h2 className="text-lg font-semibold text-dark mb-2.5">{title}</h2>
        {children}
    </section>
);

export default function DeviceDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const [device, setDevice] = useState<Device | null>(null);
    const [postureData, setPostureData] = useState<PostureData | null>(null);
    const [stretching, setStretching] =
        useState<StretchingRecommendation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const deviceId = parseInt(params.id);
                const data = await getDeviceFullData(deviceId);
                setDevice(data.device);
                setPostureData(data.postureData);
                setStretching(data.stretchingRecommendation);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [params.id]);

    // 자세 데이터 새로고침
    const handleRefreshPosture = async () => {
        setRefreshing(true);
        try {
            const response = await fetch(`/api/posture/${params.id}`);
            const result = await response.json();
            if (result.success && result.data) {
                setPostureData(result.data);
            }
        } catch (err) {
            console.error("Failed to refresh posture data:", err);
        } finally {
            setRefreshing(false);
        }
    };

    // 장치 ON/OFF 토글
    const handleToggleDevice = async () => {
        if (!device) return;

        const newActiveState = !device.is_active;

        // 낙관적 업데이트
        setDevice({ ...device, is_active: newActiveState });

        try {
            const response = await fetch(`/api/device/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": "hello",
                },
                body: JSON.stringify({
                    is_active: newActiveState,
                }),
            });

            const result = await response.json();

            if (!result.success) {
                // 실패 시 원래 상태로 되돌림
                setDevice({ ...device, is_active: !newActiveState });
                alert("상태 변경에 실패했습니다.");
            }
        } catch (err) {
            // 에러 시 원래 상태로 되돌림
            setDevice({ ...device, is_active: !newActiveState });
            console.error("Failed to toggle device:", err);
            alert("상태 변경에 실패했습니다.");
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-background flex items-center justify-center">
                <p className="text-gray">로딩 중...</p>
            </div>
        );
    }

    if (error || !device || !postureData || !stretching) {
        return (
            <div className="h-screen bg-background flex items-center justify-center">
                <p className="text-red-500">
                    오류: 데이터를 불러올 수 없습니다
                </p>
            </div>
        );
    }

    return (
        <div className="h-screen bg-background flex flex-col overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between px-4 pt-12 pb-3 bg-background sticky top-0 z-10 animate-slide-down">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-lighter rounded-full active:scale-95 transition-all"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-primary text-lg"
                    />
                </button>
                <h1 className="text-base font-semibold text-dark">내 교정기</h1>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-lighter rounded-full active:scale-95 transition-all">
                    <FontAwesomeIcon
                        icon={faGear}
                        className="text-gray text-lg"
                    />
                </button>
            </header>

            {/* Chair Image */}
            <div className="flex justify-center items-center py-5 animate-scale-in">
                <div className="w-36 h-36 bg-blue-light bg-opacity-40 rounded-lg flex items-center justify-center border border-border-light overflow-hidden p-3">
                    <Image
                        src="/chair.png"
                        alt="CORRECT 의자"
                        width={144}
                        height={144}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Content */}
            <main className="px-4 pb-6 space-y-4">
                {/* Battery Section */}
                <Section title="배터리">
                    <div className="space-y-2.5">
                        <BatteryCard
                            label="배터리 충전"
                            value={`${device.battery_level}%`}
                            icon={
                                <div className="w-14 h-14 bg-blue-light bg-opacity-40 rounded-lg flex items-center justify-center border border-border-light">
                                    <FontAwesomeIcon
                                        icon={faBatteryThreeQuarters}
                                        className="text-primary text-lg"
                                    />
                                </div>
                            }
                        />

                        <BatteryCard
                            label="활성상태"
                            value={device.is_active ? "ON" : "OFF"}
                            icon={
                                <ToggleSwitch
                                    enabled={device.is_active}
                                    onClick={handleToggleDevice}
                                />
                            }
                        />
                    </div>
                </Section>

                {/* Posture Section */}
                <Section title="자세">
                    <div className="bg-white rounded-xl p-4 border border-border">
                        <p className="text-xs text-gray mb-0.5">
                            {postureData.statistics_hours}시간 통계
                        </p>
                        <p className="text-2xl font-bold text-primary mb-4">
                            {postureData.posture_score}
                        </p>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray">
                                    자세 상태 기록
                                </p>
                                <button
                                    onClick={handleRefreshPosture}
                                    disabled={refreshing}
                                    className={`w-7 h-7 flex items-center justify-center hover:bg-blue-light hover:bg-opacity-30 rounded-full active:scale-95 transition-all ${
                                        refreshing ? "animate-spin" : ""
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={faRotateRight}
                                        className="text-primary text-xs"
                                    />
                                </button>
                            </div>

                            <PostureChart chartData={postureData.chart_data} />
                        </div>
                    </div>
                </Section>

                {/* Stretching Section */}
                <Section title="스트레칭">
                    <div className="bg-white rounded-xl p-4 border border-border">
                        <p className="text-xs text-gray leading-relaxed">
                            {stretching.recommendation_text}
                        </p>
                    </div>
                </Section>
            </main>
        </div>
    );
}
