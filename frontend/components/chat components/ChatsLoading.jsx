import React from 'react';

const ChatsLoading = () => {
  return (
    <div>
      {[1, 2, 3, 4].map((idx) => (
        <div key={idx} className="p-4 flex items-center space-x-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-slate-400"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-400 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsLoading;