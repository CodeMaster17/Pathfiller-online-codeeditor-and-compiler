// import React from "react";
// import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
// import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position = "flex-col",
//   heading,
//   subheading,
//   ctabtn1,
//   ctabtn2,
  codeblock = "#include <iostream> \n using namespace std; \nbool codeIsPerfect = true; \n// Change this to false to test the other scenario ect.' << But wait... theres a missing semicolon hiding in the shadows. << endl; \nelse { \ncout << Code is not perfect... there are still semicolons to chase. << endl; \n} \n}",
//   backgroundGradient ="",
  codeColor = "text-yellow-400",
}) => {
  return (
    <div className={`flex ${position} justify-between gap-10 bg-black p-28`}>
    
      <div className=" code-border border rounded-lg bg-gray-900 flex flex-row py-16 px-20 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[470px]">
        {/* {backgroundGradient} */}
        <div className="text-center flex flex-col w-[10%] text-white select-none text-richblack-400 font-inter font-bold">
          {[...Array(14).keys()].map((i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div className={`w-[90%] flex flex-col gap-3 font-bold font-mono ${codeColor} pr-1`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
      
    </div>
  );
};

export default CodeBlocks;
