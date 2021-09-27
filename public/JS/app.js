console.log('Client Side JS is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

//msg1.textContent = ''
//msg2.textContent = ''


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
   // console.log(location)


   fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log(data.error)
            msg1.textContent = data.error
        }else{
            //console.log(data.location)
            //console.log(data.forecast)
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
})



