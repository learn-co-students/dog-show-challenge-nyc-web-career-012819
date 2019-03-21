document.addEventListener('DOMContentLoaded', () => {
  //variables
  const url = "http://localhost:3000/dogs";
  const tbody = document.querySelector('#table-body');
  const inputName = document.querySelector('#input-name');
  const inputBreed = document.querySelector('#input-breed');
  const inputSex = document.querySelector('#input-sex');
  const dogForm = document.querySelector('#dog-form');
  let dogId;

  //function
  function fetchDogs() {
    fetch(url)
    .then(response => response.json())
    .then(dogs => {
      dogs.forEach(dog => {
        renderDog(dog)
      })
    })//end of this fetch
  }//end of this function

  function renderDog(dog) {
    tbody.innerHTML += `
    <tr data-tr-id="${dog.id}">
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-edit-id="${dog.id}" class="edit-btn">Edit</button></td>
    </tr>
    `
  }//end of this function

  //event listener
  tbody.addEventListener('click', event => {

    const btnId = event.target.dataset.editId;
    const grandNode = document.querySelector(`[data-tr-id="${btnId}"]`).childNodes
    const dogName = grandNode[1].innerText;
    const dogBreed = grandNode[3].innerText;
    const dogSex = grandNode[5].innerText;
    if (event.target.className === "edit-btn") {
      inputName.value = dogName;
      inputBreed.value = dogBreed;
      inputSex.value = dogSex;
      dogId = event.target.dataset.editId;
    }
  })//end of event listener

  dogForm.addEventListener('submit', event => {
    event.preventDefault();
    fetch(`${url}/${dogId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: inputName.value,
        breed: inputBreed.value,
        sex: inputSex.value
      })//end of body
    })//end of this fetch
    .then(response => response.json())
    .then(dog => {
      dogId = '';
      let dogTr = document.querySelector(`[data-tr-id="${dog.id}"]`);
      dogTr.innerHTML = `
      <tr data-tr-id="${dog.id}">
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-edit-id="${dog.id}" class="edit-btn">Edit</button></td>
      </tr>`
    })
  });//end of this event listener

  fetchDogs();//function call
})//end of DOMContentLoaded
