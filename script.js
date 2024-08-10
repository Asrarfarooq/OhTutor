const courseSchedule = [
    {
        week: 1,
        topics: [
            { day: "Monday", content: "What is programming?" },
            { day: "Wednesday", content: "Your first Python program" },
            { day: "Friday", content: "Simple math operations and Introduction to variables" }
        ],
        resources: ["https://www.python.org/about/gettingstarted/", "https://www.w3schools.com/python/python_intro.asp"],
        notebookId: "notebooks/week1_intro_to_python.ipynb"
    },
    {
        week: 2,
        topics: [
            { day: "Monday", content: "String basics" },
            { day: "Wednesday", content: "More about variables and Basic input/output" },
            { day: "Friday", content: "Simple string operations + Mini Quiz" }
        ],
        resources: ["https://www.w3schools.com/python/python_strings.asp", "https://realpython.com/python-strings/"],
        notebookId: "notebooks/week2_text_and_numbers.ipynb"
    },
    {
        week: 3,
        topics: [
            { day: "Monday", content: "Introduction to booleans (True/False)" },
            { day: "Wednesday", content: "If statements" },
            { day: "Friday", content: "Else and elif statements + Simple decision-making programs" }
        ],
        resources: ["https://realpython.com/python-conditional-statements/", "https://www.w3schools.com/python/python_conditions.asp"],
        notebookId: "notebooks/week3_making_decisions.ipynb"
    },
    {
        week: 4,
        topics: [
            { day: "Monday", content: "Introduction to loops" },
            { day: "Wednesday", content: "For loops with ranges" },
            { day: "Friday", content: "While loops + Simple programs using loops" }
        ],
        resources: ["https://wiki.python.org/moin/ForLoop", "https://www.w3schools.com/python/python_while_loops.asp"],
        notebookId: "notebooks/week4_loops.ipynb"
    },
    {
        week: 5,
        topics: [
            { day: "Monday", content: "Introduction to lists" },
            { day: "Wednesday", content: "Adding and removing items from lists" },
            { day: "Friday", content: "Looping through lists + Simple list-based programs" }
        ],
        resources: ["https://docs.python.org/3/tutorial/introduction.html#lists", "https://www.w3schools.com/python/python_lists.asp"],
        notebookId: "notebooks/week5_lists.ipynb"
    },
    {
        week: 6,
        topics: [
            { day: "Monday", content: "What are functions?" },
            { day: "Wednesday", content: "Creating simple functions" },
            { day: "Friday", content: "Function parameters and Return values" }
        ],
        resources: ["https://www.w3schools.com/python/python_functions.asp", "https://realpython.com/defining-your-own-python-function/"],
        notebookId: "notebooks/week6_functions_intro.ipynb"
    },
    {
        week: 7,
        topics: [
            { day: "Monday", content: "Review of concepts" },
            { day: "Wednesday", content: "Guided mini-projects (e.g., simple calculator, guessing game)" },
            { day: "Friday", content: "Introduction to problem-solving with Python" }
        ],
        resources: ["https://www.practicepython.org/", "https://projecteuler.net/archives"],
        notebookId: "notebooks/week7_mini_projects.ipynb"
    },
    {
        week: 8,
        topics: [
            { day: "Monday", content: "More complex functions" },
            { day: "Wednesday", content: "Introduction to modules" },
            { day: "Friday", content: "Using simple built-in modules (e.g., random, time)" }
        ],
        resources: ["https://docs.python.org/3/tutorial/modules.html", "https://realpython.com/python-modules-packages/"],
        notebookId: "notebooks/week8_modules.ipynb"
    },
    {
        week: 9,
        topics: [
            { day: "Monday", content: "Reading from files" },
            { day: "Wednesday", content: "Writing to files" },
            { day: "Friday", content: "Simple data storage projects" }
        ],
        resources: ["https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files", "https://realpython.com/read-write-files-python/"],
        notebookId: "notebooks/week9_file_handling.ipynb"
    },
    {
        week: 10,
        topics: [
            { day: "Monday", content: "Guided final project (e.g., simple text-based game)" },
            { day: "Wednesday", content: "Review of the course" },
            { day: "Friday", content: "Introduction to further learning resources" }
        ],
        resources: ["https://inventwithpython.com/invent4thed/", "https://www.python.org/about/apps/"],
        notebookId: "notebooks/week10_final_project.ipynb"
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
