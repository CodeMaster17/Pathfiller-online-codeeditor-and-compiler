
const categoryColors: Record<string, { bg: string; text: string }> = {
    'Arrays': { bg: 'bg-blue-900/30', text: 'text-blue-400' },
    'Design': { bg: 'bg-purple-900/30', text: 'text-purple-400' },
    'Stack': { bg: 'bg-indigo-900/30', text: 'text-indigo-400' },
    'Dynamic Programming': { bg: 'bg-cyan-900/30', text: 'text-cyan-400' },
    'default': { bg: 'bg-gray-900/30', text: 'text-gray-400' }
};

interface CategoryBadgeProps {
    category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
    const colors = categoryColors[category] || categoryColors.default;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}