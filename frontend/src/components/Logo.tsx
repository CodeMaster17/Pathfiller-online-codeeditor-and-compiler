interface ILogoProps {
    variant: "small" | "medium" | "large"
}
const Logo = ({ variant }: ILogoProps) => {
    if (variant === "small") {
        return (

            <h1 className="text-4xl sm:text-5xl md:text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                    Pathfiller
                </span>
            </h1>

        )
    }
    else if (variant === "medium") {
        return (
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        Pathfiller
                    </span>
                </h1>
            </div>
        )
    }
    if (variant === "large") {
        return (
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        Pathfiller
                    </span>
                </h1>
            </div>
        )
    }
}

export default Logo