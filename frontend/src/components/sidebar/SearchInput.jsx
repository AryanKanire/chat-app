import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetconversations from "../../hooks/useGetconversations";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setsearch] = useState("");
  const {setselectedconversion} = useConversation();
  const {conversations} = useGetconversations();

  const handelsubmit = (e)=>{
    e.preventDefault();
    if(!search) return;
    if(search.length<3){
      return toast.error('serach term must contain 3 char')
    }

    const conversation = conversations.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()))
  
    if(conversation){
      setselectedconversion(conversation);
      setsearch("");
    }
    else{
      toast.error("No such user found")
    }

  }

  return (
    <form onSubmit={handelsubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e)=>setsearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
}

export default SearchInput;
