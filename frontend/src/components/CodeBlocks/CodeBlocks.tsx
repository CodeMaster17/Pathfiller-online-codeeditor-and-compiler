import { TypeAnimation } from "react-type-animation";
import { CodeBlocksCode } from "@/constants";


const CodeBlocks = ({
  position = "flex-row",
  codeblock = CodeBlocksCode,
  codeColor = "text-yellow-400",
}) => {
  return (
    <div className={`flex ${position} justify-between gap-10 bg-black p-28  `}>
      <div className="code-border border rounded-lg bg-gray-900 flex flex-row py-16 px-2 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[520px]">
        <div className="text-center flex flex-col w-[20%] text-white select-none text-richblack-400 font-inter font-bold">
          {[...Array(14).keys()].map((i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div className={`w-[100%] flex flex-col gap-3 font-bold font-mono ${codeColor}`}>
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

      <div className="w-full md:w-1/2 flex flex-col justify-center ">
        <h2 className="text-white text-3xl font-bold mb-4">
          <span className="text-brand-orange">
            Empowering Innovation: {" "}
          </span>
          <br />
          <br />
          The Ultimate Coding Platform and Editor for Developers
        </h2>
        <p className="text-gray-300 text-xl pt-4">
          A coding platform and editor are essential tools that turn ideas into reality. With intuitive interfaces and features like code completion and collaboration, they boost productivity and foster innovation in technology.
        </p>
      </div>

    </div>
  );
};

export default CodeBlocks;
