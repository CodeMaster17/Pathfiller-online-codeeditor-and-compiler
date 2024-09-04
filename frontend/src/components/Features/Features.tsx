import { Gamepad2, Code, Swords } from 'lucide-react';

const features = [
    {
        name: 'Code Arena',
        description:
            'A platform for users to enhance coding skills by solving diverse problems with descriptions, constraints, and test cases.',
        icon: <Code className='absolute left-1 top-1 h-5 w-5 text-brand-orange' />,
    },
    {
        name: 'Code Playground',
        description: 'A platform for writing and executing code with real-time feedback and performance metrics.',
        icon: <Gamepad2 className='absolute left-1 top-1 h-5 w-5 text-brand-orange' />,
    },
    {
        name: 'Code Battleground',
        description: 'A feature for users to join contests, view leaderboards, and host their own',
        icon: <Swords className='absolute left-1 top-1 h-5 w-5 text-brand-orange' />
    },
]

export default function Features() {
    return (
        <div className="overflow-hidden bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-dark-yellow">Keep coding</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Become better with every code</p>
                            <p className="mt-6 text-lg leading-8 text-gray-200">
                                Unlock powerful tools to elevate your coding journey. Overcome challenges, enhance your skills.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-brand-orange">
                                            {feature.icon}
                                            {feature.name}:
                                        </dt>{' '}
                                        <dd className="inline text-gray-200">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        alt="Product screenshot"
                        src="/code-screen.jpeg"
                        width={2432}
                        height={1442}
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    )
}
