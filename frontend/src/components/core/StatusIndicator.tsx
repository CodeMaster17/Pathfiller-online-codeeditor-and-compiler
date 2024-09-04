import { ERROR_STATUS, PENDING_STATUS, SUCCESS_STATUS, TIMELIMIT_EXCEEDED_STATUS } from "@/constants/statusConstants";

interface StatusIndicatorProps {
    status: string | null;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => (
    <div className="p-4">
        <span className={
            status === SUCCESS_STATUS ? 'dark-green-s' :
                status === 'Error! Please retry' ? 'dark-pink' :
                    status === ERROR_STATUS ? 'dark-pink' :
                        status === TIMELIMIT_EXCEEDED_STATUS ? 'dark-pink' :
                            status === PENDING_STATUS ? 'brand-orange-s' :
                                'status'
        }>
            {status}
        </span>
    </div>
);

export default StatusIndicator;
