import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Headphones } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import {
  useChatKnowledge,
  findResponse,
} from "@/data/chatKnowledge";
import { useCompany } from "@/data/company";

const suggestedQuestions = [
  "你们有哪些产品？",
  "锤片粉碎机怎么选型？",
  "设备价格多少？",
  "售后服务怎么样？",
];

export default function ChatWidget() {
  const { isOpen, toggle, open, messages, addMessage, hasWelcomed, setWelcomed } =
    useChatStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: chatData, isLoading: chatLoading } = useChatKnowledge();
  const { data: companyInfo } = useCompany();

  const welcomeMessage = chatData?.welcomeMessage || "您好，欢迎来到华威制造！请问有什么可以帮您？";
  const fallbackMessage = chatData?.fallbackMessage || "抱歉，我暂时无法回答这个问题，您可以留下联系方式转人工。";
  const humanHandoffMessage = chatData?.humanHandoffMessage || "已为您转接人工服务，请留下联系方式。";
  const knowledge = chatData?.knowledge || [];
  const companyPhone = companyInfo?.phone || "400-888-6688";

  useEffect(() => {
    if (isOpen && !hasWelcomed && !chatLoading) {
      addMessage({
        role: "ai",
        content: welcomeMessage,
        timestamp: Date.now(),
      });
      setWelcomed(true);
    }
  }, [isOpen, hasWelcomed, chatLoading, welcomeMessage, addMessage, setWelcomed]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage = text.trim();
    setInput("");
    addMessage({ role: "user", content: userMessage, timestamp: Date.now() });

    setIsTyping(true);

    // 模拟 AI 思考延迟
    setTimeout(() => {
      setIsTyping(false);

      const normalized = userMessage.toLowerCase();
      if (normalized.includes("人工") || normalized.includes("客服") || normalized.includes("销售")) {
        addMessage({
          role: "ai",
          content: humanHandoffMessage,
          timestamp: Date.now(),
        });
        return;
      }

      const response = findResponse(knowledge, userMessage);
      addMessage({
        role: "ai",
        content: response || fallbackMessage,
        timestamp: Date.now(),
      });
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`mb-4 w-[90vw] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">华威智能客服</h3>
              <p className="text-navy-300 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                在线
              </p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="text-navy-300 hover:text-white transition-colors p-1"
            aria-label="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[360px] overflow-y-auto p-4 bg-navy-50/50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 mb-4 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user"
                    ? "bg-brand-500 text-white"
                    : "bg-navy-200 text-navy-700"
                }`}
              >
                {message.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-brand-500 text-white rounded-br-none"
                    : "bg-white text-navy-700 border border-navy-100 rounded-bl-none shadow-sm"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-navy-200 text-navy-700 flex items-center justify-center shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-white border border-navy-100 rounded-2xl rounded-bl-none p-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 bg-white border border-navy-200 text-navy-600 rounded-full hover:border-brand-500 hover:text-brand-600 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-navy-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="请输入您的问题..."
              className="flex-1 px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-full text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-600 disabled:bg-navy-300 text-white flex items-center justify-center transition-colors"
              aria-label="发送"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={() => handleSend("转人工")}
              className="text-xs text-navy-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
            >
              <Headphones size={12} />
              转人工客服
            </button>
            <span className="text-xs text-navy-400">服务热线：{companyPhone}</span>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={open}
        className={`w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30 flex items-center justify-center transition-all hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="打开客服"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
