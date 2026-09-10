import {
  Check,
  CheckCircle2,
  Clipboard,
  Code2,
  ExternalLink,
  FileCode2,
  FileText,
  KeyRound,
  LoaderCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Mode = "online" | "offline";

const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go"];

const findings = [
  {
    title: "O'zgaruvchi e'lon qilinmagan",
    detail: "O'zgaruvchini ishlatishdan oldin let yoki const bilan e'lon qiling.",
    severity: "Yuqori"
  },
  {
    title: "Null qiymat tekshirilmagan",
    detail: "Optional chaining (?.) yoki aniq null-check qo'shing.",
    severity: "O'rta"
  },
  {
    title: "Kirish formati tekshirilmagan",
    detail: "Foydalanuvchi kiritgan ma'lumotni validatsiya qiling.",
    severity: "Past"
  }
];

function generateRandomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Cved() {
  const [mode, setMode] = useState<Mode>("online");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["TypeScript"]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalIssues = useMemo(
    () => (files.length > 0 && isAnalyzed ? files.length * findings.length : 0),
    [files.length, isAnalyzed]
  );

  const createUrl = () => {
    setCopied(false);
    setUrl(`https://nextleap.app/online-compiler/c-programming/${generateRandomCode()}`);
  };

  const copyUrl = async () => {
    if (!url) return;
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter((file) => file.size <= 25 * 1024 * 1024);
    setFiles((current) => [...current, ...valid].slice(0, 5));
    setIsAnalyzed(false);
  };

  const analyzeFiles = () => {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 1200);
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((current) =>
      current.includes(language)
        ? current.filter((item) => item !== language)
        : [...current, language]
    );
  };

  return (
    <div className="cved-page">
      <div className="cved-hero">
        <div>
          <div className="cved-kicker"><span /> Kod sifati va xavfsizlik nazorati</div>
          <h1>CVED <span>Code Verification</span></h1>
          <p>Dasturni tez tekshiring, muammolarni aniqlang va yechimni bir joyda boshqaring.</p>
        </div>
        <div className="cved-hero-meta">
          <div className="cved-meta-icon"><ShieldCheck size={20} /></div>
          <div><strong>Xavfsiz tahlil</strong><small>Fayllar lokal demo rejimida</small></div>
        </div>
      </div>

      <div className="cved-tabs" role="tablist" aria-label="Tekshirish turi">
        <button className={mode === "online" ? "active" : ""} onClick={() => setMode("online")} role="tab" aria-selected={mode === "online"}>
          <Code2 size={18} /><span>Online tekshirish</span><small>URL orqali</small>
        </button>
        <button className={mode === "offline" ? "active" : ""} onClick={() => setMode("offline")} role="tab" aria-selected={mode === "offline"}>
          <FileCode2 size={18} /><span>Offline tahlil</span><small>Fayl yuklash</small>
        </button>
      </div>

      {mode === "online" ? (
        <section className="cved-workspace">
          <div className="workspace-title"><div className="workspace-icon blue"><Code2 size={22} /></div><div><h2>Online compiler</h2><p>Kod yozish uchun xavfsiz vaqtinchalik havola yarating.</p></div></div>
          <div className="cved-info-grid">
            <div className="cved-info-item"><KeyRound size={18} /><div><strong>Bir martalik havola</strong><span>Har bir sessiya uchun yangi xavfsiz kod</span></div></div>
            <div className="cved-info-item"><ExternalLink size={18} /><div><strong>Tez ulashish</strong><span>Havolani jamoa bilan bir zumda yuboring</span></div></div>
            <div className="cved-info-item"><ShieldCheck size={18} /><div><strong>Izolyatsiyalangan muhit</strong><span>Tekshiruv uchun ajratilgan workspace</span></div></div>
          </div>
          {!url ? (
            <div className="cved-empty-state"><div className="empty-orbit"><Sparkles size={25} /></div><h3>Compiler havolasini yarating</h3><p>Yangi sessiya uchun xavfsiz URL generatsiya qilishni boshlang.</p><button className="cved-primary" onClick={createUrl}>URL yaratish <ExternalLink size={17} /></button></div>
          ) : (
            <div className="generated-url"><div className="url-heading"><div><span className="status-dot" /> Havola tayyor</div><button onClick={() => setUrl("")}><X size={16} /> Tozalash</button></div><div className="url-box"><span>{url}</span><button onClick={copyUrl}>{copied ? <><Check size={16} /> Nusxalandi</> : <><Clipboard size={16} /> Nusxalash</>}</button></div><a href={url} target="_blank" rel="noreferrer" className="cved-secondary">Compiler’ni ochish <ExternalLink size={16} /></a></div>
          )}
        </section>
      ) : (
        <section className="cved-workspace">
          <div className="workspace-title"><div className="workspace-icon violet"><FileCode2 size={22} /></div><div><h2>Offline code audit</h2><p>Fayllarni yuklang va tanlangan tillar bo‘yicha muammolarni ko‘ring.</p></div></div>
          <div className="language-row"><span>Tahlil tili</span>{languages.map((language) => <button key={language} className={selectedLanguages.includes(language) ? "selected" : ""} onClick={() => toggleLanguage(language)}>{language}</button>)}</div>
          <button className="upload-zone" onClick={() => fileInputRef.current?.click()}><div className="upload-icon"><UploadCloud size={24} /></div><div><strong>Fayllarni shu yerga tashlang</strong><span>yoki tanlash uchun bosing · maksimal 25 MB</span></div><Plus size={19} /></button>
          <input ref={fileInputRef} type="file" multiple className="sr-only" accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.txt" onChange={(event) => addFiles(event.target.files)} />
          {files.length > 0 && <div className="file-list">{files.map((file, index) => <div className="file-row" key={`${file.name}-${index}`}><FileText size={18} /><div><strong>{file.name}</strong><span>{formatFileSize(file.size)}</span></div><button onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label={`${file.name} faylini olib tashlash`}><X size={16} /></button></div>)}</div>}
          {isAnalyzed && <div className="audit-result"><div className="result-summary"><div className="result-check"><CheckCircle2 size={22} /></div><div><strong>Tahlil yakunlandi</strong><span>{files.length} ta fayl · {selectedLanguages.length} ta til bo‘yicha</span></div><b>{totalIssues} muammo</b></div><div className="finding-list">{findings.map((finding) => <div className="finding" key={finding.title}><span className={`severity ${finding.severity === "Yuqori" ? "high" : finding.severity === "O'rta" ? "medium" : "low"}`}>{finding.severity}</span><div><strong>{finding.title}</strong><p>{finding.detail}</p></div></div>)}</div></div>}
          <button className="cved-primary full" disabled={!files.length || !selectedLanguages.length || isAnalyzing} onClick={analyzeFiles}>{isAnalyzing ? <><LoaderCircle size={18} className="spin" /> Tahlil qilinmoqda...</> : <><Sparkles size={18} /> {isAnalyzed ? "Qayta tahlil qilish" : "Tahlilni boshlash"}</>}</button>
        </section>
      )}
      <div className="cved-footer-note"><ShieldCheck size={16} /> Sizning ma'lumotlaringiz himoyalangan va uchinchi tomonlarga uzatilmaydi.</div>
    </div>
  );
}
