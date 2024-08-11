const courseSchedule = [
    {
        week: 1,
        topics: [
            { day: "Monday", content: "What is programming? Intro to Python" },
            { day: "Wednesday", content: "Your first Python program: Hello, World!" },
            { day: "Friday", content: "Fun Project: Create a silly sentence generator" }
        ],
        resources: ["https://www.python.org/about/gettingstarted/", "https://www.w3schools.com/python/python_intro.asp"],
        notebookId: "week1_intro_to_python.ipynb"
    },
    {
        week: 2,
        topics: [
            { day: "Monday", content: "Numbers and Math in Python" },
            { day: "Wednesday", content: "Variables: Storing and Using Information" },
            { day: "Friday", content: "Fun Project: Build a simple calculator" }
        ],
        resources: ["https://www.w3schools.com/python/python_numbers.asp", "https://www.w3schools.com/python/python_variables.asp"],
        notebookId: "week2_numbers_and_variables.ipynb"
    },
    {
        week: 3,
        topics: [
            { day: "Monday", content: "Strings: Working with Text" },
            { day: "Wednesday", content: "String operations and formatting" },
            { day: "Friday", content: "Fun Project: Create a mad libs game" }
        ],
        resources: ["https://www.w3schools.com/python/python_strings.asp", "https://realpython.com/python-strings/"],
        notebookId: "week3_strings.ipynb"
    },
    {
        week: 4,
        topics: [
            { day: "Monday", content: "Introduction to Lists" },
            { day: "Wednesday", content: "List operations and methods" },
            { day: "Friday", content: "Fun Project: Build a to-do list app" }
        ],
        resources: ["https://www.w3schools.com/python/python_lists.asp", "https://realpython.com/python-lists-tuples/"],
        notebookId: "week4_lists.ipynb"
    },
    {
        week: 5,
        topics: [
            { day: "Monday", content: "If statements: Making decisions" },
            { day: "Wednesday", content: "Else and elif: More decision making" },
            { day: "Friday", content: "Fun Project: Create a simple quiz game" }
        ],
        resources: ["https://www.w3schools.com/python/python_conditions.asp", "https://realpython.com/python-conditional-statements/"],
        notebookId: "week5_decisions.ipynb"
    },
    {
        week: 6,
        topics: [
            { day: "Monday", content: "For loops: Repeating actions" },
            { day: "Wednesday", content: "While loops: Another way to repeat" },
            { day: "Friday", content: "Fun Project: Design a number guessing game" }
        ],
        resources: ["https://www.w3schools.com/python/python_for_loops.asp", "https://www.w3schools.com/python/python_while_loops.asp"],
        notebookId: "week6_loops.ipynb"
    },
    {
        week: 7,
        topics: [
            { day: "Monday", content: "Functions: Creating reusable code" },
            { day: "Wednesday", content: "Function parameters and return values" },
            { day: "Friday", content: "Fun Project: Build a simple drawing program" }
        ],
        resources: ["https://www.w3schools.com/python/python_functions.asp", "https://realpython.com/defining-your-own-python-function/"],
        notebookId: "week7_functions.ipynb"
    },
    {
        week: 8,
        topics: [
            { day: "Monday", content: "Dictionaries: Storing key-value pairs" },
            { day: "Wednesday", content: "Working with dictionaries" },
            { day: "Friday", content: "Fun Project: Create a mini address book" }
        ],
        resources: ["https://www.w3schools.com/python/python_dictionaries.asp", "https://realpython.com/python-dicts/"],
        notebookId: "week8_dictionaries.ipynb"
    },
    {
        week: 9,
        topics: [
            { day: "Monday", content: "File handling: Reading from files" },
            { day: "Wednesday", content: "File handling: Writing to files" },
            { day: "Friday", content: "Fun Project: Build a simple note-taking app" }
        ],
        resources: ["https://www.w3schools.com/python/python_file_handling.asp", "https://realpython.com/read-write-files-python/"],
        notebookId: "week9_file_handling.ipynb"
    },
    {
        week: 10,
        topics: [
            { day: "Monday", content: "Review of key concepts" },
            { day: "Wednesday", content: "Final project work: Create your own text-based adventure game" },
            { day: "Friday", content: "Project presentations and course wrap-up" }
        ],
        resources: ["https://inventwithpython.com/invent4thed/", "https://www.python.org/about/apps/"],
        notebookId: "week10_final_project.ipynb"
    }
];

const STATIC_PASSWORD = "ohtutor2024";

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
        const lockIcon = document.createElement('span');
        lockIcon.textContent = week.locked ? '🔒' : '🔓';
        lockIcon.classList.add('lock-icon');
        lockIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (week.locked) {
                showPasswordModal(week.week);
            } else {
                week.locked = true;
                updateScheduleDisplay();
            }
        });
        weekCell.appendChild(lockIcon);
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

        const notebookCell = document.createElement('td');
        if (week.notebookId) {
            const notebookLink = document.createElement('a');
            notebookLink.href = "#";
            notebookLink.textContent = 'Open Notebook';
            notebookLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (!week.locked) {
                    openNotebook(week.notebookId);
                }
            });
            notebookCell.appendChild(notebookLink);
        }
        row.appendChild(notebookCell);

        if (week.locked) {
            row.classList.add('locked');
            row.querySelectorAll('a').forEach(link => {
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.5';
            });
        }

        tableBody.appendChild(row);
    });
}

function openNotebook(notebookId) {
    const jupyterLiteUrl = 'https://jupyterlite.github.io/demo/repl/index.html?kernel=python&toolbar=1';
    const notebookUrl = `https://raw.githubusercontent.com/Asrarfarooq/OhTutor/main/notebooks/${notebookId}`;
    
    // Open JupyterLite in a new window
    const jupyterWindow = window.open('', '_blank', 'width=800,height=600');
    jupyterWindow.document.write(`
        <html>
            <head>
                <title>OhTutor Jupyter Notebook</title>
                <style>
                    body, html, iframe {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                        border: none;
                    }
                </style>
            </head>
            <body>
                <iframe id="jupyterFrame" width="100%" height="100%"></iframe>
                <script>
                    // Function to fetch the notebook content and load it into JupyterLite
                    async function loadNotebook() {
                        try {
                            const response = await fetch('${notebookUrl}');
                            const notebookContent = await response.text();
                            const encodedNotebook = encodeURIComponent(notebookContent);
                            const fullUrl = '${jupyterLiteUrl}&notebook=' + encodedNotebook;
                            document.getElementById('jupyterFrame').src = fullUrl;
                        } catch (error) {
                            console.error('Error loading notebook:', error);
                            document.body.innerHTML = '<h1>Error loading notebook. Please try again.</h1>';
                        }
                    }
                    loadNotebook();
                </script>
            </body>
        </html>
    `);
}

function showPasswordModal(weekNumber) {
    currentWeek = weekNumber;
    const modal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const modalWeekNumber = document.getElementById('modalWeekNumber');

    modal.style.display = 'block';
    passwordInput.value = '';
    passwordError.textContent = '';
    modalWeekNumber.textContent = weekNumber;
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

document.addEventListener('DOMContentLoaded', () => {
    populateScheduleTable();
    setupPasswordModal();
});
