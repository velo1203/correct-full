"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ApiDocsPage() {
    const [selectedEndpoint, setSelectedEndpoint] = useState("device");
    const [apiKey, setApiKey] = useState(
        process.env.NEXT_PUBLIC_API_KEY || "hello"
    );
    const [deviceId, setDeviceId] = useState("1");
    const [testResult, setTestResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const endpoints = [
        {
            id: "device",
            name: "장치 업데이트",
            method: "PUT",
            path: "/device/{id}",
        },
        {
            id: "posture",
            name: "자세 데이터",
            method: "PUT",
            path: "/posture/{id}",
        },
        {
            id: "stretching",
            name: "스트레칭",
            method: "PUT",
            path: "/stretching/{id}",
        },
    ];

    const examplePayloads = {
        device: {
            battery_level: 85,
            is_active: true,
            status: "상태 청결중",
        },
        posture: {
            posture_score: "자세 좋음",
            statistics_hours: 3,
            chart_data: [40, 30, 50, 35, 60, 45, 70, 55, 40, 65],
        },
        stretching: {
            recommendation_text:
                "허리 통증 완화를 위해 아침 저녁으로 무릎 꿇어앉기 스트레칭을 10초씩 해보세요.",
            stretch_type: "무릎 꿇어앉기",
            duration_seconds: 10,
            frequency: "아침 저녁",
        },
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const testEndpoint = async () => {
        if (!apiKey) {
            alert("API 키를 입력하세요!");
            return;
        }

        setIsLoading(true);
        setTestResult(null);

        try {
            const response = await fetch(
                `/api/${selectedEndpoint}/${deviceId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": apiKey,
                    },
                    body: JSON.stringify(
                        examplePayloads[
                            selectedEndpoint as keyof typeof examplePayloads
                        ]
                    ),
                }
            );

            // JSON 파싱 전에 content-type 확인
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setTestResult({
                    status: response.status,
                    data,
                });
            } else {
                // HTML 또는 다른 형식이 반환된 경우
                const text = await response.text();
                setTestResult({
                    status: response.status,
                    data: {
                        error: "Invalid response format",
                        message:
                            "Server returned HTML instead of JSON. Please check environment variables.",
                        details: text.substring(0, 200) + "...",
                    },
                });
            }
        } catch (error: any) {
            setTestResult({
                status: 500,
                data: {
                    error: "Request failed",
                    message: error.message,
                    hint: "Please check if the server is running and environment variables are set correctly.",
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getCurlCommand = () => {
        const payload =
            examplePayloads[selectedEndpoint as keyof typeof examplePayloads];
        return `curl -X PUT http://localhost:3000/api/${selectedEndpoint}/${deviceId} \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${apiKey || "your-api-key-here"}" \\
  -d '${JSON.stringify(payload, null, 2)}'`;
    };

    const getJavaScriptCode = () => {
        const payload =
            examplePayloads[selectedEndpoint as keyof typeof examplePayloads];
        return `fetch('http://localhost:3000/api/${selectedEndpoint}/${deviceId}', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': '${apiKey || "your-api-key-here"}'
  },
  body: JSON.stringify(${JSON.stringify(payload, null, 2)})
})
.then(res => res.json())
.then(data => console.log(data));`;
    };

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-dark mb-2">
                        CORRECT API 문서
                    </h1>
                    <p className="text-gray">
                        하드웨어 팀이 사용할 API 엔드포인트 문서 및 테스트 도구
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: API 정보 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 인증 섹션 */}
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-semibold text-dark mb-4">
                                인증
                            </h2>
                            <p className="text-sm text-gray mb-4">
                                모든 API 요청은{" "}
                                <code className="bg-gray-lighter px-2 py-1 rounded text-primary">
                                    X-API-Key
                                </code>{" "}
                                헤더가 필요합니다.
                            </p>
                            <div className="bg-gray-lighter p-4 rounded-lg">
                                <code className="text-sm text-dark">
                                    X-API-Key: your-secret-api-key-here
                                </code>
                            </div>
                        </div>

                        {/* 엔드포인트 선택 */}
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-semibold text-dark mb-4">
                                API 엔드포인트
                            </h2>
                            <div className="space-y-3">
                                {endpoints.map((endpoint) => (
                                    <button
                                        key={endpoint.id}
                                        onClick={() =>
                                            setSelectedEndpoint(endpoint.id)
                                        }
                                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                                            selectedEndpoint === endpoint.id
                                                ? "border-primary bg-blue-light bg-opacity-20"
                                                : "border-border hover:border-primary"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded font-semibold mr-2">
                                                    {endpoint.method}
                                                </span>
                                                <span className="text-dark font-semibold">
                                                    {endpoint.name}
                                                </span>
                                            </div>
                                            <code className="text-sm text-gray">
                                                {endpoint.path}
                                            </code>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Request Body */}
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-semibold text-dark mb-4">
                                Request Body 예시
                            </h2>
                            <div className="bg-dark rounded-lg p-4 overflow-x-auto">
                                <pre className="text-sm text-white">
                                    {JSON.stringify(
                                        examplePayloads[
                                            selectedEndpoint as keyof typeof examplePayloads
                                        ],
                                        null,
                                        2
                                    )}
                                </pre>
                            </div>
                        </div>

                        {/* Code Examples */}
                        <div className="bg-white rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-semibold text-dark mb-4">
                                코드 예시
                            </h2>

                            {/* cURL */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-dark">
                                        cURL
                                    </h3>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(
                                                getCurlCommand(),
                                                "curl"
                                            )
                                        }
                                        className="text-sm text-primary hover:text-opacity-80 flex items-center"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                copiedCode === "curl"
                                                    ? faCheck
                                                    : faCopy
                                            }
                                            className="mr-1"
                                        />
                                        {copiedCode === "curl"
                                            ? "복사됨!"
                                            : "복사"}
                                    </button>
                                </div>
                                <div className="bg-dark rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-white">
                                        {getCurlCommand()}
                                    </pre>
                                </div>
                            </div>

                            {/* JavaScript */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-dark">
                                        JavaScript
                                    </h3>
                                    <button
                                        onClick={() =>
                                            copyToClipboard(
                                                getJavaScriptCode(),
                                                "js"
                                            )
                                        }
                                        className="text-sm text-primary hover:text-opacity-80 flex items-center"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                copiedCode === "js"
                                                    ? faCheck
                                                    : faCopy
                                            }
                                            className="mr-1"
                                        />
                                        {copiedCode === "js"
                                            ? "복사됨!"
                                            : "복사"}
                                    </button>
                                </div>
                                <div className="bg-dark rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-white">
                                        {getJavaScriptCode()}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: API 테스터 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 border border-border sticky top-8">
                            <h2 className="text-xl font-semibold text-dark mb-4">
                                API 테스터
                            </h2>

                            <div className="space-y-4">
                                {/* API Key Input */}
                                <div>
                                    <label className="block text-sm font-medium text-dark mb-2">
                                        API Key *
                                    </label>
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(e) =>
                                            setApiKey(e.target.value)
                                        }
                                        placeholder="your-secret-api-key"
                                        className="w-full px-4 py-3 bg-white rounded-lg text-sm border border-border focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Device ID Input */}
                                <div>
                                    <label className="block text-sm font-medium text-dark mb-2">
                                        Device ID
                                    </label>
                                    <input
                                        type="number"
                                        value={deviceId}
                                        onChange={(e) =>
                                            setDeviceId(e.target.value)
                                        }
                                        className="w-full px-4 py-3 bg-white rounded-lg text-sm border border-border focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Test Button */}
                                <button
                                    onClick={testEndpoint}
                                    disabled={isLoading}
                                    className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {isLoading ? "테스트 중..." : "API 테스트"}
                                </button>

                                {/* Test Result */}
                                {testResult && (
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-dark">
                                                응답
                                            </h3>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                                    testResult.status === 200
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {testResult.status}
                                            </span>
                                        </div>
                                        <div className="bg-gray-lighter rounded-lg p-4 overflow-x-auto">
                                            <pre className="text-xs text-dark">
                                                {JSON.stringify(
                                                    testResult.data,
                                                    null,
                                                    2
                                                )}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* API 필드 설명 */}
                <div className="mt-8 bg-white rounded-xl p-6 border border-border">
                    <h2 className="text-xl font-semibold text-dark mb-4">
                        필드 설명
                    </h2>

                    {selectedEndpoint === "device" && (
                        <div className="space-y-3">
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    battery_level
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    배터리 잔량 (0-100)
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    is_active
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    활성화 상태 (true/false)
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    status
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    상태 메시지 (문자열)
                                </p>
                            </div>
                        </div>
                    )}

                    {selectedEndpoint === "posture" && (
                        <div className="space-y-3">
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    posture_score
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    자세 평가 ("자세 좋음", "자세 나쁨" 등)
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    statistics_hours
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    통계 시간 (시간 단위)
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    chart_data
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    차트 데이터 배열 (0-100 사이의 숫자 10개)
                                </p>
                            </div>
                        </div>
                    )}

                    {selectedEndpoint === "stretching" && (
                        <div className="space-y-3">
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    recommendation_text
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    추천 메시지 전체 텍스트
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    stretch_type
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    스트레칭 종류
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    duration_seconds
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    지속 시간 (초 단위)
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <code className="font-semibold text-dark">
                                    frequency
                                </code>
                                <p className="text-sm text-gray mt-1">
                                    빈도 ("아침 저녁" 등)
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
