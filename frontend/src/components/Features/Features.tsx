
const features = [
    {
        name: 'Code Arena',
        description:
            'A platform where users can enhance their coding skills by solving a variety of problems, complete with descriptions, constraints, and test cases.',
        // icon: CloudArrowUpIcon,
    },
    {
        name: 'Code Playground',
        description: 'An interactive platform where users can write and execute code with custom inputs in a code editor, view real-time feedback including errors and output, and monitor performance metrics such as execution time and memory usage.',
        // icon: LockClosedIcon,
    },
    {
        name: 'Code Battleground',
        description: 'A upcoming feature where users can participate in ongoing contests to showcase their skills, view real-time leaderboards, and host their own contests.',
        // icon: ServerIcon,
    },
]

export default function Features() {
    return (
        <div className="overflow-hidden bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-dark-yellow">Code faster</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">A better workflow</p>
                            <p className="mt-6 text-lg leading-8 text-gray-200">
                                Unlock powerful tools to elevate your coding journey. Overcome challenges, enhance your skills, and bring your ideas to life with confidence and efficiency..
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-brand-orange-s">
                                            {/* <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" /> */}
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline text-gray-200">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <img
                        alt="Product screenshot"
                        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                        width={2432}
                        height={1442}
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    )
}
