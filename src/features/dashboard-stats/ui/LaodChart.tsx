import { useTranslation } from "react-i18next";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const ServerLoadChart = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const data = [
    { time: "00:00", arrivals: 34 }, { time: "03:00", arrivals: 22 }, { time: "06:00", arrivals: 48 },
    { time: "09:00", arrivals: 71 }, { time: "12:00", arrivals: 96 }, { time: "15:00", arrivals: 83 },
    { time: "18:00", arrivals: 112 }, { time: "21:00", arrivals: 91 }, { time: "23:59", arrivals: 104 }
  ];
  const latest = data[data.length - 1].arrivals;
  const locale = i18n.language === "uz" ? "uz-UZ" : i18n.language === "en" ? "en-US" : "ru-RU";

  return (
    <div className="dashboard-card w-full h-full">
      <div className="p-5 space-y-2">
        <h2 className="text-xl 2xl:text-2xl font-semibold text-[var(--cved-ink)] dark:text-white">{t("statics.hourly_flow", "Hourly visitor flow")}</h2>
        <CustomBadge variant="info">{t("statics.realtime", "Real time")}</CustomBadge>
        <div className="text-4xl font-bold mt-4 text-[var(--cved-blue)] dark:text-white">{latest.toLocaleString(locale)}<span className="text-sm text-[var(--cved-muted)] ml-2 font-medium">{t("statics.last_hour", "visitors in the last hour")}</span></div>
      </div>
      <div className="w-full h-[290px] px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 22, right: 16, left: -12, bottom: 6 }}>
            <defs><linearGradient id="visitorFlowGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563EB" stopOpacity={0.38} /><stop offset="100%" stopColor="#2563EB" stopOpacity={0.03} /></linearGradient></defs>
            <CartesianGrid vertical={false} stroke={isDarkMode ? "#26344A" : "#E9EEF5"} strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: isDarkMode ? "#9AAAC1" : "#667085", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: isDarkMode ? "#9AAAC1" : "#667085", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
            <Tooltip contentStyle={{ background: isDarkMode ? "#121D30" : "#fff", border: `1px solid ${isDarkMode ? "#26344A" : "#E4E9F0"}`, borderRadius: 9 }} labelStyle={{ color: isDarkMode ? "#EEF4FF" : "#162033" }} formatter={(value: number) => [`${value} ${t("statics.guest")}`, t("statics.arrivals")]}/>
            <Area type="monotone" dataKey="arrivals" stroke="#2563EB" strokeWidth={3} fill="url(#visitorFlowGradient)" activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ServerLoadChart;
