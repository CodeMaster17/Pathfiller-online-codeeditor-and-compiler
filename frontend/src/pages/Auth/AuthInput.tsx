import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function AuthInput({ label, error, ...props }: AuthInputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <input
                {...props}
                className={`
          w-full px-3 py-2 bg-[#0F1839] border rounded-lg 
          focus:ring-2 focus:outline-none transition-colors
          text-gray-200 placeholder-gray-500
          ${error
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500/20'
                    }
        `}
            />
            {error && (
                <p className="text-sm text-rose-500">{error}</p>
            )}
        </div>
    );
}