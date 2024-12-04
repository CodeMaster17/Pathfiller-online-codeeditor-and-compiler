import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
}

export function AuthButton({
    children,
    isLoading,
    variant = 'primary',
    ...props
}: AuthButtonProps) {
    const baseStyles = "w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center";

    const variants = {
        primary: "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600",
        secondary: "bg-[#0F1839] text-gray-300 border border-gray-700 hover:bg-[#131D4A]"
    };

    return (
        <button
            {...props}
            className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : children}
        </button>
    );
}