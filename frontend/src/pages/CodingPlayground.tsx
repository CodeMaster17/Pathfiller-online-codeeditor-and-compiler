import VerticalResizable from "@/components/core/CodingPlayground/VerticalResizable"
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const CodingPlayground = () => {
  const [userCode, setUserCode] = useState<string>('');
  const onChange = (value: string) => {
    setUserCode(value);
  };
  
  return (
    <div className="">
      <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-8px)] max-w-full rounded-lg border text-black my-1"
    >
      <ResizablePanel defaultSize={70}>
        <div className="flex flex-col h-full gap-x-5 w-full  rounded-lg ml-auto bg-dark-layer-1 px-3">
        <div className='text-white items-center font-bold py-2'><span className='text-dark-yellow'>&lt;/&gt;</span> Code</div>
        <div className="flex h-full w-full items-center justify-center p-1 bg-dark-layer-3">
        
        <ReactCodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            onChange={onChange}
            className="w-full h-full"
          />
        </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30}>
        <div className="h-full">
          <VerticalResizable />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default CodingPlayground
