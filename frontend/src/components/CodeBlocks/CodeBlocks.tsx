import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position = "flex-row", // Change to "flex-row" for side-by-side layout
  codeblock = "#include <iostream> \n using namespace std; \nbool codeIsPerfect = true; \n// Change this to false to test the other scenario ect.' << But wait... theres a missing semicolon hiding in the shadows. << endl; \nelse { \ncout << Code is not perfect... there are still semicolons to chase. << endl; \n} \n}",
  codeColor = "text-yellow-400",
}) => {
  return (
    <div className={`flex ${position} justify-between gap-10 bg-black p-28 `}>
    
      <div className="code-border border rounded-lg bg-gray-900 flex flex-row py-16 px-20 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[470px]">
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
      
      <div className="w-full md:w-1/2 flex flex-col justify-center pl-16">
        <h2 className="text-white text-3xl font-bold mb-4">
        Empowering Innovation: The Ultimate Coding Platform and Editor for Developers
        </h2>
        <p className="text-gray-300 text-xl pt-4">
        A coding platform and its editor serve as the heart of a developer's toolkit, offering a powerful environment where ideas are transformed into reality. The best platforms provide a seamless experience, with an intuitive interface that encourages exploration and creativity. A top-tier editor not only simplifies the coding process but also enhances productivity with features like intelligent code completion, real-time collaboration, and a rich library of integrations. It empowers developers to write clean, efficient code while minimizing errors, making it an indispensable resource for both beginners and seasoned professionals. By fostering a community of learners and experts, a great coding platform becomes more than just a tool—it's a catalyst for innovation and growth in the world of technology.
        </p>
      </div>
      
    </div>
  );
};

export default CodeBlocks;
