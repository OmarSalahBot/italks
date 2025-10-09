import React from 'react';
import { Send } from 'lucide-react';

const MessagesLoading = () => {
    const list = [false,true,false,true,false,true];
    return (
        <div className="h-full mt-10 mx-5">
            {list.map((isMe,idx) => (
            <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-pulse`}>
            <div className={`max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
            <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-slate-700' : 'bg-slate-700'}`}>
                <div className="h-3 bg-slate-600 rounded w-48 mb-2"></div>
                <div className="h-3 bg-slate-600 rounded w-32"></div>
            </div>
            </div>
        </div>
        ))}
        </div>
    );
}

export default MessagesLoading;
