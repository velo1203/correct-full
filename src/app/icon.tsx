import { ImageResponse } from "next/og";

// 파비콘 메타데이터
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// 파비콘 생성
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 20,
                    background: "#156BFF",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "6px",
                }}
            >
                🪑
            </div>
        ),
        {
            ...size,
        }
    );
}

