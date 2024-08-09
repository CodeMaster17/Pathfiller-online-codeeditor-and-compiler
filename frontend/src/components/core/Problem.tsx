import ReactCodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useState } from 'react'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const VerticalResizable = () => {
  let [userCode, setUserCode] = useState<string>('');

  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");

  const onChange = (value: string) => {
    setUserCode(value);
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  }

  const handleSubmit = () => {
    console.log("Selected Language:", selectedLanguage);
    console.log("User Code:", userCode);
  }

  return (
    <div className='h-full w-full border'>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[200px] w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={25}>
          <div className="w-full overflow-auto">
            {/* language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{selectedLanguage}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuCheckboxItem
                  checked={selectedLanguage === "C++"}
                  onCheckedChange={() => handleLanguageChange("C++")}
                >
                  C++
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedLanguage === "Python"}
                  onCheckedChange={() => handleLanguageChange("Python")}
                >
                  Python
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* submit-button */}
            <Button variant="default" onClick={handleSubmit}>
                Submit
            </Button>

            {/* code-editor */}
            <ReactCodeMirror
              value={userCode}
              theme={vscodeDark}
              extensions={[javascript()]}
              onChange={onChange}
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
