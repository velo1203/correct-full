"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PairingPage() {
    const router = useRouter();

    return (
        <div className="h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-4 pt-12 pb-3 bg-background animate-slide-down">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-lighter rounded-full active:scale-95 transition-all"
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-primary text-lg"
                    />
                </button>
                <h1 className="text-base font-semibold text-dark">페어링</h1>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-lighter rounded-full active:scale-95 transition-all">
                    <FontAwesomeIcon
                        icon={faGear}
                        className="text-gray text-lg"
                    />
                </button>
            </header>

            {/* Chair Image */}
            <div className="flex justify-center items-center py-6 animate-scale-in">
                <div className="w-40 h-40 bg-blue-light bg-opacity-40 rounded-lg flex items-center justify-center border border-border-light overflow-hidden p-4">
                    <Image
                        src="/chair.png"
                        alt="CORRECT 의자"
                        width={160}
                        height={160}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Content Section */}
            <main className="px-4 flex-1 animate-slide-up">
                <h2 className="text-lg font-semibold text-dark mb-3">페어링</h2>

                <div className="bg-white rounded-xl p-4 border border-border">
                    <h3 className="text-base font-semibold text-dark mb-3">
                        기기 페어링
                    </h3>

                    <div className="bg-blue-light bg-opacity-30 rounded-xl p-3 border border-blue-light border-opacity-50">
                        <div className="flex items-start">
                            <div>
                                <h4 className="text-sm font-semibold text-dark mb-1.5">
                                    블루투스 연결
                                </h4>
                                <p className="text-xs text-gray leading-relaxed">
                                    스마트폰의 설정에서 블루투스를 켠 뒤, 기기
                                    목록에서 기기를 선택하세요. 연결을 3초간
                                    눌러 페어링 모드로 진입하면, 스마트폰에서
                                    자동으로 감지됩니다. 연결 완료 후에는
                                    "연결됨" 메시지가 표시되며, 이후 기기를
                                    사용할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bluetooth Connect Button */}
                    <button className="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all mt-4">
                        블루투스 연결하기
                    </button>
                </div>
            </main>
        </div>
    );
}
