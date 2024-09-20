import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetmessages";
import MessageSkeleton from "../skeletons/MessagesSkeletons";
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {

  const {messages,loading} = useGetMessages();
  useListenMessages();
  const lastmessageRef = useRef();
  useEffect(()=>{
    setTimeout(()=>{
      lastmessageRef.current?.scrollIntoView({behavior:"smooth"})
    },100)
  },[messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx}/>)}

      {!loading && messages.length>0 && messages.map((message)=>(
        <div key={message._id}
          ref={lastmessageRef}
        >
          <Message message={message}/>
        </div>
      ))}

      {!loading && messages.length===0 &&(
        <p className="text-center">send message to start conversation</p>
      )}
    </div>
  );
}

export default Messages;
