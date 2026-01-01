import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { FaPlay, FaCheckCircle, FaLock, FaFilePdf, FaBook } from 'react-icons/fa';
import { BsFileText } from 'react-icons/bs';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import toast from 'react-hot-toast';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import QuizEditor from '../../components/forms/QuizEditor';
import ProgressBar from '../../components/common/ProgressBar';
import XPCounter from '../../components/common/XPCounter';

// Configure PDF.js worker
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
    const [, setIsEnrolled] = useState(false); // Reserved for future use
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [earnedXP, setEarnedXP] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // Sample data for testing
    const sampleCourse = {
        id: courseId,
        title: "Complete Web Development Bootcamp",
        sections: [
            {
                id: 1,
                title: "Web Development Fundamentals",
                lessons: [
                    {
                        id: '1-1',
                        title: "Introduction to HTML",
                        type: "article",
                        content: `
                            <h2>What is HTML?</h2>
                            <p>HTML (HyperText Markup Language) is the backbone of any website. It allows you to create the structure and organize the content of web pages.</p>
                            <h3>Common HTML Elements:</h3>
                            <ul>
                                <li>Headings: &lt;h1&gt; to &lt;h6&gt;</li>
                                <li>Paragraphs: &lt;p&gt;</li>
                                <li>Links: &lt;a href="..."&gt;</li>
                                <li>Images: &lt;img src="..."&gt;</li>
                                <li>Lists: &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</li>
                                <li>Containers: &lt;div&gt;, &lt;section&gt;, &lt;article&gt;</li>
                            </ul>
                            <h3>Basic HTML Structure:</h3>
                            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                        `,
                        xp: 10
                    },
                    {
                        id: '1-2',
                        title: "CSS Styling Basics",
                        type: "video",
                        content: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
                        xp: 15
                    },
                    {
                        id: '1-3',
                        title: "JavaScript Fundamentals",
                        type: "pdf",
                        content: "https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf",
                        xp: 20
                    }
                ]
            },
            {
                id: 2,
                title: "Frontend Frameworks",
                lessons: [
                    {
                        id: '2-1',
                        title: "Introduction to React",
                        type: "article",
                        content: `
                            <h2>What is React?</h2>
                            <p>React is an open-source JavaScript library for building user interfaces, particularly single-page applications.</p>
                            
                            <h3>Key Features of React:</h3>
                            <ul>
                                <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
                                <li><strong>Declarative:</strong> Design simple views for each state in your application</li>
                                <li><strong>Virtual DOM:</strong> Efficiently update and render components</li>
                                <li><strong>Rich Ecosystem:</strong> Large community and extensive package ecosystem</li>
                            </ul>

                            <h3>Basic React Component Example:</h3>
                            <pre><code>import React from 'react';

function Welcome() {
  return <h1>Hello, World!</h1>;
}

export default Welcome;</code></pre>
                        `,
                        xp: 10
                    },
                    {
                        id: '2-2',
                        title: "React Quiz",
                        type: "quiz",
                        questions: [
                            {
                                id: 1,
                                type: 'mcq',
                                question: 'What does HTML stand for?',
                                options: [
                                    'Hyper Text Markup Language',
                                    'High Tech Modern Language',
                                    'Home Tool Markup Language',
                                    'Hyperlinks and Text Markup Language'
                                ],
                                correctAnswer: 0,
                                points: 1
                            },
                            {
                                id: 2,
                                type: 'fillInBlank',
                                question: 'CSS stands for _____ _____ _____',
                                correctAnswer: 'Cascading Style Sheets',
                                points: 1
                            },
                            {
                                id: 3,
                                type: 'trueFalse',
                                question: 'JavaScript can only run in web browsers.',
                                correctAnswer: false,
                                points: 1
                            },
                            {
                                id: 4,
                                type: 'matching',
                                question: 'Match programming languages to their use:',
                                pairs: [
                                    { left: 'React', right: 'Web Frontend', correct: true },
                                    { left: 'Django', right: 'Web Backend', correct: true },
                                    { left: 'SQL', right: 'Database', correct: true }
                                ],
                                points: 1
                            }
                        ],
                        xp: 25
                    },
                    {
                        id: '2-3',
                        title: "React Coding Exercise",
                        type: "coding",
                        exercise: {
                            description: "Create a React component that displays a greeting message.",
                            starterCode: `function Greeting() {\n  // Your code here\n  return null;\n}`,
                            solution: `function Greeting() {\n  return <h1>Hello, World!</h1>;\n}`
                        },
                        xp: 30
                    }
                ]
            }
        ]
    };

    // Fetch course data and check enrollment status
    useEffect(() => {
        setLoading(true);
        document.title = "تفاصيل الدورة | Learnify";

        try {
            // Use sample data for testing
            setCourse(sampleCourse);
            setIsEnrolled(true); // Simulate being enrolled

            // Set first lesson as active by default
            if (sampleCourse?.sections?.[0]?.lessons?.[0]) {
            setActiveLesson(sampleCourse.sections[0].lessons[0]);
            }

            } catch {
            setError('حدث خطأ في تحميل محتوى الدورة');
            toast.error('فشل تحميل محتوى الدورة');
            } finally {
            setLoading(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [courseId]);

    // Reset quiz state when lesson changes
    useEffect(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
    }, [activeLesson?.id]);

    // Handle lesson completion
    const markLessonComplete = (lessonId) => {
        setCompletedLessons(prev => {
            const newSet = new Set(prev);
            newSet.add(lessonId);
            // In a real app, you would also update this on the server
            return newSet;
        });
        // Add XP for completed lesson
        const lesson = course?.sections?.flatMap(s => s.lessons)?.find(l => l.id === lessonId);
        if (lesson && lesson.xp) {
            setEarnedXP(prevXP => prevXP + lesson.xp);
        }
    };

    // Handle quiz answer
    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    // Calculate course progress
    const calculateProgress = () => {
        if (!course || !course.sections) return 0;

        const totalLessons = course.sections.reduce(
            (total, section) => total + (section.lessons?.length || 0), 0
        );

        if (totalLessons === 0) return 0;
        return Math.round((completedLessons.size / totalLessons) * 100);
    };

    // Render different content based on lesson type
    const renderLessonContent = () => {
        if (!activeLesson) return null;

        // عرض فقط التمارين (exercises) أو المحتوى بدون أي محرر أو تشغيل كود
        switch (activeLesson.type) {
            case 'video':
                return (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <ReactPlayer
                            url={activeLesson.content}
                            width="100%"
                            height="100%"
                            controls
                            onEnded={() => markLessonComplete(activeLesson.id)}
                        />
                    </div>
                );
            case 'article':
                return (
                    <div className="prose prose-invert max-w-none">
                        <h2>{activeLesson.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                        <button
                            onClick={() => markLessonComplete(activeLesson.id)}
                            className="mt-4 btn btn-primary"
                        >
                            Mark as Complete
                        </button>
                    </div>
                );
            case 'pdf':
                return (
                    <div className="h-full flex flex-col">
                        <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
                            <Document
                                file={activeLesson.content}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                className="h-full"
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                disabled={pageNumber <= 1}
                                className="btn btn-sm"
                            >
                                Previous
                            </button>
                            <span>Page {pageNumber} of {numPages || '--'}</span>
                            <button
                                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                disabled={pageNumber >= (numPages || 1)}
                                className="btn btn-sm"
                            >
                                Next
                            </button>
                        </div>
                        <a
                            href={activeLesson.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 btn btn-outline w-full"
                        >
                            <FaFilePdf className="mr-2" /> Download PDF
                        </a>
                    </div>
                );
            case 'quiz':
                const currentQuestion = activeLesson.questions?.[currentQuestionIndex];
                if (!currentQuestion) return null;
                
                return (
                    <div className="py-8">
                        <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
                        <p className="text-gray-400 mb-6">Test your knowledge in this lesson</p>
                        
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-400">
                                    Question {currentQuestionIndex + 1} of {activeLesson.questions?.length}
                                </span>
                                <div className="inline-block">
                                    <span className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm font-semibold">
                                        {currentQuestion.type === 'mcq' && 'Multiple Choice'}
                                        {currentQuestion.type === 'fillInBlank' && 'Fill in the Blank'}
                                        {currentQuestion.type === 'trueFalse' && 'True/False'}
                                        {currentQuestion.type === 'matching' && 'Matching'}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-700 rounded-lg p-6 min-h-[300px]">
                                {currentQuestion.type === 'mcq' && (
                                    <div className="space-y-3">
                                        <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                                        {currentQuestion.options.map((option, idx) => (
                                            <label 
                                                key={idx} 
                                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                                    answers[currentQuestion.id] === idx 
                                                        ? 'border-cyan-500 bg-cyan-900/30' 
                                                        : 'border-gray-600 hover:bg-gray-600'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${currentQuestion.id}`}
                                                    value={idx}
                                                    checked={answers[currentQuestion.id] === idx}
                                                    onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
                                                    className="mr-3 radio radio-primary"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {currentQuestion.type === 'fillInBlank' && (
                                    <div className="space-y-3">
                                        <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                                        <input
                                            type="text"
                                            placeholder="Your answer..."
                                            value={answers[currentQuestion.id] || ''}
                                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white focus:border-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                )}

                                {currentQuestion.type === 'trueFalse' && (
                                    <div className="space-y-3">
                                        <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleAnswer(currentQuestion.id, true)}
                                                className={`flex-1 p-4 rounded text-white font-semibold transition-colors ${
                                                    answers[currentQuestion.id] === true
                                                        ? 'bg-green-700 ring-2 ring-green-400'
                                                        : 'bg-green-600 hover:bg-green-700'
                                                }`}
                                            >
                                                True
                                            </button>
                                            <button
                                                onClick={() => handleAnswer(currentQuestion.id, false)}
                                                className={`flex-1 p-4 rounded text-white font-semibold transition-colors ${
                                                    answers[currentQuestion.id] === false
                                                        ? 'bg-red-700 ring-2 ring-red-400'
                                                        : 'bg-red-600 hover:bg-red-700'
                                                }`}
                                            >
                                                False
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {currentQuestion.type === 'matching' && (
                                    <div className="space-y-3">
                                        <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-semibold mb-3 text-cyan-400">Items</h4>
                                                {currentQuestion.pairs.map((pair, idx) => (
                                                    <div key={idx} className="p-3 bg-gray-800 rounded mb-2 border border-gray-600">
                                                        {pair.left}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-3 text-cyan-400">Match with</h4>
                                                {currentQuestion.pairs.map((pair, idx) => (
                                                    <div key={idx} className="p-3 bg-gray-800 rounded mb-2 border border-gray-600">
                                                        {pair.right}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-3 italic">
                                            Note: In a real quiz, you would drag and drop to match items.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <button 
                                    onClick={() => {
                                        setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                                    }}
                                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    disabled={currentQuestionIndex === 0}
                                >
                                    ← Previous
                                </button>
                                
                                {currentQuestionIndex === activeLesson.questions.length - 1 ? (
                                    <button 
                                        onClick={() => {
                                            markLessonComplete(activeLesson.id);
                                            toast.success('Quiz completed!');
                                        }}
                                        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition-colors"
                                    >
                                        Finish Quiz
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            setCurrentQuestionIndex(Math.min(activeLesson.questions.length - 1, currentQuestionIndex + 1));
                                        }}
                                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        disabled={currentQuestionIndex === activeLesson.questions.length - 1}
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'coding':
                // عرض نص التمرين فقط بدون محرر أو تشغيل كود
                return (
                    <div className="py-8">
                        <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
                        <p className="mb-4 text-gray-400">{activeLesson.exercise?.description}</p>
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                            <pre className="text-sm overflow-x-auto"><code>{activeLesson.exercise?.starterCode}</code></pre>
                        </div>
                        <button
                            onClick={() => markLessonComplete(activeLesson.id)}
                            className="btn btn-success"
                        >
                            Mark Coding Exercise as Complete
                        </button>
                    </div>
                );
            default:
                return <div>Unsupported content type</div>;
        }
    };

    // Get icon based on lesson type
    const getLessonIcon = (type) => {
        switch (type) {
            case 'video': return <FaPlay className="text-blue-400" />;
            case 'article': return <BsFileText className="text-green-400" />;
            case 'pdf': return <FaFilePdf className="text-red-400" />;
            case 'quiz': return <RiQuestionAnswerFill className="text-yellow-400" />;
            case 'coding': return <FaBook className="text-purple-400" />;
            default: return <FaBook className="text-gray-400" />;
        }
    };

    // Temporarily disabled for testing - Enrollment check
    // if (!isEnrolled) {
    //     // In a real app, you might want to show a message and a button to enroll
    //     navigate(`/course/${courseId}`);
    //     return null;
    // }

    // Leaderboard mock data
    const leaderboard = [
        { name: 'Alice', xp: 120, badge: '🏆' },
        { name: 'Bob', xp: 110, badge: '🥈' },
        { name: 'Charlie', xp: 90, badge: '🥉' },
        { name: user?.displayName || 'You', xp: earnedXP, badge: '⭐' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error: {error}</span>
                </div>
            </div>
        );
    }

    const progress = calculateProgress();
    const totalLessons = course?.sections?.reduce((total, section) => total + (section.lessons?.length || 0), 0);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">{course?.title || 'Course Content'}</h1>
                    <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <ProgressBar
                                    current={completedLessons.size}
                                    max={totalLessons}
                                    label="Lessons Completed"
                                    color="cyan"
                                />
                            </div>
                            <div>
                                <ProgressBar
                                    current={progress}
                                    max={100}
                                    label="Course Progress"
                                    color="blue"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-400 font-bold">
                                XP Earned: {earnedXP}
                            </span>
                            <XPCounter xp={450} compact />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-120px)]">
                {/* Sidebar */}
                <aside className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Course Content</h2>
                        <div className="space-y-2">
                            {course?.sections?.map((section, sectionIndex) => (
                                <div key={section.id || sectionIndex} className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-medium text-gray-300">
                                            Section {sectionIndex + 1}: {section.title}
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            {section.lessons?.filter(l => completedLessons.has(l.id)).length}
                                            /{section.lessons?.length}
                                        </span>
                                    </div>
                                    <ul className="space-y-1">
                                        {section.lessons?.map((lesson, lessonIndex) => {
                                            const isActive = activeLesson?.id === lesson.id;
                                            const isCompleted = completedLessons.has(lesson.id);

                                            return (
                                                <li key={lesson.id || lessonIndex}>
                                                    <button
                                                        onClick={() => setActiveLesson(lesson)}
                                                        className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-2 text-sm transition-colors ${isActive
                                                            ? 'bg-blue-900 text-white'
                                                            : 'hover:bg-gray-700 text-gray-300'
                                                            }`}
                                                    >
                                                        <span className="flex-shrink-0">
                                                            {isCompleted ? (
                                                                <FaCheckCircle className="text-green-500" />
                                                            ) : (
                                                                getLessonIcon(lesson.type)
                                                            )}
                                                        </span>
                                                        <span className="truncate">
                                                            {lessonIndex + 1}. {lesson.title}
                                                        </span>
                                                        {!isCompleted && isActive && (
                                                            <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                                        )}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Leaderboard */}
                <aside className="w-64 bg-gray-900 border-l border-gray-800 p-4 flex-shrink-0">
                    <h2 className="text-lg font-semibold mb-4 text-yellow-400">Leaderboard</h2>
                    <ul className="space-y-3">
                        {leaderboard.map((user) => (
                            <li key={user.name} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2">
                                <span className="flex items-center gap-2">
                                    <span className="text-xl">{user.badge}</span>
                                    <span className="font-bold">{user.name}</span>
                                </span>
                                <span className="text-yellow-300 font-semibold">{user.xp} XP</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
                    {activeLesson ? (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6">{activeLesson.title}</h2>
                            <div className="bg-gray-800 rounded-lg p-6">
                                {renderLessonContent()}
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    className="btn btn-outline"
                                    onClick={() => {
                                        // Find previous lesson logic would go here
                                        toast('Previous lesson');
                                    }}
                                >
                                    Previous Lesson
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        // Find next lesson logic would go here
                                        toast('Next lesson');
                                    }}
                                >
                                    Next Lesson
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">Select a lesson to begin</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CourseContent;
