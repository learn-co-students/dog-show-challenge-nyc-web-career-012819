document.addEventListener('DOMContentLoaded', () => {
  const DOGS_URL = "http://localhost:3000/dogs"

  const tableBody = document.getElementById('table-body');
  const table = document.querySelector('.margin');
  const editDogForm = document.getElementById('dog-form');

  const nameInput = document.querySelector('input[name="name"]');
  const breedInput = document.querySelector('input[name="breed"]');
  const sexInput = document.querySelector('input[name="sex"]');

  function fetchDogs(url){
    return fetch(url)
    .then(resp => resp.json())
  }

  function patchDogs(id, data){
    return fetch(`${DOGS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
  }

  function renderDog(dog){
    tableBody.innerHTML += `
    <tr id="dog-row-${dog.id}">
    <td class="dog-name">${dog.name}</td>
    <td class="dog-breed">${dog.breed}</td>
    <td class="dog-sex">${dog.sex}</td>
    <td>
    <button data-id="${dog.id}">Edit</button>
    </td>
    </tr>
    `;
  }

  function renderAllDogs(){
    table.innerHTML = "";
    fetchDogs(DOGS_URL)
    .then((dogs) => {
      dogs.forEach((dog) => {
        renderDog(dog);
      })
    })
  }

  function updateDog(dog, tableRow){
    tableRow.innerHTML = `<td class="dog-name">${dog.name}</td>
    <td class="dog-breed">${dog.breed}</td>
    <td class="dog-sex">${dog.sex}</td>
    <td>
    <button data-id="${dog.id}">Edit</button>
    </td>`
  }

  tableBody.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
      let id = e.target.dataset.id;
      const tableRow = document.getElementById(`dog-row-${id}`);

      let dogName = tableRow.querySelector('.dog-name').innerText;
      let dogBreed = tableRow.querySelector('.dog-breed').innerText;
      let dogSex = tableRow.querySelector('.dog-sex').innerText;

      nameInput.value = dogName;
      breedInput.value = dogBreed;
      sexInput.value = dogSex;

      editDogForm.addEventListener('click', (e) => {
        e.preventDefault();
        let data = {name: nameInput.value, breed: breedInput.value, sex: sexInput.value};
        if(e.target.value === "Submit"){
          patchDogs(id, data).then(dog => updateDog(dog, tableRow))
        }
      })
    }
  });

  renderAllDogs();

})
