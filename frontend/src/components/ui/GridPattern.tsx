import GridPattern from '../magicui/grid-pattern';
import { cn } from '@/lib/utils';
const GridPatternSquares = () => {
    return (
        <GridPattern
            squares={[
                [4, 4],
                [5, 1],
                [8, 2],
                [5, 3],
                [5, 5],
                [10, 10],
                [12, 15],
                [15, 10],
                [10, 15],
                [15, 10],
                [10, 15],
                [15, 10],
            ]}
            className={cn(
                "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
            )}
        />
    )
}

export default GridPatternSquares