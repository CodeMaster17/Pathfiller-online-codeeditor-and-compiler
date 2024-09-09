
import ReactCodeMirror from '@uiw/react-codemirror';
import { useCallback, useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TimeDifferenceDisplay } from '@/components/TimeDifferenceDisplay';
import { getJobIdByPayloadForPlayground, getJobStatusByIdForPlayground } from '@/api/codePlaygroundApi';
import { PENDING_STATUS } from '@/constants/statusConstants';
import StatusIndicator from '@/components/core/StatusIndicator';
import InputArea from '@/components/core/playground/InputArea';
import LanguageSelector from '@/components/core/LanguageSelector';
import SubmitButton from '@/components/core/SubmitButton';


const CodingPlayground = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
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


  const handleSubmit = useCallback(async () => {
    setLoading(true);


    try {
      const payload = {
        language: selectedLanguage.toLowerCase() === "c++" ? "cpp" : "py",
        code: userCode,
        inputs: inputValue,
      };

      const data = await getJobIdByPayloadForPlayground(payload);

      const intervalId = setInterval(async () => {
        const response = await getJobStatusByIdForPlayground(data.jobId);
        const statusResult = await response.json();
        const { success, job_res, error } = statusResult;

        setStartTime(job_res.startedAt);
        setEndTime(job_res.completedAt);

        if (success) {
          const { status: jobStatus, output: jobOutput } = job_res;
          setStatus(job_res.status);
          setExecutionStatus("Executed");
          setOutput(jobOutput);

          if (jobStatus === PENDING_STATUS) {
            setStatus(PENDING_STATUS);
            return;
          }

          clearInterval(intervalId)

        } else {
          setStatus("Error! Please retry");
          setOutput(error);
        }
      }, 1000)

      setTimeout(() => {
        clearInterval(intervalId);
        setLoading(false);
        setStatus("Timelimit exceeded");
      }, 10000);

    } catch (error) {
      setOutput("An error occurred while running the code.");
    }
  }, [selectedLanguage, userCode, inputValue]);

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-8px)] max-w-full rounded-lg  text-black my-1"
      >
        <ResizablePanel defaultSize={70}>
          <div className="flex flex-col h-full gap-x-5 w-full rounded-lg ml-auto bg-dark-layer-1 px-3">
            <div className="text-white items-center font-bold py-2">
              <span className="text-dark-yellow">&lt;/&gt;</span> CodePlayground
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
                      <SubmitButton onClick={handleSubmit} isLoading={loading} />
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        onLanguageChange={handleLanguageChange}
                      />
                    </div>
                  </div>
                  <InputArea inputValue={inputValue} onInputChange={handleInputChange} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <>
                    <div className="flex gap-x-5 w-full rounded-lg ml-auto bg-dark-layer-1">
                      <div className="text-white items-center font-bold py-2 pl-4">
                        <span className="text-dark-yellow">&lt;/&gt;</span> Output
                      </div>
                    </div>

                    {/* status indicator */}
                    <StatusIndicator status={status} />

                    <div className='p-4'>
                      <p className="text-white">
                        {loading ? "Running..." : output}
                      </p>
                    </div>
                    <div>
                      <div className='p-4'>
                        {executionStatus === "Executed" && !loading && startTime && endTime ?
                          <TimeDifferenceDisplay startTime={startTime} endTime={endTime} /> : ""}
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
