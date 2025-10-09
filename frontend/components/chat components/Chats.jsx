import React from 'react';
import { useEffect} from 'react';
import ChatsLoading from './ChatsLoading';
import { useChatStore } from '../../Store/useChatStore';

const Chats = () => {
      const { isChatsLoading , selectedChat , setSelectedChat , getAllChats , chats } = useChatStore();
      useEffect(()=>{
          getAllChats();
        },[]);

      if(isChatsLoading) return <ChatsLoading/>;
    return (
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 flex items-center space-x-3 cursor-pointer transition-all border-l-4 ${
                selectedChat?._id === chat._id
                  ? 'bg-slate-800/80 border-indigo-500' 
                  : 'border-transparent hover:bg-slate-800/50'
              }`}
            >
              <div className="relative">
                {chat.profilePic ? (
                  <img src={chat.profilePic} className='w-12 h-12 rounded-full' />
                ) : 
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                  👨‍💼
                </div>}
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white truncate">{chat.username}</h3>
                  <span className="text-xs text-slate-400">10:30 AM</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-400 truncate">How are You </p>
                </div>
              </div>
            </div>
          ))}
        </div>
    );
}

export default Chats;
