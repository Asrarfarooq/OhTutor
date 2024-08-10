const courseSchedule = [
    {
        week: 1,
        topics: [
            { day: "Monday", content: "What is programming? Introduction to Python" },
            { day: "Wednesday", content: "Setting up Python environment, first 'Hello, World!' program" },
            { day: "Friday", content: "Variables and data types + Mini Quiz #1" }
        ],
        resources: ["https://docs.python.org/3/tutorial/introduction.html", "https://www.w3schools.com/python/python_intro.asp"],
        notebookId: "notebooks/week1_intro_to_python.ipynb"
    },
    {
        week: 2,
        topics: [
            { day: "Monday", content: "Basic input/output and simple math operations" },
            { day: "Wednesday", content: "Strings and string operations" },
            { day: "Friday", content: "Fun Activity: 'Code the Story' + Mini Quiz #2" }
        ],
        resources: ["https://realpython.com/python-strings/", "https://www.w3schools.com/python/python_strings.asp"],
        notebookId: "notebooks/week2_strings_and_operations.ipynb"
    },
    {
        week: 3,
        topics: [
            { day: "Monday", content: "Conditional statements (if, else, elif)" },
            { day: "Wednesday", content: "Loops (for and while)" },
            { day: "Friday", content: "Mini-Exam #1 (covers weeks 1-3)" }
        ],
        resources: ["https://realpython.com/python-conditional-statements/", "https://wiki.python.org/moin/ForLoop"],
        notebookId: "notebooks/week3_control_structures.ipynb"
    },
    {
        week: 4,
        topics: [
            { day: "Monday", content: "Lists and list operations" },
            { day: "Wednesday", content: "Introduction to functions" },
            { day: "Friday", content: "Function parameters and return values + Mini Quiz #3" }
        ],
        resources: ["https://docs.python.org/3/tutorial/datastructures.html", "https://www.w3schools.com/python/python_functions.asp"],
        notebookId: "notebooks/week4_lists_and_functions.ipynb"
    },
    {
        week: 5,
        topics: [
            { day: "Monday", content: "Simple problem-solving with functions" },
            { day: "Wednesday", content: "Dictionaries" },
            { day: "Friday", content: "Fun Activity: 'Python Treasure Hunt'" }
        ],
        resources: ["https://realpython.com/python-dicts/", "https://www.programiz.com/python-programming/dictionary"],
        notebookId: "notebooks/week5_problem_solving_and_dicts.ipynb"
    },
    {
        week: 6,
        topics: [
            { day: "Monday", content: "Tuples and sets" },
            { day: "Wednesday", content: "Reading and writing files" },
            { day: "Friday", content: "Error handling (try/except) + Mini Quiz #4" }
        ],
        resources: ["https://realpython.com/python-sets-tuples/", "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files"],
        notebookId: "notebooks/week6_files_and_errors.ipynb"
    },
    {
        week: 7,
        topics: [
            { day: "Monday", content: "Review of all concepts" },
            { day: "Wednesday", content: "Main Exam #1 (covers weeks 1-6)" },
            { day: "Friday", content: "Exam review and introduction to object-oriented programming" }
        ],
        resources: ["https://realpython.com/python3-object-oriented-programming/"],
        notebookId: "notebooks/week7_review_and_oop_intro.ipynb"
    },
    {
        week: 8,
        topics: [
            { day: "Monday", content: "Creating simple classes" },
            { day: "Wednesday", content: "Inheritance basics" },
            { day: "Friday", content: "Mini-Exam #2 (focuses on OOP concepts)" }
        ],
        resources: ["https://docs.python.org/3/tutorial/classes.html", "https://www.w3schools.com/python/python_inheritance.asp"],
        notebookId: "notebooks/week8_oop_basics.ipynb"
    },
    {
        week: 9,
        topics: [
            { day: "Monday", content: "Final project introduction and planning" },
            { day: "Wednesday", content: "Project work and guidance" },
            { day: "Friday", content: "Project presentations and course wrap-up + Fun Activity: 'Python Coding Challenge'" }
        ],
        resources: ["https://realpython.com/intermediate-python-project-ideas/"],
        notebookId: "notebooks/week9_final_project.ipynb"
    },
    {
        week: 10,
        topics: [
            { day: "Monday", content: "Introduction to a few advanced topics (e.g., modules, list comprehensions)" },
            { day: "Wednesday", content: "Main Exam #2 (comprehensive)" },
            { day: "Friday", content: "Course review, certificate distribution, and 'Next Steps in Python' discussion" }
        ],
        resources: ["https://docs.python.org/3/tutorial/modules.html", "https://realpython.com/list-comprehension-python/"],
        notebookId: "notebooks/week10_advanced_topics_and_next_steps.ipynb"
    }
];

// Add a 'password' property to each week
courseSchedule.forEach((week, index) => {
    week.locked = index > 0; // Lock all weeks except the first one initially
    week.password = `week${week.week}pass`; // Simple password for each week
});

let currentWeek = null;

function unlockWeek(weekNumber, enteredPassword) {
    const week = courseSchedule.find(w => w.week === weekNumber);
    if (week && week.password === enteredPassword) {
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

        const notesCell = document.createElement('td');
        const notesInput = document.createElement('textarea');
        notesInput.placeholder = 'Add notes here...';
        notesCell.appendChild(notesInput);
        row.appendChild(notesCell);

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
