import Logo from "@/components/Logo"
import { BackgroundPattern } from "./BackgroundPattern"

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-[#080D27] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl relative">
                <BackgroundPattern />

                {/* Content */}
                <div className="relative z-10 text-center space-y-8 py-12">
                    {/* Logo */}
                    <Logo variant={"large"} />

                    {/* Main Text */}
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                            Something amazing is coming
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto px-4">
                            We're working hard to bring you a new way to learn and practice coding.
                            Join our waitlist to be the first to know when we launch.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon