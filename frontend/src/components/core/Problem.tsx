import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

const VerticalResizable = () => {
  return (
    <div className='h-full w-full border'>
      <ResizablePanelGroup
      direction="vertical"
      className="min-h-[200px] w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full w-full items-center justify-center p-6">
          {/* code-editor */}
            <ReactCodeMirror
                value='const a = 1;'
                theme={vscodeDark}
                extensions={[javascript()]}
                />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default VerticalResizable
