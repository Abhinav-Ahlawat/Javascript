document.addEventListener("DOMContentLoaded",()=>{
    const todoInput=document.getElementById("todo-input");
    const addTaskButton=document.getElementById("add-task-btn");
    const todoList=document.getElementById("todo-list");

    let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(element => {
        renderTask(element);
    });

    addTaskButton.addEventListener("click",()=>{
        const taskText=todoInput.value.trim();
        if(taskText==="") return;
        const newTask={
            id: Date.now(),
            text: taskText,
            isCompleted: false,
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value="";  // clearing input
    })

    function renderTask(task){
        const li= document.createElement("li");
        li.setAttribute('data-id',task.id);
        if(task.isCompleted) li.classList.add('completed');
        li.innerHTML=`
        <span>${task.text}</span>
        <button>Delete</button>
        `
        li.addEventListener("click",(event)=>{
            if(event.target.tagName === "BUTTON") return;
            task.isCompleted = !task.isCompleted;
            li.classList.toggle('completed');
            saveTasks();
        })
        li.querySelector("button").addEventListener("click",(eve)=>{
            eve.stopPropagation(); // prevent toggle from firing and even to bubble up
            tasks=tasks.filter((ele)=>ele.id!==task.id);
            li.remove();
            saveTasks();
        })
        todoList.appendChild(li);
    }

    function saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
})
