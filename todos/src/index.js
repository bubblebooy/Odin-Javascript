console.log("Script Started")

const List = (title, description) => {
  let todos = []
  return {title, description, todos};
};

const Todo = (title,description,dueDate,priority) => {
  let completed = false;
  return {title,description,dueDate,priority,completed};
}

const reviver = (key, value) => {
  if (key == "dueDate"){
    return new Date(value)
  }
  return value
}

// localStorage.removeItem("todoLists");  //clears localStorage

const todoLists = [];
if (localStorage.todoLists){
  JSON.parse(localStorage.todoLists,reviver).forEach(function(list){
    todoLists.push(list)
  });
} else {
  console.log("localStorage empty")
  todoLists.push(List("Default List","Default Description"))
  localStorage.todoLists = JSON.stringify(todoLists)
}

function displayLists(div, lists, activeList=lists[0]){
  clearContainer(div)
  let ul = document.createElement('ul');
  div.appendChild(ul);
  // let allLists = document.createElement('li');
  // allLists.textContent = "all";
  // allLists.classList.add("lists-nav-li");
  // ul.appendChild(allLists);
  lists.forEach(list => {
    let li = document.createElement('li');
    li.textContent = list.title;
    li.classList.add("lists-nav-li");
    if (list == activeList){li.classList.add("active");}
    li.addEventListener("click", function(){
      selectList(ul, this)
      const todoContainer = document.getElementById('todo-container');
      clearContainer(todoContainer)
      displayTodoTable(todoContainer, list)
    })
    ul.appendChild(li);
  });
  let newList = document.createElement('span');
  newList.textContent = "new";
  newList.classList.add("new-list");
  newList.addEventListener("click", function(){
    let li = document.createElement('li');
    let list = newListEvent()
    li.textContent = list.title;
    li.classList.add("lists-nav-li")
    li.addEventListener("click", function(){
      selectList(ul, li)
      const todoContainer = document.getElementById('todo-container');
      clearContainer(todoContainer)
      displayTodoTable(todoContainer, list)
    })
    li.click();
    ul.appendChild(li);
    // selectList(ul, li)
  });
  div.appendChild(newList);
}


function newListEvent(){
  const newtList = List("New List","New list description")
  todoLists.push(newtList)
  localStorage.todoLists = JSON.stringify(todoLists)
  return newtList
}

function selectList(div, list){
  let liLists = div.getElementsByClassName("lists-nav-li");
  for (let i = 0; i < liLists.length; i++){
    liLists[i].classList.remove("active")
  };
  list.classList.toggle("active")
}


function displayTodoTable(div, list){
  let titleDiv = document.createElement('div');
  div.appendChild(titleDiv)
  let listTitle = document.createElement('h2');
  listTitle.textContent = list.title
  let listTitleInput = document.createElement('INPUT');
  listTitleInput.textContent = list.title
  listTitle.classList.add("todo-list-title")
  titleDiv.appendChild(listTitle)
  let editTitle = document.createElement('button')
  editTitle.textContent = 'edit'
  editTitle.classList.add("btn-edit")
  editTitle.addEventListener("click",function saveEdit(){
    if (editTitle.textContent == 'edit'){
      // listTitleInput.addEventListener("focusout", saveEdit)
      listTitleInput.addEventListener("keyup", function(e){if (e.key === "Enter") {saveEdit()}})
      editTitle.textContent =  'save'
      listTitleInput.value = list.title;
      titleDiv.insertBefore(listTitleInput,editTitle);
      listTitleInput.focus();
      listTitle.style.display = "none";
    } else {
      editTitle.textContent =  'edit'
      list.title = listTitleInput.value;
      listTitle.textContent = list.title
      titleDiv.removeChild(listTitleInput);
      listTitleInput = listTitleInput.cloneNode(true);
      listTitle.style.display = "inline";
      localStorage.todoLists = JSON.stringify(todoLists)
      const listsDiv = document.getElementsByClassName('lists-div')[0];
      displayLists(listsDiv, todoLists, list)
    }
  })
  titleDiv.appendChild(editTitle)

  let descriptionDiv = document.createElement('div');
  div.appendChild(descriptionDiv)
  let listDescription = document.createElement('span');
  listDescription.textContent = list.description
  let listDescriptionInput = document.createElement('INPUT');
  listDescriptionInput.textContent = list.description
  descriptionDiv.appendChild(listDescription)
  let editDescription = document.createElement('button')
  editDescription.textContent = 'edit'
  editDescription.classList.add("btn-edit")
  editDescription.addEventListener("click",function saveEdit(){
    if (editDescription.textContent == 'edit'){
      // listDescriptionInput.addEventListener("focusout", saveEdit)
      listDescriptionInput.addEventListener("keyup", function(e){if (e.key === "Enter") {saveEdit()}})
      editDescription.textContent =  'save'
      listDescriptionInput.value = list.description;
      descriptionDiv.insertBefore(listDescriptionInput,editDescription);
      listDescriptionInput.focus();
      listDescription.style.display = "none";
    } else {
      editDescription.textContent =  'edit'
      list.description = listDescriptionInput.value;
      listDescription.textContent = list.description
      descriptionDiv.removeChild(listDescriptionInput);
      listDescriptionInput = listDescriptionInput.cloneNode(true);
      listDescription.style.display = "inline";
      localStorage.todoLists = JSON.stringify(todoLists)
    }
  })
  descriptionDiv.appendChild(editDescription)

  let newTodo = document.createElement('button');
  newTodo.textContent = "new item"
  newTodo.addEventListener("click",function(){
    let tr = document.createElement('form');tr.classList.add("table-row")
    todoTable.appendChild(tr);
    todoRowEdit(tr, newTodoEvent(list))
  })
  div.appendChild(newTodo)
  let todoTable = document.createElement('div');
  todoTable.classList.add("todo-table")
  div.appendChild(todoTable);
  list.todos.forEach(function(todo){
    let tr = document.createElement('div');tr.classList.add("table-row")
    todoTable.appendChild(tr);
    todoRow(tr, todo)
  });
}


function todoRow(tableRow, todo){
  //title,description,dueDate,priority
  let title = document.createElement('td');
  title.textContent = todo.title
  tableRow.appendChild(title)
  let description = document.createElement('td');
  description.textContent = todo.description
  tableRow.appendChild(description)
  let dueDate = document.createElement('td');
  dueDate.textContent = todo.dueDate.toLocaleDateString()
  tableRow.appendChild(dueDate)
  let priority = document.createElement('td');
  priority.textContent = todo.priority
  tableRow.appendChild(priority)
  let edit = document.createElement('td');
  tableRow.appendChild(edit)
  let editbtn = document.createElement('button');
  editbtn.textContent = 'edit'
  editbtn.classList.add("btn-edit")
  editbtn.addEventListener('click',function(){
     // clearContainer(tableRow);
     let form = document.createElement('form');
     tableRow.parentNode.replaceChild(form, tableRow);
     form.classList.add("table-row");
     todoRowEdit(form, todo);

  })
  edit.appendChild(editbtn)
}

function todoRowEdit(tableRow, todo){
  let title = document.createElement('div'); title.classList.add("table-cell");
  tableRow.appendChild(title);
  let editTitle = document.createElement('INPUT');
  editTitle.size="10"
  editTitle.value = todo.title;
  title.appendChild(editTitle);
  let description = document.createElement('div');  description.classList.add("table-cell");
  tableRow.appendChild(description);
  let editDescription = document.createElement('INPUT');
  editDescription.value = todo.description;
  description.appendChild(editDescription);
  let dueDate = document.createElement('div');  dueDate.classList.add("table-cell");
  tableRow.appendChild(dueDate);
  let editDueDate = document.createElement('INPUT');
  editDueDate.type = "date" ;// editDueDate.min = new Date().toISOString().substr(0,10);
  editDueDate.value = todo.dueDate.toISOString().substr(0,10);
  dueDate.appendChild(editDueDate);
  let priority = document.createElement('div');  priority.classList.add("table-cell");
  tableRow.appendChild(priority);
  let editPriority = document.createElement('INPUT');
  editPriority.type="number"; editPriority.min="0"; editPriority.max="5"
  editPriority.value = todo.priority
  priority.appendChild(editPriority);
  let save = document.createElement('div');  save.classList.add("table-cell");
  tableRow.appendChild(save);
  let formSubmit = document.createElement('INPUT');
  formSubmit.type = "submit"
  save.appendChild(formSubmit);
  tableRow.addEventListener("submit", function(e){
    e.preventDefault();
    todo.title = editTitle.value;
    todo.description = editDescription.value ;
    todo.dueDate = new Date(editDueDate.value);
    todo.priority = editPriority.value;
    let tr = document.createElement('div');tr.classList.add("table-row")
    tableRow.parentNode.replaceChild(tr,tableRow);
    todoRow(tr, todo)
    localStorage.todoLists = JSON.stringify(todoLists)
  })


}

function newTodoEvent(list){
  const newTodo = Todo("newTodo","new todo Default description", new Date() , 0)
  list.todos.push(newTodo)
  localStorage.todoLists = JSON.stringify(todoLists)
  return newTodo
}

function clearContainer(divContainer){
  while (divContainer.hasChildNodes()) {
    divContainer.firstChild.remove();
  }
}


const listsNav = document.getElementById('lists-nav');
const listsDiv = document.createElement('listsNav');
listsDiv.classList.add('lists-div')
listsNav.appendChild(listsDiv);
displayLists(listsDiv, todoLists)
// listsDiv.querySelectorAll("li")[1].classList.add("active")

const todoContainer = document.getElementById('todo-container');
displayTodoTable(todoContainer, todoLists[0])

  // history.pushState('data to be passed', 'Title of the page', '/dist/index.html?newList');
