import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from 'react-player'
const Room=()=>{
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [stream,setStream]= useState("")
    const socket = useSocket();
    const handleUserJoined=useCallback(({email,id})=>{
        console.log(`Email ${email} joined with id ${id}`);
        setRemoteSocketId(id)
    },[])

    const handleCallUser=useCallback(async()=>{
            const stream=await navigator.mediaDevices.getUserMedia({
                video:true,
                audio:true});
            setStream(stream)
    },[])
    useEffect(()=>{
        socket.on('user:joined',handleUserJoined)
        return()=>{
            socket.off("user:joined",handleUserJoined)
        }
},[socket,handleUserJoined])
    return(
        <>
        <h1>Room</h1>
        <h4>{remoteSocketId?"Connected":"No one in the room"}</h4>
        {
          remoteSocketId && <button onClick={handleCallUser}>Call</button>  
        }
        <h1>My Stream</h1>
        {
            stream && <ReactPlayer playing muted height='150px' width='200px' url={stream}/>
            //37:50 time
        }
        </>
    )
}
export default Room