import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen w-full bg-slate-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-violet-600 mb-6 shadow-xl shadow-violet-600/25 animate-pulse">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>

            {/* Brand Name */}
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">iTalks</h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;