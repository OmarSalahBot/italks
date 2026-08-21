import React from 'react';

const MessagesLoading = () => {
  const list = [false, true, false, true, false, true];

  return (
    <div className="h-full mt-10 mx-5 space-y-4">
      {list.map((isMe, idx) => (
        <div 
          key={idx} 
          className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-pulse`}
        >
          <div className={`max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
            <div 
              className={`px-4 py-3 rounded-2xl ${
                isMe 
                  ? 'bg-violet-600/70 rounded-br-none' 
                  : 'bg-slate-300 rounded-bl-none'
              }`}
            >
              <div 
                className={`h-3 rounded w-48 mb-2 ${
                  isMe ? 'bg-violet-300/80' : 'bg-slate-200'
                }`}
              ></div>
              <div 
                className={`h-3 rounded w-32 ${
                  isMe ? 'bg-violet-300/80' : 'bg-slate-200'
                }`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesLoading;