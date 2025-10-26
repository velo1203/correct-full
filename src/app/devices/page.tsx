"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllDevices, Device } from "@/lib/supabase";

const DeviceCard = ({
    device,
    onClick,
}: {
    device: Device;
    onClick: () => void;
}) => {
    const getBatteryColor = (battery: number) => {
        if (battery < 30) return "text-red-500";
        return "text-primary";
    };

    const getStatusColor = (status: string) => {
        if (status.includes("점검")) return "text-red-500";
        return "text-primary";
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl p-4 border border-border hover:border-primary hover:ring-2 hover:ring-primary hover:ring-opacity-10 active:scale-[0.98] transition-all cursor-pointer animate-slide-up"
        >
            <div className="flex items-center">
                {/* Device Image */}
                <div className="w-20 h-20 bg-blue-light bg-opacity-40 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 border border-border-light overflow-hidden">
                    <Image
                        src="/chair.png"
                        alt="CORRECT 의자"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                </div>

                {/* Device Info */}
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-dark mb-1.5">
                        {device.name}
                    </h3>
                    <p className="text-xs text-gray mb-0.5">
                        배터리 충전{" "}
                        <span
                            className={`${getBatteryColor(
                                device.battery_level
                            )} font-medium`}
                        >
                            {device.battery_level}%
                        </span>
                    </p>
                    <p
                        className={`text-xs font-medium ${getStatusColor(
                            device.status
                        )}`}
                    >
                        {device.status}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function DevicesPage() {
    const router = useRouter();
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadDevices() {
            try {
                const data = await getAllDevices();
                setDevices(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadDevices();
    }, []);

    if (loading) {
        return (
            <div className="h-screen bg-background flex items-center justify-center">
                <p className="text-gray">로딩 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen bg-background flex items-center justify-center">
                <p className="text-red-500">오류: {error}</p>
            </div>
        );
    }

    return (
        <div className="h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-center px-4 pt-12 pb-3 bg-background">
                <h1 className="text-base font-semibold text-dark">내 장치들</h1>
            </header>

            {/* Device List */}
            <main className="px-4 pt-2 flex-1 space-y-2.5 overflow-y-auto">
                {devices.map((device, index) => (
                    <div
                        key={device.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <DeviceCard
                            device={device}
                            onClick={() => router.push(`/device/${device.id}`)}
                        />
                    </div>
                ))}
            </main>

            {/* Add Device Button */}
            <footer className="px-4 pb-6 pt-3 bg-background space-y-2">
                <button
                    onClick={() => router.push("/pairing")}
                    className="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                    기기 추가하기
                </button>
            </footer>
        </div>
    );
}
