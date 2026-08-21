import React from 'react';
import { Send } from 'lucide-react';

const EmptyMessagesState = () => {
  return (
    <div className="h-full w-full relative z-10 flex-1 flex flex-col items-center justify-center p-8 bg-slate-50">
      <div className="text-center">
        <div className="w-20 h-20 rounded-3xl bg-violet-100 flex items-center justify-center mx-auto mb-4 shadow-sm border border-violet-200/50">
          <Send className="w-9 h-9 text-violet-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Chat Selected</h3>
        <p className="text-slate-500 text-sm">Select a conversation or contact to start chatting</p>
      </div>
    </div>
  );
};

export default EmptyMessagesState;