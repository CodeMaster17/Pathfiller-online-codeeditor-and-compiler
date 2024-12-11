import { PINSTON_API } from "@/constants";
import { LANGUAGE_CONFIG } from "@/constants/CodeEditorConstant";
import { CodeEditorState } from "@/types/CodeEditorTypes";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { create } from "zustand";

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  return {
    language: "",
    code: "",
    inputs: "",
    output: "",
    error: null,
    editor: null,
    executionResult: { code: "", output: "", error: null },

    // setting up the editor
    setEditor: (editor: ReactCodeMirrorRef | null) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (editor && savedCode) {
        editor.view?.dispatch({
          changes: {
            from: 0,
            to: editor.view.state.doc.length,
            insert: savedCode,
          },
        });
      }

      set({ editor });
    },

    initializeEditor: () => {
      const savedLanguage = localStorage.getItem("editor-language") || "C++";
      const savedCode =
        localStorage.getItem(`editor-code-${savedLanguage}`) || "";

      set({
        language: savedLanguage, // Initialize the language from local storage
        code: savedCode, // Initialize code for pre-filling
        error: null,
        output: "",
      });
    },

    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.state?.doc.toString();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },
    // running the code
    runCode: async (language, code, inputs) => {
      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;

        const response = await fetch(PINSTON_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: "3.10.0",
            files: [
              {
                name: "main",
                content: code,
              },
            ],
            stdin: inputs,
          }),
        });

        const data = await response.json();

        // handle api level errors
        if (data.message) {
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        // handling compilation errors
        if (data.compile && data.compile.code !== 0) {
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        if (data.run && data.run.code !== 0) {
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        // if we get here, execution was successful
        const output = data.run.output;

        set({
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        });
      } catch (error) {
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        console.log("Code executed");
      }
    },
  };
});

export const getExecutionResult = () =>
  useCodeEditorStore.getState().executionResult;
