import './style.css'


const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement
const  todoList = document.getElementById('todo-list') as HTMLUListElement

type Task ={
  text :string
  completed : boolean
  createdAt : Date
}

const tasks: Task[] = loadTask()
tasks.forEach(addListItem)

addBtn?.addEventListener('click',()=>{
  const text = todoInput?.value
  // console.log(text)
 if(!text)return

 const newTask :Task ={
  text ,
  completed : false,
  createdAt : new Date()
 }

 console.log(newTask)
 tasks.push(newTask)
 addListItem(newTask)
 saveTasks()
 todoInput.value=''

})


 function addListItem(task : Task):void{
  const li = document.createElement('li')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  checkbox.addEventListener('change',()=>{
    task.completed = checkbox.checked
    saveTasks()
    console.log(task.completed)
  })
  const span = document.createElement('span')
  span.innerText = task.text
  li.append(checkbox,span)
  todoList?.appendChild(li)
 }


 function saveTasks(): void{
    localStorage.setItem('TASKS',JSON.stringify(tasks))
 }

 function loadTask():Task[]{
  const jsonTask =localStorage.getItem('TASKS')
  if(!jsonTask) return []
  return JSON.parse(jsonTask)
 }