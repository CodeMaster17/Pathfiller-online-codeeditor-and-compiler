import VerticalResizable from "@/components/core/problem/VerticalResizable";
import { getProblemById } from "@/api/problemApi";
import ProblemDetailsTabs from "@/components/core/arena/ProblemDetailsTabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IProblemType } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "@/components/Logo";

const CodingArena = () => {

  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<IProblemType>({
    _id: "",
    id: "",
    title: "",
    description: "",
    difficulty: "easy",
    problemStatement: "",
    examples: [],
    constraints: "",
    likes: 0,
    dislikes: 0,
    tags: []
  });

  useEffect(() => {
    const fetchProblem = async () => {
      if (id) {
        try {
          const data = await getProblemById(id);
          setProblem(data);
        } catch (error) {
          throw new Error("Error fetching problem")
        }
      } else {
        throw new Error("Problem ID not found")
      }
    }
    fetchProblem();
  }, [id]);

  const solved = false;

  return (
    <>
      <div className='w-full h-12 flex justify-between px-4 items-center border-b-[1px] border-gray-800'>
        <Logo variant="small" />
        <div className='flex gap-3 items-center '>

          {/* <button onClick={handleCodeRun} className='text-xs flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors'>
            <Play size={16} className="mr-2" />
            Run Code
          </button>

          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          /> */}
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className=" min-h-full max-h-screen overflow-hidden w-full rounded-lg"
      >
        <ResizablePanel defaultSize={50} className="min-h-screen">
          <ProblemDetailsTabs problem={problem} _solved={solved} />
        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50}>

          <div className="flex h-full items-center justify-center p-1">
            <VerticalResizable problem={problem} />
          </div>

        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default CodingArena;
