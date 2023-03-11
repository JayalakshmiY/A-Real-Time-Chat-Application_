const socket=io('http://localhost:8000');
const form =document.getElementById('sendmsg');
const messageInput =document.getElementById('msginput');
const messageContainer =document.querySelector('.container'); //when msg comes it should me fitted into the container
var audio=new Audio('ting.mp3'); 


const append=(message,position)=>{
    const messageElement=document.createElement('div');
    // const dateElement=document.createElement('span');
    // const dateElement=document.createElement('span');
    messageElement.innerText=message;
    // dateElement.innerText=time;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // messageContainer.append(dateElement);
    var d = new Date(); // for now
var hour=d.getHours().toString(); // => 9
var min=d.getMinutes().toString(); // =>  30
time=hour+":"+min;
    if(position=='left'){
        const dateElement=document.createElement('span');
        dateElement.innerText=time;
        messageContainer.append(dateElement); 
        }
    if(position=='right'){
        const dateElement=document.createElement('small');
        dateElement.innerText=time;
        messageContainer.append(dateElement);
        }
    if(position=='left'){
        audio.play(); 
        }
}

form.addEventListener('submit',(e)=>{ //when someone click the submit button
    e.preventDefault(); //prevents the reloading of the page
    const message=messageInput.value;
    // var d = new Date(); // for now
    // var hour=d.getHours(); // => 9
    // var min=d.getMinutes(); // =>  30
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})

const namee=prompt("Enter your name to join the chat");
socket.emit('new-user-joined',namee);

socket.on('user-joined',namee=>{
append(`${namee} joined the chat`,'right')
})

socket.on('receive',data=>{
append(`${data.name}:${data.message}`,'left')
})

socket.on('leftt',name=>{
append(`${name} left the chat`,'left')
})