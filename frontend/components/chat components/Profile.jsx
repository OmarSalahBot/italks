import React, { useState, useRef } from 'react';
import { LogOut, Image } from 'lucide-react';
import { useAuthStore } from '../../Store/useAuthStore';

const Profile = () => {
    const { logout, user, updateProfilePic } = useAuthStore();
    const profileImageInput = useRef(null);
    const [selectedImage, setselectedImage] = useState(null);

    const handUploadImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setselectedImage(base64Image);
            await updateProfilePic({ profilePic: base64Image });
        };
    };

    return (
        <div className="relative z-10 w-80 bg-white/90 backdrop-blur-xl border-l border-slate-200 p-6 flex flex-col justify-between h-full">
            <div className="text-center">
                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={profileImageInput} 
                    onChange={handUploadImage}
                />
                
                <div className="relative group inline-block mb-4">
                    <div 
                        onClick={() => profileImageInput.current?.click()} 
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-all duration-200 z-10"
                    >
                        <Image className="text-white w-6 h-6" />
                    </div>

                    {user?.profilePic || selectedImage ? (
                        <img 
                            className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-slate-100"
                            src={selectedImage || user.profilePic}
                            alt="Profile" 
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-violet-600 flex items-center justify-center text-4xl text-white shadow-md shadow-violet-600/20">
                            👤
                        </div>
                    )}
                </div>

                <h2 className="text-xl font-bold text-slate-800">{user?.username}</h2>
                <p className="text-slate-500 text-sm mt-0.5">{user?.email}</p>
            </div>

            <div className="space-y-2 pt-6 border-t border-slate-100">
                <button 
                    onClick={() => logout()} 
                    className="w-full p-3 rounded-2xl text-left text-red-500 hover:bg-red-50 transition-all flex items-center gap-3 font-medium text-sm"
                >
                    <LogOut className="w-5 h-5 text-red-500" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;