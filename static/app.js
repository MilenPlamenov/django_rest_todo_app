listOfTodos()

// function to get the cookie - otherwise on POST, PATCH and DELETE methods it throws 403 forbidden error
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// main function to update the DOM
function updateDom(task) {
    let listWrapperEl = document.getElementById("list-wrapper");
    let mainDivEl = document.createElement('div');
    mainDivEl.classList.add("task-wrapper");
    mainDivEl.classList.add("flex-wrapper");

    let divTitle = document.createElement('div');
    divTitle.setAttribute("style", "flex:7");

    let spanTitle = document.createElement('span');
    spanTitle.classList.add("title");
    spanTitle.innerHTML = task.name;


    let editInputGroup = document.createElement('div');
    editInputGroup.classList.add("input-group");
    let editInput = document.createElement('input');
    editInput.classList.add("form-control");


    let editInputGroupBtn = document.createElement('div');
    editInputGroupBtn.classList.add("input-group-append")

    editInput.setAttribute("type", "hidden");
    let editActionBtn = document.createElement('button');
    editActionBtn.classList.add("btn");
    editActionBtn.classList.add("btn-outline-primary");
    editActionBtn.innerHTML = "Edit";
    editActionBtn.style.display = "none";

    let editDiv = document.createElement('div');
    editDiv.setAttribute("style", "flex:1");
    let editBtn = document.createElement('button');
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-sm");
    editBtn.classList.add("btn-outline-info");
    editBtn.classList.add("edit");
    /*
    Edit task logic - When Edit button is clicked shows input field with filled information for the current instance
    Hides the delete and edit buttons while under editing and only input field and button Edit reminds visible
    */
    editBtn.addEventListener("click", () => {

        editInput.removeAttribute("type");
        editActionBtn.style.display = "block";
        editBtn.style.display = "none";
        deleteBtn.style.display = "none"
        spanTitle.style.display = "none";
        editInput.value = task.name;
        editActionBtn.addEventListener("click", () => {
            const url = `http://127.0.0.1:8000/api/todo-retrieve-update-destroy/${task.id}/`;
            const csrftoken = getCookie('csrftoken');
            if (editInput.value === "") {
                alert("This field cannot be blank!")
                return;
            } else if (editInput.value.length > 25) {
                alert('The max length of the task is 25 characters!')
                return;
            }
            let obj = JSON.stringify({name: editInput.value});
            fetch(url, {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: obj,
            })
                .then(response => response.json())
                .then((data) => {
                    task.name = data.name;
                    spanTitle.innerHTML = data.name;
                })
            // hiding the input for the edit and its submit button and back the default state of the task
            editInput.setAttribute("type", "hidden");
            editActionBtn.style.display = "none";
            spanTitle.style.display = "block";
            editBtn.style.display = "block";
            deleteBtn.style.display = "block";
        })

    })

    let deleteDiv = document.createElement("div");
    editDiv.setAttribute("style", "flex:1");
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-sm");
    deleteBtn.classList.add("btn-outline-info");
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => {
        const url = `http://127.0.0.1:8000/api/todo-retrieve-update-destroy/${task.id}/`;
        const csrftoken = getCookie('csrftoken');
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
        deleteBtn.parentElement.parentElement.remove()
    })


    divTitle.appendChild(spanTitle);
    editInputGroup.appendChild(editInput);
    editInputGroupBtn.appendChild(editActionBtn);
    editInputGroup.appendChild(editInputGroupBtn);
    divTitle.appendChild(editInputGroup);
    editDiv.appendChild(editBtn);
    deleteDiv.appendChild(deleteBtn);

    mainDivEl.appendChild(divTitle);
    mainDivEl.appendChild(editDiv);
    mainDivEl.appendChild(deleteDiv);

    listWrapperEl.appendChild(mainDivEl);
}

// function to show all todos
function listOfTodos() {
    const url = 'http://127.0.0.1:8000/api/todo-list-create/';
    fetch(url)
        .then(res => res.json())
        .then(data => data.forEach(task => {
            updateDom(task)
        }))
}

// function to add todos to the db
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    let titleInput = document.getElementById("title");
    if (titleInput.value === "") {
        return;
    } else if (titleInput.value.length > 25) {
        alert('The max length of the task is 25 characters!')
        return;
    }
    const url = 'http://127.0.0.1:8000/api/todo-list-create/';
    let obj = JSON.stringify({name: titleInput.value});
    const csrftoken = getCookie('csrftoken');
    fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: obj,
    })
        .then((response) => response.json())
        .then(data => {
            updateDom(data)
            titleInput.value = "";
        })
})