"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/login");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background animate-fade-in">
            <h1 className="text-5xl font-bold text-primary tracking-wider mb-3 animate-scale-in">
                CORRECT
            </h1>
            <p className="text-gray text-lg animate-slide-up">
                최고의 자세를 만들다
            </p>
        </div>
    );
}
