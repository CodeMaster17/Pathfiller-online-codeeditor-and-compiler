import { Play } from 'lucide-react';
import React from 'react';

interface SubmitButtonProps {
    isLoading: boolean;
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, onClick }) => {
    return (
        <button onClick={onClick} className='text-xs flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors'>
            <Play size={16} className="mr-2" />
            {isLoading ? 'Running...' : 'Run Code'}
        </button>
    );
};

export default SubmitButton;
