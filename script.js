const courseSchedule = [
    {
        week: 1,
        topics: [
            { day: "Monday", content: "What is programming? Intro to Python" },
            { day: "Wednesday", content: "Your first Python program: Hello, World!" },
            { day: "Friday", content: "Fun Project: Create a silly sentence generator" }
        ],
        resources: ["https://www.python.org/about/gettingstarted/", "https://www.w3schools.com/python/python_intro.asp"],
        notebookId: "notebooks/week1_intro_to_python.ipynb",
        quiz: "Mini Quiz: Basic Python Concepts"
    },
    {
        week: 2,
        topics: [
            { day: "Monday", content: "Numbers and Math in Python" },
            { day: "Wednesday", content: "Variables: Storing and Using Information" },
            { day: "Friday", content: "Fun Project: Build a simple calculator" }
        ],
        resources: ["https://www.w3schools.com/python/python_numbers.asp", "https://www.w3schools.com/python/python_variables.asp"],
        notebookId: "notebooks/week2_numbers_and_variables.ipynb",
        quiz: "Mini Quiz: Math Operations and Variables"
    },
    {
        week: 3,
        topics: [
            { day: "Monday", content: "Strings: Working with Text" },
            { day: "Wednesday", content: "String operations and formatting" },
            { day: "Friday", content: "Fun Project: Create a mad libs game" }
        ],
        resources: ["https://www.w3schools.com/python/python_strings.asp", "https://realpython.com/python-strings/"],
        notebookId: "notebooks/week3_strings.ipynb",
        quiz: "Mini Quiz: String Manipulation"
    },
    {
        week: 4,
        topics: [
            { day: "Monday", content: "Introduction to Lists" },
            { day: "Wednesday", content: "List operations and methods" },
            { day: "Friday", content: "Fun Project: Build a to-do list app" }
        ],
        resources: ["https://www.w3schools.com/python/python_lists.asp", "https://realpython.com/python-lists-tuples/"],
        notebookId: "notebooks/week4_lists.ipynb",
        quiz: "Mini Quiz: Working with Lists"
    },
    {
        week: 5,
        topics: [
            { day: "Monday", content: "If statements: Making decisions" },
            { day: "Wednesday", content: "Else and elif: More decision making" },
            { day: "Friday", content: "Fun Project: Create a simple quiz game" }
        ],
        resources: ["https://www.w3schools.com/python/python_conditions.asp", "https://realpython.com/python-conditional-statements/"],
        notebookId: "notebooks/week5_decisions.ipynb",
        quiz: "Mini Quiz: Conditional Statements",
        exam: "Mid-term Exam: Basics of Python Programming"
    },
    {
        week: 6,
        topics: [
            { day: "Monday", content: "For loops: Repeating actions" },
            { day: "Wednesday", content: "While loops: Another way to repeat" },
            { day: "Friday", content: "Fun Project: Design a number guessing game" }
        ],
        resources: ["https://www.w3schools.com/python/python_for_loops.asp", "https://www.w3schools.com/python/python_while_loops.asp"],
        notebookId: "notebooks/week6_loops.ipynb",
        quiz: "Mini Quiz: Looping in Python"
    },
    {
        week: 7,
        topics: [
            { day: "Monday", content: "Functions: Creating reusable code" },
            { day: "Wednesday", content: "Function parameters and return values" },
            { day: "Friday", content: "Fun Project: Build a simple drawing program" }
        ],
        resources: ["https://www.w3schools.com/python/python_functions.asp", "https://realpython.com/defining-your-own-python-function/"],
        notebookId: "notebooks/week7_functions.ipynb",
        quiz: "Mini Quiz: Working with Functions"
    },
    {
        week: 8,
        topics: [
            { day: "Monday", content: "Dictionaries: Storing key-value pairs" },
            { day: "Wednesday", content: "Working with dictionaries" },
            { day: "Friday", content: "Fun Project: Create a mini address book" }
        ],
        resources: ["https://www.w3schools.com/python/python_dictionaries.asp", "https://realpython.com/python-dicts/"],
        notebookId: "notebooks/week8_dictionaries.ipynb",
        quiz: "Mini Quiz: Using Dictionaries"
    },
    {
        week: 9,
        topics: [
            { day: "Monday", content: "File handling: Reading from files" },
            { day: "Wednesday", content: "File handling: Writing to files" },
            { day: "Friday", content: "Fun Project: Build a simple note-taking app" }
        ],
        resources: ["https://www.w3schools.com/python/python_file_handling.asp", "https://realpython.com/read-write-files-python/"],
        notebookId: "notebooks/week9_file_handling.ipynb",
        quiz: "Mini Quiz: File Operations"
    },
    {
        week: 10,
        topics: [
            { day: "Monday", content: "Review of key concepts" },
            { day: "Wednesday", content: "Final project work: Create your own text-based adventure game" },
            { day: "Friday", content: "Project presentations and course wrap-up" }
        ],
        resources: ["https://inventwithpython.com/invent4thed/", "https://www.python.org/about/apps/"],
        notebookId: "notebooks/week10_final_project.ipynb",
        exam: "Final Exam: Comprehensive Python Skills"
    }
];
// Set a static password for all weeks
const STATIC_PASSWORD = "adminpass";

// Lock all weeks except the first one initially
courseSchedule.forEach((week, index) => {
    week.locked = index > 0;
});

let currentWeek = null;

function unlockWeek(weekNumber, enteredPassword) {
    const week = courseSchedule.find(w => w.week === weekNumber);
    if (week && enteredPassword === STATIC_PASSWORD) {
        week.locked = false;
        updateScheduleDisplay();
        return true;
    }
    return false;
}

function updateScheduleDisplay() {
    const tableBody = document.querySelector('#scheduleTable tbody');
    tableBody.innerHTML = '';
    populateScheduleTable();
}

function populateScheduleTable() {
    const tableBody = document.querySelector('#scheduleTable tbody');
    courseSchedule.forEach(week => {
        const row = document.createElement('tr');
        
        const weekCell = document.createElement('td');
        weekCell.textContent = `Week ${week.week}`;
        row.appendChild(weekCell);

        const topicsCell = document.createElement('td');
        const topicsList = document.createElement('ul');
        week.topics.forEach(topic => {
            const listItem = document.createElement('li');
            listItem.textContent = `${topic.day}: ${topic.content}`;
            topicsList.appendChild(listItem);
        });
        topicsCell.appendChild(topicsList);
        row.appendChild(topicsCell);

        const resourcesCell = document.createElement('td');
        const resourcesList = document.createElement('ul');
        week.resources.forEach((resource, index) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = resource;
            link.textContent = `Resource ${index + 1}`;
            link.target = '_blank';
            listItem.appendChild(link);
            resourcesList.appendChild(listItem);
        });
        resourcesCell.appendChild(resourcesList);
        row.appendChild(resourcesCell);

        const activityCell = document.createElement('td');
        if (week.quiz) {
            const quizButton = document.createElement('button');
            quizButton.textContent = 'Take Quiz';
            quizButton.addEventListener('click', () => showQuiz(week.week));
            activityCell.appendChild(quizButton);
        }
        if (week.exam) {
            const examButton = document.createElement('button');
            examButton.textContent = 'Take Exam';
            examButton.addEventListener('click', () => showExam(week.week));
            activityCell.appendChild(examButton);
        }
        row.appendChild(activityCell);

        if (week.locked) {
            row.classList.add('locked');
            row.addEventListener('click', () => showPasswordModal(week.week));
        } else {
            row.addEventListener('click', () => loadNotebook(week.notebookId));
        }

        tableBody.appendChild(row);
    });
}

function showPasswordModal(weekNumber) {
    currentWeek = weekNumber;
    const modal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    modal.style.display = 'block';
    passwordInput.value = '';
    passwordError.textContent = '';
}

function setupPasswordModal() {
    const modal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPassword');
    const passwordError = document.getElementById('passwordError');

    submitButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;
        if (unlockWeek(currentWeek, enteredPassword)) {
            modal.style.display = 'none';
        } else {
            passwordError.textContent = 'Incorrect password. Please try again.';
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showQuiz(weekNumber) {
    const week = courseSchedule.find(w => w.week === weekNumber);
    if (week && week.quiz) {
        alert(`Quiz for Week ${weekNumber}: ${week.quiz}\n\nQuiz content would be displayed here.`);
    }
}

function showExam(weekNumber) {
    const week = courseSchedule.find(w => w.week === weekNumber);
    if (week && week.exam) {
        alert(`Exam for Week ${weekNumber}: ${week.exam}\n\nExam content would be displayed here.`);
    }
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

function setupCodeEditor() {
    const runButton = document.getElementById('runCode');
    const codeEditor = document.getElementById('codeEditor');
    const output = document.getElementById('output');

    runButton.addEventListener('click', async () => {
        const code = codeEditor.value;
        output.textContent = 'Running...';
        
        try {
            const pyodide = await loadPyodide();
            await pyodide.loadPackage("numpy");
            const result = await pyodide.runPythonAsync(code);
            output.textContent = result;
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
    });
}

async function initJupyterLite() {
    const jupyterLite = await window.jupyterLite.create({
        container: document.getElementById('jupyter-lite-container')
    });
    await jupyterLite.init();
    return jupyterLite;
}

async function loadNotebook(notebookId) {
    const jupyterLite = await initJupyterLite();
    await jupyterLite.open(notebookId);
}

document.addEventListener('DOMContentLoaded', () => {
    populateScheduleTable();
    setupTabs();
    setupCodeEditor();
    initJupyterLite();
    setupPasswordModal();
});
