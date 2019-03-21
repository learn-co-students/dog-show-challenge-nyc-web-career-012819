document.addEventListener('DOMContentLoaded', () => {

  const DOGS_URL = 'http://localhost:3000/dogs';

  let allDogsAPI; // stores whole API from renderAllDogs function
  let foundDog; // returns signle API from fillInSelectedDog function
  const dogListTBody = document.getElementById('table-body');
  const editDogForm = document.getElementById('dog-form');

  document.addEventListener('click', fillInSelectedDog);
  document.addEventListener('click', updateCurrentDog);

  getDogsAPI().then(renderAllDogs);

  function renderAllDogs(dogs) {
    allDogsAPI = dogs;

    allDogsAPI.forEach(dog => listDogToTable(dog));
  }

  function listDogToTable(dog) {
    dogListTBody.innerHTML += `
    <tr data-id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-button-dog-id=${dog.id}>Edit</button></td></tr>
    `;
  }

  function listUpdatedDogToTable(dog) {
    Array.from(document.querySelectorAll('tr')).forEach(tr => {
      if (parseInt(tr.dataset.id) === dog.id) {
        tr.children[0].innerText = dog.name;
        tr.children[1].innerText = dog.breed;
        tr.children[2].innerText = dog.sex;
      }
    });
  }

  function fillInSelectedDog(e) {
    if (e.target.nodeName === 'BUTTON') {
      foundDog = allDogsAPI.find(dog => dog.id === parseInt(e.target.dataset.buttonDogId));
      editDogForm.children[0].value = foundDog.name;
      editDogForm.children[1].value = foundDog.breed;
      editDogForm.children[2].value = foundDog.sex;
    }
  }

  function updateCurrentDog(e) {
    e.preventDefault();
    if (e.target.value === 'Submit') {
      console.log('submit button');

      const newInputObj = {
        newName: editDogForm.children[0].value,
        newBreed: editDogForm.children[1].value,
        newSex: editDogForm.children[2].value,
        id: foundDog.id
      };

      patchSingleDogAPI(newInputObj)
      .then(dog => listUpdatedDogToTable(dog));
    }
  }

  function getDogsAPI() {
    return fetch(DOGS_URL).then(r => r.json());
  }

  function patchSingleDogAPI(object) {
    return fetch(DOGS_URL+`/${object.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: object.newName,
        breed: object.newBreed,
        sex: object.newSex
      })
    })
    .then(r => r.json());
  }

})
