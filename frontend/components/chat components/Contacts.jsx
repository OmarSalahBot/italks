import React, { useEffect } from 'react';
import ChatsLoading from './ChatsLoading';
import { useChatStore } from '../../Store/useChatStore';

const Contacts = () => {
  const { isChatsLoading, selectedChat, setSelectedChat, getAllContacts, contacts } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isChatsLoading) return <ChatsLoading />;

  return (
    <div className="overflow-y-auto h-[calc(100vh-140px)]">
      {contacts.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          className={`p-4 flex items-center space-x-3 cursor-pointer transition-all border-l-4 ${
            selectedChat?._id === chat._id
              ? 'bg-violet-50/80 border-violet-600' 
              : 'border-transparent hover:bg-slate-50'
          }`}
        >
          <div className="relative">
            {chat.profilePic ? (
              <img src={chat.profilePic} className="w-12 h-12 rounded-full object-cover border border-slate-100" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-2xl shadow-md shadow-violet-600/20 text-white">
                👨‍💼
              </div>
            )}
            {chat.online && (
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-slate-800 truncate">{chat.username}</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-500 truncate">
                Say hi To {chat.username}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;