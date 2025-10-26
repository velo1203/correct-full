import { ImageResponse } from "next/og";

// Apple Touch Icon 메타데이터
export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

// Apple Touch Icon 생성
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 100,
                    background: "#156BFF",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
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

