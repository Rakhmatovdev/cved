import  { useState, useCallback, useRef } from 'react';
import { Code, Upload, X, Copy, Check, FileCode, Terminal, Plus, ChevronRight, Zap, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

// Error database for each programming language
// const translations = {
//   uz: {
//     title: "Creative Interface Hub",
//     subtitle: "Ikki xil interaktiv interfeys tanlang",
//     compiler: {
//       title: "Compiler Interface",
//       desc: "Online dasturlash muhiti va random URL generator",
//       features: ["10 honali random kod", "URL generatsiya", "Nusxalash imkoniyati"],
//       button: "Ochish →",
//       modalTitle: "Compiler Interface",
//       modalDesc: "Online dasturlash muhiti",
//       urlGenerator: "URL Generator",
//       generate: "URL yaratish",
//       generating: "URL generatsiya qilinmoqda...",
//       generatedUrl: "Yaratilgan URL",
//       copy: "Nusxalash",
//       copied: "Nusxalandi!",
//       open: "Ochish",
//       info: "💡 Har safar yangi 10 honali random kod yaratiladi"
//     },
//     ai: {
//       title: "AI Assistant",
//       desc: "Claude AI ga o'xshagan interfeys va file upload",
//       features: ["Chat interfeys", "Drag & Drop file upload", "Multiple file types"],
//       button: "Ochish →",
//       modalTitle: "AI Assistant",
//       modalDesc: "Dasturlash yordamchisi",
//       welcome: "Salom! Men sizga dasturlash va file tahlil qilishda yordam beraman.",
//       placeholder: "Xabar yozing...",
//       send: "Yuborish",
//       fileHelp: "File tahlili uchun yuqoridagi + tugmasini bosing va kerakli fayllarni yuklang.",
//       filesUploaded: "ta fayl yuklandi",
//       analyzing: "Fayllar muvaffaqiyatli yuklandi! Tanlangan tillarda tahlil qilinmoqda..."
//     },
//     fileType: {
//       title: "File turini tanlang",
//       next: "Keyingi bosqich"
//     },
//     language: {
//       title: "Dasturlash tillarini tanlang",
//       subtitle: "Bir nechta til tanlash mumkin",
//       selected: "Tanlangan:",
//       count: "ta til",
//       next: "File yuklash"
//     },
//     upload: {
//       title: "File yuklash",
//       dragDrop: "Faylni bu yerga tashlang",
//       or: "yoki",
//       selectFile: "File tanlang",
//       uploaded: "Yuklangan fayllar:",
//       button: "Yuklash va tahlil qilish",
//       analyzing: "Tahlil qilinmoqda..."
//     },
//     errors: {
//       title: "Error Analysis",
//       subtitle: "Tanlangan tillarda topilgan xatolar",
//       found: "ta xato topildi",
//       solution: "Yechim:",
//       close: "Yopish"
//     }
//   },
//   en: {
//     title: "Creative Interface Hub",
//     subtitle: "Choose between two interactive interfaces",
//     compiler: {
//       title: "Compiler Interface",
//       desc: "Online programming environment and random URL generator",
//       features: ["10-digit random code", "URL generation", "Copy capability"],
//       button: "Open →",
//       modalTitle: "Compiler Interface",
//       modalDesc: "Online programming environment",
//       urlGenerator: "URL Generator",
//       generate: "Generate URL",
//       generating: "Generating URL...",
//       generatedUrl: "Generated URL",
//       copy: "Copy",
//       copied: "Copied!",
//       open: "Open",
//       info: "💡 A new 10-digit random code is generated each time"
//     },
//     ai: {
//       title: "AI Assistant",
//       desc: "Claude AI-like interface with file upload",
//       features: ["Chat interface", "Drag & Drop file upload", "Multiple file types"],
//       button: "Open →",
//       modalTitle: "AI Assistant",
//       modalDesc: "Programming assistant",
//       welcome: "Hello! I can help you with programming and file analysis.",
//       placeholder: "Type a message...",
//       send: "Send",
//       fileHelp: "Click the + button above to upload files for analysis.",
//       filesUploaded: "files uploaded",
//       analyzing: "Files uploaded successfully! Analyzing in selected languages..."
//     },
//     fileType: {
//       title: "Select file type",
//       next: "Next step"
//     },
//     language: {
//       title: "Select programming languages",
//       subtitle: "Multiple selection available",
//       selected: "Selected:",
//       count: "languages",
//       next: "Upload files"
//     },
//     upload: {
//       title: "Upload files",
//       dragDrop: "Drop files here",
//       or: "or",
//       selectFile: "Select files",
//       uploaded: "Uploaded files:",
//       button: "Upload and analyze",
//       analyzing: "Analyzing..."
//     },
//     errors: {
//       title: "Error Analysis",
//       subtitle: "Errors found in selected languages",
//       found: "errors found",
//       solution: "Solution:",
//       close: "Close"
//     }
//   },
//   ru: {
//     title: "Creative Interface Hub",
//     subtitle: "Выберите один из двух интерактивных интерфейсов",
//     compiler: {
//       title: "Compiler Interface",
//       desc: "Онлайн среда программирования и генератор случайных URL",
//       features: ["10-значный случайный код", "Генерация URL", "Возможность копирования"],
//       button: "Открыть →",
//       modalTitle: "Compiler Interface",
//       modalDesc: "Онлайн среда программирования",
//       urlGenerator: "Генератор URL",
//       generate: "Создать URL",
//       generating: "Генерация URL...",
//       generatedUrl: "Сгенерированный URL",
//       copy: "Копировать",
//       copied: "Скопировано!",
//       open: "Открыть",
//       info: "💡 Каждый раз генерируется новый 10-значный случайный код"
//     },
//     ai: {
//       title: "AI Assistant",
//       desc: "Интерфейс похожий на Claude AI с загрузкой файлов",
//       features: ["Чат-интерфейс", "Drag & Drop загрузка", "Множество типов файлов"],
//       button: "Открыть →",
//       modalTitle: "AI Assistant",
//       modalDesc: "Помощник программиста",
//       welcome: "Здравствуйте! Я помогу вам с программированием и анализом файлов.",
//       placeholder: "Напишите сообщение...",
//       send: "Отправить",
//       fileHelp: "Нажмите кнопку + выше, чтобы загрузить файлы для анализа.",
//       filesUploaded: "файлов загружено",
//       analyzing: "Файлы успешно загружены! Анализируется на выбранных языках..."
//     },
//     fileType: {
//       title: "Выберите тип файла",
//       next: "Следующий шаг"
//     },
//     language: {
//       title: "Выберите языки программирования",
//       subtitle: "Доступен множественный выбор",
//       selected: "Выбрано:",
//       count: "языков",
//       next: "Загрузить файлы"
//     },
//     upload: {
//       title: "Загрузка файлов",
//       dragDrop: "Перетащите файлы сюда",
//       or: "или",
//       selectFile: "Выберите файлы",
//       uploaded: "Загруженные файлы:",
//       button: "Загрузить и анализировать",
//       analyzing: "Анализируется..."
//     },
//     errors: {
//       title: "Анализ ошибок",
//       subtitle: "Ошибки найдены в выбранных языках",
//       found: "ошибок найдено",
//       solution: "Решение:",
//       close: "Закрыть"
//     }
//   }
// };

const languageErrors = {
  JavaScript: [
    { error: "Uncaught ReferenceError: variable is not defined", solution: "O'zgaruvchini ishlatishdan oldin 'let', 'const' yoki 'var' bilan e'lon qiling" },
    { error: "TypeError: Cannot read property of undefined", solution: "Optional chaining (?.) operatoridan foydalaning yoki null check qo'shing" },
    { error: "SyntaxError: Unexpected token", solution: "Syntax xatolarini tekshiring, qavs va tirnoqlarni to'g'ri yoping" }
  ],
  Python: [
    { error: "IndentationError: unexpected indent", solution: "Kod bloklarida bir xil indent (4 space yoki 1 tab) ishlating" },
    { error: "NameError: name 'x' is not defined", solution: "O'zgaruvchini ishlatishdan oldin e'lon qiling" },
    { error: "TypeError: unsupported operand type(s)", solution: "Ma'lumot turlarini to'g'ri konvertatsiya qiling (int(), str(), float())" },
    { error: "KeyError: dictionary key not found", solution: ".get() metodidan foydalaning yoki 'in' operatori bilan tekshiring" }
  ],
  Java: [
    { error: "NullPointerException", solution: "Obyektni ishlatishdan oldin null emasligini tekshiring: if (obj != null)" },
    { error: "ArrayIndexOutOfBoundsException", solution: "Array uzunligini tekshiring: if (index < array.length)" },
    { error: "ClassNotFoundException", solution: "Classpath sozlamalarini tekshiring va kutubxona qo'shilganligini tasdiqlang" }
  ],
  'C++': [
    { error: "Segmentation fault (core dumped)", solution: "Pointer va arraylarni to'g'ri ishlating, memory leak tekshiring" },
    { error: "undefined reference to function", solution: "Header filelarni include qiling va linking to'g'ri bo'lganini tekshiring" },
    { error: "error: no matching function for call", solution: "Funksiya parametrlarini to'g'ri kiriting, tip mosligini tekshiring" },
    { error: "memory leak detected", solution: "delete yoki free() bilan xotirani tozalang, smart pointerlar ishlating" }
  ],
  'C#': [
    { error: "NullReferenceException", solution: "Null-conditional operator (?.) yoki null check qo'shing" },
    { error: "IndexOutOfRangeException", solution: "Collection uzunligini tekshiring: if (index < list.Count)" },
    { error: "DivideByZeroException", solution: "Bo'lishdan oldin denominatorni tekshiring: if (divisor != 0)" }
  ],
  TypeScript: [
    { error: "Type 'string' is not assignable to type 'number'", solution: "To'g'ri tip annotatsiyalaridan foydalaning yoki type casting qiling" },
    { error: "Object is possibly 'undefined'", solution: "Optional chaining (?.) yoki type guard ishlating" },
    { error: "Cannot find module", solution: "npm install bilan modulni o'rnating va import path to'g'ri ekanini tekshiring" }
  ],
  PHP: [
    { error: "Parse error: syntax error, unexpected", solution: "Semicolon (;) va qavs sintaksisini tekshiring" },
    { error: "Fatal error: Call to undefined function", solution: "Funksiya mavjudligini tekshiring yoki require/include qo'shing" },
    { error: "Notice: Undefined variable", solution: "O'zgaruvchini ishlatishdan oldin isset() yoki empty() bilan tekshiring" },
    { error: "Warning: Division by zero", solution: "Bo'lishdan oldin: if ($divisor != 0) shartini qo'shing" }
  ],
  Ruby: [
    { error: "NoMethodError: undefined method", solution: "Obyekt tipini tekshiring va metod mavjudligini tasdiqlang" },
    { error: "NameError: uninitialized constant", solution: "Class yoki module to'g'ri require qilinganligini tekshiring" },
    { error: "TypeError: no implicit conversion", solution: ".to_s, .to_i, .to_f metodlari bilan konvertatsiya qiling" }
  ],
  Go: [
    { error: "panic: runtime error: index out of range", solution: "Slice uzunligini tekshiring: if index < len(slice)" },
    { error: "undefined: variable", solution: "O'zgaruvchini to'g'ri e'lon qiling: var x int yoki x := 10" },
    { error: "cannot use type X as type Y", solution: "Type conversion qiling: targetType(value)" }
  ],
  Rust: [
    { error: "error: borrow of moved value", solution: "Clone() metodidan foydalaning yoki reference (&) ishlating" },
    { error: "error: cannot borrow as mutable", solution: "O'zgaruvchini 'mut' bilan e'lon qiling: let mut x = ..." },
    { error: "thread panicked at 'index out of bounds'", solution: ".get() metodidan foydalaning: vec.get(index)" },
    { error: "lifetime parameter required", solution: "Lifetime annotation qo'shing: fn foo<'a>(x: &'a str)" }
  ],
  Swift: [
    { error: "Fatal error: Index out of range", solution: "Array bounds tekshiring: if index < array.count" },
    { error: "Value of optional type unwrapped", solution: "Optional binding ishlating: if let value = optional" },
    { error: "Type mismatch error", solution: "To'g'ri tip annotatsiyasidan foydalaning yoki type casting qiling" }
  ],
  Kotlin: [
    { error: "NullPointerException", solution: "Safe call operator (?.) yoki Elvis operator (?:) ishlating" },
    { error: "Type mismatch: inferred type is X but Y was expected", solution: "To'g'ri tip konvertatsiyasidan foydalaning" },
    { error: "Unresolved reference", solution: "Import statementlarni tekshiring va dependency qo'shilganligini tasdiqlang" }
  ],
  Scala: [
    { error: "NullPointerException", solution: "Option[T] tipidan foydalaning: Some(value) yoki None" },
    { error: "type mismatch", solution: "To'g'ri tip annotatsiyalari va implicit conversion qo'shing" },
    { error: "value is not a member of type", solution: "Import va extension metodlarni tekshiring" }
  ],
  Dart: [
    { error: "NoSuchMethodError", solution: "Metod mavjudligini tekshiring yoki null safety qo'shing" },
    { error: "RangeError: Index out of range", solution: "List uzunligini tekshiring: if (index < list.length)" },
    { error: "Type 'X' is not a subtype of type 'Y'", solution: "To'g'ri type casting qiling: as operatoridan foydalaning" }
  ],
  R: [
    { error: "Error: object not found", solution: "O'zgaruvchini to'g'ri e'lon qiling va assignment operatoridan (<-) foydalaning" },
    { error: "subscript out of bounds", solution: "Vector yoki matrix indekslarini tekshiring" },
    { error: "non-numeric argument to binary operator", solution: "Ma'lumot tipini tekshiring: as.numeric() ishlating" }
  ],
  Perl: [
    { error: "Global symbol requires explicit package name", solution: "'my', 'our' yoki 'local' bilan o'zgaruvchi e'lon qiling" },
    { error: "Undefined subroutine called", solution: "Funksiya nomini to'g'ri yozing va sub keyword bilan e'lon qiling" },
    { error: "Can't use string as HASH ref", solution: "Reference tiplarini to'g'ri ishlating: \\% yoki {}" }
  ],
  Haskell: [
    { error: "parse error on input", solution: "Indentatsiya va sintaksisni tekshiring, do notation to'g'ri ishlating" },
    { error: "Couldn't match expected type", solution: "Type signature to'g'ri yozing va funksiya return tipini tekshiring" },
    { error: "Not in scope: variable", solution: "Import modullarni qo'shing yoki o'zgaruvchi e'lon qiling" },
    { error: "Infinite type error", solution: "Rekursiv tip ta'riflarini tekshiring va type annotation qo'shing" }
  ],
  Lua: [
    { error: "attempt to index a nil value", solution: "O'zgaruvchini ishlatishdan oldin nil emasligini tekshiring" },
    { error: "attempt to call a nil value", solution: "Funksiya mavjudligini va to'g'ri nomlanganligini tekshiring" },
    { error: "table index is nil", solution: "Table keylarini tekshiring va to'g'ri assign qiling" }
  ],
  Elixir: [
    { error: "FunctionClauseError: no function clause matching", solution: "Pattern matching clauselarini tekshiring va barcha holatlarni qo'shing" },
    { error: "ArgumentError", solution: "Funksiya argumentlarini to'g'ri kiriting va tiplarni tekshiring" },
    { error: "KeyError: key not found", solution: "Map.get() metodidan foydalaning yoki default value bering" }
  ],
  Clojure: [
    { error: "Unable to resolve symbol", solution: "Namespace to'g'ri require qilinganligini tekshiring" },
    { error: "ClassCastException", solution: "Ma'lumot tiplarini to'g'ri cast qiling" },
    { error: "ArityException: Wrong number of args", solution: "Funksiya parametrlar sonini tekshiring" }
  ],
  'F#': [
    { error: "Type mismatch error", solution: "To'g'ri tip annotatsiyalari va type inference ishlating" },
    { error: "Value restriction error", solution: "Type parameterlarni explicit yozing" },
    { error: "Incomplete pattern matches", solution: "Barcha pattern matching holatlarini qo'shing" }
  ],
  OCaml: [
    { error: "Unbound value", solution: "O'zgaruvchi yoki funksiyani to'g'ri e'lon qiling" },
    { error: "Type mismatch", solution: "Tip annotatsiyalarini tekshiring va to'g'rilang" },
    { error: "Pattern matching is not exhaustive", solution: "Barcha mumkin bo'lgan holatlarni qo'shing yoki wildcard (_) ishlating" }
  ],
  Julia: [
    { error: "UndefVarError: variable not defined", solution: "O'zgaruvchini ishlatishdan oldin e'lon qiling" },
    { error: "MethodError: no method matching", solution: "Funksiya signature va parametr tiplarini tekshiring" },
    { error: "BoundsError: attempt to access beyond array", solution: "Array indekslarini tekshiring va bounds check qo'shing" }
  ],
  Crystal: [
    { error: "undefined method for class", solution: "Metod mavjudligini tekshiring yoki to'g'ri include qiling" },
    { error: "no overload matches", solution: "Parametr tiplarini to'g'rilang va overload ta'riflarini tekshiring" },
    { error: "type must be", solution: "Type casting yoki explicit type qo'shing" }
  ],
  Nim: [
    { error: "undeclared identifier", solution: "O'zgaruvchini 'var', 'let' yoki 'const' bilan e'lon qiling" },
    { error: "type mismatch", solution: "To'g'ri type conversion qiling: int(), float(), string()" },
    { error: "index out of bounds", solution: "Sequence uzunligini tekshiring: if index < seq.len" }
  ],
  Zig: [
    { error: "use of undeclared identifier", solution: "O'zgaruvchini ishlatishdan oldin e'lon qiling" },
    { error: "index out of bounds", solution: "Array/slice uzunligini tekshiring" },
    { error: "type mismatch", solution: "Explicit type casting qiling: @intCast(), @floatCast()" },
    { error: "unreachable code", solution: "Control flow logikasini tekshiring va unreachable olib tashlang" }
  ]
};

const FileTypeSelector = ({ selected, onToggle, onClose, onNext ,onUpload}) => {
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
              <span className="text-3xl" onDoubleClick={onUpload}>{type.icon}</span>
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

  const toggleLanguage = (lang) => {
    onSelect(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Dasturlash tillarini tanlang</h3>
          <p className="text-sm text-gray-400 mt-1">Bir nechta til tanlash mumkin</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => toggleLanguage(lang)}
            className={`p-3 rounded-lg border-2 transition-all transform hover:scale-105 ${
              selected.includes(lang)
                ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/30'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <span className="text-white font-medium text-sm">{lang}</span>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <p className="text-sm text-gray-300">
            Tanlangan: <span className="text-purple-400 font-semibold">{selected.length}</span> ta til
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={selected.length === 0}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
      >
        File yuklash <ChevronRight className="inline ml-2" size={20} />
      </button>
    </div>
  );
};

const ErrorAnalysisModal = ({ languages, onClose }) => {
  const getRandomErrors = (lang) => {
    const errors = languageErrors[lang] || [];
    const count = Math.floor(Math.random() * 2) + 2; // 2-3 ta error
    const shuffled = [...errors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, errors.length));
  };

  const [analyzedErrors] = useState(() => {
    return languages.reduce((acc, lang) => {
      acc[lang] = getRandomErrors(lang);
      return acc;
    }, {});
  });

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-red-500/30">
        <div className="p-6 border-b border-gray-700 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Error Analysis</h2>
                <p className="text-gray-400 text-sm">Tanlangan tillarda topilgan xatolar</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar space-y-6">
          {languages.map((lang) => (
            <div key={lang} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Code className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">{lang}</h3>
                <span className="ml-auto text-sm text-gray-400">
                  {analyzedErrors[lang].length} ta xato topildi
                </span>
              </div>

              <div className="space-y-4">
                {analyzedErrors[lang].map((err, errIdx) => (
                  <div key={errIdx} className="bg-gray-900/70 rounded-lg p-4 border-l-4 border-red-500">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={20} />
                      <div className="flex-1">
                        <div className="font-mono text-red-400 text-sm mb-3 bg-black/50 p-3 rounded">
                          {err.error}
                        </div>
                        <div className="flex items-start gap-2 bg-green-500/10 p-3 rounded border border-green-500/30">
                          <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                          <div>
                            <p className="text-xs text-green-400 font-semibold mb-1">Yechim:</p>
                            <p className="text-sm text-gray-300">{err.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-900/50">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};

const FileUploadModal = ({ onClose, onUpload }) => {
  const [step, setStep] = useState('fileType');
  const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
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
      setIsUploading(false);
      setShowErrors(true);
    }, 2000);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
          <div className="p-6 overflow-y-auto max-h-[90vh] custom-scrollbar">
            {step === 'fileType' && (
              <FileTypeSelector
                selected={selectedFileTypes}
                onToggle={toggleFileType}
                onClose={onClose}
                onUpload={() => onUpload(uploadedFiles)}
                onNext={() => setStep('language')}
              />
            )}

            {step === 'language' && (
              <LanguageSelector
                selected={selectedLanguages}
                onSelect={setSelectedLanguages}
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
                      Tahlil qilinmoqda...
                    </span>
                  ) : (
                    'Yuklash va tahlil qilish'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showErrors && (
        <ErrorAnalysisModal
          languages={selectedLanguages}
          onClose={() => {
            setShowErrors(false);
            onClose();
          }}
        />
      )}
    </>
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
                
                <h3 className="text-3xl font-bold text-white mb-4 text-center">Bevosita (ONLINE) tekshirish</h3>
                <p className="text-gray-300 text-center mb-6">
                  Online dasturlash muhiti
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-cyan-300">
                    <Zap size={20} />
                    <span>Dasturlash</span>
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
                
                <h3 className="text-3xl font-bold text-white mb-4 text-center">Bilvosita (OFFLINE ) tekshirish</h3>
                <p className="text-gray-300 text-center mb-6">
                  AI Asistant interfeys va file upload
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-pink-300">
                    <Terminal size={20} />
                    <span>Chat interfeys</span>
                  </div>
                  <div className="flex items-center gap-3 text-pink-300">
                    <Upload size={20} />
                    <span>Fayl yuklash</span>
                  </div>
                  <div className="flex items-center gap-3 text-pink-300">
                    <FileCode size={20} />
                    <span>Turli fayl turlari</span>
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
const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
