import { parse, format } from 'date-fns';

const taskContainer = document.getElementById('bodyTop');
let taskArray = [];

if (localStorage.getItem('tasks') === null) {
	taskArray = [];
} else {
	const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
	taskArray = tasksFromStorage;
}

function Task(task, desc, section, date, important) {
	this.task = task;
	this.desc = desc;
	this.section = section;
	this.date = date;
	this.important = important;
}

const clearContainer = () => {
	taskContainer.innerHTML = '';
};

const deleteTask = e => {
	const button = e.target;
	const taskIndex = button.parentElement.dataset.index;
	taskArray.splice(taskIndex, 1);
	totalApply(taskArray);
};

const sortDateArray = () => {
	taskArray.sort(function (a, b) {
		return new Date(a.date) - new Date(b.date);
	});
};

const formatDate = dateString => {
	const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
	const formatDate = format(parsedDate, 'MMMM dd, yyyy');
	return formatDate;
};

const postTasks = () => {
	taskArray.forEach((object, index) => {
		const taskBody = document.createElement('div');
		taskBody.classList.add('taskContainer');
		taskBody.dataset.index = index;

		const taskTitle = document.createElement('h3');
		const taskDesc = document.createElement('p');
		const taskSection = document.createElement('h4');
		const taskDate = document.createElement('p');
		const completeBtn = document.createElement('button');
		completeBtn.classList.add('completed');
		completeBtn.setAttribute('type', 'button');
		completeBtn.setAttribute('id', 'completedBtn');
		completeBtn.innerText = 'Completed';
		completeBtn.addEventListener('click', deleteTask);

		taskTitle.innerText = object.task;
		taskDesc.innerText = object.desc;
		taskSection.innerText = object.section;
		taskDate.innerText = formatDate(object.date);

		if (object.important === true) {
			taskBody.classList.add('importantTask');
			completeBtn.classList.add('importantTaskBtn');
		}

		taskContainer.appendChild(taskBody);
		taskBody.appendChild(taskTitle);
		taskBody.appendChild(taskDesc);
		taskBody.appendChild(taskSection);
		taskBody.appendChild(taskDate);
		taskBody.appendChild(completeBtn);
	});
};

const totalApply = array => {
	clearContainer();
	sortDateArray();
	postTasks(array);
	localStorage.setItem('tasks', JSON.stringify(taskArray));
};

const createTask = (task, info, section, date, important) => {
	const newTask = new Task(task, info, section, date, important);
	taskArray.push(newTask);
};

const newTask = document.getElementById('addItemForm');
newTask.addEventListener('submit', e => {
	e.preventDefault();
	createTask(
		task.value,
		info.value,
		section.value,
		date.value,
		important.checked
	);
	totalApply();
	newTask.reset();
});

const sortAll = document.getElementById('sortAll');
sortAll.addEventListener('click', () => {});
const sortWork = document.getElementById('sortWork');
sortWork.addEventListener('click', () => {});
const sortStudy = document.getElementById('sortStudy');
sortStudy.addEventListener('click', () => {});
const sortFree = document.getElementById('sortFree');
sortFree.addEventListener('click', () => {});

totalApply();
