import { useState } from "react"
import { useAuthcontext } from "../context/Authcontext";

const useLogout = ()=>{
    const [loading, setloading] = useState();
    const {setauthuser} = useAuthcontext()

    const logout = async()=>{
        setloading(true);
        try {
            const res= await fetch("/api/auth/logout",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setauthuser(null);


        } catch (error) {
            toast.error(error.message)
        }finally{
            setloading(true);
        }
    }
    return {loading,logout};
}

export default useLogout