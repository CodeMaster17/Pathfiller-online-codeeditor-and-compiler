import { AlertCircle, HomeIcon } from "lucide-react"


const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080D27] text-white">
            <div className="w-full max-w-2xl px-4 py-8 text-center">
                <div className="relative">
                    {/* Abstract Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute transform rotate-45 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl -top-48 -left-48"></div>
                        <div className="absolute transform -rotate-45 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl -bottom-48 -right-48"></div>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10">
                        <div className="mb-8 flex justify-center">
                            <AlertCircle className="w-24 h-24 text-purple-400" />
                        </div>

                        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                            404
                        </h1>

                        <h2 className="text-3xl font-semibold mb-6 text-gray-200">
                            Page Not Found
                        </h2>

                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            The page you're looking for doesn't exist or has been moved.
                            Let's get you back on track.
                        </p>

                        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium transition-transform hover:scale-105 hover:shadow-lg">
                            <HomeIcon className="w-5 h-5" />
                            Back to Home
                        </a>
                    </div>
                </div>

                {/* Decorative Image */}
                <img
                    src="https://images.unsplash.com/photo-1534996858221-380b92700493?auto=format&fit=crop&w=800&q=80"
                    alt="Space background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none"
                />
            </div>
        </div>
    )
}

export default NotFound