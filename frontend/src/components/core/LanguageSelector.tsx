import React from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='rounded-[5px] h-8 w-36 border-2 border-slate-400 bg-opacity-[.15] bg-white text-white flex justify-between items-center'>
                    <p>
                        {selectedLanguage}
                    </p>
                    <ChevronDown size="20" />
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                <DropdownMenuCheckboxItem
                    checked={selectedLanguage === "C++"}
                    onCheckedChange={() => onLanguageChange("C++")}
                >
                    C++
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={selectedLanguage === "python"}
                    onCheckedChange={() => onLanguageChange("python")}
                >
                    Python
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
