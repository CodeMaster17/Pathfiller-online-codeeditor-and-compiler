
export function BackgroundPattern() {
    return (
        <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl -top-48 -left-48"></div>
            <div className="absolute transform -rotate-45 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl -bottom-48 -right-48"></div>
        </div>
    );
}