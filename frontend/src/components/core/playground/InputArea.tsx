import React from 'react'

const InputArea: React.FC<{ inputValue: string; onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ inputValue, onInputChange }) => (
    <textarea
        className="w-full h-full p-2 mt-2 text-white bg-s1 border-slate-600 rounded focus:border-none active:border-none"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Enter your inputs here..."
    />
);

export default InputArea