import { useState } from "react";

const ChatBox = ({ messages = [], onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="flex h-[600px] flex-col rounded border">

      <div className="flex-1 space-y-3 overflow-y-auto p-4">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="rounded bg-gray-100 p-3"
          >
            <p className="font-semibold">
              {msg.sender}
            </p>

            <p>{msg.content}</p>
          </div>
        ))}

      </div>

      <form
        onSubmit={handleSubmit}
        className="flex border-t p-4"
      >

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded border px-3 py-2"
        />

        <button
          className="ml-3 rounded bg-blue-600 px-5 text-white"
        >
          Send
        </button>

      </form>

    </div>
  );
};

export default ChatBox;