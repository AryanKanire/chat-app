import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = ()=>{
    const [loading, setloading] = useState(false);
    const {messages, setmessages, selectedconversion} = useConversation();

    useEffect(()=>{
        const getMessage = async()=>{
            setloading(true);
            try {
                const res= await fetch(`/api/messages/${selectedconversion._id}`);
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error);
                }

                setmessages(data); 
            } catch (error) {
                toast.error(error.message);
            }finally{
                setloading(false);
            }
        }

        if(selectedconversion?._id)  getMessage();

    },[selectedconversion?._id,setmessages])

    return {messages,loading};
}

export default useGetMessages;