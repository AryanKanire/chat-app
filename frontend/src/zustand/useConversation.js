import {create} from 'zustand';

const useConversation = create((set)=>({
    selectedconversion:null,
    setselectedconversion: (selectedconversion)=> set({selectedconversion}),
    messages:[],
    setmessages : (messages)=> set({messages}),
}))

export default useConversation