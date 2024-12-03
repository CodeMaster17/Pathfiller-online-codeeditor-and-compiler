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
    <div className="h-screen bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className=" min-h-full w-full rounded-lg"
      >
        <ResizablePanel defaultSize={50} className="h-full">
          <ProblemDetailsTabs problem={problem} _solved={solved} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-1">
            <VerticalResizable problem={problem} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodingArena;
