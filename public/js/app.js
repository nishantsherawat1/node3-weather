console.log("client side js is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('#inputsearch');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(event) => {
    
event.preventDefault();
const location = search.value;
const url = 'http://localhost:3000/weather?address='+location;
fetch(url).then((response) => {
response.json().then((data) => {
    if(data.error){
        console.log('error in client side app.js');
        message1.textContent = data.error;
        return;
    }else{
        console.log("data from client side js"+JSON.stringify(data));
        message1.textContent = JSON.stringify(data);
    }

});
});


});