import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

export interface ExecutionResult {
    code: string;
    output: string;
    error: string | null;
}

export interface CodeEditorState {
    language: string;
    output: string;
    // isRunning: boolean;
    error: string | null;
    // theme: string;
    // fontSize: number;
    editor: ReactCodeMirrorRef | null;
    executionResult: ExecutionResult | null;
    code: string;
    inputs: string

    runCode: (language: string, code: string, input: string) => Promise<void>;
    getLangauges: () => Promise<void>;
    setEditor: (editor: ReactCodeMirrorRef) => void;
    initializeEditor: () => void;
}
