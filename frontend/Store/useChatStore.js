import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create(( set , get )=> ({
    chats: [],
    messages: [],
    contacts: [],
    activeTap: "Chats",
    selectedChat: null,
    isChatsLoading: true,
    isMessagesLoading: true,


    setSelectedChat: (chat) => set({ selectedChat:chat }),
    setActiveTap: (tap) => set({ activeTap:tap }),

    getAllContacts: async() => {
        set({ isChatsLoading : true })
        try{
            const res = await axiosInstance.get('/messages/contacts');
            set({ contacts : res.data });
        }catch(err){
            console.log(err); 
        }finally{
        set({ isChatsLoading : false })
        }
    },

    getAllChats: async() => {
        set({ isChatsLoading : true })
        try{
            const res = await axiosInstance.get('/messages/chats');
            set({ chats : res.data });
        }catch(err){
            console.log(err); 
        }finally{
            set({ isChatsLoading: false });
        }
    },

    getMessagesByUserId: async(chatId) => {
        set({ isMessagesLoading: true })
        try{
            const res = await axiosInstance.get(`/messages/${chatId}`);
            set({ messages : res.data })
        }catch(err){
            console.log(err);
        }finally{
        set({ isMessagesLoading: false })
        }
    },

    sendMessage : async(data) => {
        const { selectedChat , messages } = get();
        const { user } = useAuthStore.getState();

        const temp = `temp-${new Date()}`
        const optimisticMessage  = {
            _id: temp ,
            senderId : user._id ,
            receiverId : selectedChat._id,
            text: data.text,
            image: data.image,
            createdAt:new Date().toISOString(),
        }
        set({ messages: [...messages , optimisticMessage]});
        try{
            const res = await axiosInstance.post(`/messages/${selectedChat._id}`, data );
            set({ messages: messages.concat(res.data)  })
        }catch(err){
            console.log(err);
        }
    },

    subscribeToMessages: () => {
    const { selectedChat } = get();
    if (!selectedChat) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedChat._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
