document.addEventListener('DOMContentLoaded', () => {
  const dogUrl = "http://localhost:3000/dogs"
  const tableBody = document.getElementById('table-body')
  const dogForm = document.querySelector("#dog-form")
  const dogName = dogForm.querySelector('input[type="name"]')
  const dogBreed = dogForm.querySelector('input[type="breed"]')
  const dogSex = dogForm.querySelector('input[type="sex"]')
  const dogSubmit = dogForm.querySelector('input[type="submit"]')

  function fetchDogs() {
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(renderDogs)
  }

  function renderDogs(dogs) {
    tableBody.innerHTML = ""
    dogs.forEach(dog => {
      tableBody.innerHTML +=
      `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit Dog</button></td></tr>`
    })
    tableBody.addEventListener("click", event => {
      if (event.target.type == "submit") {
        const dogId = parseInt(event.target.dataset.id)
        fetch(`${dogUrl}/${dogId}`)
        .then(resp => resp.json())
        .then(data => {
          dogName.value = data.name
          dogBreed.value = data.breed
          dogSex.value = data.sex
        })
        dogSubmit.addEventListener("click", event => {
          event.preventDefault()
          fetch(`${dogUrl}/${dogId}`,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: dogId,
              name: dogName.value,
              breed: dogBreed.value,
              sex: dogSex.value
            })
          })
          .then(resp => resp.json())
          .then(fetchDogs)
        })
      }
    })
  }
  fetchDogs()
})
