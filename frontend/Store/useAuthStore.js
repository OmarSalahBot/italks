import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore  = create(( set , get )=> ({
    user:null,
    isCheckingAuth: true,
    errorMessage:"",
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],


    authCheck: async () => {
        try{
            const res = await axiosInstance.get('/auth/check');
            set({ user : res.data });
            get().connectSocket();
        }catch(err){
            console.log(err);
            set({ user : null });
        }finally{
            set({ isCheckingAuth: false });
        }
    },

    login: async(data)=> {
        try{
            const res = await axiosInstance.post('/auth/login',data);
            set({ user : res.data })
            get().connectSocket();
        }catch(err){
            set({user:null})
            set({ errorMessage : err.response?.data?.message || "Something went wrong" })
        }finally{
            set({ isLoggingIn: false })
        }
    },

    signup: async(data)=> {
        try{
            const res = await axiosInstance.post('/auth/signup',data);
            set({ user : res.data })
            get().connectSocket();
        }catch(err){
            console.log(err);
            set({user:null})
            set({ errorMessage : err.response?.data?.message || "Something went wrong" })
        }finally{
            set({ isLoggingIn: false })
        }
    },
    logout: async()=> {
        try{
            await axiosInstance.post('/auth/logout');
            set({ user : null })
            get().disconnectSocket();
        }catch(err){
            console.log(err);
        }finally{
            set({ isLoggingIn: false })
        }
    },
    updateProfilePic: async(data)=> {
        try{
            const res = await axiosInstance.put('/auth/update-profile', data );
        }catch(err){
            console.log(err);
        }
    },
    connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

})) 