import { Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { SendDataItem } from "@/pages/dashboard/type";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const data: SendDataItem[] = [
  { name: "08:00", year2024: 18, year2025: 24 },
  { name: "10:00", year2024: 32, year2025: 41 },
  { name: "12:00", year2024: 28, year2025: 37 },
  { name: "14:00", year2024: 48, year2025: 59 },
  { name: "16:00", year2024: 42, year2025: 54 },
  { name: "18:00", year2024: 57, year2025: 68 },
  { name: "20:00", year2024: 39, year2025: 62 }
];

const SendService: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  return (
    <div className="dashboard-card p-4 transition w-full">
      <div className="space-y-2 mb-4">
        <h2 className="text-xl 2xl:text-2xl transition font-semibold mb-2 text-grayed dark:text-white ">
          {t("statics.queue_flow", "Web service queue")}
        </h2>
        <div className="flex justify-between">
          <CustomBadge>{t("statics.in_real")}</CustomBadge>

          <Flex gap={8}>
            <CustomBadge
              indicator={true}
              indicatorColor="#FCA860"
              variant="transparent"
              className="text-sm text-secondary transition"
            >
                {t("statics.previous_period", "Previous period")}
            </CustomBadge>

            <CustomBadge
              indicator={true}
              indicatorColor="#8B54FF"
              variant="transparent"
              className="text-sm text-secondary transition"
            >
                {t("statics.current_period", "Current period")}
            </CustomBadge>
          </Flex>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="grad2024" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B54FF" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#8B54FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad2025" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            horizontal={false}
            vertical={true}
            stroke={isDarkMode ? "#3B415B" : "#E9E9E9"}
            style={{ transition: "stroke 0.4s ease-in-out" }}
          />
          <XAxis
            dataKey="name"
            className="mt-10"
            axisLine={{ stroke: isDarkMode ? "#3B415B" : "#E9E9E9" }}
            tickLine={false}
            tick={{ fill: isDarkMode ? "#878787" : "#878787", fontSize: 12 }}
            style={{ transition: "all 0.4s ease-in-out" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12, textAnchor: "start" }}
            tickFormatter={(value) =>
              typeof value === "number"
                ? value >= 1000
                  ? `${value / 1000}K`
                  : `${value}K`
                : value
            }
            style={{ transform: "translateX(-32px)" }}
          />
          <Tooltip
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out"
            }}
          />
          <Area
            type="monotone"
            dataKey="year2024"
            stroke="#8B54FF"
            fill="url(#grad2024)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="year2025"
            stroke="#F59E0B"
            fill="url(#grad2025)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SendService;
