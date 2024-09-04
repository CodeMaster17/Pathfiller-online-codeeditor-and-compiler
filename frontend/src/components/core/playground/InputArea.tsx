import React from 'react'

const InputArea: React.FC<{ inputValue: string; onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ inputValue, onInputChange }) => (
    <textarea
        className="w-full h-40 p-2 mt-2 text-white bg-dark-layer-2 border-slate-600 rounded"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Enter your input here..."
    />
);

export default InputArea