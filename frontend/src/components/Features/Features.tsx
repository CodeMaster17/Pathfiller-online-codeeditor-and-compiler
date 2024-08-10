// import { Button } from '../ui/button';
import { CheckIcon, ChevronRightIcon, GitBranchPlus, Linkedin, } from 'lucide-react';
import './Features.css';
import { AnimatedSubscribeButton } from '../magicui/animated-subscribe-button';
// import CodeBlocks from '../CodeBlocks/CodeBlocks';

// const features = [
//     {
//         name: 'Feature 1',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero illum, accusant'
//     },
//     {
//         name: 'Feature 1',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero illum, accusant'
//     },
//     {
//         name: 'Feature 1',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero illum, accusant'
//     },
//     {
//         name: 'Feature 1',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero illum, accusant'
//     }
// ]


const Features = () => {
  return (
    <div className="featuresContainer">
      <div className="featuresLeft">
        {/* <div className="mx-auto pl-7 mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-10 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-2xl font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffa825]">
                    <PenBoxIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#cccbcb]">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div> */}
      </div>
      <div className="featuresRight">
        <h1>Features That Fuel Your Coding Journey!</h1>
        <p>Discover powerful features designed to fuel your coding journey, helping you tackle challenges, enhance your skills, and bring your ideas to life with precision and efficiency.Unleash your full potential with features that fuel your coding journey, providing the tools you need to overcome obstacles, streamline your workflow, and create with confidence.</p>
        {/* <Button className='bg-[#ffa825] text-black m-3 hover:bg-[#ff9800] text-lg w-[200px]'>Subscribe</Button> */}
        <AnimatedSubscribeButton
      buttonColor="#ffa825"
      buttonTextColor="#ffffff"
      subscribeStatus={false}
      initialText={
        <span className="group inline-flex items-center">
          Subscribe{" "}
          <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      }
      changeText={
        <span className="group inline-flex items-center">
          <CheckIcon className="mr-2 h-4 w-4" />
          Subscribed{" "}
        </span>
      }
    />
        <p className="followUs">Follow Us</p>
        <div className="socialIcons">
          <Linkedin />
          <GitBranchPlus />
        </div>
      </div>
    </div>
  );
};

export default Features;
