import { useEffect, useRef } from 'react';
import MessagesLoading from './MessagesLoading';
import { useChatStore } from '../../Store/useChatStore';
import { useAuthStore } from '../../Store/useAuthStore';
import { motion , AnimatePresence } from 'framer-motion';

const Messages = () => {
    const { isMessagesLoading , getMessagesByUserId , messages , selectedChat ,subscribeToMessages , unsubscribeFromMessages } = useChatStore();
    const { user } = useAuthStore();
    const scrollToRef = useRef(null);


    useEffect(() => {
      if (scrollToRef.current) 
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      useEffect(() => {
      getMessagesByUserId(selectedChat._id);
      subscribeToMessages();

      // clean up
      return () => unsubscribeFromMessages();
    }, [selectedChat, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

    if(isMessagesLoading) return <MessagesLoading />;
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === user._id  ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-md ${msg.senderId === user._id ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    msg.senderId === user._id
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-sm'
                      : 'bg-slate-800/80 backdrop-blur-xl text-white rounded-bl-sm'
                  }`}
                >
                  {msg.image ? (<img src={msg.image} className="mb-2 rounded-lg" />) : null}
                  {msg.text ? (<p className="text-sm leading-relaxed">{msg.text}</p>) : null}
                </div>
                <p className={`text-xs text-slate-500 mt-1 ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.createdAt)
                    .toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace("am", "AM")
                    .replace("pm", "PM")}
                </p>
              </div>
            </div>
          ))}
          <div ref={scrollToRef}/>
        </div>
    );
}

export default Messages;
