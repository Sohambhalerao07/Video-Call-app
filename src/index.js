import { Server } from 'socket.io';
import {BrowserRouter} from 'react-router-dom'

const io=new Server(8091,{
    cors:true
});
const emaidToSocketIdMap=new Map();
const socketidToEmailMap=new Map();


io.on("connection", (socket) => {
    console.log("Socket Connected",socket.id);
    socket.on('room:join',data=>{
       const {email,room}=data;
        emaidToSocketIdMap.set(email,socket.id)
        socketidToEmailMap.set(socket.id,email)
        socket.join(room);  
     socket.to(room).emit("user:joined",{email,id:socket.id})
        
        io.to(socket.id).emit('room:join',data)
    })
})
