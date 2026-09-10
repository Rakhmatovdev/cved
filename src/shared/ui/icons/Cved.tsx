import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
import type { ReactElement } from "react";

const CvedSvg = (): ReactElement => (
  <svg
    width="120"
    height="40"
    viewBox="0 0 120 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Aylantirilgan C */}
    <text
      x="56"
      y="34"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="31"
      fontWeight="700"
      fill="#3276FF"
      transform="rotate(180 48 22)"
    >
      C
    </text>

    {/* Yonidagi VED */}
    <text
      x="39"
      y="32"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="30"
      fontWeight="700"
      fill="white"
    >
      VED
    </text>
  </svg>
);

export default function CvedIcon(
  props: Partial<CustomIconComponentProps>
): ReactElement {
  return <Icon component={CvedSvg} {...props} />;
}
