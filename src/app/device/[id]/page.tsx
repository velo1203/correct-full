"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBatteryThreeQuarters,
    faChevronLeft,
    faGear,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

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
            <p className="text-sm text-gray mb-1">{label}</p>
            <p className="text-xl font-bold text-primary">{value}</p>
        </div>
        {icon && <div>{icon}</div>}
    </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ enabled }: { enabled: boolean }) => (
    <div
        className={`w-16 h-8 rounded-full relative transition-colors ${
            enabled ? "bg-primary" : "bg-gray-light"
        }`}
    >
        <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                enabled ? "right-1" : "left-1"
            }`}
        ></div>
    </div>
);

const PostureChart = () => {
    const chartData = [40, 30, 50, 35, 60, 45, 70, 55, 40, 65];

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

export default function DeviceDetailPage() {
    const router = useRouter();

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
                            value="84%"
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
                            value="ON"
                            icon={<ToggleSwitch enabled={true} />}
                        />
                    </div>
                </Section>

                <Section title="자세">
                    <div className="bg-white rounded-xl p-4 border border-border">
                        <p className="text-xs text-gray mb-0.5">3시간 통계</p>
                        <p className="text-xl font-bold text-primary mb-4">
                            자세 종음
                        </p>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray">
                                    자세 상태 기록
                                </p>
                                <button className="w-7 h-7 flex items-center justify-center hover:bg-blue-light hover:bg-opacity-30 rounded-full active:scale-95 transition-all">
                                    <FontAwesomeIcon
                                        icon={faRotateRight}
                                        className="text-primary text-xs"
                                    />
                                </button>
                            </div>

                            <PostureChart />
                        </div>
                    </div>
                </Section>

                <Section title="스트레칭">
                    <div className="bg-white rounded-xl p-4 border border-border">
                        <p className="text-sm text-gray leading-relaxed">
                            허리 통증 완화를 위해 아침 저녁으로{" "}
                            <span className="text-primary font-semibold">
                                무릎 꿇어앉기
                            </span>{" "}
                            스트레칭을 10초씩 해보세요.
                        </p>
                    </div>
                </Section>
            </main>
        </div>
    );
}
