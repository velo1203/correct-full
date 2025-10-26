"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        router.push("/devices");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background px-5">
            <div className="w-full max-w-sm animate-slide-up">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-primary text-center mb-2">
                        Welcome
                    </h1>
                    <p className="text-gray text-center text-sm">
                        코렉트에 로그인 해주세요
                    </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-2 mb-5">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-4 py-4 bg-white rounded-xl text-sm placeholder-gray-light border border-border focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none transition-all"
                    />
                    <input
                        type="password"
                        placeholder="패스워드"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 bg-white rounded-xl text-sm placeholder-gray-light border border-border focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:outline-none transition-all"
                    />
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full py-3.5 bg-primary text-white rounded-xl text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                    로그인
                </button>
            </div>
        </div>
    );
}
