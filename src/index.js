document.addEventListener('DOMContentLoaded', () => {

const tableBody = document.querySelector('#table-body')
const url = 'http://localhost:3000/dogs'
const fetchData = () => {return fetch(url).then(res => res.json())}
const name = document.querySelector('#name')
const breed = document.querySelector('#breed')
const sex = document.querySelector('#sex')
const submit = document.querySelector('#submit')

function dogTable() {
  fetchData()
  .then(data => {
    data.forEach(dog => {
      tableBody.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id=${dog.id}>Edit</button></td></tr>`
    })
  })
}
dogTable()

const editButton = document.addEventListener('click', (e => {
  let dogId;
  let newName;
  let newBreed;
  let newSex;
  if(e.target.innerText === "Edit"){
    name.value = e.path[2].querySelectorAll('td')[0].innerText
    breed.value = e.path[2].querySelectorAll('td')[1].innerText
    sex.value = e.path[2].querySelectorAll('td')[2].innerText
    dogId = e.path[2].querySelectorAll('td')[3].querySelector('button').id
    name.addEventListener('change', (e => {
      newName = e.target.value
    }))

    breed.addEventListener('change', (e => {
      newBreed = e.target.value
    }))

    sex.addEventListener('change', (e => {
      newSex = e.target.value
    }))
    // debugger
  }
  submit.addEventListener('click', (e => {
    fetch(`${url}/${dogId}`, {
      method: 'PATCH',
      headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           name: newName,
           breed: newBreed,
           sex: newSex
         })
    })
  }))
  // dogTable()
}))

//

// console.log(tableBody);


})
