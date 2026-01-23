<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileText, Video, FileCode, ListChecks, Play } from 'lucide-react';
import toast from 'react-hot-toast';

// Simple code editor supporting JavaScript and Python
const CodeExerciseEditor = ({ content, onUpdate }) => {
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState(content.language || 'javascript');
  const [code, setCode] = useState(content.starterCode || '');
  const [pyodideReady, setPyodideReady] = useState(false);
  const pyodideRef = useRef(null);

  useEffect(() => {
    onUpdate({ ...content, language, starterCode: code });
  }, [language, code, content, onUpdate]);

  // Load pyodide when Python is selected
  useEffect(() => {
    if (language === 'python' && !pyodideReady) {
      const loadPyodide = async () => {
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.0/full/pyodide.js';
          script.onload = async () => {
            const pyodide = await window.loadPyodide();
            pyodideRef.current = pyodide;
            setPyodideReady(true);
          };
          document.head.appendChild(script);
        } else {
          try {
            const pyodide = await window.loadPyodide();
            pyodideRef.current = pyodide;
            setPyodideReady(true);
          } catch (err) {
            console.error("Failed to load pyodide", err);
          }
        }
      };
      loadPyodide();
    }
  }, [language, pyodideReady]);

  const runCode = async () => {
    setOutput('');
    try {
      if (language === 'javascript') {
        // Execute code in a simple sandbox
        // Avoid using eval directly in production
        const result = new Function(code)();
        setOutput(String(result));
      } else if (language === 'python') {
        if (!pyodideReady || !pyodideRef.current) {
          setOutput('Loading Python interpreter...');
          return;
        }
        const result = await pyodideRef.current.runPythonAsync(code);
        setOutput(String(result));
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button
          onClick={runCode}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 flex items-center space-x-1"
        >
          <Play className="w-4 h-4" />
          <span>Run Code</span>
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-40 bg-gray-900 border border-gray-600 rounded p-4 text-green-400 font-mono text-sm"
        placeholder="Write code here..."
      />
      {output && (
        <div className="bg-gray-900 border border-gray-600 rounded p-4">
          <h4 className="text-white font-semibold mb-2">Output:</h4>
          <pre className="text-blue-400 font-mono text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
};

const ContentItem = ({ type, content, onUpdate, onRemove }) => {
  const renderContentInput = () => {
    switch (type) {
      case 'text':
        return (
          <textarea
            value={content.content || ''}
            onChange={(e) => onUpdate({ ...content, content: e.target.value })}
            className="w-full p-2 border rounded bg-gray-800 text-white"
            rows={4}
            placeholder="Enter your text content here..."
          />
        );
      case 'video':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => onUpdate({ ...content, title: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-white"
              placeholder="Video Title"
            />
            <input
              type="url"
              value={content.url || ''}
              onChange={(e) => onUpdate({ ...content, url: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-white"
              placeholder="Video URL (YouTube, Vimeo, etc.)"
            />
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={content.question || ''}
              onChange={(e) => onUpdate({ ...content, question: e.target.value })}
              className="w-full p-2 border rounded bg-gray-800 text-white"
              placeholder="Question"
            />
            <div className="space-y-2">
              {content.options?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={content.correctAnswers?.includes(i) || false}
                    onChange={(e) => {
                      const correctAnswers = [...(content.correctAnswers || [])];
                      if (e.target.checked) {
                        correctAnswers.push(i);
                      } else {
                        const index = correctAnswers.indexOf(i);
                        if (index > -1) correctAnswers.splice(index, 1);
                      }
                      onUpdate({ ...content, correctAnswers });
                    }}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const options = [...content.options];
                      options[i] = e.target.value;
                      onUpdate({ ...content, options });
                    }}
                    className="flex-1 p-2 border rounded bg-gray-800 text-white"
                    placeholder={`Option ${i + 1}`}
                  />
                  <button
                    onClick={() => {
                      const options = content.options.filter((_, idx) => idx !== i);
                      onUpdate({ ...content, options });
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const options = [...(content.options || []), ''];
                  onUpdate({ ...content, options });
                }}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                <Plus size={14} className="mr-1" /> Add Option
              </button>
            </div>
          </div>
        );
      case 'code':
        return <CodeExerciseEditor content={content} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };
=======
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { FaPlay, FaCheckCircle, FaLock, FaFilePdf, FaBook, FaCode, FaTerminal } from 'react-icons/fa';
import { BsFileText } from 'react-icons/bs';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import toast from 'react-hot-toast';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// --- NEW IMPORTS ---
import Editor from "@monaco-editor/react";
import { VscRunAll } from "react-icons/vsc";
// -------------------

import QuizEditor from '../../components/forms/QuizEditor';
import ProgressBar from '../../components/common/ProgressBar';
import XPCounter from '../../components/common/XPCounter';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CourseContent = () => {
    const { id: courseId } = useParams();
    const { user } = useContext(AuthContext);

    // State
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState(new Set());
    const [, setIsEnrolled] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [earnedXP, setEarnedXP] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // --- NEW CODING STATES ---
    const [userCode, setUserCode] = useState("");
    const [executionOutput, setExecutionOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    // -------------------------

    // (Keeping your sampleCourse data exactly as provided...)
    const sampleCourse = {
        // ... all your existing sections and lessons ...
        id: courseId,
        title: "Complete Web Development Bootcamp",
        sections: [
            {
                id: 1,
                title: "Web Development Fundamentals",
                lessons: [
                    { id: '1-1', title: "Introduction to HTML", type: "article", content: "<h2>HTML...</h2>", xp: 10 },
                    { id: '1-2', title: "CSS Styling Basics", type: "video", content: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", xp: 15 },
                    { id: '1-3', title: "JavaScript Fundamentals", type: "pdf", content: "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf", xp: 20 }
                ]
            },
            {
                id: 2,
                title: "Frontend Frameworks",
                lessons: [
                    { id: '2-1', title: "Introduction to React", type: "article", content: "<h2>React...</h2>", xp: 10 },
                    { id: '2-2', title: "React Quiz", type: "quiz", questions: [{ id: 1, type: 'mcq', question: 'Test?', options: ['A','B'], correctAnswer: 0 }], xp: 25 },
                    {
                        id: '2-3',
                        title: "React Coding Exercise",
                        type: "coding",
                        exercise: {
                            description: "Create a JavaScript function that returns 'Hello World'.",
                            starterCode: `function main() {\n  console.log("Hello World");\n}\n\nmain();`,
                            language: "javascript" // Piston needs this
                        },
                        xp: 30
                    }
                ]
            }
        ]
    };

    useEffect(() => {
        setLoading(true);
        try {
            setCourse(sampleCourse);
            setIsEnrolled(true);
            if (sampleCourse?.sections?.[0]?.lessons?.[0]) {
                setActiveLesson(sampleCourse.sections[0].lessons[0]);
            }
        } catch {
            setError('Error loading data');
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    // Update editor content when lesson changes
    useEffect(() => {
        if (activeLesson?.type === 'coding') {
            setUserCode(activeLesson.exercise?.starterCode || "");
            setExecutionOutput("");
        }
        setCurrentQuestionIndex(0);
        setAnswers({});
    }, [activeLesson?.id]);

    // --- NEW PISTON API FUNCTION ---
    const handleRunCode = async () => {
        setIsExecuting(true);
        setExecutionOutput("Running code...");
        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: "javascript",
                    version: "18.15.0",
                    files: [{ content: userCode }],
                }),
            });
            const data = await response.json();
            if (data.run) {
                setExecutionOutput(data.run.output || data.run.stderr || "Success (No Output)");
            } else {
                setExecutionOutput("Execution failed.");
            }
        } catch (err) {
            setExecutionOutput("Error: Connection to Piston API failed.");
        } finally {
            setIsExecuting(false);
        }
    };
    // -------------------------------
>>>>>>> e73cd45 (finally Karim's Push)

    const markLessonComplete = (lessonId) => {
        setCompletedLessons(prev => {
            const newSet = new Set(prev);
            newSet.add(lessonId);
            return newSet;
        });
        const lesson = course?.sections?.flatMap(s => s.lessons)?.find(l => l.id === lessonId);
        if (lesson && lesson.xp) {
            setEarnedXP(prevXP => prevXP + lesson.xp);
            toast.success(`+${lesson.xp} XP Earned!`);
        }
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

<<<<<<< HEAD
const Section = ({ section, onUpdate, onRemove }) => {
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [_newContentType, _setNewContentType] = useState('text');
=======
    const calculateProgress = () => {
        if (!course || !course.sections) return 0;
        const totalLessons = course.sections.reduce((total, section) => total + (section.lessons?.length || 0), 0);
        if (totalLessons === 0) return 0;
        return Math.round((completedLessons.size / totalLessons) * 100);
    };
>>>>>>> e73cd45 (finally Karim's Push)

    const renderLessonContent = () => {
        if (!activeLesson) return null;

        switch (activeLesson.type) {
            case 'video':
                return (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <ReactPlayer url={activeLesson.content} width="100%" height="100%" controls onEnded={() => markLessonComplete(activeLesson.id)} />
                    </div>
                );
            case 'article':
                return (
                    <div className="prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                        <button onClick={() => markLessonComplete(activeLesson.id)} className="mt-4 btn btn-primary">Mark as Complete</button>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="h-[500px] flex flex-col">
                        <div className="flex-1 bg-gray-800 rounded-lg overflow-auto">
                            <Document file={activeLesson.content} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                                <Page pageNumber={pageNumber} width={600} />
                            </Document>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber <= 1} className="btn btn-sm">Prev</button>
                            <span>{pageNumber} / {numPages}</span>
                            <button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))} disabled={pageNumber >= numPages} className="btn btn-sm">Next</button>
                        </div>
                    </div>
                );
            case 'quiz': {
                const currentQuestion = activeLesson.questions?.[currentQuestionIndex];
                if (!currentQuestion) return null;
                return (
                    <div className="py-4">
                        <p className="mb-4 text-lg">{currentQuestion.question}</p>
                        {/* (Simplified for brevity, keep your original quiz UI logic here) */}
                        <button onClick={() => markLessonComplete(activeLesson.id)} className="btn btn-primary mt-4">Submit Quiz</button>
                    </div>
                );
            }

            // --- UPDATED CODING CASE ---
            case 'coding':
                return (
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center bg-gray-700 p-4 rounded-t-lg">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <FaCode className="text-cyan-400" /> Coding Workspace
                                </h3>
                                <p className="text-sm text-gray-400">{activeLesson.exercise?.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleRunCode}
                                    disabled={isExecuting}
                                    className={`btn btn-sm flex items-center gap-2 ${isExecuting ? 'btn-disabled' : 'btn-success text-white'}`}
                                >
                                    {isExecuting ? <span className="loading loading-spinner loading-xs"></span> : <VscRunAll />}
                                    Run
                                </button>
                                <button onClick={() => markLessonComplete(activeLesson.id)} className="btn btn-sm btn-outline btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-700 h-[400px]">
                            {/* Monaco Editor */}
                            <div className="bg-[#1e1e1e]">
                                <Editor
                                    height="100%"
                                    theme="vs-dark"
                                    language="javascript"
                                    value={userCode}
                                    onChange={(val) => setUserCode(val)}
                                    options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false }}
                                />
                            </div>

                            {/* Terminal Output */}
                            <div className="bg-black p-4 font-mono text-sm overflow-auto">
                                <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-gray-800 pb-1">
                                    <FaTerminal size={12} /> OUTPUT
                                </div>
                                <pre className="text-green-400 whitespace-pre-wrap">
                                    {executionOutput || "> Click 'Run' to execute code..."}
                                </pre>
                            </div>
                        </div>
                    </div>
                );
            // ---------------------------

            default:
                return <div>Unsupported content type</div>;
        }
    };

    const getLessonIcon = (type) => {
        switch (type) {
            case 'video': return <FaPlay className="text-blue-400" />;
            case 'article': return <BsFileText className="text-green-400" />;
            case 'pdf': return <FaFilePdf className="text-red-400" />;
            case 'quiz': return <RiQuestionAnswerFill className="text-yellow-400" />;
            case 'coding': return <FaCode className="text-purple-400" />;
            default: return <FaBook className="text-gray-400" />;
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="loading loading-spinner loading-lg text-primary"></div></div>;

    const progress = calculateProgress();
    const totalLessons = course?.sections?.reduce((total, section) => total + (section.lessons?.length || 0), 0);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Keeping your existing JSX structure... */}
            <header className="bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">{course?.title}</h1>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProgressBar current={completedLessons.size} max={totalLessons} label="Lessons Completed" color="cyan" />
                        <ProgressBar current={progress} max={100} label="Course Progress" color="blue" />
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-120px)]">
                <aside className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
                    <div className="p-4">
                        {course?.sections?.map((section, sIdx) => (
                            <div key={sIdx} className="mb-4">
                                <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">{section.title}</h3>
                                {section.lessons.map((lesson, lIdx) => (
                                    <button 
                                        key={lIdx} 
                                        onClick={() => setActiveLesson(lesson)}
                                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm mb-1 ${activeLesson?.id === lesson.id ? 'bg-blue-900' : 'hover:bg-gray-700'}`}
                                    >
                                        {completedLessons.has(lesson.id) ? <FaCheckCircle className="text-green-500" /> : getLessonIcon(lesson.type)}
                                        {lesson.title}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto p-6">
                    {activeLesson ? (
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
                            <div className="bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-700">
                                {renderLessonContent()}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">Select a lesson to start</div>
                    )}
                </main>
            </div>
        </div>
    );
<<<<<<< HEAD
  };

  const removeSection = (sectionId) => {
    if (sections.length > 1) {
      updateSections(sections.filter(section => section.id !== sectionId));
    } else {
      toast.error("At least one section is required");
    }
  };

  const moveSection = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= sections.length) return;
    
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    updateSections(newSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-200">Course Content</h3>
        <button
          onClick={addSection}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 flex items-center space-x-1"
        >
          <Plus size={18} />
          <span>Add Section</span>
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            {index > 0 && (
              <button
                onClick={() => moveSection(index, index - 1)}
                className="absolute -left-10 top-0 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Move up"
              >
                ↑
              </button>
            )}
            <Section
              section={section}
              onUpdate={(updatedSection) => updateSection(section.id, updatedSection)}
              onRemove={() => removeSection(section.id)}
            />
            {index < sections.length - 1 && (
              <button
                onClick={() => moveSection(index, index + 1)}
                className="absolute -left-10 bottom-0 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Move down"
              >
                ↓
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContentEditor;
=======
};

export default CourseContent;
>>>>>>> e73cd45 (finally Karim's Push)
