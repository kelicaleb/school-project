import React, { useState, useEffect, useRef  } from 'react';
import AdminNavbar from './AdminNavbar';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

function AdminService() {
    const [height, setHeight] = useState('12rem');
    const [input, setInput ] = useState('')
    const [message, setMessage ] = useState([])
    const socketRef  = useRef(null)
    useEffect(() => 
    {
        const fetchData = async() => 
        {
            await axios.get("http://localhost:8000/help/gets")
            .then((res) => setMessage(res.data))
            .catch((err) => console.error("Erorr fetching data", err))
          
        }
        fetchData()
    },[message.length])
    useEffect(() => {
        const connectWebSocket = () => {
            socketRef.current = new WebSocket("ws://localhost:3001");
    
            socketRef.current.onopen = () => {
              console.log("Connected to socket successfully");
            };
    
            socketRef.current.onmessage = (event) => {
              console.log("Received message:", event.data);
              setMessage((prevMessage) => [
                ...prevMessage,
                { messages: event.data },
              ]);
            };
    
            socketRef.current.onclose = () => {
              console.log("WebSocket closed. Attempting to reconnect...");
            };
    
            socketRef.current.onerror = (error) => {
              console.error("WebSocket error:", error);
            };
          };
    
          connectWebSocket();
    }, [message.length])
    



    const sendMessage = async() => {
     await axios.post("http://localhost:8000/help/posts", { messages: input })
     .then((res) => console.log("Message sent" , res.data))
     setMessage((prevMessage) => [...prevMessage, { message: input}])
     setInput("")
     setHeight('auto')
    };
    


    return (
        <>
            <AdminNavbar />

            <div className="bg-cover absolute inset-0 bg-no-repeat bg-center 
            h-screen w-screen bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-500">
                <div className="pt-[8rem] relative flex items-center justify-center">
                    <div className="bg-white/60 w-[70rem] rounded-md pt-2 pl-2  max-h-[25rem] overflow-y-auto " style={{ height: height }}>
                        {
                            message.map(data => 
                                <>
                               <div className="pt-2 pb-9">
                               <div className="bg-white/70 w-[17rem] h-auto rounded-md pb-2 ">
                                <h1>{data.messages}</h1>
                                </div>
                               </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="relative pl-12 items-center justify-center top-[1rem] right-5">
                    <div className="relative w-full">
                        <input
                            className="w-[70rem] h-12 placeholder-white font-serif text-center border rounded-md bg-white/50 pl-3 pr-10 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Type a message..."
                            onChange={e => setInput(e.target.value)}
                            value={input}
                        />
                        <button
                            onClick={sendMessage}
                            className="absolute right-[8rem] top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-cyan-500 transition-colors 
                            bg-transparent border-none cursor-pointer p-1 font-bold"
                        >
                            <FiSend size={29} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminService;