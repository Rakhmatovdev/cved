import  { useState, useCallback, useRef } from 'react';
import { Code, Upload, X, Copy, Check, FileCode, Terminal, Plus, ChevronRight, Zap, Sparkles } from 'lucide-react';

// Utility functions
const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const FileTypeSelector = ({ selected, onToggle, onClose, onNext }) => {
  const fileTypes = [
    { id: 'rar', label: 'RAR', icon: '📦' },
    { id: 'zip', label: 'ZIP', icon: '🗜️' },
    { id: 'pdf', label: 'PDF', icon: '📄' },
    { id: 'png', label: 'PNG', icon: '🖼️' },
    { id: 'jpg', label: 'JPG', icon: '📸' },
    { id: 'txt', label: 'TXT', icon: '📝' },
    { id: 'other', label: 'Boshqa', icon: '📁' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">File turini tanlang</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {fileTypes.map(type => (
          <button
            key={type.id}
            onClick={() => onToggle(type.id)}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
              selected.includes(type.id)
                ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">{type.icon}</span>
              <span className="text-white font-medium">{type.label}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={selected.length === 0}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
      >
        Keyingi bosqich <ChevronRight className="inline ml-2" size={20} />
      </button>
    </div>
  );
};

const LanguageSelector = ({ selected, onSelect, onClose, onNext }) => {
  const languages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby',
    'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'Dart', 'R', 'Perl',
    'Haskell', 'Lua', 'Elixir', 'Clojure', 'F#', 'OCaml', 'Julia', 'Crystal',
    'Nim', 'Zig'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Dasturlash tilini tanlang</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className={`p-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
              selected === lang
                ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <span className="text-white font-medium text-sm">{lang}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
      >
        File yuklash <ChevronRight className="inline ml-2" size={20} />
      </button>
    </div>
  );
};

const FileUploadModal = ({ onClose, onUpload }) => {
  const [step, setStep] = useState('fileType');
  const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const toggleFileType = (type) => {
    setSelectedFileTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      onUpload({ files: uploadedFiles, language: selectedLanguage, fileTypes: selectedFileTypes });
      setIsUploading(false);
    }, 2000);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
        <div className="p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
          {step === 'fileType' && (
            <FileTypeSelector
              selected={selectedFileTypes}
              onToggle={toggleFileType}
              onClose={onClose}
              onNext={() => setStep('language')}
            />
          )}

          {step === 'language' && (
            <LanguageSelector
              selected={selectedLanguage}
              onSelect={setSelectedLanguage}
              onClose={onClose}
              onNext={() => setStep('upload')}
            />
          )}

          {step === 'upload' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">File yuklash</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-700 bg-gray-800/50'
                }`}
              >
                <Upload className="mx-auto mb-4 text-cyan-500" size={48} />
                <p className="text-white font-medium mb-2">Faylni bu yerga tashlang</p>
                <p className="text-gray-400 text-sm mb-4">yoki</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors"
                >
                  File tanlang
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Yuklangan fayllar:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                      <span className="text-white text-sm truncate flex-1">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-3 text-red-400 hover:text-red-300"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploadedFiles.length === 0 || isUploading}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
              >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Yuklanmoqda...
                  </span>
                ) : (
                  'Yuklash'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CompilerCard = ({ onClose }) => {
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUrl = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const code = generateRandomCode();
      const url = `https://nextleap.app/online-compiler/c-programming/${code}`;
      setGeneratedUrl(url);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full border border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Compiler Interface</h2>
                <p className="text-gray-400 text-sm">Online dasturlash muhiti</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-cyan-500" size={24} />
                <h3 className="text-lg font-semibold text-white">URL Generator</h3>
              </div>
              
              <button
                onClick={generateUrl}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                    <span>URL generatsiya qilinmoqda...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap size={20} />
                    URL yaratish
                  </span>
                )}
              </button>
            </div>

            {generatedUrl && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Sparkles className="text-cyan-500" size={20} />
                    Yaratilgan URL
                  </h4>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check size={18} />
                        <span className="text-sm font-medium">Nusxalandi!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span className="text-sm font-medium">Nusxalash</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-cyan-300 break-all border border-cyan-500/20">
                  {generatedUrl}
                </div>

                <div className="mt-4 flex gap-3">
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
                  >
                    Ochish
                  </a>
                </div>
              </div>
            )}

            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                💡 Har safar yangi 10 honali random kod yaratiladi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClaudeAICard = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Salom! Men sizga dasturlash va file tahlil qilishda yordam beraman.' }
  ]);
  const [input, setInput] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'File tahlili uchun yuqoridagi + tugmasini bosing va kerakli fayllarni yuklang.'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileUpload = (data) => {
    setShowFileModal(false);
    setMessages(prev => [...prev, {
      role: 'user',
      content: `${data.files.length} ta fayl yuklandi (${data.language})`
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Fayllar muvaffaqiyatli yuklandi! ${data.language} tilida ${data.files.length} ta fayl tahlil qilinmoqda...`
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col border border-purple-500/30">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
                <p className="text-gray-400 text-sm">Dasturlash yordamchisi</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-3">
            <button
              onClick={() => setShowFileModal(true)}
              className="px-4 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-all border border-gray-600 hover:border-purple-500"
            >
              <Plus size={24} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Xabar yozing..."
                className="w-full px-6 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Yuborish
            </button>
          </div>
        </div>
      </div>

      {showFileModal && (
        <FileUploadModal
          onClose={() => setShowFileModal(false)}
          onUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default function CreativeCardInterface() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-8">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.9);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        .card-container {
          animation: float 6s ease-in-out infinite;
        }
        
        .card-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Creative Interface Hub
          </h1>
          <p className="text-gray-400 text-lg">Ikki xil interaktiv interfeys tanlang</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Card 1 - Compiler */}
          <div className="card-container">
            <div
              onClick={() => setActiveCard('compiler')}
              className="group relative bg-gradient-to-br from-blue-900/40 via-cyan-900/40 to-blue-900/40 rounded-3xl p-8 border-2 border-blue-500/30 hover:border-cyan-400 transition-all duration-500 cursor-pointer transform hover:scale-105 card-glow overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                  <Code className="text-white" size={40} />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 text-center">Compiler Interface</h3>
                <p className="text-gray-300 text-center mb-6">
                  Online dasturlash muhiti va random URL generator
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-cyan-300">
                    <Zap size={20} />
                    <span>10 honali random kod</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-300">
                    <FileCode size={20} />
                    <span>URL generatsiya</span>
                  </div>
                  <div className="flex items-center gap-3 text-cyan-300">
                    <Copy size={20} />
                    <span>Nusxalash imkoniyati</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                    Ochish →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - AI Assistant */}
          <div className="card-container" style={{ animationDelay: '0.5s' }}>
            <div
              onClick={() => setActiveCard('ai')}
              className="group relative bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-purple-900/40 rounded-3xl p-8 border-2 border-purple-500/30 hover:border-pink-400 transition-all duration-500 cursor-pointer transform hover:scale-105 card-glow overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="text-white" size={40} />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 text-center">AI Assistant</h3>
                <p className="text-gray-300 text-center mb-6">
                  Claude AI ga o'xshagan interfeys va file upload
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-pink-300">
                    <Terminal size={20} />
                    <span>Chat interfeys</span>
                  </div>
                  <div className="flex items-center gap-3 text-pink-300">
                    <Upload size={20} />
                    <span>Drag & Drop file upload</span>
                  </div>
                  <div className="flex items-center gap-3 text-pink-300">
                    <FileCode size={20} />
                    <span>Multiple file types</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold group-hover:shadow-lg group-hover:shadow-pink-500/50 transition-all">
                    Ochish →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {activeCard === 'compiler' && <CompilerCard onClose={() => setActiveCard(null)} />}
      {activeCard === 'ai' && <ClaudeAICard onClose={() => setActiveCard(null)} />}
    </div>
  );
} 