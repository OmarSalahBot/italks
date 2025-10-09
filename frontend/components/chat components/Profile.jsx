import React, { useState , useRef } from 'react';
import { User , Settings , LogOut , Image } from 'lucide-react';
import { useAuthStore } from '../../Store/useAuthStore';


const Profile = () => {
    const { logout , user , updateProfilePic } = useAuthStore();
    const profileImageInput = useRef(null);
    const [selectedImage, setselectedImage] = useState(null);

    const handUploadImage = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        // add Toast Here
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async() => {
          const base64Image = reader.result;
            setselectedImage(base64Image);
            await updateProfilePic({profilePic : base64Image});
        }
    }

    return (
        <div className="relative z-10 w-80 bg-slate-900/80 backdrop-blur-xl border-l border-slate-800/50 p-6">
          <div className="text-center mb-6">
            <input type="file" accept='image/*' className="hidden" ref={profileImageInput}  onChange={handUploadImage}/>
            <div className="relative">
            <div onClick={()=>profileImageInput.current?.click()} className="absolute flex justify-center items-center opacity-0 hover:opacity-100 top-0 right-1/2 bg-white/40 w-24 h-24 translate-x-1/2 mb-4 shadow-lg  p-2 rounded-full cursor-pointer transition-all duration-300">
              <Image className='text-white' />
              </div>
              {user.profilePic || selectedImage ? (
              <div className="flex justify-center items-center mb-4">
                <img className='w-24 h-24 rounded-full shadow-lg'
                src={!selectedImage ? user.profilePic : selectedImage}
                alt="Profile" />
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl mb-4 shadow-lg">
              👤
            </div>
            )}
            </div>
            <h2 className="text-xl font-bold text-white">{user.username}</h2>
            <p className="text-slate-400 text-sm">{user.email}</p>
          </div>

          <div className="space-y-2">
            <button onClick={() => logout()} className="w-full p-3 rounded-xl text-left text-red-400 hover:bg-slate-800/80 transition-all flex items-center">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
    );
}

export default Profile;
