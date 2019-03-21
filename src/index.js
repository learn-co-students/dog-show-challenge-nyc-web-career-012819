document.addEventListener('DOMContentLoaded', () => {

  const url = 'http://localhost:3000/dogs'
  const table = document.querySelector('#table-body')
  const dName = document.querySelector('#dname')
  const dBreed = document.querySelector('#dbreed')
  const dSex = document.querySelector('#dsex')
  const submit = document.querySelector('#submit')

  function fetchData(){
    return fetch(url)
    .then(data => data.json())
  }

  function dogTable(){
    fetchData()
    .then (data => {
    data.forEach(dog => {
      table.innerHTML +=
      `
      <tr>
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id=${dog.id}>Edit</button></td>
      </tr>
      `
      })
    })
  }
  dogTable()

  let updateName
  let updateBreed
  let updateSex
  let dogId
  document.addEventListener('click', (e) =>{
    if (e.target.innerHTML === 'Edit'){
      console.log('clicked')
      // debugger
      dName.value = e.path[2].querySelectorAll('td')[0].innerText
      dBreed.value = e.path[2].querySelectorAll('td')[1].innerText
      dSex.value = e.path[2].querySelectorAll('td')[2].innerText
      dogId = e.path[2].querySelectorAll('td')[3].querySelector('button').id
    }

    dName.addEventListener('change', (e) =>{
      updateName = e.target.value
    })
    dBreed.addEventListener('change', (e) =>{
      updateBreed = e.target.value
    })
    dSex.addEventListener('change', (e) =>{
      updateSex = e.target.value
    })
  })

  submit.addEventListener('click', (e) => {
      fetch(`${url}/${dogId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          name: updateName,
          breed: updateBreed,
          sex: updateSex
        }),
    })
  })

})// DOM Loaded
