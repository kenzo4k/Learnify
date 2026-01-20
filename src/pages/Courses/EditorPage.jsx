import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, ChevronLeft } from "lucide-react";

const CodingWorkspace = () => {
  const { courseId, exerciseId } = useParams();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock fetching data based on the route params
  useEffect(() => {
    // In a real app, fetch from Firebase using courseId/exerciseId
    const starterCode = "console.log('Hello, Student!');";
    setCode(starterCode);
  }, [exerciseId]);

  const executeCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        body: JSON.stringify({
          language: "javascript",
          version: "18.15.0",
          files: [{ content: code }],
        }),
      });
      const data = await response.json();
      setOutput(data.run.output || data.run.stderr);
    } catch (err) {
      setOutput("Error executing code.");
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="pt-24 min-h-screen bg-[#0d1117] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold italic text-blue-400">
            Stride IDE
          </h1>
          <p className="text-gray-400">Powered by Piston Engine</p>
        </div>
        <div className="flex gap-4">
          <select
            className="bg-[#161b22] border border-gray-700 rounded px-4 py-2 text-white outline-none focus:border-blue-500"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
          <button
            onClick={runCode}
            disabled={isLoading}
            className="px-8 py-2 rounded-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-all disabled:opacity-50"
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>
=======
    <div className="h-screen bg-[#1e1e1e] flex flex-col text-white">
      {/* Top Navigation */}
      <header className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-400 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Course
        </button>
        <button
          onClick={executeCode}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 px-6 py-1.5 rounded flex items-center gap-2 font-bold"
        >
          {loading ? (
            "Running..."
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Run Code
            </>
          )}
        </button>
      </header>
>>>>>>> e73cd45 (finally Karim's Push)

      {/* Workspace Split */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 border-r border-gray-700">
          <Editor
            theme="vs-dark"
            language="javascript"
            value={code}
            onChange={(val) => setCode(val)}
            options={{ fontSize: 16, minimap: { enabled: false } }}
          />
        </div>
        <div className="w-1/3 bg-black p-4 font-mono text-sm">
          <h4 className="text-gray-500 mb-2 uppercase text-xs">
            Console Output
          </h4>
          <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodingWorkspace;
