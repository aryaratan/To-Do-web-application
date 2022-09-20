let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working');

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? "checked" :""}  class="custom-checkbox" >
    <label for="${task.id}">${task.text}</label>
    <img src="trash3.svg" class="delete" data-id="${task.id}" />
    `;
        
    
    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML = "";

    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }


}

function toggleTask (taskId) {
    for(let task of tasks){
        // console.log(task.id);
        if(task.id == taskId){
            task.done = !task.done;
            renderList();
            showNotification("Task toggled successfully");
            return;
        }
    }
    showNotification("Task is not present");
}

function deleteTask (taskId) {
    const newTasks =  tasks.filter(function(task){
        return task.id !== taskId;
    })
    tasks = newTasks;
    renderList();
    tasksCounter.innerHTML = parseInt(tasksCounter.innerHTML) - 1 ;
    showNotification("Task deleted successfully");
}

function addTask (task) {
    if(task){
        tasks.push(task);
        showNotification("Task added successfully");

        renderList();
        tasksCounter.innerHTML = parseInt(tasksCounter.innerHTML) + 1 ;
        return;
    }
    showNotification("Task can not be added");
}

function showNotification(text) {
    alert(text);
}

function getTask(event){
    if(event.key === 'Enter'){
        var text = event.target.value;
        // console.log(text);
        if(!text){
            showNotification("Task text can not be empty");
        }
        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }
    
        event.target.value = "";
    
        addTask(task);
    }    
}

function handleClickEvents(e){
    const target = e.target;

    if(target.className === 'custom-checkbox'){
        const id = target.id;
        toggleTask(id);
        return;
    }
    else if(target.className === 'delete'){
        const id = target.dataset.id;
        // console.log(id);
        deleteTask(id);
        return;
    }
}


function toDoApp(){
    addTaskInput.addEventListener('keyup', getTask);
    document.addEventListener('click',handleClickEvents);
}

toDoApp();

