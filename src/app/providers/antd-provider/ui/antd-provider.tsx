import { App, ConfigProvider } from "antd";
import useApp from "antd/es/app/useApp";
// i18n.js or locale.js
import dayjs from "dayjs";
import { PropsWithChildren, useEffect } from "react";
import { antdTheme } from "@/app/providers/antd-provider/config/theme";
import { setNotificationApi } from "@/shared/lib/notification.ts";
import useDarkMode from "@/utils/hooks/useDarkMode.tsx";
import "dayjs/locale/ru";
import "dayjs/locale/uz";
import "dayjs/locale/en";

// Antd locales
import ruRU from "antd/locale/ru_RU";
import uzUZ from "antd/locale/uz_UZ";
import enUS from "antd/locale/en_US";
import { useTranslation } from "react-i18next";

export const antdLocales = {
  ru: ruRU,
  uz: uzUZ,
  en: enUS
};

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    dayjs.locale(i18n.language === "en" ? "en" : i18n.language);
  }, [i18n.language]);

  return (
    <ConfigProvider
      theme={antdTheme(isDarkMode)}
      locale={antdLocales[i18n.language as keyof typeof antdLocales] ?? uzUZ}
    >
      <App>
        <AntdBridge>{children}</AntdBridge>
      </App>
    </ConfigProvider>
  );
};

const AntdBridge = ({ children }: PropsWithChildren) => {
  const { notification } = useApp();
  setNotificationApi(notification);
  return children;
};
