import { useState, useRef } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '../../Store/useChatStore';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      setImage(reader.result);
    };
  };

  const handleSend = () => {
    if (!text.trim() && !image) return;

    sendMessage({
      text: text.trim(),
      image: image,
    });

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    setText("");
    setImage(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 relative">
      {/* Image Preview */}
      <AnimatePresence>
        {image && (
          <motion.div
            key="image-preview"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-4 p-2 bg-white rounded-2xl shadow-xl border border-slate-200"
          >
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 p-1.5 bg-slate-800 text-white hover:bg-slate-900 rounded-full shadow-md transition-transform hover:scale-110 z-10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <img
              src={image}
              className="rounded-xl max-h-40 w-auto object-cover border border-slate-100"
              alt="Preview"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Form */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => imageInputRef.current?.click()}
          className="p-3 rounded-2xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageInputRef}
          onChange={handUploadImage}
        />

        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSend() : null)}
            placeholder="Type a message..."
            className="w-full bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl border border-transparent focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-600/10 focus:outline-none transition-all text-sm placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!text.trim() && !image}
          className={`p-3 rounded-2xl text-white transition-all shadow-md ${
            text.trim() || image
              ? "bg-violet-600 hover:bg-violet-700 shadow-violet-600/25 cursor-pointer active:scale-95"
              : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;