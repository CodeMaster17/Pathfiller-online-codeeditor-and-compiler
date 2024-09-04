import React from 'react';
import { Button } from '../ui/button';

interface SubmitButtonProps {
    isLoading: boolean;
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, onClick }) => {
    return (
        <Button
            className='bg-green-600 text-base'
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? "Running..." : "Submit"}
        </Button>
    );
};

export default SubmitButton;
