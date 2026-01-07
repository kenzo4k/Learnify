import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
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
            },
            {
                id: 3,
                title: "Backend Development",
                lessons: [
                    {
                        id: '3-1',
                        title: "Introduction to Node.js",
                        type: "article",
                        content: `
                            <h2>Getting Started with Node.js</h2>
                            <p>Node.js is a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript on the server side, enabling full-stack JavaScript development.</p>
                            
                            <h3>Why Node.js?</h3>
                            <ul>
                                <li><strong>Non-blocking I/O:</strong> Asynchronous architecture makes it perfect for real-time applications</li>
                                <li><strong>NPM Ecosystem:</strong> Access to over a million packages through npm</li>
                                <li><strong>JavaScript Everywhere:</strong> Use the same language on both frontend and backend</li>
                                <li><strong>High Performance:</strong> V8 engine compiles JavaScript to native machine code</li>
                                <li><strong>Scalability:</strong> Built-in support for handling concurrent connections</li>
                            </ul>

                            <h3>Basic Node.js Server Example:</h3>
                            <pre><code>const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});</code></pre>

                            <h3>Core Modules:</h3>
                            <ul>
                                <li><code>http</code> - Create web servers</li>
                                <li><code>fs</code> - File system operations</li>
                                <li><code>path</code> - Handle file paths</li>
                                <li><code>events</code> - Event-driven programming</li>
                            </ul>
                        `,
                        xp: 15
                    },
                    {
                        id: '3-2',
                        title: "Node.js Video Tutorial",
                        type: "video",
                        content: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
                        xp: 20
                    },
                    {
                        id: '3-3',
                        title: "Backend Quiz",
                        type: "quiz",
                        questions: [
                            {
                                id: 1,
                                type: 'mcq',
                                question: 'What is Node.js built on?',
                                options: [
                                    'Chrome V8 Engine',
                                    'SpiderMonkey Engine',
                                    'JavaScriptCore',
                                    'Rhino Engine'
                                ],
                                correctAnswer: 0,
                                points: 1
                            },
                            {
                                id: 2,
                                type: 'fillInBlank',
                                question: 'NPM stands for Node _____ _____',
                                correctAnswer: 'Package Manager',
                                points: 1
                            },
                            {
                                id: 3,
                                type: 'trueFalse',
                                question: 'Node.js uses a blocking I/O model.',
                                correctAnswer: false,
                                points: 1
                            },
                            {
                                id: 4,
                                type: 'matching',
                                question: 'Match Node.js concepts with their descriptions:',
                                pairs: [
                                    { left: 'Express', right: 'Web Framework', correct: true },
                                    { left: 'npm', right: 'Package Manager', correct: true },
                                    { left: 'middleware', right: 'Request Handler', correct: true }
                                ],
                                points: 1
                            }
                        ],
                        xp: 25
                    },
                    {
                        id: '3-4',
                        title: "Express.js Exercise",
                        type: "coding",
                        exercise: {
                            description: "Create an Express.js server with a GET endpoint that returns a JSON response with user data.",
                            starterCode: `const express = require('express');
const app = express();

// TODO: Create a GET route at '/api/user' that returns
// { name: 'John Doe', email: 'john@example.com' }

// TODO: Start the server on port 3000

app.listen(3000, () => {
  console.log('Server started on port 3000');
});`,
                            solution: `const express = require('express');
const app = express();

app.get('/api/user', (req, res) => {
  res.json({ 
    name: 'John Doe', 
    email: 'john@example.com' 
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});`
                        },
                        xp: 30
                    }
                ]
            },
            {
                id: 4,
                title: "Database Management",
                lessons: [
                    {
                        id: '4-1',
                        title: "SQL Basics",
                        type: "article",
                        content: `
                            <h2>Introduction to SQL</h2>
                            <p>SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. It's essential for any backend developer working with data.</p>
                            
                            <h3>Core SQL Operations (CRUD):</h3>
                            <ul>
                                <li><strong>CREATE:</strong> Insert new data into tables</li>
                                <li><strong>READ:</strong> Query and retrieve data using SELECT</li>
                                <li><strong>UPDATE:</strong> Modify existing data</li>
                                <li><strong>DELETE:</strong> Remove data from tables</li>
                            </ul>

                            <h3>Basic SQL Commands:</h3>
                            <pre><code>-- Create a table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) 
VALUES ('John Doe', 'john@example.com');

-- Query data
SELECT * FROM users WHERE email = 'john@example.com';

-- Update data
UPDATE users SET name = 'Jane Doe' WHERE id = 1;

-- Delete data
DELETE FROM users WHERE id = 1;</code></pre>

                            <h3>Key SQL Concepts:</h3>
                            <ul>
                                <li><strong>Primary Key:</strong> Unique identifier for each row</li>
                                <li><strong>Foreign Key:</strong> Link between tables</li>
                                <li><strong>JOIN:</strong> Combine data from multiple tables</li>
                                <li><strong>INDEX:</strong> Improve query performance</li>
                            </ul>
                        `,
                        xp: 15
                    },
                    {
                        id: '4-2',
                        title: "Database Design Video",
                        type: "video",
                        content: "https://www.youtube.com/watch?v=ztHopE5Wnpc",
                        xp: 20
                    },
                    {
                        id: '4-3',
                        title: "Database Quiz",
                        type: "quiz",
                        questions: [
                            {
                                id: 1,
                                type: 'mcq',
                                question: 'Which SQL command is used to retrieve data from a database?',
                                options: [
                                    'SELECT',
                                    'GET',
                                    'FETCH',
                                    'RETRIEVE'
                                ],
                                correctAnswer: 0,
                                points: 1
                            },
                            {
                                id: 2,
                                type: 'fillInBlank',
                                question: 'A _____ key uniquely identifies each record in a database table',
                                correctAnswer: 'primary',
                                points: 1
                            },
                            {
                                id: 3,
                                type: 'trueFalse',
                                question: 'NoSQL databases use structured tables like SQL databases.',
                                correctAnswer: false,
                                points: 1
                            },
                            {
                                id: 4,
                                type: 'matching',
                                question: 'Match database types with their characteristics:',
                                pairs: [
                                    { left: 'MongoDB', right: 'Document Store', correct: true },
                                    { left: 'PostgreSQL', right: 'Relational DB', correct: true },
                                    { left: 'Redis', right: 'Key-Value Store', correct: true }
                                ],
                                points: 1
                            }
                        ],
                        xp: 25
                    },
                    {
                        id: '4-4',
                        title: "MongoDB Exercise",
                        type: "coding",
                        exercise: {
                            description: "Write MongoDB queries to create a collection, insert documents, and query data from a users collection.",
                            starterCode: `// Connect to MongoDB
const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');
    
    // TODO: Insert a new user document with name and email
    
    // TODO: Find all users
    
    // TODO: Update a user's email
    
    // TODO: Delete a user
    
  } finally {
    await client.close();
  }
}

run();`,
                            solution: `// Connect to MongoDB
const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');
    
    // Insert a new user
    await users.insertOne({ 
      name: 'John Doe', 
      email: 'john@example.com' 
    });
    
    // Find all users
    const allUsers = await users.find().toArray();
    console.log(allUsers);
    
    // Update user's email
    await users.updateOne(
      { name: 'John Doe' },
      { $set: { email: 'newemail@example.com' } }
    );
    
    // Delete user
    await users.deleteOne({ name: 'John Doe' });
    
  } finally {
    await client.close();
  }
}

run();`
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
        document.title = "Course Details | Learnify";

        try {
            // Use sample data for testing
            setCourse(sampleCourse);
            setIsEnrolled(true); // Simulate being enrolled

            // Set first lesson as active by default
            if (sampleCourse?.sections?.[0]?.lessons?.[0]) {
            setActiveLesson(sampleCourse.sections[0].lessons[0]);
            }

            } catch {
            setError('An error occurred while loading the course content');
            toast.error('Failed to load course content');
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

        // Display only exercises or content without any editor or code execution
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
                            className="btn bg-green-600 hover:bg-green-700 text-white border-none mt-4"
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
                                className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-sm"
                            >
                                Previous
                            </button>
                            <span>Page {pageNumber} of {numPages || '--'}</span>
                            <button
                                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                disabled={pageNumber >= (numPages || 1)}
                                className="btn bg-gray-700 hover:bg-gray-600 text-white border-none btn-sm"
                            >
                                Next
                            </button>
                        </div>
                        <a
                            href={activeLesson.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-gray-700 hover:bg-gray-600 text-white border-none mt-4 w-full"
                        >
                            <FaFilePdf className="mr-2" /> Download PDF
                        </a>
                    </div>
                );
            case 'quiz': {
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
                                    className="btn bg-gray-700 hover:bg-gray-600 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        className="btn bg-green-600 hover:bg-green-700 text-white border-none"
                                    >
                                        Finish Quiz
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            setCurrentQuestionIndex(Math.min(activeLesson.questions.length - 1, currentQuestionIndex + 1));
                                        }}
                                        className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={currentQuestionIndex === activeLesson.questions.length - 1}
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }
            case 'coding':
                // Display exercise text only without editor or code execution
                return (
                    <div className="py-8">
                        <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
                        <p className="mb-4 text-gray-400">{activeLesson.exercise?.description}</p>
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                            <pre className="text-sm overflow-x-auto"><code>{activeLesson.exercise?.starterCode}</code></pre>
                        </div>
                        <button
                            onClick={() => markLessonComplete(activeLesson.id)}
                            className="btn bg-green-600 hover:bg-green-700 text-white border-none"
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold">{course?.title || 'Course Content'}</h1>
                        <button 
                            onClick={() => navigate(`/course/${courseId}/assessment`)}
                            className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
                        >
                            <RiQuestionAnswerFill className="mr-2" />
                            Take Assessment Quiz
                        </button>
                    </div>
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
                                    className="btn bg-gray-700 hover:bg-gray-600 text-white border-none"
                                    onClick={() => {
                                        // Find previous lesson logic would go here
                                        toast('Previous lesson');
                                    }}
                                >
                                    Previous Lesson
                                </button>
                                <button
                                    className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
                                    onClick={() => {
                                        // Find next lesson logic would go here
                                        toast('Next lesson');
                                    }}
                                >
                                    Continue to Next
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
