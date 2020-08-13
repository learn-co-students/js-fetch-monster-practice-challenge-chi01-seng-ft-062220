// When the page loads, show the first 50 monsters. 
// Each monster's name, age, and description should be shown.
document.addEventListener('DOMContentLoaded', function(event){
    allMonsters()
    monsterForm()
    otherEventListeners()
})

function allMonsters(){
    fetch('http://localhost:3000/monsters/?_limit=50')
    .then(resp => resp.json())
        .then(jsonData => {
            jsonData.forEach(monster => monsterInfo(monster))
        })
}

function monsterInfo(monster){
    const monsterContainer = document.querySelector('#monster-container')
    const newMonster = document.createElement('div')
    newMonster.id = monster.id
    newMonster.innerHTML += `<h2>${monster.name}</h2><h4>${monster.age}</h4><p>${monster.description}</p>`
    monsterContainer.append(newMonster)
}

// Above monsters: 
// form to create a new monster
// fields for name, age, and description, and a 
// 'Create Monster Button'. When you click the button, 
// the monster should be added to the list and saved in the API.

function monsterForm(){
    const formLocation = document.getElementById('create-monster')
    const createMonster = document.createElement('form')
    createMonster.id = 'monster-form'
    createMonster.innerHTML=`<input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create Monster</button>`
    formLocation.append(createMonster)
}

function otherEventListeners(){
    let currentPage = 1
    document.addEventListener('click', function(event){
        if (event.target.innerHTML === 'Create Monster'){
            event.preventDefault()
            const form = event.target.parentNode
            newMonster(form)
        } else if (event.target.id === 'back') {
            curerntPage = (currentPage -=1)
            moving(currentPage)
        }else if (event.target.id === 'forward'){
            curerntPage = (currentPage +=1)
            moving(currentPage)
        }
    })
}

function newMonster(form){
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": form.name.value,
            "age": form.age.value,
            "description": form.description.value
        })
    }
    fetch('http://localhost:3000/monsters', reqObj)
        .then(resp => {
            return resp.json()
        })
        .then(jsonData => monsterInfo(jsonData))
}

// Button -  When clicked, the button should load the next 50 monsters 
// and show them.

function moving(pageNumber){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(resp => resp.json())
        .then(jsonData => {
            const monsterContainer = document.querySelector('#monster-container')
            monsterContainer.innerHTML = ''
            jsonData.forEach(monster => monsterInfo(monster))
        })
}