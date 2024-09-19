import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthcontext } from "../context/Authcontext";

const useLogin = ()=>{
    const [loading, setloading] = useState(false);
    const {setauthuser} = useAuthcontext()

    const login = async(username,password)=>{
        setloading(true);
        const success = handelInputerror({username,password});

        if(!success) return

        try {
            const res = await fetch('/api/auth/login',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setauthuser(data);
            
        } catch (error) {
            toast.error(error.message);
        }finally{
            setloading(false);
        }
    }
    return {loading,login};
}

export default useLogin;



function handelInputerror({username,password}){
    if(!username||!password) {
        toast.error("Please fill all the fileds");
        return false;
    }


    if(password.length<6){
        toast.error("password length must be at least 6");
        return false;
    }

    return true;
}