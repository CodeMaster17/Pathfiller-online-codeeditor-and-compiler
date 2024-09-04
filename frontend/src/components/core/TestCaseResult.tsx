import { SUCCESS_STATUS } from '@/constants/statusConstants';
import { IMismatch } from '@/types/types';

interface TestCaseResultsProps {
    mismatchesData: IMismatch[];
    status: string | null;
}

const TestCaseResults: React.FC<TestCaseResultsProps> = ({ mismatchesData, status }) => (
    <div className="p-5">
        {mismatchesData.length > 0 ? (
            <div className='flex gap-8'>
                {mismatchesData.map((item) => (
                    <div key={item._id} className="text-white bg-gray-800 p-4 rounded mt-4">
                        <p>Input: {item.input}</p>
                        <p>Expected Output: {item.expectedOutput}</p>
                        <p>Actual Output: {item.actualOutput}</p>
                    </div>
                ))}
            </div>
        ) : (
            status === SUCCESS_STATUS && (
                <div className="text-white bg-gray-800 p-4 rounded mt-4">
                    All test cases passed
                </div>
            )
        )}
    </div>
);

export default TestCaseResults;
