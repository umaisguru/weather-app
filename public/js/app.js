


console.log('fff')

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')


weatherform.addEventListener('submit',(e)=>{
e.preventDefault()
const location=search.value


if(!location){
  console.log('invalid text')
}
msg1.textContent="Loading...."


fetch('http://localhost:3000/weather?address='+location).then((response)=>{
  response.json().then((data)=>{
    if(!data){
      msg1.textContent=data.error
    }
    
    msg1.textContent=data.location
    msg2.textContent=data.forcast
  })

})


})