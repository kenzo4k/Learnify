import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const CodeExercise = ({ exerciseId, initialCode, language = "javascript" }) => {
  const [code, setCode] = useState(initialCode || "// Write your code here...");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error

  const runCode = async () => {
    setIsRunning(true);
    setStatus("idle");
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language,
          version: "*",
          files: [{ content: code }],
        }),
      });

      const data = await response.json();

      if (data.run) {
        setOutput(data.run.output || "Code executed successfully (no output).");
        setStatus(data.run.code === 0 ? "success" : "error");
      }
    } catch (error) {
      setOutput("Error connecting to execution server.");
      setStatus("error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-cyan-400">Coding Exercise</h3>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 uppercase">
            {language}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCode(initialCode)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run Code
          </button>
        </div>
      </div>

      {/* Editor and Output Split Screen */}
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 border-r border-gray-700">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 20 },
            }}
          />
        </div>

        {/* Console Output */}
        <div className="w-full md:w-1/3 bg-black/30 flex flex-col">
          <div className="p-3 border-b border-gray-700 text-xs font-mono text-gray-500 flex items-center justify-between">
            CONSOLE OUTPUT
            {status === "success" && (
              <CheckCircle className="w-3 h-3 text-green-500" />
            )}
            {status === "error" && (
              <AlertCircle className="w-3 h-3 text-red-500" />
            )}
          </div>
          <pre
            className={`p-4 font-mono text-sm overflow-auto flex-1 ${
              status === "error" ? "text-red-400" : "text-gray-300"
            }`}
          >
            {output || "> Click 'Run Code' to see results..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeExercise;
