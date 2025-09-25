import { useState, useRef, useEffect } from "react";
import { useUIStore } from "../store/useUIStore";
import { askChat } from "../services/chatService";
import type { AskChatModel } from "../models/AskChatModel";
import { toast } from "sonner";
import type { ChatHistoryModel } from "../models/ChatHistoryModel";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistoryModel[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useUIStore();

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    let historial: ChatHistoryModel = {
      message: message,
      isUsser: true
    }


    setChatHistory((prev) => [...prev, historial]);
    await sendAskToChat(message);
    setMessage("");
  };

  const sendAskToChat = async (message: string) => {

    let question: AskChatModel = {
      message: message
    }

    setLoading(true);
    await askChat(question).then((response) => {
      let historial: ChatHistoryModel = {
        message: response.data,
        isUsser: false
      }
      setChatHistory((prev) => [...prev, historial]);

    }).catch((err) => {
      toast.error("Error al consultar info" + err);
    }).finally(() => {
      setLoading(false);
    });

  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Scroll automático al final
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-[84vh] bg-brand-white">
      {/* Header */}
      <header className="px-6 py-4 bg-brand-dark text-white text-xl font-bold shadow">
        Chat
      </header>

      {/* Área de mensajes (scrollable y flexible) */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
        {chatHistory.length > 0 ? (
          chatHistory.map((msg, index) => (
            // 1. Añadimos un div contenedor para cada mensaje
            <div
              key={index}
              className={`flex ${msg.isUsser ? 'justify-start' : 'justify-end'
                }`}
            >
              {/* 2. El div del mensaje ahora solo tiene estilos de apariencia */}
              <div
                className={`text-white px-4 py-2 rounded-md max-w-xs ${msg.isUsser ? 'bg-brand-light' : 'bg-brand-dark'
                  }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No hay mensajes aún. Escribe algo abajo.
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Barra de entrada (pegada abajo siempre) */}
      <div className="px-4 py-3 border-t border-gray-300 bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light"
        />
        <button
          onClick={handleSendMessage}
          className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
