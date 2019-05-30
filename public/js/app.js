const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const icon = document.querySelector('.card-img-top')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageError = document.querySelector('#message-error')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading...'

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageError.textContent = data.error
        messageOne.textContent = ''
        icon.src = ''
        messageTwo.textContent = ''
        messageThree.textContent = ''
      } else {
        messageError.textContent = ''
        icon.src = `/img/icons/${data.forecast.icon}.svg`
        messageOne.textContent = data.location
        messageTwo.textContent = `${data.forecast.summary}`
        messageThree.textContent = `It's currently ${Math.floor(data.forecast.currently)} degrees out with a ${data.forecast.rainChance}% chance of rain`
        search.value = ''
      }
    })
  })
  
})