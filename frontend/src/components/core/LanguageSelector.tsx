import React from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { LANGUAGE_CONFIG_CONSTANT } from '@/constants/languageConstants';


interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='rounded-[5px] h-8 w-36 border-2 border-slate-400 bg-opacity-[.15] bg-white text-white flex justify-between items-center'>
                    <p className='uppercase'>
                        {selectedLanguage}
                    </p>
                    <ChevronDown size="20" />
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
                {Object.values(LANGUAGE_CONFIG_CONSTANT).map((lang) => (
                    <DropdownMenuCheckboxItem
                        key={lang.id}
                        checked={selectedLanguage === lang.id}
                        onCheckedChange={() => onLanguageChange(lang.id)}
                    >
                        <img src={lang.logoPath} alt={lang.label} className='size-4' />
                        &nbsp;
                        {lang.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    );
};

export default LanguageSelector;
