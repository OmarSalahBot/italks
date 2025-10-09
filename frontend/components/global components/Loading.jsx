import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion , AnimatePresence } from "framer-motion"

const Loading = ({show}) => {
    return (
    <AnimatePresence>
      {show && (
        <motion.div 
          key={'loading-screen'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-6 shadow-lg animate-pulse">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>

            {/* Brand Name */}
            <h1 className="text-4xl font-bold text-white">iTalks</h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    );
}

export default Loading;
