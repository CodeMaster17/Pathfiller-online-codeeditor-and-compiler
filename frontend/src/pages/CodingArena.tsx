import VerticalResizable from "@/components/core/problem/VerticalResizable";
import ProblemDescription from "@/components/core/problem/ProblemDescription";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProblemType } from "@/types/types";
import { getProblemById } from "@/api/problemApi";

const CodingArena = () => {

  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<IProblemType>({
    id: "",
    title: "",
    description: "",
    difficulty: "",
    problemStatement: "",
    examples: [],
    constraints: "",
    likes: 0,
    dislikes: 0
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
    <div className="h-full bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] w-full rounded-lg"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-1">
            <ProblemDescription problem={problem} _solved={solved} />
          </div>
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
