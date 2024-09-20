import { createContext, useState, useEffect, useContext } from "react";
import { useAuthcontext } from "./Authcontext";
import io from "socket.io-client"


const SocketContext = createContext();

export const useSocketcontext = ()=>{
  return useContext(SocketContext);
}

export const SocketContextProvider = ({children})=>{

    const [socket, setsocket] = useState(null);
    const [onlineuser, setonlineuser] = useState([]);
    const {authuser} = useAuthcontext();

    useEffect(()=>{
        if(authuser){
            const socket = io("http://localhost:5000",{
              query:{
                userId:authuser._id
              }
            });

            setsocket(socket);

            socket.on("getOnlineusers",(users)=>{
              setonlineuser(users);
            })

            return ()=> socket.close();
        }else{
            if(socket){
                socket.close();
                setsocket(null);
            }
        }
    },[authuser])

    return (
        <SocketContext.Provider value={{socket,onlineuser}}>
            {children}
        </SocketContext.Provider>
    )
}