//Log console

// console.log('Hello world');

// const name  = 'Daniel';
// const age = 30;
// const job = 'developer';
// const city = 'Bogota';

// let val;


// let html;
// // template strings

// html = `
//     <ul>
//         <li>Name: ${name}</li>
//         <li>age: ${age}</li>
//         <li>job: ${job}</li>
//         <li>city: ${city}</li>
//     </ul>

// `;

// document.body.innerHTML += html;

// val = window.navigator.language

// const val =document.createElement('li');
// val.className ='collection-item';

// val.appendChild(document.createTextNode('hello world'));



// const link= document.createElement('a');
// link.className= 'delete-item secondary-content';
// link.innerHTML = '<i class="fa fa-remove"></i>';

// val.appendChild(link);

// document.querySelector('ul.collection').appendChild(val);
// const clearBtn =document.querySelector('.clear-tasks');
// const card = document.querySelector('.card');
// const heading = document.querySelector('h5');
// //.addEventListener('click',onClick);

// card.addEventListener('mousemove', runEvent);
// //card.addEventListener('mouseleave', runEvent);


// function runEvent(e){
//     console.log(`Event type: ${e.type} hahaha`);

//     heading.textContent = `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`;
// }

// function onClick(e){
//     let val;
//     val = e;
    
//     e.target.text ='hollo'
//     console.log(val);
// }

// document.body.addEventListener('click', deleteItem);

// function deleteItem(e){
//     if(e.target.parentElement.classList.contains('delete-item')){
//         console.log('delete item');
//         e.target.parentElement.parentElement.remove();
//     }
// }

//Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event list
loadEventListeners();

function loadEventListeners(){

    // dom load event 
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);

    //remove task
    taskList.addEventListener('click', removeTask);

    //clear task event 
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks
    filter.addEventListener('keyup', filterTasks);

}

//get tasks from LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(
        function(task){
            // create li element
            const li = document.createElement('li');
            li.className='collection-item';
            li.appendChild(document.createTextNode(task));

            //create new link element
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content'; 
            //secondary content moves element to the right
            link.innerHTML = '<i class="fa fa-remove"></i>';

            //append to li
            li.appendChild(link);

            //append li to ul 
            taskList.appendChild(li);
        }
    );
}

//add Task 
function addTask(e){
    if(taskInput.value === ''){
        alert('add task');
    }

    // create li element
    const li = document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; 
    //secondary content moves element to the right
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append to li
    li.appendChild(link);

    //append li to ul 
    taskList.appendChild(li);

    //store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    //clear input 
    taskInput.value='';



    e.preventDefault();
}

// Storage locally
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are u sure?')) {
           e.target.parentElement.parentElement.remove();

           removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
        }
        
    }
}

//remove task from LS
function removeTaskFromLocalStorage(taskElement){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(
        function(task, index){
            if (taskElement.textContent === task) {
                tasks.splice(index,1);
            }
        }
    );

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        
    }

    //clear from LS
    clearTasksFromLocalStorage();

}

// clear from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// filter tasks
function filterTasks(e){

    const text = e.target.value.toLowerCase();
    //console.log(text);
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display ='block';
            }else{
                task.style.display ='none';
            }
        }
    );

}