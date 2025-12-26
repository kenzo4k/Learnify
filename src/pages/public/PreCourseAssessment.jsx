// src/pages/public/PreCourseAssessment.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';

const PreCourseAssessment = () => {
    useEffect(() => {
        document.title = 'Pre-Course Assessment | Learnify';
    }, []);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

    const questions = useMemo(() => [
        {
            question: "What is Python primarily known for?",
            options: [
                "A compiled language for system programming",
                "An interpreted, high-level, general-purpose programming language",
                "A markup language for web pages",
                "A database management system"
            ],
            correct: 1
        },
        {
            question: "Which of the following is the correct way to create a variable in Python?",
            options: [
                "int x = 10;",
                "var x = 10",
                "x = 10",
                "declare x = 10"
            ],
            correct: 2
        },
        {
            question: "What will be the output of: print(type(3.14))?",
            options: [
                "<class 'int'>",
                "<class 'float'>",
                "<class 'double'>",
                "<class 'decimal'>"
            ],
            correct: 1
        },
        {
            question: "Which data type is immutable in Python?",
            options: [
                "List",
                "Dictionary",
                "Tuple",
                "Set"
            ],
            correct: 2
        },
        {
            question: "What is the correct way to create a list in Python?",
            options: [
                "list = {1, 2, 3}",
                "list = [1, 2, 3]",
                "list = (1, 2, 3)",
                "list = <1, 2, 3>"
            ],
            correct: 1
        },
        {
            question: "Which function is used to get the length of a list?",
            options: [
                "size()",
                "length()",
                "len()",
                "count()"
            ],
            correct: 2
        },
        {
            question: "What will be the output of: print(10 // 3)?",
            options: [
                "3.33",
                "3",
                "4",
                "1"
            ],
            correct: 1
        },
        {
            question: "Which keyword is used to define a function in Python?",
            options: [
                "function",
                "func",
                "def",
                "define"
            ],
            correct: 2
        },
        {
            question: "What is the output of: print('Hello' * 3)?",
            options: [
                "'HelloHelloHello'",
                "'Hello 3'",
                "Error",
                "'Hello'Hello'Hello'"
            ],
            correct: 0
        },
        {
            question: "Which statement is used to exit a loop in Python?",
            options: [
                "exit",
                "stop",
                "break",
                "return"
            ],
            correct: 2
        },
        {
            question: "What is the correct way to start a comment in Python?",
            options: [
                "// This is a comment",
                "# This is a comment",
                "/* This is a comment */",
                "-- This is a comment"
            ],
            correct: 1
        },
        {
            question: "Which of the following is NOT a Python data type?",
            options: [
                "str",
                "int",
                "char",
                "bool"
            ],
            correct: 2
        },
        {
            question: "What does the range() function return?",
            options: [
                "A list of numbers",
                "A range object",
                "An array",
                "A tuple"
            ],
            correct: 1
        },
        {
            question: "How do you create a dictionary in Python?",
            options: [
                "dict = {1: 'a', 2: 'b'}",
                "dict = [1: 'a', 2: 'b']",
                "dict = (1: 'a', 2: 'b')",
                "dict = <1: 'a', 2: 'b'>"
            ],
            correct: 0
        },
        {
            question: "What will be the output of: print(True and False)?",
            options: [
                "True",
                "False",
                "Error",
                "None"
            ],
            correct: 1
        },
        {
            question: "Which method is used to add an element to the end of a list?",
            options: [
                "add()",
                "insert()",
                "append()",
                "push()"
            ],
            correct: 2
        },
        {
            question: "What is the output of: print('Python'[2:4])?",
            options: [
                "Py",
                "th",
                "on",
                "yt"
            ],
            correct: 1
        },
        {
            question: "Which operator is used for exponentiation in Python?",
            options: [
                "^",
                "**",
                "^^",
                "exp()"
            ],
            correct: 1
        },
        {
            question: "What is the purpose of the __init__ method in a class?",
            options: [
                "To delete an object",
                "To initialize object attributes",
                "To create a new class",
                "To import modules"
            ],
            correct: 1
        },
        {
            question: "How do you handle exceptions in Python?",
            options: [
                "try-except block",
                "try-catch block",
                "do-catch block",
                "handle-error block"
            ],
            correct: 0
        }
    ], []);

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleSubmit = useCallback(() => {
        let correctCount = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correct) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
    }, [questions, selectedAnswers]);

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0 && !showResults) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !showResults) {
            handleSubmit();
        }
    }, [timeLeft, showResults, handleSubmit]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

    if (showResults) {
        const percentage = (score / questions.length) * 100;
        let feedback = "";
        let feedbackColor = "";

        if (percentage >= 80) {
            feedback = "Excellent! You have a strong foundation in Python basics.";
            feedbackColor = "text-green-400";
        } else if (percentage >= 60) {
            feedback = "Good job! You understand most Python basics, but there's room for improvement.";
            feedbackColor = "text-blue-400";
        } else if (percentage >= 40) {
            feedback = "You have some knowledge of Python basics. Keep practicing!";
            feedbackColor = "text-yellow-400";
        } else {
            feedback = "Don't worry! This assessment shows areas where you need more practice.";
            feedbackColor = "text-red-400";
        }

        return (
            <div className="bg-gray-900 py-20 min-h-screen">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            Assessment Complete!
                        </h1>
                        
                        <div className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700">
                            <div className="mb-8">
                                <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center mb-6">
                                    <span className="text-5xl font-bold text-white">{percentage}%</span>
                                </div>
                                <p className="text-2xl text-white mb-2">
                                    You scored <span className="font-bold text-teal-400">{score}</span> out of <span className="font-bold text-blue-400">{questions.length}</span>
                                </p>
                                <p className={`text-lg ${feedbackColor} mb-6`}>{feedback}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <p className="text-green-400 text-3xl font-bold">{score}</p>
                                    <p className="text-gray-300">Correct Answers</p>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <p className="text-red-400 text-3xl font-bold">{questions.length - score}</p>
                                    <p className="text-gray-300">Wrong Answers</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="btn btn-primary bg-gradient-to-r from-teal-500 to-blue-500 border-none text-white hover:opacity-90 rounded-full px-8 py-3"
                                >
                                    Retake Assessment
                                </button>
                                <a
                                    href="/courses"
                                    className="btn btn-outline border-gray-500 text-white hover:bg-gray-700 rounded-full px-8 py-3"
                                >
                                    Browse Courses
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 py-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                        Pre-Course Assessment
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Test your knowledge of Python basics with this 20-question assessment
                    </p>
                </div>

                {/* Progress and Timer */}
                <div className="bg-gray-800 rounded-xl p-4 md:p-6 mb-8 border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300 font-medium">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                            timeLeft < 300 ? 'bg-red-900/50' : 'bg-gray-700'
                        }`}>
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-gray-200'}`}>
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div
                    key={currentQuestion}
                    className="bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-700 mb-6"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(currentQuestion, index)}
                                className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ${
                                    selectedAnswers[currentQuestion] === index
                                        ? 'border-teal-500 bg-teal-500/10 text-white'
                                        : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                        selectedAnswers[currentQuestion] === index
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-gray-600 text-gray-300'
                                    }`}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="text-base md:text-lg">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="btn btn-outline border-gray-500 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full px-6 py-3"
                    >
                        ← Previous
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary bg-gradient-to-r from-teal-500 to-blue-500 border-none text-white hover:opacity-90 rounded-full px-8 py-3"
                        >
                            Submit Assessment
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="btn btn-primary bg-gradient-to-r from-teal-500 to-blue-500 border-none text-white hover:opacity-90 rounded-full px-6 py-3"
                        >
                            Next →
                        </button>
                    )}
                </div>

                {/* Question Navigation Dots */}
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {questions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentQuestion(index)}
                            className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
                                currentQuestion === index
                                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white scale-110'
                                    : selectedAnswers[index] !== undefined
                                        ? 'bg-gray-600 text-white'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreCourseAssessment;
