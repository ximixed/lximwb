import { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Trophy, Zap, Clock, Target, CheckCircle2, Flame, BarChart3, Settings, Maximize2, Minimize2 } from 'lucide-react';
import { playClickSound } from '../utils/audio.js';

// Enhanced quotes organized by difficulty
// Typing test quotes organized by difficulty
const QUOTE_CATEGORIES = {
  easy: [
    "The sun is bright today.",
    "I like to learn new things.",
    "Practice makes progress.",
    "Keep your work simple.",
    "Small steps lead to success.",
    "Every day is a new chance.",
    "Be patient with yourself.",
    "Learning takes time.",
    "Stay focused on your goal.",
    "You can do it.",
    "Start with one step.",
    "Never stop learning.",
    "Believe in your effort.",
    "Work hard and stay humble.",
    "Good things take time.",
    "Make today count.",
    "Keep moving forward.",
    "Your effort matters.",
    "Try again when you fail.",
    "Success starts with action.",
    "Be kind to others.",
    "Help when you can.",
    "Listen and learn.",
    "Use your time wisely.",
    "Stay calm and think.",
    "A clear mind works better.",
    "Do your best today.",
    "Learn something new.",
    "Keep your goals close.",
    "Be proud of your progress.",
    "The sky is blue.",
    "The water is clear.",
    "The wind is cool.",
    "The flowers are colorful.",
    "The morning is peaceful.",
    "The night is quiet.",
    "The road is long.",
    "The journey is worth it.",
    "The future is unknown.",
    "The present is important.",
    "I enjoy reading books.",
    "I like writing notes.",
    "I study every morning.",
    "I practice typing daily.",
    "I use my computer.",
    "I learn from mistakes.",
    "I ask good questions.",
    "I follow the instructions.",
    "I finish my tasks.",
    "I check my work.",
    "My goal is clear.",
    "My plan is simple.",
    "My work is useful.",
    "My skills are growing.",
    "My future is bright.",
    "Time is valuable.",
    "Knowledge is powerful.",
    "Kindness is important.",
    "Honesty builds trust.",
    "Respect everyone.",
    "Be responsible.",
    "Stay positive.",
    "Think before you act.",
    "Speak with care.",
    "Choose wisely.",
    "Learn from experience.",
    "Focus on what matters.",
    "Do not give up.",
    "Keep trying your best.",
    "Every effort counts.",
    "Your dreams need action.",
    "A good habit takes practice.",
    "A good plan saves time.",
    "A good attitude helps.",
    "A simple idea can grow.",
    "A small change can help.",
    "A new skill takes time.",
    "A clear goal gives direction.",
    "A strong mind stays patient.",
    "A helpful person makes a difference.",
    "A careful worker avoids mistakes.",
    "A curious student asks questions.",
    "A good friend listens.",
    "A wise person keeps learning.",
    "A brave person tries again.",
    "A kind word can help.",
    "A smile can brighten a day.",
    "A little progress is still progress.",
    "A difficult task can be learned.",
    "A new day brings new hope.",
    "A better future starts today.",
    "Learning is a daily journey.",
    "Practice helps us improve.",
    "Reading helps us understand.",
    "Writing helps us remember.",
    "Typing helps us communicate.",
    "Technology helps us connect.",
    "Computers help us work.",
    "The internet provides information.",
    "Websites share useful content.",
    "Students need good habits.",
    "Teachers guide their students.",
    "Families give support.",
    "People learn in different ways.",
    "Everyone has room to grow.",
    "Each person has unique skills.",
    "Mistakes can teach lessons.",
    "Challenges can build confidence.",
    "Hard work creates opportunities.",
    "Patience helps us improve.",
    "Confidence grows through practice.",
    "Success requires dedication.",
    "Progress requires consistency.",
    "Good results take preparation.",
    "Learning requires attention.",
    "Clear goals guide action.",
    "Simple systems solve problems.",
    "Useful tools save effort.",
    "Good design improves experience.",
    "Careful work creates quality.",
    "A good system needs structure.",
    "A good website needs purpose.",
    "A good project needs planning.",
    "A good student keeps learning.",
    "A good developer tests code.",
    "A good team shares ideas.",
    "A good leader listens.",
    "A good worker stays responsible.",
    "A good plan can change.",
    "A good start builds momentum.",
    "The computer is ready.",
    "The keyboard is clean.",
    "The screen is bright.",
    "The mouse is beside me.",
    "The file is saved.",
    "The folder is open.",
    "The page is loading.",
    "The website is online.",
    "The code is working.",
    "The program is running.",
    "The button is blue.",
    "The menu is simple.",
    "The design is clean.",
    "The layout is clear.",
    "The text is easy to read.",
    "The form is ready.",
    "The data is useful.",
    "The table is organized.",
    "The database is connected.",
    "The system is working.",
    "The user can log in.",
    "The user can register.",
    "The page shows information.",
    "The app helps people.",
    "The tool saves time.",
    "The project is improving.",
    "The feature is useful.",
    "The result looks good.",
    "The task is complete.",
    "The test is finished.",
    "I open my laptop.",
    "I write my code.",
    "I save my file.",
    "I check my design.",
    "I test my website.",
    "I fix small errors.",
    "I learn new commands.",
    "I organize my folders.",
    "I read the instructions.",
    "I complete my project.",
    "I review my lessons.",
    "I prepare for class.",
    "I take useful notes.",
    "I practice new skills.",
    "I improve every week.",
    "I enjoy solving problems.",
    "I like creating websites.",
    "I want to build systems.",
    "I hope to help others.",
    "I will keep learning.",
    "I will stay consistent.",
    "I will use my time well.",
    "I will improve my skills.",
    "I will finish what I start."
  ],

  medium: [
    "Learning how to code takes patience, practice, and a willingness to understand mistakes.",
    "A good programmer does not only write code, but also learns how to solve problems.",
    "Web development combines creativity, logic, and technical skills to build useful websites.",
    "A simple website can become a powerful tool when it solves a real problem.",
    "Information systems help organizations manage data, improve processes, and support decisions.",
    "A database stores information in an organized way so that users can access it easily.",
    "HTML provides the structure of a webpage, while CSS controls its appearance and layout.",
    "JavaScript adds interaction and behavior to websites, making pages more dynamic and useful.",
    "PHP allows developers to create server-side applications that process data and requests.",
    "MySQL is commonly used to store, organize, and retrieve information for web applications.",
    "A clean interface helps users understand a system without unnecessary confusion.",
    "Good design is not only about appearance, but also about usability and accessibility.",
    "A developer should test a program carefully before allowing users to access it.",
    "Debugging is the process of finding and fixing errors in a program.",
    "A small coding mistake can cause unexpected results, so careful testing is important.",
    "Writing readable code makes it easier for other developers to understand and maintain.",
    "Comments can explain difficult sections of code and help developers remember their purpose.",
    "A well-organized project usually contains separate files for components, styles, and functions.",
    "Reusable components help developers create consistent interfaces and reduce repeated work.",
    "A responsive website should adjust its layout to different screen sizes and devices.",
    "Users expect websites to load quickly, work correctly, and provide clear information.",
    "A navigation menu should help visitors move between pages without difficulty.",
    "A personal portfolio can showcase skills, projects, education, and future goals.",
    "Projects are useful because they allow students to apply lessons to practical situations.",
    "Building a project from scratch teaches planning, problem-solving, and attention to detail.",
    "A successful application begins with understanding the needs of its intended users.",
    "Before creating a system, developers should identify its purpose and expected features.",
    "Clear requirements help prevent confusion during the development process.",
    "A flowchart can show how information moves through a system.",
    "An algorithm is a step-by-step procedure used to solve a particular problem.",
    "Data structures organize information so that programs can process it efficiently.",
    "Arrays, lists, stacks, and queues are examples of common data structures.",
    "Choosing the correct data structure can improve the performance of an application.",
    "A variable stores a value that can be used or changed during program execution.",
    "A function groups instructions into a reusable block of code.",
    "Conditional statements allow programs to make decisions based on specific conditions.",
    "Loops repeat instructions when a task needs to be performed multiple times.",
    "Input is the information provided to a program by a user or another system.",
    "Output is the result produced after a program processes its input.",
    "A reliable system should handle incorrect input without crashing unexpectedly.",
    "Error messages should explain problems clearly so users know what to do next.",
    "Security is important because systems often handle personal and sensitive information.",
    "Strong passwords and secure authentication help protect user accounts.",
    "Developers should avoid storing passwords in plain text inside a database.",
    "A login system should verify user credentials before granting access.",
    "A registration form should validate information before saving it to the database.",
    "Forms should provide clear labels and helpful instructions for users.",
    "A database table contains rows and columns that organize related information.",
    "Primary keys help identify individual records inside a database table.",
    "Relationships connect tables and reduce unnecessary duplication of data.",
    "SQL queries allow developers to retrieve, insert, update, and delete records.",
    "A backup helps protect important information from accidental loss.",
    "A system administrator monitors servers, users, and network resources.",
    "A computer network allows devices to communicate and share resources.",
    "The internet connects millions of devices across different locations.",
    "A web browser requests information from a server and displays the response.",
    "A server processes requests and sends data back to the client.",
    "An application programming interface allows different software systems to communicate.",
    "APIs are useful when an application needs information from another service.",
    "A well-designed API should be consistent, documented, and easy to understand.",
    "Version control helps developers track changes and collaborate on projects.",
    "Git allows developers to create branches, record changes, and manage project history.",
    "GitHub provides a platform for storing code and collaborating with other developers.",
    "A commit records a set of changes made to a project.",
    "A repository contains the files and history of a software project.",
    "Developers should write meaningful commit messages to explain their changes.",
    "Testing helps identify problems before software is released to users.",
    "Unit testing checks individual functions or components.",
    "Integration testing checks whether different parts of a system work together.",
    "User testing helps determine whether an application meets practical needs.",
    "Performance testing measures how a system behaves under different workloads.",
    "Documentation explains how a system works and how users can operate it.",
    "A project deadline encourages developers to manage their time carefully.",
    "Breaking a large task into smaller steps makes the work easier to manage.",
    "A project plan should include goals, requirements, tasks, and expected results.",
    "Team members should communicate clearly to avoid misunderstandings.",
    "Good collaboration requires respect, responsibility, and willingness to share ideas.",
    "A developer should be open to feedback because improvement often comes from review.",
    "Learning new technology can create opportunities for personal and professional growth.",
    "Technology changes quickly, so developers must continue updating their knowledge.",
    "Online tutorials and documentation can help students understand unfamiliar concepts.",
    "Practice projects are valuable because they turn theoretical knowledge into experience.",
    "A student can improve by building small applications before attempting complex systems.",
    "Consistency is often more important than studying only when motivation is high.",
    "A useful learning routine includes reading, practicing, reviewing, and applying knowledge.",
    "Taking breaks can help maintain focus during long study sessions.",
    "Organizing files properly makes projects easier to navigate and maintain.",
    "A clear naming convention helps developers identify files and variables quickly.",
    "A website should use readable fonts, appropriate spacing, and consistent colors.",
    "Good contrast improves readability and makes content easier to access.",
    "Accessibility ensures that more people can use a website effectively.",
    "A website should provide useful content instead of unnecessary visual distractions.",
    "A portfolio should communicate what the developer can do and what they are learning.",
    "Personal projects can demonstrate creativity, technical ability, and problem-solving skills.",
    "A project description should explain the problem, the solution, and the technologies used.",
    "Screenshots can help visitors understand how an application looks and works.",
    "A contact form allows visitors to send messages to the website owner.",
    "A footer can contain copyright information, social links, and additional navigation.",
    "A sidebar can organize navigation links while keeping the main content visible.",
    "A fixed sidebar remains in place while the user scrolls through the page.",
    "A responsive sidebar should work well on both desktop and mobile screens.",
    "A dark interface can create a focused appearance when text has enough contrast.",
    "Subtle borders and spacing can make a dark design feel organized and professional.",
    "A good color palette should support readability rather than distract from the content.",
    "A small animation can improve interaction when it is used with purpose.",
    "Too many effects can make a website feel confusing or difficult to use.",
    "A professional portfolio should balance personality, clarity, and functionality.",
    "The purpose of a website should guide its design and content decisions.",
    "A good user experience helps visitors complete tasks with less effort.",
    "A system should be designed around the people who will actually use it.",
    "Information systems connect people, processes, data, and technology.",
    "Organizations use information systems to improve communication and decision-making.",
    "Accurate data helps organizations make better plans and reduce mistakes.",
    "Data must be collected, processed, stored, and protected responsibly.",
    "A decision support system helps users analyze information before making choices.",
    "A management information system provides reports that support organizational activities.",
    "A transaction processing system records routine business transactions.",
    "A well-designed system can reduce repetitive work and improve efficiency.",
    "Technology is most useful when it supports real needs and practical solutions."
  ],

  hard: [
    "Software development requires analytical thinking, systematic planning, and continuous experimentation.",
    "A developer must understand not only how a program works, but also why it behaves in a particular way.",
    "Complex applications often depend on multiple components that communicate through carefully designed interfaces.",
    "Maintaining consistency across a large codebase becomes increasingly important as a project grows.",
    "Poorly organized code can create unnecessary complexity, making future improvements more difficult.",
    "Refactoring involves restructuring existing code without changing its intended behavior.",
    "Optimization should be performed carefully because improving one part of a system may affect another.",
    "Premature optimization can distract developers from solving the actual problems within an application.",
    "Algorithmic efficiency determines how effectively a program handles increasing amounts of data.",
    "Time complexity describes how an algorithm's execution time changes as its input grows.",
    "Space complexity describes how much additional memory an algorithm requires during execution.",
    "A suitable algorithm can significantly improve performance when processing large datasets.",
    "Data validation ensures that information follows the expected format before it enters a system.",
    "Input sanitization helps reduce the risk of unexpected or harmful data being processed.",
    "Authentication verifies a user's identity, while authorization determines what that user may access.",
    "Secure applications should follow established principles for protecting accounts and confidential information.",
    "Developers must consider security throughout the development lifecycle rather than treating it as an afterthought.",
    "A vulnerability may exist when software behaves unexpectedly under unusual or malicious conditions.",
    "Regular updates and security patches help reduce exposure to known software vulnerabilities.",
    "Database normalization reduces redundancy and improves the consistency of stored information.",
    "Relational databases organize information through tables connected by defined relationships.",
    "A well-designed schema describes how entities, attributes, and relationships are represented.",
    "Indexes can improve query performance, although excessive indexing may increase storage and update costs.",
    "Transactions help ensure that database operations are completed reliably and consistently.",
    "The ACID properties describe important guarantees provided by many transactional database systems.",
    "Atomicity ensures that a transaction is treated as a complete operation.",
    "Consistency ensures that a transaction preserves the rules and constraints of a database.",
    "Isolation controls how concurrent transactions interact with one another.",
    "Durability ensures that committed changes remain saved even after certain failures.",
    "Concurrency occurs when multiple processes or users access shared resources at the same time.",
    "Race conditions can occur when the outcome depends on the timing of concurrent operations.",
    "Deadlocks may happen when processes wait indefinitely for resources held by one another.",
    "A well-designed system should anticipate failures and respond to them gracefully.",
    "Exception handling allows a program to manage unexpected conditions without terminating abruptly.",
    "Logging provides a record of events that can help developers investigate system behavior.",
    "Monitoring tools collect information about performance, availability, and resource usage.",
    "Scalability refers to a system's ability to handle increased demand without unacceptable degradation.",
    "Horizontal scaling adds more machines, while vertical scaling increases the resources of one machine.",
    "Distributed systems require careful coordination because components may operate across different locations.",
    "Network latency can affect how quickly information travels between a client and a server.",
    "Reliability measures how consistently a system performs its intended functions over time.",
    "Availability describes how accessible a system is when users need it.",
    "Fault tolerance allows a system to continue operating despite certain component failures.",
    "Redundancy can improve reliability by providing alternative resources or backup components.",
    "A load balancer distributes incoming requests across multiple servers.",
    "Caching stores frequently accessed information so that future requests can be completed faster.",
    "Cache invalidation is challenging because stored information may become outdated.",
    "A content delivery network distributes files across geographically separated servers.",
    "The Domain Name System translates domain names into addresses that computers can use.",
    "The Hypertext Transfer Protocol defines how clients and servers exchange web resources.",
    "HTTPS uses encryption to protect information exchanged between a browser and a website.",
    "A certificate helps establish trust between a browser and a secure website.",
    "Cookies allow websites to store small pieces of information in a user's browser.",
    "Sessions can maintain user-related information while a person navigates through an application.",
    "Cross-site scripting occurs when untrusted content is executed as code in another user's browser.",
    "Cross-site request forgery attempts to cause a user's browser to perform an unwanted action.",
    "Parameterized queries help prevent attackers from injecting unintended SQL commands.",
    "The principle of least privilege limits access to only what is necessary.",
    "Secure software development requires developers to consider confidentiality, integrity, and availability.",
    "Confidentiality prevents unauthorized people from accessing protected information.",
    "Integrity ensures that information remains accurate and has not been improperly altered.",
    "Availability ensures that authorized users can access systems and data when needed.",
    "A comprehensive backup strategy should consider frequency, storage location, and recovery procedures.",
    "Disaster recovery planning helps organizations restore important operations after serious disruptions.",
    "Business continuity planning focuses on maintaining essential services during unexpected events.",
    "Cloud computing provides access to computing resources through network-based services.",
    "Virtualization allows multiple virtual environments to operate on shared physical hardware.",
    "Containers package applications and their dependencies into isolated, portable environments.",
    "Microservices divide an application into smaller services that can be developed independently.",
    "Monolithic applications combine many functions into a single deployable unit.",
    "Service-oriented architecture emphasizes communication between distinct software services.",
    "Application programming interfaces define rules for exchanging data between different applications.",
    "Representational State Transfer is an architectural style commonly used for web APIs.",
    "A stateless service does not rely on stored client information between individual requests.",
    "JSON is a lightweight data format frequently used for communication between web applications.",
    "XML is another structured data format used in various software and information systems.",
    "Serialization converts data into a format that can be stored or transmitted.",
    "Deserialization reconstructs usable data from a serialized representation.",
    "Frontend development focuses on the interface and interactions that users experience directly.",
    "Backend development handles server logic, data processing, and communication with databases.",
    "Full-stack development involves working with both frontend and backend technologies.",
    "Component-based architecture encourages developers to build interfaces from reusable parts.",
    "State management controls how application data changes and updates over time.",
    "Asynchronous operations allow programs to continue working while waiting for certain tasks to finish.",
    "Promises represent the eventual completion or failure of an asynchronous operation.",
    "Event-driven programming responds to actions such as clicks, requests, and keyboard input.",
    "A callback is a function passed to another function for execution at a later time.",
    "Dependency management ensures that a project uses compatible external libraries and packages.",
    "Semantic versioning communicates the significance of changes between software releases.",
    "Continuous integration automatically checks code changes through builds and tests.",
    "Continuous deployment automates the process of releasing software to production environments.",
    "A development pipeline may include testing, security scanning, packaging, and deployment.",
    "Infrastructure as code allows infrastructure configuration to be managed through files.",
    "Environment variables store configuration values that may differ between development and production.",
    "A production environment should be monitored carefully because users depend on its availability.",
    "Debugging complex applications often requires examining logs, network requests, and database queries.",
    "A reproducible error is easier to investigate because developers can observe the same behavior repeatedly.",
    "Technical documentation should explain assumptions, limitations, installation steps, and usage instructions.",
    "Clear documentation reduces the time required for new developers to understand a project.",
    "Code reviews help identify defects, improve maintainability, and encourage knowledge sharing.",
    "A constructive review should focus on the code rather than criticizing the person who wrote it.",
    "Software quality includes correctness, maintainability, usability, reliability, and security.",
    "Requirements engineering involves discovering, documenting, and managing what a system must accomplish.",
    "Functional requirements describe what a system should do for its users.",
    "Nonfunctional requirements describe qualities such as performance, security, and usability.",
    "A feasibility study evaluates whether a proposed system is practical within given constraints.",
    "System analysis examines existing processes to identify problems and opportunities for improvement.",
    "System design transforms requirements into a structure that developers can implement.",
    "Implementation converts the design into working software through programming and configuration.",
    "System testing evaluates whether the complete application meets its requirements.",
    "Deployment makes the application available in its intended operating environment.",
    "Maintenance includes correcting defects, adapting to changes, and improving existing functionality.",
    "The software development life cycle provides a structured approach to building and maintaining systems.",
    "Agile development emphasizes collaboration, iterative progress, and responsiveness to change.",
    "Scrum organizes work into short development cycles commonly called sprints.",
    "A product backlog contains features, improvements, and tasks that may be developed.",
    "A sprint review allows stakeholders to examine completed work and provide feedback.",
    "A retrospective gives a team an opportunity to reflect on its process and identify improvements.",
    "Project management requires balancing scope, schedule, cost, quality, and available resources.",
    "Changing project requirements can affect deadlines, budgets, and technical decisions.",
    "Risk management involves identifying, evaluating, and responding to potential problems.",
    "A risk assessment considers the likelihood and impact of possible events.",
    "Stakeholder communication helps ensure that project expectations remain realistic and aligned.",
    "Information systems management requires an understanding of technology, people, and organizational processes.",
    "Business process analysis examines how tasks are performed and how they might be improved.",
    "Digital transformation involves using technology to change how organizations operate and deliver value.",
    "Data-driven decision-making uses evidence and analysis rather than relying only on assumptions.",
    "Data visualization presents information through charts, graphs, and other visual representations.",
    "Poor data quality can lead to inaccurate reports and ineffective organizational decisions.",
    "Data governance establishes policies for managing data throughout its lifecycle.",
    "Ethical technology development requires consideration of privacy, fairness, transparency, and accountability.",
    "A system should not collect personal information without a clear and legitimate purpose.",
    "Responsible developers consider how their work may affect users and communities.",
    "Technology should be designed to support people rather than create unnecessary barriers."
  ]
};

function TypingTest({ isOpen, onClose, soundEnabled = false }) {
  // Test configuration
  const [testMode, setTestMode] = useState('quote'); // 'quote', 'timed', 'wordCount'
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const [showSettings, setShowSettings] = useState(true);
  const [timedDuration, setTimedDuration] = useState(60);
  const [wordCountTarget, setWordCountTarget] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Test state
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  // Stats
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('typingStats');
    return saved ? JSON.parse(saved) : { totalTests: 0, bestWpm: 0, avgAccuracy: 100, allScores: [] };
  });
  const [showStats, setShowStats] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const testTimerRef = useRef(null);

  const getCurrentQuotes = () => QUOTE_CATEGORIES[difficulty];
  const targetText = getCurrentQuotes()[quoteIndex];
  const wordCount = inputVal.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Auto focus and reset when opening
  useEffect(() => {
    if (isOpen) {
      setShowSettings(true);
      setInputVal('');
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
      setIsFinished(false);
      setElapsedSeconds(0);
      setQuoteIndex(0);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Timer for elapsed time display
  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        const seconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
        setElapsedSeconds(seconds);
      }, 500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished]);

  // Timed mode timer - auto-finish when time runs out
  useEffect(() => {
    if (testMode === 'timed' && startTime && !isFinished) {
      testTimerRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        if (seconds >= timedDuration) {
          finishTest();
          if (testTimerRef.current) clearInterval(testTimerRef.current);
        }
      }, 100);
    }
    return () => {
      if (testTimerRef.current) clearInterval(testTimerRef.current);
    };
  }, [startTime, isFinished, testMode, timedDuration]);

  // Save test result to stats
  const saveTestResult = (finalWpm, finalAccuracy) => {
    const newScore = { wpm: finalWpm, accuracy: finalAccuracy, date: new Date().toLocaleDateString(), mode: testMode, difficulty };
    const newStats = {
      totalTests: stats.totalTests + 1,
      bestWpm: Math.max(stats.bestWpm, finalWpm),
      avgAccuracy: Math.round((stats.avgAccuracy * stats.totalTests + finalAccuracy) / (stats.totalTests + 1)),
      allScores: [newScore, ...stats.allScores].slice(0, 20)
    };
    setStats(newStats);
    localStorage.setItem('typingStats', JSON.stringify(newStats));
  };

  // Finish the test
  const finishTest = () => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (testTimerRef.current) clearInterval(testTimerRef.current);
    saveTestResult(wpm, accuracy);
  };

  const resetTest = () => {
    setInputVal('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setElapsedSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (testTimerRef.current) clearInterval(testTimerRef.current);
    
    // Pick next quote
    const quotes = getCurrentQuotes();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const startNewTest = () => {
    setShowSettings(false);
    resetTest();
    setInputVal('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e) => {
    if (isFinished) return;

    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    if (soundEnabled) {
      playClickSound();
    }

    setInputVal(val);

    // Compute accuracy
    let correctChars = 0;
    const minLen = Math.min(val.length, targetText.length);
    for (let i = 0; i < minLen; i++) {
      if (val[i] === targetText[i]) correctChars++;
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(acc);

    // Compute WPM
    const timeInMins = startTime ? (Date.now() - startTime) / 60000 : 0.01;
    const wordsTyped = correctChars / 5;
    const currentWpm = Math.max(0, Math.round(wordsTyped / (timeInMins || 0.01)));
    setWpm(currentWpm);

    // Check completion based on test mode
    let shouldFinish = false;
    
    if (testMode === 'quote' && val.length >= targetText.length && val === targetText) {
      shouldFinish = true;
    } else if (testMode === 'wordCount' && wordCount >= wordCountTarget) {
      shouldFinish = true;
    }
    
    if (shouldFinish) {
      finishTest();
    }
  };

  if (!isOpen) return null;

  const timeRemaining = testMode === 'timed' ? Math.max(0, timedDuration - elapsedSeconds) : null;
  const isTimeUp = testMode === 'timed' && timeRemaining === 0;
  const progressPercent = testMode === 'wordCount' ? (wordCount / wordCountTarget) * 100 : 
                          testMode === 'timed' ? ((timedDuration - timeRemaining) / timedDuration) * 100 : 
                          (inputVal.length / targetText.length) * 100;

  return (
    <div className="typing-modal-backdrop" onClick={onClose}>
      <div
        className={`typing-modal-card ${isFullscreen ? 'is-fullscreen' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="typing-test-title"
      >
        <div className="typing-modal-header">
          <div className="typing-modal-title-box">
            <span className="typing-pill-badge">
              <Zap size={14} strokeWidth={2.5} />
              SPEED TEST
            </span>
            <h2 id="typing-test-title" className="typing-heading">Typing Test</h2>
          </div>
          <div className="typing-header-actions">
            <button
              type="button"
              className="typing-icon-btn"
              onClick={() => setIsFullscreen((current) => !current)}
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button
              type="button"
              className="typing-icon-btn"
              onClick={() => setShowStats(!showStats)}
              title="View stats"
            >
              <BarChart3 size={18} />
            </button>
            <button
              type="button"
              className="typing-icon-btn"
              onClick={() => setShowSettings(true)}
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              type="button"
              className="typing-close-btn"
              onClick={onClose}
              aria-label="Close typing test"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stats View */}
        {showStats && (
          <div className="typing-stats-panel">
            <h3>📊 Your Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Total Tests</span>
                <span className="stat-value">{stats.totalTests}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Best WPM</span>
                <span className="stat-value">{stats.bestWpm}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Avg Accuracy</span>
                <span className="stat-value">{stats.avgAccuracy}%</span>
              </div>
            </div>
            {stats.allScores.length > 0 && (
              <div className="leaderboard">
                <h4>Recent Scores</h4>
                <div className="score-list">
                  {stats.allScores.map((score, idx) => (
                    <div key={idx} className="score-item">
                      <span className="score-rank">#{idx + 1}</span>
                      <span className="score-wpm">{score.wpm} WPM</span>
                      <span className="score-acc">{score.accuracy}%</span>
                      <span className="score-date">{score.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="typing-settings-panel">
            <h3>⚙️ Test Settings</h3>
            
            <div className="settings-section">
              <label>Test Mode</label>
              <div className="mode-buttons">
                {['quote', 'timed', 'wordCount'].map(mode => (
                  <button
                    key={mode}
                    className={`mode-btn ${testMode === mode ? 'active' : ''}`}
                    onClick={() => setTestMode(mode)}
                  >
                    {mode === 'quote' && '📝 Quote'}
                    {mode === 'timed' && '⏱️ Timed'}
                    {mode === 'wordCount' && '📖 Words'}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <label>Difficulty</label>
              <div className="difficulty-buttons">
                {['easy', 'medium', 'hard'].map(diff => (
                  <button
                    key={diff}
                    className={`diff-btn ${difficulty === diff ? 'active' : ''}`}
                    onClick={() => {
                      setDifficulty(diff);
                      setQuoteIndex(0);
                    }}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {testMode === 'timed' && (
              <div className="settings-section">
                <label>Duration: {timedDuration}s</label>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="30"
                  value={timedDuration}
                  onChange={(e) => setTimedDuration(parseInt(e.target.value))}
                  className="slider"
                />
              </div>
            )}

            {testMode === 'wordCount' && (
              <div className="settings-section">
                <label>Target Words: {wordCountTarget}</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={wordCountTarget}
                  onChange={(e) => setWordCountTarget(parseInt(e.target.value))}
                  className="slider"
                />
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary start-test-btn"
              onClick={startNewTest}
            >
              Start Test
            </button>
          </div>
        )}

        {/* Live Metrics Row */}
        {!showSettings && !showStats && (
          <div className="typing-test-area">
            <div className="typing-metrics-bar">
              <div className="typing-metric">
                <span className="typing-metric-lbl">
                  <Zap size={13} /> WPM
                </span>
                <span className="typing-metric-val">{wpm}</span>
              </div>
              <div className="typing-metric">
                <span className="typing-metric-lbl">
                  <Target size={13} /> ACCURACY
                </span>
                <span className="typing-metric-val">{accuracy}%</span>
              </div>
              <div className="typing-metric">
                <span className="typing-metric-lbl">
                  <Clock size={13} /> {testMode === 'timed' ? 'REMAINING' : 'TIME'}
                </span>
                <span className={`typing-metric-val ${isTimeUp ? 'time-up' : ''}`}>
                  {testMode === 'timed' ? timeRemaining : elapsedSeconds}s
                </span>
              </div>
              {testMode === 'wordCount' && (
                <div className="typing-metric">
                  <span className="typing-metric-lbl">
                    📖 WORDS
                  </span>
                  <span className="typing-metric-val">{wordCount}/{wordCountTarget}</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="typing-progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
            </div>

            {/* Typing Display Box */}
            <div
              className="typing-text-display"
              onClick={() => inputRef.current && inputRef.current.focus()}
            >
          {targetText.split('').map((char, index) => {
            let status = 'untyped';
            if (index < inputVal.length) {
              status = inputVal[index] === char ? 'correct' : 'incorrect';
            }
            const isCursor = index === inputVal.length;

            return (
              <span
                key={index}
                className={`typing-char ${status} ${isCursor ? 'cursor' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Hidden / Focused Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              className="typing-hidden-input"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              disabled={isFinished}
              placeholder="Click here and start typing..."
            />

            {/* Completion Celebration Card */}
            {isFinished ? (
          <div className="typing-finished-card">
            <div className="typing-finished-header">
              <Trophy size={26} className="trophy-icon" />
              <div>
                  <h3>Test Completed! 🎉</h3>
                <p>
                  You scored <strong>{wpm} WPM</strong> with <strong>{accuracy}% accuracy</strong>!
                </p>
              </div>
            </div>
              <div className="typing-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={resetTest}
                  >
                    <RotateCcw size={15} />
                    Try Again
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowSettings(true);
                      setIsFinished(false);
                    }}
                  >
                    Change Settings
                  </button>
                </div>
          </div>
        ) : (
          <div className="typing-bottom-actions">
            <button
              type="button"
              className="typing-reset-btn"
              onClick={resetTest}
              title="Reset & Next Quote"
            >
              <RotateCcw size={14} />
              <span>Reset Quote</span>
            </button>
            <span className="typing-hint">Press Esc to exit | Ctrl+R to reset</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TypingTest;
