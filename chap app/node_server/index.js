//node server of our web which will handle socket io connections
// const io=require('socket.io')(8000) //require the socket.io in 8000 port
const express = require("express")
var app = express();
var server = app.listen(8000);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});



const users ={}; //for all the users
// const io = require("socket.io")(8000, {
//     cors: {
//       origin: "http://localhost:8000",
//       methods: ["GET", "POST"]
//     }
//   });

//io.on is the socket instance which listens the socket instances
io.on('connection',socket =>{ 
    socket.on('new-user-joined',name=>{ //socket.on --> like http instance,when connection is establish what has to be done with it
        //if 'new-user-joined' event is got then the call back function will run
        var d = new Date(); // for now
        var hour=d.getHours().toString(); // => 9
        var min=d.getMinutes().toString(); // =>  30
        time=hour+":"+min;
        console.log(time)
        console.log(" new user",name);
    users[socket.id]=name; //when a connection is established,give a id(socket.id) to the users which is their name
    socket.broadcast.emit('user-joined',name);// when one joins it will informs all other than himself
    });
    socket.on('send',message=>{ //called when message is send
        socket.broadcast.emit('receive',{message:message, name :users[socket.id]}) //receive is a event
    });
    socket.on('disconnect',message=>{  //called when someone disconnects
        socket.broadcast.emit('leftt',users[socket.id]); //receive is a event
        delete users[socket.id];
    });
})