
import { Phone, Video, MoreVertical } from 'lucide-react';
import { useChatStore } from '../../Store/useChatStore.js';
import { useAuthStore } from '../../Store/useAuthStore.js';

const ChatHeader = () => {
    const { selectedChat } = useChatStore();
    const { onlineUsers } = useAuthStore();

    console.log(onlineUsers);

    return (
        <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {selectedChat?.profilePic ? (
                <img src={selectedChat?.profilePic} alt="profile" className='w-11 h-11 rounded-full' />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                👨‍💼
              </div>
              )}
              
            <div className={`absolute bottom-0 right-0 w-3 h-3 ${  onlineUsers.includes(selectedChat._id) ? "bg-green-500" : "hidden" }  rounded-full border-2 border-slate-900`}></div>

            </div>
            <div>
              <h2 className="font-semibold text-white">{selectedChat?.username}</h2>
              <p className="text-sm text-slate-400">
                {onlineUsers.includes(selectedChat._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
    );
}

export default ChatHeader;
