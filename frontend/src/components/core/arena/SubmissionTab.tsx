
import InformationText from '../InformationText'

const SubmissionTab = ({ submission }: { submission: string }) => {
    return (
        <>{submission.length > 0 ? submission :
            <div className="p-2">
                <InformationText message="Feature coming soon!" />
            </div>
        }</>
    )
}

export default SubmissionTab