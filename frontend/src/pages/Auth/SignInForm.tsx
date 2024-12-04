import React, { useState } from 'react';
import { AuthButton } from './AuthButton';
import { AuthInput } from './AuthInput';
import { AuthLayout } from './AuthLayout';

export function SignInForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your account to continue"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <AuthInput
                    label="Email address"
                    type="email"
                    placeholder="Enter your email"
                    required
                    error={errors.email}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    error={errors.password}
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-700 bg-[#0F1839] text-purple-500 focus:ring-purple-500/20"
                        />
                        <span className="ml-2 text-sm text-gray-400">Remember me</span>
                    </label>

                    <a href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                        Forgot password?
                    </a>
                </div>

                <AuthButton type="submit" isLoading={isLoading}>
                    Sign in
                </AuthButton>

                <div className="text-center">
                    <span className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-purple-400 hover:text-purple-300">
                            Sign up
                        </a>
                    </span>
                </div>
            </form>
        </AuthLayout>
    );
}