import { Skeleton } from "@/components/ui/skeleton";

const LoadingProblems = () => {

    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <div className="flex flex-col w-full justify-center items-center gap-3">
            {numbers.map((number) => {
                return (
                    <Skeleton key={number} className="w-full h-10 rounded-xl bg-muted-foreground" />

                )
            })}
        </div>
    )
}

export default LoadingProblems