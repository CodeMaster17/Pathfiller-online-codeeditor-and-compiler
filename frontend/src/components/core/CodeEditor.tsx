import ReactCodeMirror, { EditorView, highlightActiveLine, highlightSpecialChars } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language }) => {
    const getLanguageExtension = (lang: string) => {
        switch (lang) {
            case 'javascript':
            case 'typescript':
                return javascript({ jsx: true, typescript: lang === 'typescript' });
            case 'python':
                return python();
            default:
                return javascript();
        }
    };
    return (
        <ReactCodeMirror
            value={value}
            theme={vscodeDark}
            extensions={[javascript(), python(), cpp(), highlightActiveLine(), highlightSpecialChars(),
            EditorView.lineWrapping,
            getLanguageExtension(language)
            ]}
            onChange={onChange}
            height={'100%'}
            placeholder={'Write your code here...'}
            basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true
            }}
        />
    );
}

export default CodeEditor;
