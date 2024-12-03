import { RefreshCw, ServerCrash } from 'lucide-react';

export function ServerError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080D27] text-white">
            <div className="w-full max-w-2xl px-4 py-8 text-center">
                <div className="relative">
                    {/* Abstract Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute transform rotate-45 w-96 h-96 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full blur-3xl -top-48 -left-48"></div>
                        <div className="absolute transform -rotate-45 w-96 h-96 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-3xl -bottom-48 -right-48"></div>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10">
                        <div className="mb-8 flex justify-center">
                            <ServerCrash className="w-24 h-24 text-rose-400" />
                        </div>

                        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-purple-400 text-transparent bg-clip-text">
                            500
                        </h1>

                        <h2 className="text-3xl font-semibold mb-6 text-gray-200">
                            Server Error
                        </h2>

                        <p className="text-gray-400 mb-4 max-w-md mx-auto">
                            Oops! Something went wrong on our servers.
                            We're working to fix the issue.
                        </p>

                        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
                            Error ID: {crypto.randomUUID().split('-')[0]}
                        </p>

                        <div className="flex gap-4 justify-center">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg font-medium transition-transform hover:scale-105 hover:shadow-lg"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Try Again
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative Image */}
                <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                    alt="Space background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none"
                />
            </div>
        </div>
    );
}