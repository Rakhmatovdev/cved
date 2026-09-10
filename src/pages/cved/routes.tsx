import { ErrorWrapper } from "@/features/error-wrapper.tsx";
import { Permissions } from "@/shared/config/permissions/permissions.ts";
import { CustomRoute } from "@/shared/types";
import KoggIcon from "@/shared/ui/icons/sidebar/KoggIcon.tsx";
import CVED from "./index.tsx";

const cvedRoutes: CustomRoute = {
  id: "cved",
  path: "/cved",
  // element: <Kogg />,
  errorElement: <ErrorWrapper />,
  handle: {
    title: "breadcrumb.cved",
    icon: (props) => <KoggIcon {...props} />,
    permissions: [Permissions.AllowAll]
  },
  children: [
    {
      index: true,
      handle: {
        noBreadCrumb: true,
      
      },
      element: <CVED />
    },
  ]
};
export default cvedRoutes;