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

interface JobId {
  jobId: string;
}

interface Mismatch {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  _id: string;
}
const VerticalResizable: React.FC<any> = ({ problem }) => {
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>("")
  const [jobId, setJobId] = useState<string>("")
  const [caseData, setCaseData] = useState<any>(cases.case1);
  const [mismatchesData, setMismatchesData] = useState<Mismatch[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("case1");
  const [jobIdData, setJobIdData] = useState<JobId>({
    jobId: ""
  })

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
    console.log("problemId", problem.id);
    console.log("status", status)
    setCaseData({
      nums: [1, 2, 3, 4],
      target: 6,
    });
    console.log("selectedTab", selectedTab)
    console.log("jobIdData", jobIdData)
    try {
      const payload = {
        language: selectedLanguage.toLowerCase() === "c++" ? "cpp" : "py",
        code: userCode,
        problem_id: problem.id,
      };
      console.log("payload", payload);
      const { data } = await axios.post(`${BACKEND_ROUTE_CODE}/code/run`, payload);
      console.log(data);
      setJobIdData(data)
      const intervalId = setInterval(async () => {
        const response = await fetch(`${BACKEND_ROUTE_CODE}/code/status?id=${data.jobId}`);
        console.log('Response status:', response.status);
        const statusResult = await response.json();
        console.log('Status result:', statusResult);
        const { success, job_res, error } = statusResult

        if (success) {
          const { status: jobStatus, output: jobOutput } = job_res;
          setStatus(jobStatus)
          if (jobStatus === "pending") return;
          setOutput(jobOutput)
          setJobId(jobId)
          console.log("output", output)
          console.log("inside success", job_res)
          setMismatchesData(job_res.mismatches)
          console.log("job_res.mismatches", job_res.mismatches)
          if (mismatchesData.length > 0) {
            setSelectedTab("mismatches")
          }
          console.log("mismatched", mismatchesData)
          clearInterval(intervalId)
          console.log("Executed")
        } else {
          console.log("inside else", job_res)
          setMismatchesData(job_res.mismatches)
          setSelectedTab("mismatches")

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
        <ResizablePanel defaultSize={50}>
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
            height={'100%'}
            placeholder={'Write your code here...'}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full p-6 w-full">
            <span className="font-semibold text-white">
              <div>
                <div className='text-white font-bold text-lg pt-2 pl-4'>Test Cases</div>
                <div className="p-5">

                  {mismatchesData.length < 0 ? (
                    <Tabs defaultValue="case1" className="w-[400px]">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="case1" onClick={() => setSelectedTab("case1")}>Case 1</TabsTrigger>
                        <TabsTrigger value="case2" onClick={() => setSelectedTab("case2")}>Case 2</TabsTrigger>
                        <TabsTrigger value="case3" onClick={() => setSelectedTab("case3")}>Case 3</TabsTrigger>
                      </TabsList>

                      <TabsContent value="case1">
                        {caseData && (
                          <div className="text-white bg-gray-800 p-4 rounded mt-4">
                            <p>nums = 1{caseData.nums.join(', ')}</p>
                            <p>target = {caseData.target}</p>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="case2">
                        {caseData && (
                          <div className="text-white bg-gray-800 p-4 rounded mt-4">
                            <p>nums = 2{caseData.nums.join(', ')}</p>
                            <p>target = {caseData.target}</p>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="case3">
                        {caseData && (
                          <div className="text-white bg-gray-800 p-4 rounded mt-4">
                            <p>nums = 3{caseData.nums.join(', ')}</p>
                            <p>target = {caseData.target}</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <>
                      {mismatchesData.map((item: any) => (
                        <div key={item._id} className="text-white bg-gray-800 p-4 rounded mt-4">
                          <p>Input: {item.input}</p>
                          <p>Expected Output: {item.expectedOutput}</p>
                          <p>Actual Output: {item.actualOutput}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default VerticalResizable;
