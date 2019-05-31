const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const link = 'http://localhost:3000/weather?address='

weatherFrom.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value

    fetch(link+location).then((res) => {
        res.json().then(({location,summary,temperature,error}={}) => {
            if (error) {
                messageOne.textContent = error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = location
                messageTwo.textContent = summary + ' It is currently ' + temperature + ' degrees out!'
            }
           
        })
    })
})

