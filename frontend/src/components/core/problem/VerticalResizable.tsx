import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useState } from 'react';
import axios from 'axios';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VerticalResizable = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (value: string) => {
    setUserCode(value);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    console.log(userCode, selectedLanguage);

    try {
      const payload = {
        language: selectedLanguage.toLowerCase() === "c++" ? "cpp" : "py",
        code: userCode,
      };
      const { data } = await axios.post('http://localhost:5002/api/v1/code/run', payload);

      setOutput(data.output || "No output received");
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("An error occurred while running the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full w-full border bg-dark-layer-1'>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[500px] w-full rounded-lg"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex flex-row-reverse gap-x-5 w-full border ml-auto ">
            {/* submit-button */}
            <Button variant="default" onClick={handleSubmit} disabled={loading}>
              {loading ? "Running..." : "Submit"}
            </Button>
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
          </div>
          {/* code-editor */}
          <ReactCodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            onChange={onChange}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold text-white">
              {output ? (
                <pre>{output}</pre>
              ) : (
                "Content"
              )}
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default VerticalResizable;
