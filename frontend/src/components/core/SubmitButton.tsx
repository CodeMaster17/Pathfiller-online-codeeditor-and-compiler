import React from 'react';
import ButtonCustom from '../ButtonCustom/ButtonCustom';

interface SubmitButtonProps {
    isLoading: boolean;
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, onClick }) => {
    return (
        <ButtonCustom
            className='h-8 rounded-lg text-xs'
            onClick={onClick}
        // disabled={isLoading}
        >
            {isLoading ? "Running..." : "Run Code"}
        </ButtonCustom>
    );
};

export default SubmitButton;
