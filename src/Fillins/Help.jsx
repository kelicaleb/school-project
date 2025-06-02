import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";

function Help() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [containerHeight, setContainerHeight] = useState("12rem");
  const messagesContainerRef = useRef(null);
  const [username, setUsername] = useState("");
  const socketRef = useRef(null);

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/help/gets");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchData();
  }, [messages.length]); // Runs only once when the component mounts

  // Adjust container height based on content
  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    setUsername(getUsername);

    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isOverflowing = container.scrollHeight > container.clientHeight;

      if (isOverflowing) {
        setContainerHeight("auto");
      } else if (messages.length === 0) {
        setContainerHeight("22rem");
      }
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3001");

    socketRef.current.onopen = () => {
      console.log("Connected successfully");
    };

    socketRef.current.onmessage = (event) => {
      console.log("This is the event data", event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { messages: event.data },
      ]);
    };

    socketRef.current.onclose = (message) => {
      console.log("WebSocket closed:", message);
      setTimeout(() => 
      {
        connectWebsocket()
      },2000)
    };

  },[]); // Runs only once when the component mounts

  // Handle input change
  const handleInput = (e) => {
    setInput(e);
  };

  // Send message
  const sendMessage = async () => 
  {
    const username = localStorage.getItem("username")
    console.log("this is the username", username)
    await axios.post("http://localhost:8000/help/posts", {
      messages: `${username}: ${input}`
    })
    .then((res) => console.log(res.data))
    setInput('')
  }

  return (
    <div className="w-full max-w-screen mx-auto shadow p-4 absolute inset-0 bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-500">
      <div className="text-center text-blue-600 font-bold text-3xl mb-4 underline">
        Help Center
      </div>

      <div
        ref={messagesContainerRef}
        className="overflow-y-auto space-y-2 mb-4 bg-white/50 rounded-md p-2 min-h-12 max-h-96 transition-all duration-300"
        style={{ height: containerHeight }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-cyan-100 text-cyan-800 p-2 rounded w-fit max-w-xs font-serif font-semibold"
          >
            {msg.messages}
          </div>
        ))}
      </div>

      <div className="relative w-full">
        <input
          className="w-full h-12 placeholder-black font-serif text-center border rounded-md bg-white/50 pl-3 pr-10 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-600 hover:text-cyan-500 hover:text-cyan-800 transition-colors 
          bg-transparent border-none cursor-pointer p-1 font-bold"
        >
          <FiSend size={30} />
        </button>
      </div>
    </div>
  );
}

export default Help;