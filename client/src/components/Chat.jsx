import { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ThinkingIndicator from "./ThinkingIndicator";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const scrollRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const fetchAllChats = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/chat/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      if (response.ok) {
        setChatList(data);
        if (data.length > 0 && !activeChatId) {
          setActiveChatId(data[0]._id);
          setMessages(data[0].messages);
        }
      }
    } catch (err) {
      console.error("Failed to fetch chat list", err);
    }
  }, [token, activeChatId]);

  useEffect(() => {
    fetchAllChats();
  }, [fetchAllChats]);

  const startNewChat = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/chat/new",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setActiveChatId(data._id);
        setMessages([]);
        setChatList((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.error("Error creating new chat", err);
    }
  };

  const switchChat = (chat) => {
    setActiveChatId(chat._id);
    setMessages(chat.messages);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // If no active chat exists, create one first or handle error
    if (!activeChatId) {
      await startNewChat();
    }

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]); // Distinct display
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt: userText,
            chatId: activeChatId,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
        fetchAllChats();
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error connecting to AI. Try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans text-gray-800 bg-white">
      {/* Pass session handlers to Sidebar */}
      <Sidebar
        chatList={chatList}
        activeChatId={activeChatId}
        onNewChat={startNewChat}
        onSwitchChat={switchChat}
        fetchAllChats={fetchAllChats}
        setMessages={setMessages}
        setActiveChatId={setActiveChatId}
      />

      <main className="relative flex flex-col flex-1 bg-white">
        <header className="px-6 py-4 text-lg font-extrabold text-gray-900 border-b border-gray-100">
          AI Chatbot
        </header>

        <div className="flex-1 px-4 py-8 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.length === 0 && !isLoading && (
              <div className="mt-20 text-center text-gray-400">
                Start a new conversation...
              </div>
            )}
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} text={msg.text} />
            ))}
            {isLoading && <ThinkingIndicator />}
            <div ref={scrollRef} />
          </div>
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSubmit={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default Chat;
