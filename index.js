
let todoList = JSON.parse(localStorage.getItem('todoList')) || [] ;

const containerElement = document.getElementById("container");
containerElement.classList.add('bg-container');

const heading = document.createElement('h1');
heading.textContent = "Todo-List";
heading.classList.add('heading');
containerElement.appendChild(heading);

const inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
containerElement.appendChild(inputContainer);

const inputElement = document.createElement('input');
inputElement.type = 'search';
inputElement.classList.add('input');
inputContainer.appendChild(inputElement);

const buttonElement = document.createElement('button');
buttonElement.textContent = 'Add';
buttonElement.classList.add('button');
inputContainer.appendChild(buttonElement);
buttonElement.addEventListener('click', () => {
    if (inputElement.value !== ''){
        let newTodo = inputElement.value;
        let length = todoList.length + 1;
        todoList.push({task:newTodo, status:false, uniqueId:length});
        inputElement.value = "";
    }
    else{
        alert('Please Enter the Task!...')
    }
    displayTodoList();
});

let listElement = document.createElement('ul');
listElement.classList.add('list');
containerElement.append(listElement);

const statusChecked = (todoId) => {
    todoList = todoList.map(eachItem => {
        if(todoId === 'todoId' + eachItem.uniqueId){
            eachItem.status = !eachItem.status;
        }
        return eachItem
    })
}

const deleteTodo = (todoId) => {
    const index =  todoList.findIndex((eachItem) => todoId === 'todoId' + eachItem.uniqueId);
    todoList.splice(index, 1);
    displayTodoList();
    
}

function displayTodoList() {
    listElement.innerHTML = '';
    todoList.map(eachItem => {
        const todoId = 'todoId' + eachItem.uniqueId;
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listElement.appendChild(listItem);
    
        const taskStatus = document.createElement('input');
        taskStatus.type = 'checkbox';
        taskStatus.classList.add('status');
        taskStatus.id = todoId;
        taskStatus.checked = eachItem.status;
        listItem.appendChild(taskStatus);
        taskStatus.addEventListener('click', () => statusChecked(todoId))
    
        const taskElement = document.createElement('label');
        taskElement.textContent = eachItem.task;
        taskElement.classList.add('label-text')
        taskElement.htmlFor = todoId;
        listItem.appendChild(taskElement);
    
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash');
        listItem.appendChild(icon);
        icon.addEventListener('click', () => deleteTodo(todoId, todoList))
    });    
}

const btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');
containerElement.appendChild(btnContainer);

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.classList.add('button');
btnContainer.appendChild(clearButton); 
clearButton.addEventListener('click', () => {
    localStorage.removeItem('todoList'); 
    todoList = [];
});

const saveButton = document.createElement('button');
saveButton.textContent = 'Save';
saveButton.classList.add('button');
btnContainer.appendChild(saveButton);
saveButton.addEventListener('click', () => {
    saveToLocalStorage();
    displayTodoList();
});

function saveToLocalStorage () {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    let newTodo = inputElement.value.trim();
}


displayTodoList();
