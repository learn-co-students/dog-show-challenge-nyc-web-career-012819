document.addEventListener('DOMContentLoaded', () => {

  const dogTable = document.querySelector('#table-body');
  const dogNameForm = document.querySelector('#input-dog-name')
  const dogBreedForm = document.querySelector('#input-dog-breed')
  const dogSexForm = document.querySelector('#input-dog-sex')
  const dogForm = document.querySelector('#dog-form')
  const submitBtn = dogForm.querySelector('#submit-button')

  function fetchAllDogs() {
    fetch ('http://localhost:3000/dogs')
    .then (res => res.json())
    .then (dogs => renderAllDogs(dogs))
  }


  function renderAllDogs(dogs) {
    dogTable.innerHTML = ''
    dogs.forEach(function (dog) {
      dogTable.innerHTML +=
      `
      <tr>
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-id = ${dog.id}>Edit</button></td>
      </tr>`
    })
  }


  dogTable.addEventListener('click', (e) => {
    const selectedDogId = parseInt(e.target.dataset.id)

    fetch('http://localhost:3000/dogs')
    .then (res => res.json())
    .then (dogs => findSelectedDog(dogs))
    .then (foundDog => editTheFoundDog(foundDog))


    function findSelectedDog(dogs) {
      const foundDog =  dogs.find(function(dog) {
        return (selectedDogId === dog.id)
      })
      return foundDog;
    }


    function editTheFoundDog(foundDog) {
      dogNameForm.value = foundDog.name
      dogBreedForm.value = foundDog.breed
      dogSexForm.value = foundDog.sex

      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let newName = dogNameForm.value;
        let newBreed = dogBreedForm.value;
        let newSex = dogSexForm.value;

        fetch(`http://localhost:3000/dogs/${foundDog.id}`, {
          method: "PUT",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name: newName,
            breed: newBreed,
            sex: newSex
          })
        })
      })
    }

  })



  fetchAllDogs();
})
