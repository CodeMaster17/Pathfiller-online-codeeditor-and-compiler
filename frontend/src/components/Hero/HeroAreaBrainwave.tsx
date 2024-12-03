import { curve, heroBackground } from "@/assets";
import { CodeBlocksCode } from '@/constants';
import { heroIcons } from "@/constants/heroIcons";
import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import { TypeAnimation } from 'react-type-animation';
import Generating from "./Generating";
import { BackgroundCircles, BottomLine, Gradient } from "./Hero";
import Notification from "./Notification";

const HeroAreaBrainwave = () => {
    const parallaxRef = useRef(null);
    const codeblock = CodeBlocksCode
    const codeColor = "text-white"
    return (
        <div
        >
            <div className="container relative mt-8 " ref={parallaxRef}>
                <div className="relative z-1   max-w-full mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <h5 className="h5 text-white">
                        You ask &nbsp;Dev v/s {` `}
                        <span className="inline-block relative">
                            DSA .. ?{" "}
                            <img
                                src={curve}
                                className="absolute top-full left-0 w-full xl:-mt-2"
                                width={624}
                                height={28}
                                alt="Curve"
                            />
                        </span>
                    </h5>
                    <p className="body-1 max-w-3xl mx-auto text-n-2 ">
                        we say..
                    </p>
                    <h1 className="h1 text-white">
                        Dev with {` `}
                        <span className="inline-block relative">
                            DSA{" "}
                            <img
                                src={curve}
                                className="absolute top-full left-0 w-full xl:-mt-2"
                                width={624}
                                height={28}
                                alt="Curve"
                            />
                        </span>
                    </h1>
                    <br />
                </div>
                <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
                    <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
                        <div className="relative bg-n-8 rounded-[1rem]">
                            <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

                            <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490] border-2">

                                <div className="code-border border rounded-lg flex flex-row py-2 px-2 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-full">

                                    <div className="text-center flex flex-col justify-start items-start w-[5%] text-white select-none text-richblack-400 font-inter font-bold overflow-hidden">
                                        {[...Array(18).keys()].map((i) => (
                                            <p key={i}>{i + 1}</p>
                                        ))}
                                    </div>
                                    <div className={`w-[100%] flex flex-col gap-1 font-bold font-mono ${codeColor}`}>
                                        <TypeAnimation
                                            sequence={[codeblock, 1000, ""]}
                                            cursor={true}
                                            repeat={Infinity}
                                            style={{
                                                whiteSpace: "pre",
                                                display: "block",
                                                fontFamily: "monospace",
                                            }}
                                            omitDeletionAnimation={true}
                                        />
                                    </div>
                                </div>

                                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                                <ScrollParallax isAbsolutelyPositioned>
                                    <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                                        {heroIcons.map((icon, index) => (
                                            <li className="p-5" key={index}>
                                                <img src={icon} width={24} height={25} alt={icon} />
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollParallax>

                                <ScrollParallax isAbsolutelyPositioned>
                                    <Notification
                                        className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                                        title="Code generation"
                                    />
                                </ScrollParallax>
                            </div>
                        </div>

                        <Gradient />
                    </div>
                    <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%]  lg:-top-[104%]">
                        <img
                            src={heroBackground}
                            className="w-full"
                            width={1440}
                            height={1800}
                            alt="hero"
                        />
                    </div>

                    <BackgroundCircles parallaxRef />
                </div>

            </div>

            <BottomLine />
        </div>
    )
}

export default HeroAreaBrainwave