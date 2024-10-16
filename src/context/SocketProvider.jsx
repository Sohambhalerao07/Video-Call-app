import React,{createContext, useMemo} from "react";
import { io } from "socket.io-client";

const SocketContext=createContext(null);

 export const useSocket =()=>{
    return React.useContext(SocketContext)
 } 
export const SocketProvider=(props)=>{
    const socket = useMemo(()=> io('localhost:8091',[]))
    return(
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )


}
