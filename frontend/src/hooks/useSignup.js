import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthcontext } from "../context/Authcontext";

function useSignup() {
    const [loading, setloading] = useState();
    const {authuser , setauthuser} = useAuthcontext()

    const signup = async({fullName,username,password,confirmpassword,gender})=>{
        const success = handelInputerror({fullName,username,password,confirmpassword,gender});

        if(!success) return

        setloading(true);
        try {

            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmpassword,gender})
            })
            
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Signup failed"); // Show toast for error
                return;
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setauthuser(data);

        } catch (error) {
            toast.error(error.message)
        }finally{
            setloading(true);
        }
    }
    return {loading,signup}
}

export default useSignup;

function handelInputerror({fullName,username,password,confirmpassword,gender}){
    if(!fullName||!username||!password||!confirmpassword||!gender) {
        toast.error("Please fill all the fileds");
        return false;
    }

    if(password!==confirmpassword){
        toast.error("password don't match");
        return false
    }

    if(password.length<6){
        toast.error("password length must be at least 6");
        return false;
    }

    return true;
}