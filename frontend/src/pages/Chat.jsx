import ChatBox from "../components/ChatBox";

const Chat = () => {

    const messages = [];

    const send = (message) => {
        console.log(message);
    };

    return (
        <ChatBox
            messages={messages}
            onSend={send}
        />
    );
};

export default Chat;