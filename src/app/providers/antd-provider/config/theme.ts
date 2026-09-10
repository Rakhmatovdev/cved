import { ThemeConfig, theme } from "antd";

export const antdTheme = (dark: boolean): ThemeConfig => ({
  algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2563EB",
    colorInfo: "#2563EB",
    colorSuccess: "#0F9F8F",
    colorWarning: "#D97706",
    colorError: "#D92D20",
    colorText: dark ? "#EEF4FF" : "#162033",
    colorTextSecondary: dark ? "#9AAAC1" : "#667085",
    colorBgBase: dark ? "#0B1220" : "#F5F7FB",
    colorBgContainer: dark ? "#121D30" : "#FFFFFF",
    colorBorder: dark ? "#26344A" : "#E4E9F0",
    borderRadius: 10,
    fontFamily: '"Onest", "Roboto", sans-serif'
  },
  components: {
    Notification: {
      borderRadiusLG: 12
    },
    Modal: {
      headerBg: dark ? "#121D30" : "#fff",
      titleColor: dark ? "#EEF4FF" : "#162033",
      titleFontSize: 20,
      borderRadiusLG: 16
    },
    Table: {
      headerBg: dark ? "#17253A" : "#F8FAFC",
      headerColor: dark ? "#B7C5D9" : "#667085",
      rowHoverBg: dark ? "#17253A" : "#F8FBFF",
      borderColor: dark ? "#26344A" : "#E4E9F0"
    },
    Button: {
      primaryShadow: "none",
      controlHeight: 40,
      borderRadius: 10
    },
    Input: {
      activeBorderColor: "#2563EB",
      hoverBorderColor: "#7EA6FF",
      activeShadow: "0 0 0 3px rgba(37, 99, 235, 0.12)"
    }
  }
});
