import VerticalResizable from "@/components/core/problem/VerticalResizable";
import ProblemDescription from "@/components/core/problem/ProblemDescription";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Problem = () => {
  const problem = {
    id: "123",
    title: "Sample Problem",
    difficulty: "Easy",
    problemStatement: "<p>This is a sample problem statement.</p>",
    examples: [
      {
        id: "1",
        inputText: "Example input",
        outputText: "Example output",
        explanation: "This is an example explanation.",
        img: "",
      },
    ],
    constraints: "<li>Constraint 1</li><li>Constraint 2</li>",
    likes: 100,
    dislikes: 20,
  };

  const _solved = false;

  return (
    <div className="h-full border-black bg-black border-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] w-full rounded-lg border-red-600 border-4"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-1">
            <ProblemDescription problem={problem} _solved={_solved} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-1 border-red-600 border-4">
            <VerticalResizable />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Problem;
