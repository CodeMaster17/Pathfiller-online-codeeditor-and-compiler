import { Button } from '../../ui/button';

import { useState } from 'react';


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const VerticalResizable = () => {
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <div className="h-full w-full border  rounded-l-md bg-dark-layer-2 overflow-hidden">
       <ResizablePanelGroup
      direction="vertical"
      className="min-h-[500px] w-full rounded-lg"
    >
      <ResizablePanel defaultSize={50}>
      <div className="flex gap-x-5 w-full  rounded-lg ml-auto bg-dark-layer-1 px-3">
            <div className='text-white items-center font-bold pt-2'><span className='text-dark-yellow'>&lt;/&gt;</span> Input</div>
            
            {/* submit-button */}
            <div className="flex flex-row-reverse ml-auto gap-x-5 ">
            <Button className='bg-green-600 text-base' onClick={handleSubmit} disabled={loading}>
              {loading ? "Running..." : "Run"}
            </Button>

            </div>
            </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
      <div className="flex gap-x-5 w-full  rounded-lg ml-auto bg-dark-layer-1">
      <div className='text-white items-center font-bold py-2 pl-4'><span className='text-dark-yellow'>&lt;/&gt;</span> Output</div>

      </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default VerticalResizable
