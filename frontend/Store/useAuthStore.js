import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import { Navigate } from 'react-router-dom';

export const useAuthStore  = create(( set )=> ({
    user:null,
    isCheckingAuth: true,
    errorMessage:"",
    isLoggingIn: false,


    authCheck: async () => {
        try{
            const res = await axiosInstance.get('/auth/check');
            set({ user : res.data });
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
    }
})) 