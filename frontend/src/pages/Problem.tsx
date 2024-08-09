import VerticalResizable from "@/components/core/Problem"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

const Problem = () => {
  return (
    <div className=''>
      <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[600px] w-full rounded-lg border-red-600 border-4"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-1">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-1  border-red-600 border-4">
            <VerticalResizable />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default Problem
