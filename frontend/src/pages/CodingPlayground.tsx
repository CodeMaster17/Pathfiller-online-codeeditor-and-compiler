
import LanguageSelector from '@/components/core/LanguageSelector';
import StatusIndicator from '@/components/core/StatusIndicator';
import InputArea from '@/components/core/playground/InputArea';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getExecutionResult, useCodeEditorStore } from '@/lib/CodeEditorLib';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import ReactCodeMirror from '@uiw/react-codemirror';
import { Play } from 'lucide-react';
import { useEffect, useState } from "react";

const CodingPlayground = () => {
  const [userCode, setUserCode] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [status, setStatus] = useState<string>("")
  const [output, setOutput] = useState<string | null>(null);


  {/* This is to be displyaed when using cusotm backend server */ }
  // const [startTime, setStartTime] = useState<string>("");
  // const [endTime, setEndTime] = useState<string>("");
  // const [executionStatus, setExecutionStatus] = useState<string>("");

  // handle editor code change
  const handleCodeChange = (value: string) => {
    setUserCode(value);
    if (value) localStorage.setItem(`editor-code-${selectedLanguage}`, value)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };


  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);

  };

  // RECHECK: This to be used when creating custom docker container
  // const handleSubmit = useCallback(async () => {
  //   setLoading(true);


  //   try {
  //     const payload = {
  //       language: selectedLanguage.toLowerCase() === "c++" ? "cpp" : "py",
  //       code: userCode,
  //       inputs: inputValue,
  //     };

  //     const data = await getJobIdByPayloadForPlayground(payload);

  //     const intervalId = setInterval(async () => {
  //       const response = await getJobStatusByIdForPlayground(data.jobId);
  //       const statusResult = await response.json();
  //       const { success, job_res, error } = statusResult;

  //       setStartTime(job_res.startedAt);
  //       setEndTime(job_res.completedAt);

  //       if (success) {
  //         const { status: jobStatus, output: jobOutput } = job_res;
  //         setStatus(job_res.status);
  //         setExecutionStatus("Executed");
  //         setOutput(jobOutput);

  //         if (jobStatus === PENDING_STATUS) {
  //           setStatus(PENDING_STATUS);
  //           return;
  //         }

  //         clearInterval(intervalId)

  //       } else {
  //         setStatus("Error! Please retry");
  //         setOutput(error);
  //       }
  //     }, 1000)

  //     setTimeout(() => {
  //       clearInterval(intervalId);
  //       setLoading(false);
  //       setStatus("Timelimit exceeded");
  //     }, 10000);

  //   } catch (error) {
  //     setOutput("An error occurred while running the code.");
  //   }
  // }, [selectedLanguage, userCode, inputValue]);


  // Running the code through Piston API
  const { runCode, editor, setEditor, initializeEditor } = useCodeEditorStore();

  const handleCodeRun = async () => {
    setLoading(true)
    await runCode(selectedLanguage, userCode, inputValue);

    const result = getExecutionResult();
    if (result) {
      setOutput(result.output);
      setStatus(result.error ? "Error" : "Success");
    }
    setLoading(false);
  }

  useEffect(() => {
    initializeEditor();
  }, []);


  // setup the editor when language changes
  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${selectedLanguage}`);
    console.log("savedCode", savedCode)
    console.log("editor", editor)
    if (editor && savedCode) {
      editor.view?.dispatch({
        changes: {
          from: 0,
          to: editor.view.state.doc.length,
          insert: savedCode,
        },
      });
    }
  }, [selectedLanguage, editor])



  return (
    <>
      {/* Navbar */}
      <div className='w-full h-12 flex justify-between px-4 items-center border-b-[1px] border-gray-800'>
        <p className='text-white '>
          <a href="/">Pathfiller</a>
        </p>
        <div className='flex gap-3 items-center '>

          <button onClick={handleCodeRun} className='text-xs flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md hover:from-purple-600 hover:to-blue-600 transition-colors'>
            <Play size={16} className="mr-2" />
            Run Code
          </button>

          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>


      {/* Editor area */}
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-w-full  text-black"
      >
        <ResizablePanel defaultSize={70}>
          <div className="flex flex-col h-full gap-x-5 w-full  ml-auto bg-s1 px-3">

            <div className="text-white items-center font-bold py-2 text-xs">
              <span className="text-dark-yellow">&lt;/&gt;</span> CodePlayground
            </div>
            <div className="flex h-full w-full items-center justify-center p-1 bg-s border-[1px] border-gray-800">

              {/* code editor */}
              <ReactCodeMirror
                value={userCode}
                theme={vscodeDark}
                extensions={[javascript()]}
                onChange={handleCodeChange}
                className="w-full h-full "
                onCreateEditor={(editor) => setEditor(editor)}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={30}>
          <div className="h-full">
            <div className="h-full w-full  rounded-l-md bg-s overflow-hidden">
              <ResizablePanelGroup
                direction="vertical"
                className="min-h-[500px] w-full rounded-lg"
              >
                <ResizablePanel defaultSize={50}>

                  <div className="flex gap-x-5 w-full items-center justify-center rounded-lg ml-auto  px-3 bg-s1">
                    <div className="text-white items-center font-bold pt-2  text-xs bg-s1">
                      <span className="text-dark-yellow text-xs">&lt;/&gt;</span> Input
                    </div>


                    {/* submit-button */}
                    <div className="flex flex-row-reverse ml-auto gap-x-5">
                      {/* <SubmitButton onClick={handleCodeRun} isLoading={loading} />
                       */}

                    </div>
                  </div>

                  {/* Input Box */}
                  <InputArea inputValue={inputValue} onInputChange={handleInputChange} />


                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                  <>
                    <div className="flex gap-x-5 w-full rounded-lg ml-auto bg-s1 text-xs">
                      <div className="text-white items-center font-bold py-2 pl-4">
                        <span className="text-dark-yellow text-xs">&lt;/&gt;</span> Output
                      </div>
                    </div>

                    {/* status indicator */}
                    <div className='w-full flex flex-col justify-center items-start'>
                      <StatusIndicator status={status} />
                      {output &&
                        <div className='p-4 mt-2 w-[95%] m-auto bg-gray-800 rounded-lg'>
                          <p className="text-white w-[80%]">
                            {loading ? "Running..." : output}
                          </p>

                        </div>}
                    </div>

                    <div>
                      <div className='p-4'>
                        {/* This is to be displyaed when using cusotm backend server */}
                        {/* {executionStatus === "Executed" && !loading && startTime && endTime ?
                          <TimeDifferenceDisplay startTime={startTime} endTime={endTime} /> : ""} */}
                      </div>

                    </div>
                  </>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default CodingPlayground;
