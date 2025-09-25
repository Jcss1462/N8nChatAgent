import { useState, useRef, useEffect } from "react";
import { useUIStore } from "../store/useUIStore";
import { askChat } from "../services/chatService";
import type { AskChatModel } from "../models/AskChatModel";
import { toast } from "sonner";
import type { ChatHistoryModel } from "../models/ChatHistoryModel";
import { SendIcon } from "lucide-react";
import ReactMarkdown from 'react-markdown';

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
    // Mantenemos un fondo neutro para que tus colores de marca resalten
    <div className="flex flex-col h-[84vh] bg-slate">

      {/* Header usando tu blanco y azul oscuro para el texto */}
      <header className="px-6 py-4 bg-brand-white text-brand-dark text-xl font-semibold shadow-sm w-full z-10">
        Chat
      </header>

      <main className="flex flex-col w-full max-w-4xl mx-auto flex-1">

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${msg.isUsser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isUsser && (
                <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0"></div>
              )}

              <div
                className={`px-4 py-3 rounded-2xl max-w-md ${msg.isUsser
                  ? 'bg-brand-light text-brand-white rounded-br-none' // Burbuja del usuario con tu azul claro
                  : 'bg-brand-white text-brand-dark rounded-bl-none'   // Burbuja del otro con tu blanco y texto oscuro
                  }`}
              >
                <p className="text-lg">
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Barra de entrada con tu color de acento naranja en el botón */}
        <div className="px-6 py-4 bg-brand-white/80 backdrop-blur-sm border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-2 bg-slate-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-brand-light transition"
          />
          <button
            onClick={handleSendMessage}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white w-10 h-10 rounded-full flex items-center justify-center transition flex-shrink-0"
            aria-label="Enviar mensaje"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
