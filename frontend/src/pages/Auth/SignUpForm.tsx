import React, { useState } from 'react';
import { AuthButton } from './AuthButton';
import { AuthInput } from './AuthInput';
import { AuthLayout } from './AuthLayout';


export function SignUpForm() {
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
            title="Create an account"
            subtitle="Join us to start solving problems"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <AuthInput
                        label="First name"
                        type="text"
                        placeholder="John"
                        required
                        error={errors.firstName}
                    />
                    <AuthInput
                        label="Last name"
                        type="text"
                        placeholder="Doe"
                        required
                        error={errors.lastName}
                    />
                </div>

                <AuthInput
                    label="Email address"
                    type="email"
                    placeholder="john@example.com"
                    required
                    error={errors.email}
                />

                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    required
                    error={errors.password}
                />

                <AuthInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    error={errors.confirmPassword}
                />

                <div className="flex items-start">
                    <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded border-gray-700 bg-[#0F1839] text-purple-500 focus:ring-purple-500/20"
                        required
                    />
                    <span className="ml-2 text-sm text-gray-400">
                        I agree to the{' '}
                        <a href="/terms" className="text-purple-400 hover:text-purple-300">
                            Terms of Service
                        </a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-purple-400 hover:text-purple-300">
                            Privacy Policy
                        </a>
                    </span>
                </div>

                <AuthButton type="submit" isLoading={isLoading}>
                    Create account
                </AuthButton>

                <div className="text-center">
                    <span className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <a href="/signin" className="text-purple-400 hover:text-purple-300">
                            Sign in
                        </a>
                    </span>
                </div>
            </form>
        </AuthLayout>
    );
}