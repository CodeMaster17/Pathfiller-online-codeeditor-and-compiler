import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => (
    <ReactCodeMirror
        value={value}
        theme={vscodeDark}
        extensions={[javascript()]}
        onChange={onChange}
        height={'100%'}
        placeholder={'Write your code here...'}
    />
);

export default CodeEditor;
