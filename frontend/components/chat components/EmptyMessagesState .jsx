import React from 'react';
import { Send } from 'lucide-react';

const EmptyMessagesState = () => {
    return (
        <div className="h-full w-full relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
            <Send className="w-10 h-10 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Chat Selected</h3>
        <p className="text-slate-400 text-sm"> Open a chat To Start </p>
        </div>
    </div>
    );
}

export default EmptyMessagesState;
