import React from 'react'
import { useAuthcontext } from '../../context/Authcontext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const  Message = ({message})=> {
  
  const {authuser} = useAuthcontext();
  const {selectedconversion} = useConversation();
  const fromMe = message.senderId === authuser._id;
  const formattedTime = extractTime(message.createdAt)

  const chatClassname = fromMe ? 'chat-end' : 'chat-start';
  const profilepic = fromMe ? authuser.profilepic : selectedconversion?.profilepic;
  const bubblebgcolor = fromMe ? 'bg-blue-500' : '';

  return (
    <div className={`chat ${chatClassname}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilepic} alt="" />
            </div>
        </div>
        <div className={`chat-bubble text-white  ${bubblebgcolor}`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message