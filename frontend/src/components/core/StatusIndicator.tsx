
interface StatusIndicatorProps {
    status: string;
}
const StatusColors: Record<string, { bg: string; text: string }> = {
    'Success': { bg: 'bg-green-900/30', text: 'text-green-400' },
    'Error': { bg: 'bg-red-900/30', text: 'text-red-400' },
    'pending': { bg: 'bg-indigo-900/30', text: 'text-indigo-400' },
    'timelimit exceeded': { bg: 'bg-cyan-900/30', text: 'text-cyan-400' },
    'default': { bg: 'bg-gray-900/30', text: 'text-gray-400' }
};
const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    const colors = StatusColors[status] || StatusColors.default;
    return (
        <div className="px-4 mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                {status}
            </span>
        </div>
    )
};

export default StatusIndicator;
