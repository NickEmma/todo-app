// getting all the required elements
let inputBox = document.querySelector('.inputbox input')
let addBtn = document.querySelector('.inputbox button')
let todoList = document.querySelector('.todolist')
let deleteAll = document.querySelector('.footer button')

inputBox.onkeyup = () => {
  // getting the entered value
  let userData = inputBox.value
  // if the user value is only space
  if (userData.trim() != 0) {
    addBtn.classList.add('active')
    // active the add button
  } else {
    addBtn.classList.remove('active')
    // unactive the add button
  }
}

showTasks() // calling the showtask function

// if the user clicks on the add button it should show the new value
addBtn.onclick = () => {
  let userData = inputBox.value
  // getting the item from localStorage
  let getLocalStorage = localStorage.getItem('New Todo')
  if (getLocalStorage === null) {
    // if localstorage is null
    listArr = [] // creating a blank or empty array
  } else {
    listArr = JSON.parse(getLocalStorage) // transforming json string into a js object
  }
  listArr.push(userData) // pushing unto the empty array
  // storing the item in the localStorage
  localStorage.setItem('New Todo', JSON.stringify(listArr)) // transforming a js object into a json string
  showTasks() // calling the showtask function
}

// function to add task inside the ul
function showTasks() {
  // getting the item from localStorage
  let getLocalStorage = localStorage.getItem('New Todo')
  if (getLocalStorage === null) {
    // if localstorage is null
    listArr = [] // creating a blank or empty array
  } else {
    listArr = JSON.parse(getLocalStorage) // transforming json string into a js object
  }

  let pendingNum = document.querySelector('.pending')
  pendingNum.textContent = listArr.length // passing the length value so to get the total length
  if (listArr.length > 0) {
    deleteAll.classList.add('active')
  } else {
    deleteAll.classList.remove('active')
  }

  let newLiTag = ''
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick="deleteTask()"><i class="fas fa-trash"></i></span></li>`
  })
  todoList.innerHTML = newLiTag // adding new li tag inside ul tag
  inputBox.value = '' // once added a new todo leaves the field empty
}

// delete task with trash button
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem('New Todo')
  listArr = JSON.parse(getLocalStorage)
  listArr.splice(index, 1) // delete or remove that particular index li
  // after removing the li again update the localStorage
  localStorage.setItem('New Todo', JSON.stringify(listArr)) // transforming a js object into a json string
  showTasks() // calling the showtask function
}
// delete all the task function
deleteAll.onclick = () => {
  listArr = [] // empty all the whole array
  // after deleting all the task,  again update the localStorage
  localStorage.setItem('New Todo', JSON.stringify(listArr)) // transforming a js object into a json string
  showTasks() // calling the showtask function
}
