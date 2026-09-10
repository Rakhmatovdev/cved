import { useTranslation } from "react-i18next";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useDarkMode from "@/utils/hooks/useDarkMode";

const DaysLivedApexChart = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const data = [
    { name: t("month.january"), arrivals: 10000, departures: 8200 }, { name: t("month.february"), arrivals: 12500, departures: 9400 },
    { name: t("month.march"), arrivals: 14800, departures: 11700 }, { name: t("month.april"), arrivals: 18100, departures: 14200 },
    { name: t("month.may"), arrivals: 22400, departures: 18700 }, { name: t("month.june"), arrivals: 25800, departures: 21100 },
    { name: t("month.july"), arrivals: 29100, departures: 24600 }, { name: t("month.august"), arrivals: 32400, departures: 27800 },
    { name: t("month.september"), arrivals: 35700, departures: 30100 }, { name: t("month.october"), arrivals: 38800, departures: 33400 },
    { name: t("month.november"), arrivals: 41600, departures: 36100 }, { name: t("month.december"), arrivals: 45200, departures: 39800 }
  ];
  const growth = (((data[data.length - 1].arrivals - data[0].arrivals) / data[0].arrivals) * 100).toFixed(1);
  const locale = i18n.language === "uz" ? "uz-UZ" : i18n.language === "en" ? "en-US" : "ru-RU";
  return (
    <div className="dashboard-card p-5 w-full">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div><h2 className="text-xl 2xl:text-2xl font-semibold text-[var(--cved-ink)] dark:text-white mb-2">{t("statics.monthly_flow", "Monthly visitor flow")}</h2><p className="text-xs text-[var(--cved-muted)]">{t("statics.last_12_months", "Last 12 months")}</p><p className="text-xs mt-2 font-semibold text-[var(--cved-teal)]">+{growth}% {t("statics.growth", "growth")}</p></div>
        <div className="flex gap-3"><span className="flex items-center gap-1.5 text-xs text-[var(--cved-muted)]"><i className="size-2 rounded-full bg-[#2563EB]" />{t("statics.arrivals")}</span><span className="flex items-center gap-1.5 text-xs text-[var(--cved-muted)]"><i className="size-2 rounded-full bg-[#0F9F8F]" />{t("statics.departures")}</span></div>
      </div>
      <ResponsiveContainer width="100%" height={345}>
        <AreaChart data={data} margin={{ top: 18, right: 18, left: 0, bottom: 0 }}>
          <defs><linearGradient id="monthlyArrivals" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563EB" stopOpacity={.35} /><stop offset="100%" stopColor="#2563EB" stopOpacity={.02} /></linearGradient><linearGradient id="monthlyDepartures" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0F9F8F" stopOpacity={.3} /><stop offset="100%" stopColor="#0F9F8F" stopOpacity={.02} /></linearGradient></defs>
          <CartesianGrid stroke={isDarkMode ? "#26344A" : "#E9EEF5"} vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: isDarkMode ? "#9AAAC1" : "#667085", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: isDarkMode ? "#9AAAC1" : "#667085", fontSize: 11 }} tickFormatter={(value) => `${value / 1000}K`} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: isDarkMode ? "#121D30" : "#fff", border: `1px solid ${isDarkMode ? "#26344A" : "#E4E9F0"}`, borderRadius: 9 }} labelStyle={{ color: isDarkMode ? "#EEF4FF" : "#162033" }} formatter={(value: number, name: string) => [value.toLocaleString(locale), name === "arrivals" ? t("statics.arrivals") : t("statics.departures")]} />
          <Area type="monotone" dataKey="arrivals" stroke="#2563EB" strokeWidth={3} fill="url(#monthlyArrivals)" />
          <Area type="monotone" dataKey="departures" stroke="#0F9F8F" strokeWidth={3} fill="url(#monthlyDepartures)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DaysLivedApexChart;
