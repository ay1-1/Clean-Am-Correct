import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  Maximize2,
  CreditCard,
  Phone,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import {
  getInstantChatResponse,
  ChatAction,
  ChatResponse,
  COMMON_SUGGESTIONS,
} from '../data/chatbotKnowledge';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

interface ChatBotProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenPayment: (serviceId?: string) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({
  isOpen,
  onOpenChange,
  onOpenPayment,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `Hello! 👋 Welcome to **Clean Am Correct**.\n\nI am your **AI Cleaning Assistant**. Ask me anything in real time:\n• 💰 **Prices & quotes** (e.g. *"How much for 2-bed deep clean?"*)\n• 🧼 **Our services** in Ikorodu & Lagos\n• 💳 **How to pay booking deposits online**\n• 📍 **Areas we cover** & operating hours\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '💰 View Price List',
        '🏠 Residential Cleaning Price',
        '🧼 Deep Cleaning Quote',
        '📍 Areas in Ikorodu',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotification(false);
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isTyping) return;

    const userMessageId = `user-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMessages: Message[] = [
      ...messages,
      {
        id: userMessageId,
        sender: 'user',
        text: query,
        timestamp: userTimestamp,
      },
    ];

    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Realistic typing delay (350ms to 600ms) for natural conversational feel
    const delay = Math.min(650, Math.max(300, query.length * 15));

    setTimeout(() => {
      const botResponse: ChatResponse = getInstantChatResponse(query);
      const botTimestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse.text,
          timestamp: botTimestamp,
          actions: botResponse.actions,
          suggestions: botResponse.suggestions,
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat restarted! 🧹 How can I help you with your cleaning needs today? Ask me about prices, deep cleaning, or booking.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: COMMON_SUGGESTIONS.slice(0, 4),
      },
    ]);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'payment') {
      onOpenPayment(action.serviceId);
    } else if (action.type === 'whatsapp' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'call') {
      window.location.href = `tel:${siteConfig.phoneRaw}`;
    } else if (action.type === 'query' && action.query) {
      handleSendMessage(action.query);
    }
  };

  // Simple rich text parser for bot messages
  const renderFormattedText = (content: string) => {
    return content.split('\n').map((line, lineIdx) => {
      // Table row formatting (simple markdown tables)
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const isHeaderSep = cells.every((c) => c.match(/^[-:]+$/));
        if (isHeaderSep) return null;

        return (
          <div
            key={lineIdx}
            className="grid grid-cols-3 gap-1 py-1.5 px-2 text-xs border-b border-slate-100 last:border-b-0 hover:bg-slate-50 rounded"
          >
            {cells.map((cell, cIdx) => (
              <span
                key={cIdx}
                className={cIdx === 0 ? 'font-semibold text-[#032b69]' : 'text-slate-700'}
              >
                {cell.replace(/\*\*/g, '')}
              </span>
            ))}
          </div>
        );
      }

      // Standard line formatting
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|₦\d{1,3}(?:,\d{3})*)/g);

      return (
        <p key={lineIdx} className={line.trim() === '' ? 'h-2' : 'min-h-[1.25rem]'}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-[#032b69]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={pIdx} className="italic text-slate-600">
                  {part.slice(1, -1)}
                </em>
              );
            }
            if (part.startsWith('₦')) {
              return (
                <span
                  key={pIdx}
                  className="font-bold text-[#0284c7] bg-sky-50 px-1 py-0.5 rounded text-[13px]"
                >
                  {part}
                </span>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* ================= FLOATING CHAT TRIGGER BUTTON ================= */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          {/* Notification bubble prompt */}
          {hasUnreadNotification && (
            <div className="hidden sm:flex items-center gap-2 bg-[#032b69] text-white py-2 px-3.5 rounded-2xl shadow-xl border border-sky-400/30 text-xs font-medium animate-bounce">
              <Sparkles className="w-4 h-4 text-[#38b6ff] animate-pulse" />
              <span>Ask about prices & quotes!</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasUnreadNotification(false);
                }}
                className="text-white/60 hover:text-white p-0.5"
                aria-label="Dismiss notification"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Launcher Trigger Button */}
          <button
            onClick={() => onOpenChange(true)}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#032b69] to-[#0284c7] hover:from-[#022254] hover:to-[#0369a1] text-white py-3 px-4 sm:px-5 rounded-full shadow-2xl hover:shadow-sky-500/25 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 border border-white/20"
            aria-label="Open Clean Am Correct Live Chatbot"
          >
            {/* Glowing aura */}
            <span className="absolute inset-0 rounded-full bg-[#38b6ff] opacity-20 group-hover:opacity-30 blur-md transition-opacity" />

            {/* Sparkle & Bot Icon */}
            <div className="relative w-8 h-8 rounded-full bg-[#38b6ff] flex items-center justify-center text-white shrink-0 shadow-inner">
              <Bot className="w-5 h-5 text-white" />
              {/* Online Green Indicator */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#032b69]" />
            </div>

            <div className="text-left hidden xs:block">
              <div className="text-xs font-bold leading-tight flex items-center gap-1 text-white">
                <span>Ask Clean Am</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-400/30">
                  Online
                </span>
              </div>
              <div className="text-[11px] text-sky-200 leading-tight">Instant Real-Time Quotes</div>
            </div>

            <MessageSquare className="w-5 h-5 text-[#38b6ff] group-hover:scale-110 transition-transform xs:hidden" />
          </button>
        </div>
      )}

      {/* ================= CHATBOT MAIN WINDOW ================= */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-12 w-auto h-auto max-w-4xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[88vh]'
          }`}
          role="dialog"
          aria-label="Clean Am Correct Live Customer Chat"
        >
          {/* 1. CHAT HEADER */}
          <div className="bg-gradient-to-r from-[#032b69] via-[#04337d] to-[#0284c7] text-white p-4 sm:p-4.5 flex items-center justify-between shadow-md relative overflow-hidden">
            {/* Decorative background sparkle */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#38b6ff]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-10 h-10 rounded-2xl bg-[#38b6ff] flex items-center justify-center text-white shadow-md border border-white/20">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#032b69]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base leading-tight">Clean Am Assistant</h3>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-semibold border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Real-time
                  </span>
                </div>
                <p className="text-[11px] text-sky-200 leading-tight">
                  Instant Quotes & Support • Ikorodu, Lagos
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={handleClearChat}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Restart conversation"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isExpanded ? 'Restore window' : 'Maximize window'}
                aria-label={isExpanded ? 'Restore window' : 'Maximize window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. MESSAGES CONTAINER */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-4.5 space-y-4 bg-gradient-to-b from-slate-50/70 to-white">
            {messages.map((message) => {
              const isUser = message.sender === 'user';

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
                >
                  <div className="flex items-start gap-2 max-w-[88%] sm:max-w-[85%]">
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-[#032b69] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
                        <Bot className="w-4 h-4 text-[#38b6ff]" />
                      </div>
                    )}

                    <div>
                      {/* Bubble content */}
                      <div
                        className={`rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-gradient-to-r from-[#032b69] to-[#0284c7] text-white rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{message.text}</p>
                        ) : (
                          <div className="space-y-1.5">{renderFormattedText(message.text)}</div>
                        )}
                      </div>

                      {/* Interactive Action Buttons */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          {message.actions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(action)}
                              className={`w-full text-left text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-between gap-2 transition-all ${
                                action.type === 'payment'
                                  ? 'bg-[#38b6ff]/15 hover:bg-[#38b6ff]/25 text-[#032b69] border border-[#38b6ff]/40 shadow-xs'
                                  : action.type === 'whatsapp'
                                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {action.type === 'payment' && (
                                  <CreditCard className="w-3.5 h-3.5 text-[#0284c7]" />
                                )}
                                {action.type === 'whatsapp' && (
                                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                                {action.type === 'call' && (
                                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                                )}
                                <span>{action.label}</span>
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Follow-up Suggestion Chips */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {message.suggestions.map((suggestion, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(suggestion)}
                              className="text-[11px] bg-slate-100 hover:bg-sky-50 hover:text-[#0284c7] hover:border-sky-300 text-slate-600 py-1 px-2.5 rounded-full border border-slate-200 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <span className="text-[10px] text-slate-400 mt-1 block px-1">
                        {message.timestamp}
                      </span>
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center text-xs shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#032b69] text-white flex items-center justify-center text-xs shrink-0">
                  <Bot className="w-4 h-4 text-[#38b6ff]" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none py-2.5 px-4 shadow-sm flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">Am-Bot is calculating</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. QUICK SUGGESTION CHIPS BAR */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[11px] font-semibold text-slate-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#38b6ff]" /> Quick:
            </span>
            {COMMON_SUGGESTIONS.slice(0, 4).map((sugg, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sugg)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-[#0284c7] hover:border-sky-300 border border-slate-200 text-[11px] font-medium transition-colors"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* 4. CHAT INPUT BAR */}
          <div className="p-3 sm:p-3.5 bg-white border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question or price (e.g. 2-bed deep clean?)..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                disabled={isTyping}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-2xl bg-[#032b69] hover:bg-[#0284c7] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Clean Am Correct Verified Pricing
              </span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
