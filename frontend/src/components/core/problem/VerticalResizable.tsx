import { useCallback, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { IMismatch, IProblemType } from '@/types/types';
import { getJobIdByPayloadForArena, getJobStatusById } from '@/api/codeArenaApi';
import { PENDING_STATUS } from '@/constants/statusConstants';
import CodeEditor from '../CodeEditor';
import StatusIndicator from '../StatusIndicator';
import TestCaseResults from '../TestCaseResult';
import SubmitButton from '../SubmitButton';
import LanguageSelector from '../LanguageSelector';



interface VerticalResizableProps {
  problem: IProblemType;
}


const VerticalResizable: React.FC<VerticalResizableProps> = ({ problem }) => {
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>("")
  const [jobId, setJobId] = useState<string>("")
  const [loader, setLoader] = useState<boolean>(false);

  const [mismatchesData, setMismatchesData] = useState<IMismatch[]>([]);


  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      const payload = {
        language: selectedLanguage.toLowerCase() === "c++" ? "cpp" : "py",
        code: userCode,
        problem_id: problem.id,
      };
      const data = await getJobIdByPayloadForArena(payload);

      // setting the status of the execution
      const intervalId = setInterval(async () => {
        setLoader(true);
        const response = await getJobStatusById(data.jobId);
        const statusResult = await response.json();
        const { success, job_res } = statusResult
        if (success) {
          const { status: jobStatus, mismatches } = job_res;
          setStatus(job_res.status)
          if (jobStatus === PENDING_STATUS) {
            setStatus(PENDING_STATUS)
            return;
          }
          setJobId(jobId)
          setMismatchesData(mismatches)

          if (jobStatus !== PENDING_STATUS) {
            clearInterval(intervalId);
          }

        } else {
          setMismatchesData(job_res.mismatches);
          setStatus("Error! Please retry");
        }
      }, 10000)


      setTimeout(() => {
        clearInterval(intervalId);
        if (status === PENDING_STATUS) {
          setStatus("Timelimit exceeded");
        }
      }, 10000);

    } catch (error) {
      throw new Error("Error submitting code")
    } finally {
      setLoading(false);
    }
  }, [userCode, selectedLanguage, jobId, problem.id, status]);



  return (
    <div className='h-full w-full  bg-s1 overflow-hidden'>

      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[500px] w-full rounded-lg"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex gap-x-5 w-full  rounded-lg ml-auto bg-s1">
            <div className='text-white items-center font-bold pt-2 pl-4'><span className='text-dark-yellow'>&lt;/&gt;</span> Code</div>
            {/* submit-button */}
            <div className="flex flex-row-reverse ml-auto gap-x-5 h-10 justify-center items-center px-4 ">
              <SubmitButton onClick={handleSubmit} isLoading={loading} />
              {/* language selector */}
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>

          {/* ---- code-editor ---- */}
          <CodeEditor
            value={userCode}
            onChange={setUserCode}
            language={selectedLanguage}
          />
        </ResizablePanel>
        <ResizableHandle />

        {/* --- output screen --- */}
        {!!loader && <ResizablePanel defaultSize={50}>
          <div className="flex h-full p-6 w-full">
            <span className="font-semibold text-white">
              <div>
                <div className='text-white font-bold text-lg pt-2 pl-4'>Test Cases</div>
                <div className="p-5">
                  <TestCaseResults
                    mismatchesData={mismatchesData}
                    status={status}
                  />
                  <StatusIndicator status={status} />
                </div>
              </div>
            </span>
          </div>
        </ResizablePanel>}

      </ResizablePanelGroup >
    </div >
  );
}

export default VerticalResizable;
