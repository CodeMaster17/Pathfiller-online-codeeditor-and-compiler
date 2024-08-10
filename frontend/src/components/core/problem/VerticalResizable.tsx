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
// import { Settings } from 'lucide-react';
import { BACKEND_ROUTE_CODE } from '@/constants';
// import { DropdownMenuArrow, DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const cases = {
  case1: {
    nums: [1, 2, 3, 4],
    target: 6,
  },
  case2: {
    nums: [5, 6, 7, 8],
    target: 10,
  },
  case3: {
    nums: [9, 10, 11, 12],
    target: 15,
  },
};
const VerticalResizable = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>("")
  const [jobId, setJobId] = useState<string>("")
  const [caseData, setCaseData] = useState(cases.case1);

  

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
      const intervalId = setInterval(async () => {
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
    <div className='h-full w-full border bg-dark-layer-2 overflow-hidden'>
      {/* <div className="text-white bg-black px-5 pb-2 flex space-x-7 cursor-pointer h-9 flex justify-end">
        <div className="text-gray-400 pt-2"><Settings size={18}/></div>
        <div className="text-gray-400 pt-2"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5g-s7BVLfq4FLrHjo8e5AL1ABnn7wwK0PA&s' width={18} height={18} alt='profile' className='rounded-full'/></div>
			</div> */}
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[500px] w-full rounded-lg"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex gap-x-5 w-full  rounded-lg ml-auto bg-dark-layer-1">
            <div className='text-white items-center font-bold pt-2 pl-4'><span className='text-dark-yellow'>&lt;/&gt;</span> Code</div>
            
            {/* submit-button */}
            <div className="flex flex-row-reverse ml-auto gap-x-5 ">
            <Button className='bg-green-600 text-base' onClick={handleSubmit} disabled={loading}>
              {loading ? "Running..." : "Submit"}
            </Button>
            {/* language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='rounded-[5px] border-2 border-slate-400 p-1 px-6 bg-opacity-[.15] bg-white text-white'>{selectedLanguage}</Button>
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
          <div className="flex h-full p-6 w-full">
            <span className="font-semibold text-white">
              {output ? (
                <>
                  <pre>{output}</pre>
                  { }
                  <p>{status}</p>
                  <p>{jobId && `JobId is ${jobId}`}</p>
                </>
              ) : (
                // "content"
                <div>
                  <div className='text-white font-bold text-lg pt-2 pl-4'>Test Cases</div>
                  <div className="p-5">
                    <Tabs defaultValue="case1" className="w-[400px]">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="case1" onClick={() => setCaseData(cases.case1)}>Case 1</TabsTrigger>
                        <TabsTrigger value="case2" onClick={() => setCaseData(cases.case1)}>Case 2</TabsTrigger>
                        <TabsTrigger value="case3" onClick={() => setCaseData(cases.case1)}>Case 3</TabsTrigger>
                      </TabsList>
                      <TabsContent value="case1">
                        {caseData && (
                          <div className="text-white bg-gray-800 p-4 rounded mt-4">
                            <p>nums = {caseData.nums.join(', ')}</p>
                            <p>target = {caseData.target}</p>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="case2">
                        {caseData && (
                          <div className="text-white bg-gray-800 p-4 rounded mt-4">
                            <p>nums = {caseData.nums.join(', ')}</p>
                            <p>target = {caseData.target}</p>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="case3">
                        {caseData && (
                          <div className="text-white bg-gray-800 p-4 rounded mt-4">
                            <p>nums = {caseData.nums.join(', ')}</p>
                            <p>target = {caseData.target}</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                </div>
              </div>
                
                
              )}
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default VerticalResizable;
