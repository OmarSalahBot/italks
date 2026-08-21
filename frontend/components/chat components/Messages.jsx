import { useEffect, useRef } from 'react';
import MessagesLoading from './MessagesLoading';
import { useChatStore } from '../../Store/useChatStore';
import { useAuthStore } from '../../Store/useAuthStore';

const Messages = () => {
  const { 
    isMessagesLoading, 
    getMessagesByUserId, 
    messages, 
    selectedChat, 
    subscribeToMessages, 
    unsubscribeFromMessages 
  } = useChatStore();
  const { user } = useAuthStore();
  const scrollToRef = useRef(null);

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    getMessagesByUserId(selectedChat._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedChat, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  if (isMessagesLoading) return <MessagesLoading />;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
      {messages.map((msg) => {
        const isMe = msg.senderId === user._id;

        return (
          <div
            key={msg._id}
            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm border ${
                  isMe
                    ? 'bg-violet-600 text-white border-violet-600 rounded-br-none'
                    : 'bg-white text-slate-800 border-slate-200/80 rounded-bl-none'
                }`}
              >
                {msg.image && (
                  <img 
                    src={msg.image} 
                    alt="Attachment" 
                    className="mb-2 rounded-xl object-cover max-h-60 w-full" 
                  />
                )}
                {msg.text && (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
              </div>
              <p
                className={`text-[11px] font-medium text-slate-400 mt-1.5 px-1 ${
                  isMe ? 'text-right' : 'text-left'
                }`}
              >
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
        );
      })}
      <div ref={scrollToRef} />
    </div>
  );
};

export default Messages;