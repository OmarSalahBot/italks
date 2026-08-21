import React, { useState } from 'react';
import { MessageCircle, Search, Users, User } from 'lucide-react';
import { useChatStore } from '../../Store/useChatStore';

import MetaTags from '../../components/MetaTags';
import Chats from '../../components/chat components/Chats';
import EmptyMessagesState from '../../components/chat components/EmptyMessagesState ';
import Profile from '../../components/chat components/Profile';
import OpenedChatContainer from '../../components/chat components/OpenedChatContainer';
import Contacts from '../../components/chat components/Contacts';

export default function ChatApp() {
  const [showProfile, setShowProfile] = useState(false);
  const { selectedChat, activeTap, setActiveTap } = useChatStore();

  const icons = [
    { id: "Chats", icon: <MessageCircle className='w-6 h-6' />, label: "Chats" },
    { id: "Contacts", icon: <Users className='w-6 h-6' />, label: "Contacts" },
  ];

  return (
    <div className="h-screen bg-slate-100 flex">
      {/* MetaTags for SEO */}
      <MetaTags
        title="Chats | iTalks"
        description="Chat instantly with friends, join group conversations, and share ideas in real time — all on iTalks."
        keywords="iTalks, chat, messages, group chat, conversations, real time, social app"
      />

      {/* Sidebar */}
      <div className="relative z-10 w-20 bg-white/80 backdrop-blur-xl flex flex-col items-center py-6 space-y-8 border-r border-slate-200">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 shadow-lg shadow-violet-600/25">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        
        <nav className="flex-1 flex flex-col items-center space-y-4">
          {icons.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTap(item.label)}
              className={`p-3 rounded-2xl transition-all duration-200 ${
                activeTap === item.id 
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20" 
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setShowProfile(!showProfile)}
          className={`p-3 rounded-2xl transition-all duration-200 ${
            showProfile 
              ? "bg-violet-100 text-violet-600" 
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          }`}
        >
          <User className="w-6 h-6" />
        </button>
      </div>

      {/* Chat List */}
      <div className="relative z-10 w-80 bg-white/90 backdrop-blur-xl border-r border-slate-200 flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-violet-600" />
            {activeTap}
          </h1>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search or add friends..."
              className="w-full bg-slate-50 text-slate-800 pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-600/10 transition-all text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTap === 'Chats' ? <Chats/> : <Contacts/>}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">
        { selectedChat ? <OpenedChatContainer/> : <EmptyMessagesState/>}
      </div>

      {/* Profile Sidebar */}
      {showProfile && ( <Profile /> )}
    </div>
  );
}