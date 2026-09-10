import { Bot, Check, CheckCircle2, Clipboard, Code2, ExternalLink, FileCode2, FileText, LoaderCircle, Paperclip, Send, ShieldCheck, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Mode = "ai" | "compiler";
type Message = { id: number; role: "assistant" | "user"; text: string; file?: string };

function generateRandomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function Cved() {
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState<Mode>("ai");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState("");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: "assistant", text: t("cved.greeting") }]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prompts = [t("cved.prompt_review"), t("cved.prompt_error"), t("cved.prompt_architecture")];
  const responses = [t("cved.reply_review"), t("cved.reply_error"), t("cved.reply_architecture")];

  useEffect(() => {
    setMessages([{ id: Date.now(), role: "assistant", text: t("cved.greeting") }]);
  }, [i18n.language, t]);

  const sendMessage = (preset?: string) => {
    const text = (preset ?? draft).trim();
    if (!text && !attachedFile) return;
    const file = attachedFile ?? undefined;
    setMessages((current) => [...current, { id: Date.now(), role: "user", text: text || t("cved.file_sent"), file }]);
    setDraft("");
    setAttachedFile(null);
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: responses[current.length % responses.length] }]);
      setIsTyping(false);
    }, 850);
  };

  const createUrl = () => {
    if (isGenerating) return;
    setCopied(false);
    setUrl("");
    setIsGenerating(true);
    window.setTimeout(() => {
      setUrl(`https://nextleap.app/online-compiler/c-programming/${generateRandomCode()}`);
      setIsGenerating(false);
    }, 1500);
  };
  const copyUrl = async () => {
    if (!url) return;
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="cved-page">
      <div className="cved-hero"><div><div className="cved-kicker"><span /> {t("cved.kicker")}</div><h1>CVED <span>AI</span></h1><p>{t("cved.subtitle")}</p></div><div className="cved-hero-meta"><div className="cved-meta-icon"><ShieldCheck size={20} /></div><div><strong>{t("cved.secure_title")}</strong><small>{t("cved.secure_subtitle")}</small></div></div></div>
      <div className="cved-tabs" role="tablist" aria-label={t("cved.tabs_label")}><button className={mode === "ai" ? "active" : ""} onClick={() => setMode("ai")} role="tab" aria-selected={mode === "ai"}><Sparkles size={18} /><span>{t("cved.ai_tab")}</span><small>{t("cved.ai_tab_hint")}</small></button><button className={mode === "compiler" ? "active" : ""} onClick={() => setMode("compiler")} role="tab" aria-selected={mode === "compiler"}><Code2 size={18} /><span>{t("cved.compiler_tab")}</span><small>{t("cved.compiler_tab_hint")}</small></button></div>

      {mode === "ai" ? (
        <section className="cved-ai-shell">
          <aside className="cved-ai-context"><div className="cved-ai-context-head"><div className="cved-ai-logo"><Bot size={20} /></div><div><strong>{t("cved.ai_name")}</strong><span>{t("cved.ai_status")}</span></div></div><button className="cved-new-session" onClick={() => setMessages([{ id: Date.now(), role: "assistant", text: t("cved.greeting") }])}><Sparkles size={15} /> {t("cved.new_session")}</button><p className="cved-context-label">{t("cved.capabilities")}</p><div className="cved-capability"><CheckCircle2 size={16} /><span>{t("cved.capability_review")}</span></div><div className="cved-capability"><CheckCircle2 size={16} /><span>{t("cved.capability_security")}</span></div><div className="cved-capability"><CheckCircle2 size={16} /><span>{t("cved.capability_explain")}</span></div><div className="cved-ai-context-note"><ShieldCheck size={15} /><span>{t("cved.privacy_note")}</span></div></aside>
          <div className="cved-ai-chat"><header className="cved-ai-chat-head"><div className="cved-ai-agent"><div className="cved-ai-avatar"><Bot size={18} /></div><div><h2>{t("cved.ai_name")}</h2><span><i /> {t("cved.ai_status")}</span></div></div><span className="cved-ai-private"><Check size={13} /> {t("cved.private")}</span></header><div className="cved-ai-messages"><div className="cved-ai-welcome"><div className="empty-orbit"><Sparkles size={23} /></div><h3>{t("cved.welcome_title")}</h3><p>{t("cved.welcome_text")}</p></div>{messages.map((message) => <div className={`cved-ai-message ${message.role}`} key={message.id}><div className="cved-ai-message-avatar">{message.role === "assistant" ? <Bot size={14} /> : <User size={14} />}</div><div className="cved-ai-bubble"><p>{message.text}</p>{message.file && <div className="cved-ai-file"><FileText size={14} />{message.file}</div>}</div></div>)}{isTyping && <div className="cved-ai-message assistant"><div className="cved-ai-message-avatar"><Bot size={14} /></div><div className="cved-ai-bubble cved-ai-typing"><i /><i /><i /></div></div>}</div><div className="cved-ai-composer-wrap"><div className="cved-ai-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>)}</div>{attachedFile && <div className="cved-ai-file-preview"><FileText size={14} />{attachedFile}<button onClick={() => setAttachedFile(null)} aria-label={t("cved.remove_file")}><X size={14} /></button></div>}<div className="cved-ai-composer"><button className="chat-icon-button" onClick={() => fileInputRef.current?.click()} aria-label={t("cved.attach_file")}><Paperclip size={18} /></button><input ref={fileInputRef} type="file" className="sr-only" accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.txt,.pdf" onChange={(event) => setAttachedFile(event.target.files?.[0]?.name ?? null)} /><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder={t("cved.placeholder")} rows={1} /><button className="chat-send" onClick={() => sendMessage()} disabled={!draft.trim() && !attachedFile} aria-label={t("cved.send")}><Send size={17} /></button></div><p className="cved-ai-note">{t("cved.keyboard_hint")}</p></div></div>
        </section>
      ) : (
        <section className="cved-workspace"><div className="workspace-title"><div className="workspace-icon blue"><Code2 size={22} /></div><div><h2>{t("cved.compiler_title")}</h2><p>{t("cved.compiler_description")}</p></div></div><div className="cved-info-grid"><div className="cved-info-item"><FileCode2 size={18} /><div><strong>{t("cved.compiler_feature_one")}</strong><span>{t("cved.compiler_feature_one_text")}</span></div></div><div className="cved-info-item"><ExternalLink size={18} /><div><strong>{t("cved.compiler_feature_two")}</strong><span>{t("cved.compiler_feature_two_text")}</span></div></div><div className="cved-info-item"><ShieldCheck size={18} /><div><strong>{t("cved.compiler_feature_three")}</strong><span>{t("cved.compiler_feature_three_text")}</span></div></div></div>{isGenerating ? <div className="compiler-generating"><div className="compiler-orbit"><Sparkles size={25} /></div><h3>{t("cved.generating")}</h3><p>{t("cved.generation_hint")}</p><div className="generation-steps"><span className="done"><Check size={13} /> {t("cved.step_session")}</span><span className="active"><LoaderCircle size={13} className="spin" /> {t("cved.step_security")}</span><span><Code2 size={13} /> {t("cved.step_ready")}</span></div><div className="generation-progress"><i /></div></div> : !url ? <div className="cved-empty-state"><div className="empty-orbit"><Sparkles size={25} /></div><h3>{t("cved.compiler_empty_title")}</h3><p>{t("cved.compiler_empty_text")}</p><button className="cved-primary" onClick={createUrl}>{t("cved.create_url")} <ExternalLink size={17} /></button></div> : <div className="generated-url compiler-ready"><div className="url-heading"><div><span className="status-dot" /> {t("cved.url_ready")}</div><button onClick={() => setUrl("")}><X size={16} /> {t("cved.clear")}</button></div><div className="url-box"><span>{url}</span><button onClick={copyUrl}>{copied ? <><Check size={16} /> {t("cved.copied")}</> : <><Clipboard size={16} /> {t("cved.copy")}</>}</button></div><a href={url} target="_blank" rel="noreferrer" className="cved-secondary">{t("cved.open_compiler")} <ExternalLink size={16} /></a></div>}</section>
      )}
      <div className="cved-footer-note"><ShieldCheck size={16} /> {t("cved.footer")}</div>
    </div>
  );
}
