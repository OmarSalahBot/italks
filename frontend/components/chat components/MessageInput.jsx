import{ use, useState ,useRef } from 'react';
import { Paperclip, Smile, Send , X } from 'lucide-react';
import { motion , AnimatePresence } from 'framer-motion';
import { useChatStore } from '../../Store/useChatStore';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const imageInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handUploadImage = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        // add Toast Here
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async() => {
            setImage(reader.result);
        }
    }

    const handleSend = () => {
    if (!text.trim() && !image) return;

    sendMessage({
      text: text.trim() ,
      image: image,
    })

    imageInputRef.current.value = '';
    setText("");
    setImage(null);
  };
    return (
        <div className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 p-4">
          { /* Preview Image */ }
            {image ? (
                <AnimatePresence>
                  <motion.div key="a" whileHover={{ scale: 1.02 }} 
                  initial={{ opacity: 0 , scale:0.6 }} 
                  animate={{ opacity: 1 , scale:1 }}  
                  transition={{ duration: 0.3 }}
                  className=" bg-slate-600 absolute rounded-lg bottom-22 left-20">
                    <X onClick={()=>setImage(null)}
                    className='absolute top-2 right-2 hover:scale-110 duration-300 bg-gradient-to-br from-indigo-600/40 to-purple-600/40 rounded-2xl text-white p-1'/>
                      <img src={image} className='rounded-lg border-2 border-indigo-600/40 w-60' alt="" />
                  </motion.div>
                </AnimatePresence>
            ) : null}

          { /* Input Area */ }
          <div className="flex items-center space-x-3">
            <button onClick={()=>imageInputRef.current?.click() }  className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-white transition-all">
              <Paperclip className="w-5 h-5" />
            </button>
            <input type="file" accept='image/*' className="hidden" ref={imageInputRef}  onChange={handUploadImage}/>
            <div className="flex-1 relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
                placeholder="Type a message..."
                className="w-full bg-slate-800/80 text-white px-4 py-3 pr-12 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={() => handleSend()}
              className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-lg shadow-indigo-500/30"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
    );
}

export default MessageInput;
