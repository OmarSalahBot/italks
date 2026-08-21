import { Phone, Video, MoreVertical } from 'lucide-react';
import { useChatStore } from '../../Store/useChatStore.js';
import { useAuthStore } from '../../Store/useAuthStore.js';

const ChatHeader = () => {
    const { selectedChat } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const isOnline = onlineUsers.includes(selectedChat?._id);

    return (
        <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    {selectedChat?.profilePic ? (
                        <img 
                            src={selectedChat?.profilePic} 
                            alt="profile" 
                            className="w-11 h-11 rounded-full object-cover border border-slate-100" 
                        />
                    ) : (
                        <div className="w-11 h-11 rounded-full bg-violet-600 flex items-center justify-center text-xl shadow-md shadow-violet-600/20 text-white">
                            👨‍💼
                        </div>
                    )}
                    
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                </div>
                
                <div>
                    <h2 className="font-semibold text-slate-800">{selectedChat?.username}</h2>
                    <p className="text-xs font-medium text-slate-400">
                        {isOnline ? (
                            <span className="text-emerald-600">Online</span>
                        ) : (
                            "Offline"
                        )}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
                <button className="p-2 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-colors">
                    <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-colors">
                    <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;