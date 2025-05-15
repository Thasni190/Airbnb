'use client';
import React, { useRef, useEffect, useState } from "react";
import CustomButton from "../forms/CustomButton";
import useWebSocket, { ReadyState } from "react-use-websocket";

// Define clear types
type UserType = {
  id: string;
  name: string;
};

type ConversationType = {
  id: string;
  users: UserType[];
  modified_at: string;
};

type MessageType = {
  id: string;
  name: string;
  body: string;
  timestamp?: string;
};

// Define WebSocket message types
interface WebSocketMessageData {
  name?: string;
  body?: string;
  sent_to_id?: string;
  conversation_id?: string;
}

interface WebSocketEventMessage {
  event?: string;
  data?: WebSocketMessageData;
  name?: string;
  body?: string;
}

interface ConversationDetailProps {
  conversation: ConversationType;
  userId: string;
  token: string;
}

function ConversationDetails({ conversation, userId, token }: ConversationDetailProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  
  // Find current user and other participant
  const currentUser = conversation?.users?.find(user => user.id === userId);
  const otherUser = conversation?.users?.find(user => user.id !== userId);

  // WebSocket setup
  const socketUrl = `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`;
  
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established'),
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });

  // Log connection status
  useEffect(() => {
    const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    };
    
    console.log('WebSocket Status:', connectionStatus[readyState]);
  }, [readyState]);

  // Process incoming messages
  useEffect(() => {
    if (lastJsonMessage) {
      try {
        console.log("Received message:", lastJsonMessage);
        
        // Type guard to check if lastJsonMessage is an object
        if (typeof lastJsonMessage === 'object' && lastJsonMessage !== null) {
          const wsMessage = lastJsonMessage as WebSocketEventMessage;
          let newMessage: MessageType;
          
          // Handle different message formats
          if ('name' in wsMessage && 'body' in wsMessage && 
              typeof wsMessage.name === 'string' && 
              typeof wsMessage.body === 'string') {
            // Format 1: Direct name and body
            newMessage = {
              id: Date.now().toString(),
              name: wsMessage.name,
              body: wsMessage.body,
              timestamp: new Date().toISOString()
            };
          } else if ('data' in wsMessage && wsMessage.data && 
                    typeof wsMessage.data === 'object') {
            // Format 2: Data object containing name and body
            const data = wsMessage.data;
            newMessage = {
              id: Date.now().toString(),
              name: typeof data.name === 'string' ? data.name : "Unknown",
              body: typeof data.body === 'string' ? data.body : "",
              timestamp: new Date().toISOString()
            };
          } else if ('event' in wsMessage && 
                    wsMessage.event === 'chat_message' && 
                    'data' in wsMessage) {
            // Format 3: Event with data
            const data = wsMessage.data;
            if (data) {
              newMessage = {
                id: Date.now().toString(),
                name: typeof data.name === 'string' ? data.name : "Unknown",
                body: typeof data.body === 'string' ? data.body : "",
                timestamp: new Date().toISOString()
              };
            } else {
              console.warn("No data in event message:", wsMessage);
              return;
            }
          } else {
            console.warn("Unrecognized message format:", wsMessage);
            return;
          }
          
          setMessages(prev => [...prev, newMessage]);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    }
  }, [lastJsonMessage]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const messageData = {
      event: 'chat_message',
      data: {
        body: inputMessage,
        name: currentUser?.name || "Me",
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id
      }
    };
    
    console.log("Sending message:", messageData);
    sendJsonMessage(messageData);
    
    // Optionally add the message to the UI immediately for better UX
    const outgoingMessage: MessageType = {
      id: `local-${Date.now()}`,
      name: currentUser?.name || "Me",
      body: inputMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, outgoingMessage]);
    
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="font-medium">Chat with {otherUser?.name || 'User'}</h2>
      </div>
      
      {/* Messages area */}
      <div 
        ref={messageRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] py-3 px-4 rounded-lg break-words ${
                msg.name === currentUser?.name 
                  ? 'ml-auto bg-blue-100' 
                  : 'bg-gray-100'
              }`}
            >
              <div className="font-medium text-sm text-gray-600 mb-1">{msg.name}</div>
              <div>{msg.body}</div>
            </div>
          ))
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t p-3 flex gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CustomButton
          label="Send"
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        />
      </div>
    </div>
  );
}

export default ConversationDetails;