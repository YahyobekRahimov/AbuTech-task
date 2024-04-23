import { ConfigProvider } from "antd";
import { ReactNode } from "react";

export default function MyConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E50914",
          colorText: "var(--text)",
          colorIcon: "var(--text)",
          colorTextBase: "var(--text)",
          colorIconHover: "var(--text)",
        },
        components: {
          Popover: {
            colorBgElevated: "var(--popover-background)",
          },
          Input: {
            colorBgContainer: "var(--input-background)",
            colorText: "var(--text)",
            colorTextPlaceholder: "var(--text-placeholder)",
          },
          Button: {
            defaultBg: "var(--default-button-background)",
          },
          Pagination: {
            colorBgContainer: "var(--pagination-background)",
          },
          Select: {
            colorBgContainer: "var(--pagination-background)",
          },
        },
      }}
      children={children}
    />
  );
}
