import { useEffect } from "react";
import { useSocketcontext } from "../context/Socketcontext"
import useConversation from "../zustand/useConversation";
import notificationsound from "../assets/sound/notification.mp3"

const useListenMessages = ()=>{
    const {socket}  = useSocketcontext();
    const {messages,setmessages} = useConversation();

    useEffect(()=>{
        socket?.on("newMessage",(newmessage)=>{
            newmessage.shouldShake = true;
            const sound = new Audio(notificationsound);
            // sound.play();
            setmessages([...messages,newmessage])
        })

        return ()=>socket?.off("newMessage")
    },[socket,setmessages,messages])
}

export default useListenMessages 