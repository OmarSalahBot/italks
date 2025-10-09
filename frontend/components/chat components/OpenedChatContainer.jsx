import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const OpenedChatContainer = () => {
        const messages = [
        { id: 1, text: 'Hey! How are you doing?', time: '10:15 AM', sender: 'them' },
        { id: 2, text: 'I\'m great! Just finished the project', time: '10:20 AM', sender: 'me' },
        { id: 3, text: 'That\'s awesome! Can you send me the files?', time: '10:25 AM', sender: 'them' },
        { id: 4, text: 'Sure, I\'ll send them right now', time: '10:28 AM', sender: 'me' },
        { id: 5, text: 'Sure, see you tomorrow!', time: '10:30 AM', sender: 'them' },
    ];
    return (
        <div className="relative z-10 flex-1 flex flex-col">
            {/* Chat Header */}
            <ChatHeader/>
            {/* Messages */}
            <Messages messages={messages} />
            {/* Message Input */}
            <MessageInput/>
        </div>
    );
}

export default OpenedChatContainer;
