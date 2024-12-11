import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { DEVELOPER_GITHUB_LINK, DEVELOPER_LINKEDIN_LINK, DEVELOPER_TWITTER_LINK } from '@/constants/externalLinks';

interface SocialIconProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

function SocialIcon({ href, icon, label }: SocialIconProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r from-purple-500/10 to-blue-500/10 group"
            aria-label={label}
        >
            <div className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-black group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text ">
                {icon}
            </div>
        </a>
    );
}

export function SocialIcons() {
    const socials = [
        {
            href: DEVELOPER_TWITTER_LINK,
            icon: <Twitter strokeWidth={1.5} />,
            label: 'Twitter'
        },
        {
            href: DEVELOPER_LINKEDIN_LINK,
            icon: <Linkedin strokeWidth={1.5} />,
            label: 'LinkedIn'
        },
        {
            href: DEVELOPER_GITHUB_LINK,
            icon: <Github strokeWidth={1.5} />,
            label: 'GitHub'
        }
    ];

    return (
        <div className="flex items-center gap-2">
            {socials.map((social) => (
                <SocialIcon key={social.label} {...social} />
            ))}
        </div>
    );
}