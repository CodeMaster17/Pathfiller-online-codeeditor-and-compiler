import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="max-h-screen flex items-center justify-center bg-[#080D27] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 relative">
                {/* Abstract Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute transform rotate-45 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl -top-48 -left-48"></div>
                    <div className="absolute transform -rotate-45 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl -bottom-48 -right-48"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">{title}</h2>
                        <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
                    </div>

                    <div className="mt-8 bg-[#0C1332] p-8 rounded-lg border border-gray-700 shadow-xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}