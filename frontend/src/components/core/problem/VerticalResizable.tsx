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
import { IMismatch, IProblemType } from '@/types/types';
import { getJobStatusById } from '@/api/codeArenaApi';


interface JobId {
  jobId: string;
}

interface VerticalResizableProps {
  problem: IProblemType;
}


const VerticalResizable: React.FC<VerticalResizableProps> = ({ problem }) => {
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>("")
  const [jobId, setJobId] = useState<string>("")

  const [mismatchesData, setMismatchesData] = useState<IMismatch[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("case1");
  const [executionStatus, setExecutionStatus] = useState<string>("");
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
        const response = await getJobStatusById(data.jobId);
        const statusResult = await response.json();
        const { success, job_res, error } = statusResult

        if (success) {
          const { status: jobStatus, output: jobOutput } = job_res;
          setStatus(job_res.status)
          if (jobStatus === "pending") {
            setStatus("pending")
            return;
          }
          setOutput(jobOutput)
          setJobId(jobId)
          // console logs for reference
          console.log("output", output)
          console.log("inside success", job_res)

          // setting the status of the execution
          setExecutionStatus("Executed")

          // setting up the test cases which failed
          setMismatchesData(job_res.mismatches)
          console.log("job_res.mismatches", job_res.mismatches)
          if (mismatchesData.length > 0) {
            setSelectedTab("mismatches")
          }
          console.log('execution Status:', executionStatus);
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
      }, 10000)

      setTimeout(() => {
        console.log("Clearing the interval")
        clearInterval(intervalId);
        if (status === "pending") {
          setStatus("Timelimit exceeded");
        }
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
          {/* ---- code-editor ---- */}
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

        {/* --- ouput screen --- */}
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full p-6 w-full">
            <span className="font-semibold text-white">
              <div>
                <div className='text-white font-bold text-lg pt-2 pl-4'>Test Cases</div>
                <div className="p-5">

                  {mismatchesData.length < 0 ? (
                    ""
                  ) : (
                    <div className='flex gap-8'>
                      {mismatchesData.map((item: IMismatch) => (
                        <div key={item._id} className="text-white bg-gray-800 p-4 rounded mt-4">
                          <p>Input: {item.input}</p>
                          <p>Expected Output: {item.expectedOutput}</p>
                          <p>Actual Output: {item.actualOutput}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {mismatchesData.length == 0 && status === "success" &&
                    <div className="text-white bg-gray-800 p-4 rounded mt-4">
                      All test cases passed
                    </div>
                  }
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
                </div>
              </div>
            </span>
          </div>
        </ResizablePanel >
      </ResizablePanelGroup >
    </div >
  );
}

export default VerticalResizable;
