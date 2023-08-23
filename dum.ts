const taskList = document.getElementById('taskList') as HTMLUListElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskNameInput = document.getElementById('taskName') as HTMLInputElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;

addTaskBtn.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    if (taskName !== '') {
        addTask(taskName);
        taskNameInput.value = '';
    }
});

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim().toLowerCase();
    filterTasks(searchText);
});

function filterTasks(searchText: string) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        const taskNameElement = task.querySelector('tr:first-child') as HTMLTableRowElement;
        const taskName = taskNameElement.textContent?.toLowerCase() || '';
        if (taskName.indexOf(searchText) !== -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

const taskNames = new Set<string>(); // Set to store task names

function addTask(taskName: string) {
    if (taskNames.has(taskName)) {
        alert(`Task '${taskName}' already exists!!`);
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `<table>
                    <tr><td>${taskName}<td>
                    <td><select class="taskStatus" style="border:none;" onchange="getOption(this)">
                    <option value="To Do">To Do</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    </select></td>
                    <td><button class="deleteBtn" style="float:right;text-align: center;">X</button></td></tr><table>`;

    const deleteBtn = li.querySelector('.deleteBtn') as HTMLButtonElement;
    const selectStatus = li.querySelector('.taskStatus') as HTMLSelectElement;

    deleteBtn.addEventListener('click', () => {
        li.remove();
        taskNames.delete(taskName); // Remove the task name from the Set
    });

    selectStatus.addEventListener('change', () => {
        updateTaskStatus(li, selectStatus.value);
    });

    taskList.appendChild(li);
    taskNames.add(taskName); // Add the task name to the Set
}

function updateTaskStatus(taskElement: HTMLElement, status: string) {
    const taskNameElement = taskElement.querySelector('tr');
    if (status === 'Completed') {
        taskNameElement?.classList.add('completed');
        taskNameElement.style.backgroundColor = 'lightblue';
        taskNameElement.style.textDecoration = 'line-through';
    } else {
        taskNameElement?.classList.remove('completed');
    }
}

function getOption(selectElement: HTMLSelectElement) {
    const taskElement = selectElement.parentElement;
    const selectedStatus = selectElement.value;
    updateTaskStatus(taskElement, selectedStatus);
}