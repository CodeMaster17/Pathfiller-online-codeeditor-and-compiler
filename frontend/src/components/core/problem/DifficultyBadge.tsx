type Difficulty = 'easy' | 'medium' | 'hard';


const difficultyColors: Record<Difficulty, { bg: string; text: string }> = {
    easy: { bg: 'bg-emerald-900/30', text: 'text-emerald-400' },
    medium: { bg: 'bg-amber-900/30', text: 'text-amber-400' },
    hard: { bg: 'bg-rose-900/30', text: 'text-rose-400' }
};

interface DifficultyBadgeProps {
    difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
    const colors = difficultyColors[difficulty];

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize 
        ${colors.bg} ${colors.text}`}

        >
            {difficulty}
        </span>
    );
}