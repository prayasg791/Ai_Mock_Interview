import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, language, onCodeChange }) => {
    return (
        <Editor
            height="80vh"
            language={language}
            value={code}
            options={{
                minimap: {
                    enabled: false
                },
                fontSize: 16,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                wordBasedSuggestions: "currentDocument"
            }}
            onChange={(value = "") => {
                onCodeChange(value);
            }}
        />
    );
};

export default CodeEditor;