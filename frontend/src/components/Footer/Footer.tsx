
import { DEVELOPER_GITHUB_LINK, DEVELOPER_INSTAGRAM_LINK, DEVELOPER_LINKEDIN_LINK } from '@/constants/externalLinks';
import { Heart } from 'lucide-react';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Instagram } from 'lucide-react';

const socialLinks = [
  {
    id: 1,
    name: 'GitHub',
    link: DEVELOPER_GITHUB_LINK,
    icon: <Github />,
  },
  {
    id: 2,
    name: 'LinkedIn',
    link: DEVELOPER_LINKEDIN_LINK,
    icon: <Linkedin />,
  },
  {
    id: 3,
    name: 'Instagram',
    link: DEVELOPER_INSTAGRAM_LINK,
    icon: <Instagram />,
  },
]

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font body-font bg-black">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-dark-yellow rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl text-white">Pathfiller</span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 flex gap-2">
          Made with
          <span>
            <Heart color="rgb(255 192 30)" />
          </span>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          {socialLinks.map((link) => (
            <>
              <a key={link.id} className=" ml-3 text-gray-500" href={link.link}>
                {link.icon}
              </a>
            </>
          ))}
        </span>
      </div>
    </footer>
  )
}

export default Footer