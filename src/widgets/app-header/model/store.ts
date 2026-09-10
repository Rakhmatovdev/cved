import { create } from "zustand";
import i18n from "@/i18n";

interface Lang {
  lang: string;
}
interface LangActions {
  setLang: (lang: string) => void;
  reset: () => void;
}

const savedLanguage = localStorage.getItem("i18nextLng")?.slice(0, 2);
const initialState: Lang = {
  lang: savedLanguage && ["uz", "ru", "en"].includes(savedLanguage) ? savedLanguage : "uz"
};

export const useCurrentLang = create<Lang & LangActions>()((set) => ({
  ...initialState,
  setLang: (lang) => {
    set({ lang });
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  },
  reset: () => set({ ...initialState })
}));
