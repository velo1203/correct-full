import { ImageResponse } from "next/og";

// 이미지 메타데이터
export const alt = "CORRECT - 최고의 자세를 반듯다";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// 이미지 생성
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: "linear-gradient(135deg, #156BFF 0%, #0A4FCC 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "sans-serif",
                    position: "relative",
                }}
            >
                {/* 배경 장식 */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        transform: "translate(30%, -30%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        transform: "translate(-30%, 30%)",
                    }}
                />

                {/* 로고/타이틀 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                    }}
                >
                    {/* 아이콘 (의자 이모지) */}
                    <div
                        style={{
                            fontSize: 200,
                            marginBottom: 30,
                        }}
                    >
                        🪑
                    </div>

                    {/* 메인 타이틀 */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: "bold",
                            marginBottom: 20,
                            letterSpacing: "-2px",
                        }}
                    >
                        CORRECT
                    </div>

                    {/* 서브 타이틀 */}
                    <div
                        style={{
                            fontSize: 40,
                            fontWeight: "normal",
                            opacity: 0.9,
                        }}
                    >
                        최고의 자세를 반듯다
                    </div>
                </div>

                {/* 하단 태그라인 */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 60,
                        fontSize: 30,
                        opacity: 0.8,
                    }}
                >
                    자세 교정 스마트 의자
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

