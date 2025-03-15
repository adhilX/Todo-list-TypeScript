import './style.css';

class Task {
    constructor(
        public text: string,
        public completed: boolean = false,
        public createdAt: Date = new Date()
    ) {}
}

class TaskManager {
    private tasks: Task[];
    private todoList: HTMLUListElement;
    private todoInput: HTMLInputElement;
    private addBtn: HTMLButtonElement;

    constructor() {
        this.todoInput = document.getElementById('todo-input') as HTMLInputElement;
        this.addBtn = document.getElementById('add-btn') as HTMLButtonElement;
        this.todoList = document.getElementById('todo-list') as HTMLUListElement;
        this.tasks = this.loadTasks();
        this.tasks.forEach(task => this.addListItem(task));
        this.addBtn?.addEventListener('click', () => this.addTask());
    }

    private addTask(): void {
        const text = this.todoInput?.value;
        if (!text) return;

        const newTask = new Task(text);
        this.tasks.push(newTask);
        this.addListItem(newTask);
        this.saveTasks();
        this.todoInput.value = '';
    }

    private addListItem(task: Task): void {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            this.saveTasks();
        });
        const span = document.createElement('span');
        span.innerText = task.text;
        li.append(checkbox, span);
        this.todoList?.appendChild(li);
    }

    private saveTasks(): void {
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    private loadTasks(): Task[] {
        const jsonTask = localStorage.getItem('TASKS');
        return jsonTask ? JSON.parse(jsonTask) : [];
    }
}

new TaskManager();
