import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const DonutChart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useDarkMode();
  const data = useMemo(() => [
    { name: t("statics.foreigners"), value: 44, color: "#2563EB" },
    { name: t("statics.local"), value: 28, color: "#0F9F8F" },
    { name: t("statics.arrived"), value: 18, color: "#D97706" },
    { name: t("statics.departed"), value: 10, color: "#7C3AED" }
  ], [t, i18n.language]);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const locale = i18n.language === "uz" ? "uz-UZ" : i18n.language === "en" ? "en-US" : "ru-RU";

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card p-5">
      <div className="space-y-2 mb-2">
        <h2 className="text-xl 2xl:text-2xl font-semibold text-[var(--cved-ink)] dark:text-white">{t("statics.visitor_mix", "Visitor mix")}</h2>
        <CustomBadge variant="info">{t("statics.last_30_days", "Last 30 days")}</CustomBadge>
      </div>
      <div className="relative w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius="57%" outerRadius="80%" paddingAngle={3} dataKey="value" stroke="none" cornerRadius={5}>
              {data.map((item) => <Cell key={item.name} fill={item.color} />)}
            </Pie>
            <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 31, fontWeight: 700, fill: isDarkMode ? "#EEF4FF" : "#162033" }}>{total}%</text>
            <text x="50%" y="61%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 11, fill: isDarkMode ? "#9AAAC1" : "#667085" }}>{t("statics.guest")}</text>
            <Tooltip contentStyle={{ background: isDarkMode ? "#121D30" : "#fff", border: `1px solid ${isDarkMode ? "#26344A" : "#E4E9F0"}`, borderRadius: 9, color: isDarkMode ? "#EEF4FF" : "#162033" }} formatter={(value: number) => [`${value.toLocaleString(locale)}%`]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        {data.map((item) => <div key={item.name} className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 truncate text-[var(--cved-muted)]"><i className="size-2 rounded-full" style={{ background: item.color }} />{item.name}</span><strong className="text-[var(--cved-ink)] dark:text-white">{item.value}%</strong></div>)}
      </div>
      <p className="mt-4 text-xs text-[var(--cved-muted)]">{total}% {t("statics.total_guest", "of tracked visitors")}</p>
    </motion.div>
  );
};

export default DonutChart;
