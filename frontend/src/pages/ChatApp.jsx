import React, { useState } from 'react';
import { MessageCircle, Send, Search,  Users, User } from 'lucide-react';
import { useChatStore } from '../../Store/useChatStore';

import MetaTags from '../../components/MetaTags';
import Chats from '../../components/chat components/Chats';
import EmptyMessagesState from '../../components/chat components/EmptyMessagesState ';


import Profile from '../../components/chat components/Profile';

import OpenedChatContainer from '../../components/chat components/OpenedChatContainer';
import Contacts from '../../components/chat components/Contacts';


export default function ChatApp() {
  const [showProfile, setShowProfile] = useState(false);
  const { selectedChat , activeTap , setActiveTap } = useChatStore();



  const icons = [
    { id: "Chats", icon: <MessageCircle className='w-6 h-6' />, label: "Chats" },
    { id: "Contacts", icon: <Users className='w-6 h-6' />, label: "Contacts" },
  ];

  


  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* MetaTags for SEO */}
      <MetaTags
        title="Chats | iTalks"
        description="Chat instantly with friends, join group conversations, and share ideas in real time — all on iTalks."
        keywords="iTalks, chat, messages, group chat, conversations, real time, social app"
      />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <div className="relative z-10 w-20 bg-slate-950/50 backdrop-blur-xl flex flex-col items-center py-6 space-y-8 border-r border-slate-800/50">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        
        <nav className="flex-1 flex flex-col items-center space-y-6">
          {icons.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTap(item.label)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                activeTap === item.id 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setShowProfile(!showProfile)}
          className="p-3 rounded-xl text-slate-400 transition-all hover:bg-slate-800/80 hover:text-white"
        >
          <User className="w-6 h-6" />
        </button>
      </div>

      {/* Chat List */}
      <div className="relative z-10 w-80 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50">
        <div className="p-4 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-white mb-4 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-indigo-500" />
            Chats
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Adding friends (coming soon)"
              className="w-full bg-slate-800/80 text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

          {activeTap === 'Chats' ? <Chats/> : <Contacts/>}
      </div>

      {/* Chat Area */}
      { selectedChat ? <OpenedChatContainer/> : <EmptyMessagesState/>}

      {/* Profile Sidebar */}
      {showProfile && ( <Profile /> )}
    </div>
  );
}