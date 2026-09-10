import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { SIDEBAR_WIDTH } from "@/widgets/app-sidebar/model/constants.ts";
import { useSidebarStore } from "@/widgets/app-sidebar/model/store.ts";
import AppSidebar from "@/widgets/app-sidebar/ui";
import AppHeader from "../../widgets/app-header/ui";

export default function AppLayout({ children }: PropsWithChildren) {
  const collapsed = useSidebarStore((state) => state.collapsed);
  const sidebarWidth = collapsed ? 60 : SIDEBAR_WIDTH;

  return (
    <Layout className="transition app-shell bg-lightTest dark:bg-dbody">
      <AppSidebar />
      <ToastContainer />
      <Layout
        style={{ width: `calc(100% - ${sidebarWidth}px)` }}
        className="transition bg-lightTest dark:bg-dbody app-main-layout"
      >
        <AppHeader />
        <Content className="transition">{children}</Content>
      </Layout>
    </Layout>
  );
}
