"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface Device {
    id: number;
    name: string;
    battery: number;
    status: string;
    statusColor: string;
}

const DeviceCard = ({
    device,
    onClick,
}: {
    device: Device;
    onClick: () => void;
}) => {
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
                            className={
                                device.battery < 30
                                    ? "text-red-500 font-medium"
                                    : "text-primary font-medium"
                            }
                        >
                            {device.battery}%
                        </span>
                    </p>
                    <p className={`text-xs font-medium ${device.statusColor}`}>
                        {device.status}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function DevicesPage() {
    const router = useRouter();

    const devices: Device[] = [
        {
            id: 1,
            name: "CORRECT 모델1",
            battery: 84,
            status: "상태 청결중",
            statusColor: "text-primary",
        },
        {
            id: 2,
            name: "CORRECT 모델2",
            battery: 23,
            status: "상태 점검",
            statusColor: "text-red-500",
        },
    ];

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
            <footer className="px-4 pb-6 pt-3 bg-background">
                <button
                    onClick={() => router.push("/pairing")}
                    className="w-full py-3.5 bg-secondary text-white rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                    기기 추가하기
                </button>
            </footer>
        </div>
    );
}
