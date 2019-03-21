document.addEventListener('DOMContentLoaded', () => {
  const DOG_URL = 'http://localhost:3000/dogs'
  let editID;
  let editStatus = false

  const getDogs = () => {
  return fetch(DOG_URL)
  .then(res => res.json())
  }
////CREATE/////
  const createDog = (newDog) => {
    return fetch(DOG_URL, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDog)
    })
    .then(res => res.json())
  }
  /////EDIT/////
  const updateDog = (dogId, editDog) => {
    return fetch(`${DOG_URL}/${dogId}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(editDog)
    })
    // .then(() => allDogs())
  }
/////ALL DOGS//////
const tbody = document.getElementById('table-body')
    const allDogs = () => {
      tbody.innerHTML = ''
      getDogs()
        .then(json => {
          json.forEach(dog => {
            tbody.innerHTML += `
            <tr>
              <td>${dog.name}</td>
              <td>${dog.breed}</td>
              <td>${dog.sex}</td>
              <td>
                <button id=${dog.id}>Edit</button>
              </td>
            </tr>
            `
          })
        })
    };
  const table = document.getElementsByClassName('margin')[4]

  document.addEventListener('click', (e) => {
    e.preventDefault()
    const formChildren = document.getElementById('dog-form').children
    if (e.target.tagName === 'BUTTON') {
      const firstVal = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText
      const secondVal = e.target.parentNode.previousElementSibling.previousElementSibling.innerText
      const thirdVal = e.target.parentNode.previousElementSibling.innerText

      formChildren[0].value = firstVal
      formChildren[1].value = secondVal
      formChildren[2].value = thirdVal

      editID = e.target.id
      editStatus = true
    } else if (e.target.value === 'Submit') {
        const newEditDog = {
          name: formChildren[0].value,
          breed: formChildren[1].value,
          sex: formChildren[2].value
        }
        if (editStatus) {
          const dogId = editID
          updateDog(dogId, newEditDog)
          .then(() => allDogs())
          // allDogs()
          formChildren[0].value = ''
          formChildren[1].value = ''
          formChildren[2].value = ''
          editStatus = false
        } else {
          createDog(newEditDog).then(json => {
            const newTR = document.createElement('tr')
            newTR.innerHTML = `
            <td>${json.name}</td>
            <td>${json.breed}</td>
            <td>${json.sex}</td>
            <td>
              <button id=${json.id}>Edit</button>
            </td>
            `
            tbody.append(newTR)
          })
          formChildren[0].value = ''
          formChildren[1].value = ''
          formChildren[2].value = ''
        }
      }

  })
  allDogs()
})
