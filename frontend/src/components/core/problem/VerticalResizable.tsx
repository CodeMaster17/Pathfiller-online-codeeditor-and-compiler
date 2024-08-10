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
import { BACKEND_ROUTE_CODE } from '@/constants';

const VerticalResizable = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>("")
  const [jobId, setJobId] = useState<string>("")
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
      const { data } = await axios.post(`${BACKEND_ROUTE_CODE}/code/run`, payload);
      console.log(data);
      setOutput(data.jobId);

      // polling to get the job result
      let intervalId = setInterval(async () => {
        const { data: statusResult } = await axios.get(`${BACKEND_ROUTE_CODE}/code/status`, { params: { id: data.jobId } });
        console.log(statusResult)
        const { success, job_res, error } = statusResult
        console.log(statusResult);
        // if the job is success --> displaying result
        if (success) {
          const { status: jobStatus, output: jobOutput } = job_res;
          setStatus(jobStatus)
          if (jobStatus === "pending") return;
          setOutput(jobOutput)
          setJobId(jobId)
          // clearing the interval
          clearInterval(intervalId)
          console.log("Executed")
        } else {
          setStatus("Error! Please retry")
          console.error(error);
          setOutput(error)
        }
      }, 1000)

      // FIXME: Fix the timeout problem which is setting the pending status
      setTimeout(() => {
        console.log("Clearing the interval")
        clearInterval(intervalId);
        setStatus("Timelimit exceeded");
      }, 10000);


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
                <>
                  <pre>{output}</pre>
                  { }
                  <p>{status}</p>
                  <p>{jobId && `JobId is ${jobId}`}</p>
                </>
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
