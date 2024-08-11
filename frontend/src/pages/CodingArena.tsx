import VerticalResizable from "@/components/core/problem/VerticalResizable";
import ProblemDescription from "@/components/core/problem/ProblemDescription";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PROBLEM_ROUTE } from "@/constants";
import axios from "axios";

const CodingArena = () => {

  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<any>({});

  useEffect(() => {
    const fetchProblem = async () => {

      try {
        const data = await axios.get(`${PROBLEM_ROUTE}/get/${id}`);
        const result = data.data;
        console.log(result);
        setProblem(result);
      } catch (error) {
        console.log("Error fetching problem")
      }
    }
    fetchProblem();
  }, [])


  const _solved = false;

  return (
    <div className="h-full bg-black">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] w-full rounded-lg"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-1">
            <ProblemDescription problem={problem} _solved={_solved} />
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
