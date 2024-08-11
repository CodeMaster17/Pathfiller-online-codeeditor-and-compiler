import { Button } from '@/components/ui/button';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const CodingPlayground = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");

  const handleCodeChange = (value: string) => {
    setUserCode(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Log the values for demonstration
    console.log("Selected Language:", selectedLanguage);
    console.log("User Code:", userCode);
    console.log("User Input:", inputValue);
    setLoading(false);
  };

  return (
    <div className="">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-8px)] max-w-full rounded-lg border text-black my-1"
      >
        <ResizablePanel defaultSize={70}>
          <div className="flex flex-col h-full gap-x-5 w-full rounded-lg ml-auto bg-dark-layer-1 px-3">
            <div className="text-white items-center font-bold py-2">
              <span className="text-dark-yellow">&lt;/&gt;</span> Code
            </div>
            <div className="flex h-full w-full items-center justify-center p-1 bg-dark-layer-3">
              <ReactCodeMirror
                value={userCode}
                theme={vscodeDark}
                extensions={[javascript()]}
                onChange={handleCodeChange}
                className="w-full h-full"
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div className="h-full">
            <div className="h-full w-full border rounded-l-md bg-dark-layer-2 overflow-hidden">
              <ResizablePanelGroup
                direction="vertical"
                className="min-h-[500px] w-full rounded-lg"
              >
                <ResizablePanel defaultSize={50}>
                  <div className="flex gap-x-5 w-full rounded-lg ml-auto bg-dark-layer-1 px-3">
                    <div className="text-white items-center font-bold pt-2">
                      <span className="text-dark-yellow">&lt;/&gt;</span> Input
                    </div>

                    {/* submit-button */}
                    <div className="flex flex-row-reverse ml-auto gap-x-5">
                      <Button
                        className="bg-green-600 text-base"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? "Running..." : "Run"}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="rounded-[5px] border-2 border-slate-400 p-1 px-6 bg-opacity-[.15] bg-white text-white">
                            {selectedLanguage}
                          </Button>
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
                  </div>
                  <textarea
                    className="w-full h-40 p-2 mt-2 text-white bg-dark-layer-2 border border-slate-600 rounded"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your input here..."
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex gap-x-5 w-full rounded-lg ml-auto bg-dark-layer-1">
                    <div className="text-white items-center font-bold py-2 pl-4">
                      <span className="text-dark-yellow">&lt;/&gt;</span> Output
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default CodingPlayground;
