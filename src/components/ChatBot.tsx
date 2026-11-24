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
  ChevronRight,
  ShieldCheck,
  Copy,
  Check,
  Square,
  RefreshCw,
  Key,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { ChatAction, COMMON_SUGGESTIONS } from '../data/chatbotKnowledge';
import {
  ChatMessage,
  streamAIChatResponse,
} from '../services/aiService';

interface ChatBotProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenPayment: (serviceId?: string) => void;
}

const INITIAL_WELCOME_TEXT = `Hello! 👋 I am **Am-Bot**, your personal conversational AI assistant for **Clean Am Correct**.\n\nJust like Claude and ChatGPT, I can answer your questions in **real time**:\n• 💰 **Price calculations & quotes** (e.g. *"How much for 2-bed flat deep clean?"*)\n• 🧼 **Our services** (Residential, Deep Clean, Office, Move-in, Post-event)\n• 💳 **Paying your booking deposit online** via Paystack\n• 📍 **Areas we cover in Ikorodu** & schedule\n• 🧪 **Stain removal & home cleaning advice**\n\nWhat can I help you with today?`;

export const ChatBot: React.FC<ChatBotProps> = ({
  isOpen,
  onOpenChange,
  onOpenPayment,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('clean_am_chat_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: INITIAL_WELCOME_TEXT,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          {
            label: '💰 View Full Price List',
            type: 'query',
            query: 'Can you show me the full price and deposit list?',
          },
          {
            label: '💬 Chat on WhatsApp',
            type: 'whatsapp',
            url: siteConfig.whatsappLink,
          },
        ],
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('CLEAN_AM_GEMINI_KEY') || '');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save conversation to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem('clean_am_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Auto-scroll to bottom on new stream tokens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotification(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isStreaming]);

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isStreaming) return;

    // Abort any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMessageId = `user-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: query,
      timestamp: userTimestamp,
    };

    const botMessageId = `bot-${Date.now()}`;
    const initialBotMsg: ChatMessage = {
      id: botMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
    };

    const newMessages = [...messages, userMsg, initialBotMsg];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    try {
      await streamAIChatResponse({
        messages: [...messages, userMsg],
        onChunk: (partialText) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, content: partialText, isStreaming: true }
                : msg
            )
          );
        },
        onComplete: (fullText, actions) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, content: fullText, actions, isStreaming: false }
                : msg
            )
          );
          setIsStreaming(false);
          abortControllerRef.current = null;
        },
        onError: () => {
          setIsStreaming(false);
          abortControllerRef.current = null;
        },
        abortSignal: abortController.signal,
      });
    } catch {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleRegenerate = () => {
    if (isStreaming || messages.length < 2) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove last assistant message
    setMessages((prev) => {
      const idx = [...prev].reverse().findIndex((m) => m.role === 'assistant');
      if (idx !== -1) {
        const targetIdx = prev.length - 1 - idx;
        return prev.slice(0, targetIdx);
      }
      return prev;
    });

    handleSendMessage(lastUserMsg.content);
  };

  const handleClearChat = () => {
    handleStopGenerating();
    const freshMessages: ChatMessage[] = [
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Chat session cleared! 🧹 What would you like to discuss? Ask me about our 5 cleaning packages, pricing calculations, or booking in Ikorodu.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          {
            label: '💰 View Price List',
            type: 'query',
            query: 'What are your prices and booking deposit amounts?',
          },
        ],
      },
    ];
    setMessages(freshMessages);
    sessionStorage.removeItem('clean_am_chat_history');
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

  const handleSaveCustomKey = () => {
    if (customKey.trim()) {
      localStorage.setItem('CLEAN_AM_GEMINI_KEY', customKey.trim());
    } else {
      localStorage.removeItem('CLEAN_AM_GEMINI_KEY');
    }
    setShowKeyModal(false);
  };

  // Formats text with rich Markdown highlights and live blinking cursor
  const renderFormattedContent = (content: string, isStreamingItem?: boolean) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 text-sm leading-relaxed">
        {lines.map((line, lineIdx) => {
          // Table Row Parser
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
                className="grid grid-cols-3 gap-1.5 py-1.5 px-2 text-xs border-b border-slate-100 last:border-b-0 hover:bg-slate-50 rounded"
              >
                {cells.map((cell, cIdx) => (
                  <span
                    key={cIdx}
                    className={
                      cIdx === 0
                        ? 'font-bold text-[#032b69]'
                        : cIdx === 1
                        ? 'font-semibold text-[#0284c7]'
                        : 'text-slate-600'
                    }
                  >
                    {cell.replace(/\*\*/g, '')}
                  </span>
                ))}
              </div>
            );
          }

          // Line with markdown bold, italics, prices
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
                      className="font-bold text-[#0284c7] bg-sky-50 px-1 py-0.5 rounded text-[13px] border border-sky-200/50"
                    >
                      {part}
                    </span>
                  );
                }
                return part;
              })}
              {/* Blinking streaming cursor on the last line while generating */}
              {isStreamingItem && lineIdx === lines.length - 1 && (
                <span className="inline-block w-2 h-4 bg-[#38b6ff] ml-1 animate-pulse align-middle" />
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* ================= 1. FLOATING CHAT TRIGGER BUTTON ================= */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          {hasUnreadNotification && (
            <div className="hidden sm:flex items-center gap-2 bg-[#032b69] text-white py-2 px-3.5 rounded-2xl shadow-xl border border-sky-400/30 text-xs font-medium animate-bounce">
              <Sparkles className="w-4 h-4 text-[#38b6ff] animate-pulse" />
              <span>Ask Am-Bot (Real-time AI)</span>
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

          <button
            onClick={() => onOpenChange(true)}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#032b69] to-[#0284c7] hover:from-[#022254] hover:to-[#0369a1] text-white py-3 px-4 sm:px-5 rounded-full shadow-2xl hover:shadow-sky-500/25 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 border border-white/20"
            aria-label="Open Clean Am Correct Real-Time AI Chat"
          >
            <span className="absolute inset-0 rounded-full bg-[#38b6ff] opacity-20 group-hover:opacity-30 blur-md transition-opacity" />

            <div className="relative w-8 h-8 rounded-full bg-[#38b6ff] flex items-center justify-center text-white shrink-0 shadow-inner">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#032b69]" />
            </div>

            <div className="text-left hidden xs:block">
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5 text-white">
                <span>Am-Bot AI</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-400/30">
                  Real-time
                </span>
              </div>
              <div className="text-[11px] text-sky-200 leading-tight">Like ChatGPT & Claude</div>
            </div>

            <MessageSquare className="w-5 h-5 text-[#38b6ff] group-hover:scale-110 transition-transform xs:hidden" />
          </button>
        </div>
      )}

      {/* ================= 2. CHATBOT MAIN WINDOW ================= */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden ${
            isExpanded
              ? 'inset-3 sm:inset-6 md:inset-10 w-auto h-auto max-w-4xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[440px] h-[610px] max-h-[88vh]'
          }`}
          role="dialog"
          aria-label="Clean Am Correct Real-Time AI Chat"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#032b69] via-[#04337d] to-[#0284c7] text-white p-4 flex items-center justify-between shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#38b6ff]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-10 h-10 rounded-2xl bg-[#38b6ff] flex items-center justify-center text-white shadow-md border border-white/20">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#032b69]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base leading-tight">Am-Bot AI Assistant</h3>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-semibold border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Stream
                  </span>
                </div>
                <p className="text-[11px] text-sky-200 leading-tight">
                  Clean Am Correct • Powered by Generative AI
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={() => setShowKeyModal(true)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="AI Settings & API Key"
                aria-label="AI Settings"
              >
                <Key className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearChat}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Restart chat"
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

          {/* MESSAGES BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-4.5 space-y-4 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40">
            {messages.map((message) => {
              const isUser = message.role === 'user';

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
                >
                  <div className="flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%]">
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-[#032b69] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
                        <Bot className="w-4 h-4 text-[#38b6ff]" />
                      </div>
                    )}

                    <div className="w-full">
                      <div
                        className={`rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm relative ${
                          isUser
                            ? 'bg-gradient-to-r from-[#032b69] to-[#0284c7] text-white rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          renderFormattedContent(message.content, message.isStreaming)
                        )}
                      </div>

                      {/* Bot Actions */}
                      {!isUser && message.actions && message.actions.length > 0 && (
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

                      {/* Action icons row (Copy, Regenerate, Timestamp) */}
                      <div className="flex items-center justify-between mt-1 px-1 text-[11px] text-slate-400">
                        <span>{message.timestamp}</span>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleCopyMessage(message.id, message.content)}
                            className="hover:text-slate-600 p-0.5"
                            title="Copy text"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>

                          {!isUser && !message.isStreaming && (
                            <button
                              onClick={handleRegenerate}
                              className="hover:text-slate-600 p-0.5"
                              title="Regenerate response"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
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

            <div ref={messagesEndRef} />
          </div>

          {/* STOP GENERATING BAR */}
          {isStreaming && (
            <div className="flex justify-center p-2 bg-slate-50 border-t border-slate-200">
              <button
                onClick={handleStopGenerating}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-sm transition-all"
              >
                <Square className="w-3 h-3 text-red-500 fill-red-500" />
                <span>Stop generating</span>
              </button>
            </div>
          )}

          {/* QUICK PROMPT CHIPS */}
          {!isStreaming && (
            <div className="px-4 py-2 bg-slate-50/90 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-slate-500 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#38b6ff]" /> Try:
              </span>
              {[
                '💰 Full Price List',
                '🏠 2-Bed Flat Quote',
                '🧼 Deep Clean 3-Bed',
                '📍 Areas in Ikorodu',
                '💳 How to Pay Deposit',
              ].map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sugg)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-[#0284c7] hover:border-sky-300 border border-slate-200 text-[11px] font-medium transition-colors"
                >
                  {sugg}
                </button>
              ))}
            </div>
          )}

          {/* CHAT INPUT BAR */}
          <div className="p-3 sm:p-3.5 bg-white border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask anything (e.g. 'How much to deep clean a 3-bedroom in Agric?')..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                disabled={isStreaming}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isStreaming}
                className="w-10 h-10 rounded-2xl bg-[#032b69] hover:bg-[#0284c7] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Real-time Conversational AI • Clean Am Correct
              </span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. API KEY / AI SETTINGS MODAL ================= */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[#032b69] text-base">AI Engine Settings</h4>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Am-Bot operates with our built-in high-speed real-time conversational streaming engine.
              Optionally, you can connect your personal **Google Gemini API Key** for live LLM generation:
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomKey}
                  className="px-4 py-1.5 text-xs font-semibold bg-[#032b69] hover:bg-[#0284c7] text-white rounded-lg shadow-sm"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
