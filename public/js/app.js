



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const icon = document.querySelector('#icon')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading...'

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ''
      } else {
        icon.src = `/img/icons/${data.forecast.icon}.svg`
        console.log(icon.src)
        messageOne.textContent = data.location
        messageTwo.textContent = `It is currently ${data.forecast.currently} degrees out, chance of rain ${data.forecast.rainChance}%.`
        search.value = ''
      }
    })
  })
  
})