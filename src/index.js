document.addEventListener('DOMContentLoaded', () => {

  const tbody = document.getElementById('table-body')
  const editDogName = document.getElementById('dogname')
  const editDogBreed = document.getElementById('dogbreed')
  const editDogSex = document.getElementById('dogsex')
  const dogForm = document.getElementById('dog-form')


  function getAllDAWGS() {
    fetch('http://localhost:3000/dogs')
    .then(function(data) {
      return data.json()
    }).then(function(dogs) {
      console.log(dogs)
      renderAllDAWGS(dogs)
    })
  }

  getAllDAWGS()

  function renderAllDAWGS(dogs) {
    tbody.innerHTML = ''
    console.log(dogs)
    dogs.forEach(function(dog) {
      console.log(dog)
      tbody.innerHTML += `
      <tr id=${dog.id}>
        <td class='oldname'>${dog.name}</td>
        <td class='oldbreed'>${dog.breed}</td>
        <td class='oldsex'>${dog.sex}</td>
        <td>
          <button data-id=${dog.id}>Edit</button>
        </td>
      </tr>
    `})
  }

  tbody.addEventListener('click' ,function(e) {
    if (e.target.tagName === 'BUTTON') {
      let button = e.target
      let dogId = e.target.dataset.id
      console.log(dogId)
      let dogRow = document.getElementById(`${e.target.dataset.id}`)
      let dogName = dogRow.querySelector('.oldname').innerText
      let dogBreed = dogRow.querySelector('.oldbreed').innerText
      let dogSex = dogRow.querySelector('.oldsex').innerText
      editDogName.value = dogName
      editDogBreed.value = dogBreed
      editDogSex.value = dogSex
      dogForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let newDogName = editDogName.value
        let newDogBreed = editDogBreed.value
        let newDogSex = editDogSex.value
        fetch(`http://localhost:3000/dogs/${dogId}`, {
          method: 'PATCH',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name: newDogName, breed: newDogBreed, sex: newDogSex})
        }).then(function(data) {
          return data.json()
        }).then(getAllDAWGS)
      })
    }
  })



})
