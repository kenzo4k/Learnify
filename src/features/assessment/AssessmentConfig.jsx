// Assessment Configuration Template
// Replace the placeholder values with your actual course details

export const ASSESSMENT_CONFIG = {
    // Replace {COURSE_NAME} with your actual course title
    courseName: "Introduction to React Development",

    // Replace {NUMBER_OF_TOPICS} with the actual number of topics
    numberOfTopics: 4,

    // Replace {LIST_OF_TOPICS} with your actual topic list
    topics: [
        "React Fundamentals",
        "Components and Props",
        "State Management",
        "Hooks and Effects"
    ],

    // Replace {QUESTIONS_PER_TOPIC} with desired number of questions per topic
    questionsPerTopic: 5,

    // Replace {OPTIONS_PER_QUESTION} with desired number of answer options
    optionsPerQuestion: 4
};

// Question bank for different topics - customize based on your course content
export const QUESTION_BANK = {
    "React Fundamentals": [
        {
            question: "What is React primarily used for?",
            options: [
                "Building user interfaces",
                "Database management",
                "Server configuration",
                "Network programming"
            ],
            correctAnswer: 0
        },
        {
            question: "Who created React?",
            options: [
                "Google",
                "Facebook (Meta)",
                "Microsoft",
                "Amazon"
            ],
            correctAnswer: 1
        },
        {
            question: "What does JSX stand for?",
            options: [
                "JavaScript XML",
                "Java Syntax Extension",
                "JavaScript Extension",
                "JSON XML"
            ],
            correctAnswer: 0
        },
        {
            question: "React uses a ______ architecture to build applications.",
            options: [
                "Monolithic",
                "Component-based",
                "Layered",
                "Microservices"
            ],
            correctAnswer: 1
        },
        {
            question: "What is the purpose of ReactDOM.render()?",
            options: [
                "To render HTML elements",
                "To render React components to the DOM",
                "To render CSS styles",
                "To render server-side code"
            ],
            correctAnswer: 1
        }
    ],

    "Components and Props": [
        {
            question: "What are the two main types of React components?",
            options: [
                "Static and Dynamic",
                "Class and Functional",
                "Simple and Complex",
                "Parent and Child"
            ],
            correctAnswer: 1
        },
        {
            question: "How do you pass data from parent to child component?",
            options: [
                "Using state",
                "Using props",
                "Using context",
                "Using callbacks"
            ],
            correctAnswer: 1
        },
        {
            question: "What is props short for?",
            options: [
                "Properties",
                "Prototypes",
                "Parameters",
                "Propagations"
            ],
            correctAnswer: 0
        },
        {
            question: "Are props mutable in React?",
            options: [
                "Yes, they can be modified",
                "No, they are read-only",
                "Only in class components",
                "Only in functional components"
            ],
            correctAnswer: 1
        },
        {
            question: "What is the purpose of the key prop?",
            options: [
                "To style components",
                "To uniquely identify elements in a list",
                "To pass data between components",
                "To control component visibility"
            ],
            correctAnswer: 1
        }
    ],

    "State Management": [
        {
            question: "What is the purpose of state in React?",
            options: [
                "To store component data that can change",
                "To store CSS styles",
                "To store API endpoints",
                "To store component props"
            ],
            correctAnswer: 0
        },
        {
            question: "Which hook is used to manage state in functional components?",
            options: [
                "useEffect",
                "useState",
                "useContext",
                "useReducer"
            ],
            correctAnswer: 1
        },
        {
            question: "What happens when state changes in React?",
            options: [
                "Nothing happens",
                "The component re-renders",
                "The app crashes",
                "Only the state variable updates"
            ],
            correctAnswer: 1
        },
        {
            question: "How do you update state in React?",
            options: [
                "By direct assignment",
                "Using the setter function",
                "Using setState() method",
                "Using updateState() method"
            ],
            correctAnswer: 1
        },
        {
            question: "Can state be shared between components?",
            options: [
                "No, never",
                "Yes, through props",
                "Yes, through lifting state up",
                "Only with context API"
            ],
            correctAnswer: 2
        }
    ],

    "Hooks and Effects": [
        {
            question: "What is the purpose of useEffect hook?",
            options: [
                "To handle side effects",
                "To manage state",
                "To pass props",
                "To create components"
            ],
            correctAnswer: 0
        },
        {
            question: "When does useEffect run by default?",
            options: [
                "Only on mount",
                "Only on unmount",
                "After every render",
                "Never runs automatically"
            ],
            correctAnswer: 2
        },
        {
            question: "How do you make useEffect run only once on mount?",
            options: [
                "Pass empty array []",
                "Pass null",
                "Pass undefined",
                "Pass [true]"
            ],
            correctAnswer: 0
        },
        {
            question: "What is the cleanup function in useEffect?",
            options: [
                "A function that runs before the effect",
                "A function that runs after the effect",
                "A function that runs on unmount",
                "A function that runs on mount"
            ],
            correctAnswer: 2
        },
        {
            question: "Which hook is used for context API?",
            options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
            ],
            correctAnswer: 2
        }
    ]
};

// Helper function to get random questions for a topic
export const getRandomQuestions = (topic, count) => {
    const questions = QUESTION_BANK[topic] || [];
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, questions.length));
};

// Helper function to shuffle options
export const shuffleOptions = (question) => {
    const options = [...question.options];
    const correctAnswer = options[question.correctAnswer];

    // Shuffle options
    const shuffled = options.sort(() => 0.5 - Math.random());

    // Find new correct answer index
    const newCorrectAnswer = shuffled.indexOf(correctAnswer);

    return {
        ...question,
        options: shuffled,
        correctAnswer: newCorrectAnswer
    };
};
