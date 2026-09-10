import { useTranslation } from "react-i18next";
import {
  CountryChartRecharts,
  DaysLivedApexChart,
  DonutChart,
  Maxmin,
  SendService,
  ServerLoadApexChart,
  UzCountry
} from "@/features/dashboard-stats";
import CustomBadge from "@/shared/ui/CustomBadge";
import TeamIcon from "@/shared/ui/icons/dashboard/TeamIcon.tsx";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const numberLocale = i18n.language === "uz" ? "uz-UZ" : i18n.language === "en" ? "en-US" : "ru-RU";

  const summary = [
    { id: "online", name: t("statics.online_now", "Online now"), value: 1284, status: t("statics.realtime", "Real time"), color: "#2563EB", live: true },
    { id: "arrivals", name: t("statics.arrivals", "Arrivals today"), value: 8462, status: t("statics.arrived", "Arrived today"), color: "#0F9F8F" },
    { id: "departures", name: t("statics.departures", "Departures today"), value: 7816, status: t("statics.departed", "Departed today"), color: "#D97706" },
    { id: "records", name: t("statics.records_today", "Records this month"), value: 24936, status: t("statics.total", "Total this month"), color: "#7C3AED" }
  ];

  const countryData = [
    { name: t("statics.country_kazakhstan"), value: 213 }, { name: t("statics.country_russia"), value: 456 },
    { name: t("statics.country_france"), value: 567 }, { name: t("statics.country_sweden"), value: 678 },
    { name: t("statics.country_canada"), value: 789 }, { name: t("statics.country_croatia"), value: 890 }, { name: t("statics.country_china"), value: 522 }
  ];
  const countryData2 = [
    { name: t("statics.country_tajikistan"), value: 1231 }, { name: t("statics.country_kyrgyzstan"), value: 1102 },
    { name: t("statics.country_turkmenistan"), value: 968 }, { name: t("statics.country_azerbaijan"), value: 756 },
    { name: t("statics.country_belarus"), value: 621 }, { name: t("statics.country_armenia"), value: 514 }
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">CVED / {t("breadcrumb.dashboard", "Dashboard")}</p>
          <h1>{t("statics.dashboard_overview", "Dashboard overview")}</h1>
          <p>{t("statics.dashboard_subtitle", "Monitor arrivals, departures and hotel activity in one place.")}</p>
        </div>
        <CustomBadge variant="info">{t("statics.realtime", "Real time")}</CustomBadge>
      </section>

      <section className="dashboard-stat-grid" aria-label={t("statics.dashboard_overview", "Dashboard overview")}>
        {summary.map((item) => (
          <article className="dashboard-summary-card" key={item.id}>
            <div className="dashboard-summary-glow" style={{ backgroundColor: item.color }} />
            <div className="dashboard-summary-top">
              <div className="dashboard-summary-icon" style={{ color: item.color }}><TeamIcon strokeColor={item.color} height={18} /></div>
              {item.live && <span className="dashboard-live"><i /> {t("statics.live", "Live")}</span>}
            </div>
            <p className="dashboard-summary-label">{item.name}</p>
            <strong>{item.value.toLocaleString(numberLocale)}</strong>
            <span className="dashboard-summary-status">{item.status}</span>
          </article>
        ))}
      </section>

      <Maxmin />

      <section className="dashboard-grid dashboard-grid-three">
        <CountryChartRecharts title={t("statics.top_active_10")} description={<CustomBadge variant="default">{t("statics.hotel_mvd")}</CustomBadge>} data={countryData} barColor={["#2563EB", "#7EA6FF"]} />
        <CountryChartRecharts title={t("statics.state10")} description={<CustomBadge variant="default">{t("statics.hotel_mvd")}</CustomBadge>} data={countryData2} barColor={["#0F9F8F", "#74D8C7"]} />
        <DonutChart />
      </section>

      <section className="dashboard-grid dashboard-grid-two"><ServerLoadApexChart /><DaysLivedApexChart /></section>
      <section className="dashboard-grid dashboard-grid-two"><UzCountry /><SendService /></section>
    </main>
  );
};

export default Dashboard;
