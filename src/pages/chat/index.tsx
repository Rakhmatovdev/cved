import {
  Bot,
  Check,
  FileText,
  MessageCircle,
  Paperclip,
  Plus,
  Send,
  Sparkles,
  User,
  X
} from "lucide-react";
import { useRef, useState } from "react";

type ChatMessage = { id: number; role: "assistant" | "user"; text: string; file?: string };

const suggestions = [
  "Kodimni tekshirib ber",
  "Xatoni tushuntir",
  "Faylni tahlil qil"
];

const replies = [
  "Albatta. Kod yoki faylni yuboring, muammoni bosqichma-bosqich tushuntiraman.",
  "Tahlil natijasini xavf darajasi va amaliy yechim bilan ko'rsataman.",
  "So'rovingizni qabul qildim. Natijani tayyorlash uchun ma'lumotlarni tekshiryapman."
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "assistant", text: "Salom! Men CVED yordamchisiman. Kodni tekshirish, xatolarni tushuntirish va fayl auditida yordam beraman." }
  ]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (preset?: string) => {
    const text = (preset ?? draft).trim();
    if (!text && !attachedFile) return;
    const fileName = attachedFile ?? undefined;
    setMessages((current) => [...current, { id: Date.now(), role: "user", text: text || "Fayl yuborildi", file: fileName }]);
    setDraft("");
    setAttachedFile(null);
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: replies[current.length % replies.length] }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="chat-page">
      <aside className="chat-history">
        <div className="chat-history-head"><div><p>CVED Assistant</p><span>Yordam markazi</span></div><button aria-label="Yangi suhbat" onClick={() => setMessages([{ id: Date.now(), role: "assistant", text: "Yangi suhbat boshlandi. Qanday yordam beray?" }])}><Plus size={17} /></button></div>
        <div className="chat-history-label">Bugungi suhbatlar</div>
        <button className="chat-history-item active"><MessageCircle size={16} /><span>Kod audit bo‘yicha suhbat</span></button>
        <div className="chat-history-empty"><Sparkles size={18} /><span>Yangi suhbatni boshlang</span></div>
      </aside>

      <section className="chat-panel">
        <header className="chat-panel-head"><div className="chat-agent"><div className="chat-agent-avatar"><Bot size={20} /></div><div><h1>CVED yordamchisi</h1><span><i /> Onlayn · xavfsiz sessiya</span></div></div><div className="chat-head-badge"><Check size={14} /> Maxfiy</div></header>
        <div className="chat-messages">
          <div className="chat-welcome"><div className="chat-welcome-icon"><Sparkles size={19} /></div><h2>Kod bilan bog‘liq savolingiz bormi?</h2><p>Muammoni yozing yoki fayl biriktiring. Men aniq va tushunarli tavsiyalar beraman.</p></div>
          {messages.map((message) => <div className={`chat-message ${message.role}`} key={message.id}><div className="chat-message-avatar">{message.role === "assistant" ? <Bot size={15} /> : <User size={15} />}</div><div className="chat-bubble"><p>{message.text}</p>{message.file && <div className="chat-attachment"><FileText size={14} /><span>{message.file}</span></div>}<time>{message.role === "assistant" ? "CVED AI" : "Siz"}</time></div></div>)}
          {isTyping && <div className="chat-message assistant"><div className="chat-message-avatar"><Bot size={15} /></div><div className="chat-bubble typing"><span /><span /><span /></div></div>}
        </div>
        <div className="chat-composer-wrap">
          <div className="chat-suggestions">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}</button>)}</div>
          {attachedFile && <div className="chat-file-preview"><FileText size={14} /> {attachedFile}<button onClick={() => setAttachedFile(null)} aria-label="Faylni olib tashlash"><X size={14} /></button></div>}
          <div className="chat-composer"><button className="chat-icon-button" onClick={() => fileInputRef.current?.click()} aria-label="Fayl biriktirish"><Paperclip size={18} /></button><input ref={fileInputRef} type="file" className="sr-only" accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.txt,.pdf" onChange={(event) => setAttachedFile(event.target.files?.[0]?.name ?? null)} /><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Savolingizni yozing..." rows={1} /><button className="chat-send" onClick={() => sendMessage()} disabled={!draft.trim() && !attachedFile} aria-label="Xabar yuborish"><Send size={17} /></button></div><p className="chat-composer-note">Enter — yuborish · Shift + Enter — yangi qator</p>
        </div>
      </section>
    </div>
  );
}
