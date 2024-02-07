const containerCurrent = document.querySelector(".container-time-current"),
    $day = document.querySelector(".container-day");

    let task = [];

    if(localStorage.getItem("task"))
        task =  JSON.parse(localStorage.getItem("task"));

let time = new Date(),
    dayNumber = time.getDay(),
    days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    day = days[dayNumber];

let monthNumber = time.getMonth(),
    months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthAbbreviation = months[monthNumber];

    const setTimeCurrent = (element)=>{
        element.querySelector(".day").innerText = time.getDate();
        element.querySelector(".month").innerHTML = `${monthAbbreviation} <strong>${time.getFullYear()}</strong>`;
        $day.innerText = day;
    };

    const addTask = (newTask)=>{
        task.push(newTask);
        localStorage.setItem('task', JSON.stringify(task));
    }

    const renderetTask = ()=>{
        const $listTasks = document.querySelector(".container-list");
        let html = "";

        task.forEach((element, index)=>{
            if(element.Status === false)
            html += `<li class="active" data-task="${index }">${element.Name}</li>`;
            else
            html += `<li class="inactive" data-task="${index}">${element.Name}</li>`;
        });

        $listTasks.innerHTML = html;
    }

    const removeTask = (indexTask)=>{
        if(confirm("Seguro que deseas eliminar la task"))
        {
            task.pop(indexTask);
        }
    }

    document.addEventListener("submit", (e)=>{
        if(e.target.classList[0] === "container-new-task")
        {
            e.preventDefault();
            addTask({Name: e.target.name.value, Status: false});
            e.target.name.value = "";
            renderetTask();
        }
    });

    document.addEventListener("click", (e)=>{
        if(e.target.hasAttribute("data-task"))
        {
            if(e.target.classList[0] === "active")
            {
                e.target.classList.remove("active");
                e.target.classList.add("inactive");
                task[e.target.getAttribute("data-task")].Status = true;
                localStorage.setItem('task', JSON.stringify(task));
            }
            else{
                e.target.classList.add("active");
                e.target.classList.remove("inactive");
                task[e.target.getAttribute("data-task")].Status = false; 
                localStorage.setItem('task', JSON.stringify(task));
            }
        }
    });

    document.addEventListener("dblclick", (e)=>{
        if(e.target.hasAttribute("data-task")){
            removeTask(e.target.getAttribute("data-task"));
            renderetTask();
        }
    });
    
    document.addEventListener("DOMContentLoaded", (e)=>{
        setTimeCurrent(containerCurrent);
        renderetTask();
    });

