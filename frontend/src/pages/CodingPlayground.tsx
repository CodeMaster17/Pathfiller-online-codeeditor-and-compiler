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
import axios from 'axios';
import { PLAYGROUND_ROUTE } from '@/constants';
import { TimeDifferenceDisplay } from '@/components/TimeDifferenceDisplay';

const CodingPlayground = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [jobId, setJobId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [status, setStatus] = useState<string | null>("")
  const [output, setOutput] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [executionStatus, setExecutionStatus] = useState<string>("");
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

    try {
      const payload = {
        language: selectedLanguage.toLowerCase() === "c++" ? "cpp" : "py",
        code: userCode,
        inputs: inputValue,
      };
      const { data } = await axios.post(`${PLAYGROUND_ROUTE}/run`, payload);
      setJobId(data.jobId)
      console.log(data)
      const intervalId = setInterval(async () => {
        const response = await fetch(`${PLAYGROUND_ROUTE}/status?id=${data.jobId}`);
        const statusResult = await response.json();
        const { success, job_res, error } = statusResult
        console.log('Status result:', statusResult);
        setStartTime(job_res.startedAt)
        setEndTime(job_res.completedAt)
        if (success) {
          setStatus(job_res.status)
          setExecutionStatus("Executed")
          const { status: jobStatus, output: jobOutput } = job_res;
          console.log('Job Output:', jobOutput);
          setOutput(jobOutput)
          if (jobStatus === "pending") {
            setStatus("pending")
            return;
          }

          setJobId(jobId)
          clearInterval(intervalId)
          console.log("Executed")
        } else {
          console.log("inside else", job_res)

          setStatus("Error! Please retry")
          console.error(error);
          setOutput(error)
        }

      }, 1000)

      setTimeout(() => {
        console.log("Clearing the interval")
        clearInterval(intervalId);
        setStatus("Timelimit exceeded");
      }, 10000);

    } catch (error) {
      console.error("Error:", error);
      setOutput("An error occurred while running the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-8px)] max-w-full rounded-lg  text-black my-1"
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
            <div className="h-full w-full  rounded-l-md bg-dark-layer-2 overflow-hidden">
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
                    className="w-full h-40 p-2 mt-2 text-white bg-dark-layer-2  border-slate-600 rounded"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your input here..."
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <>
                    <div className="flex gap-x-5 w-full rounded-lg ml-auto bg-dark-layer-1">
                      <div className="text-white items-center font-bold py-2 pl-4">
                        <span className="text-dark-yellow">&lt;/&gt;</span> Output
                      </div>
                    </div>
                    <div className="p-4">
                      <span className={
                        status === 'success' ? 'dark-green-s' :
                          status === 'Error! Please retry' ? 'dark-pink' :
                            status === 'error' ? 'dark-pink' :
                              status === 'Timelimit exceeded' ? 'dark-pink' :
                                status === 'pending' ? 'brand-orange-s' :
                                  'status'
                      }>
                        {status}
                      </span>
                    </div>
                    <div className='p-4'>
                      <p className="text-white">
                        {loading ? "Running..." : output}
                      </p>
                    </div>
                    <div>
                      <div className='p-4'>
                        {executionStatus === "Executed" && !loading && startTime && endTime ? <TimeDifferenceDisplay startTime={startTime} endTime={endTime} /> : ""}
                      </div>

                    </div>
                  </>
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
