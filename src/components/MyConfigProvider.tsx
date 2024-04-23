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
        },
        components: {
          Popover: {
            colorBgElevated: "var(--popover-background)",
          },
        },
      }}
      children={children}
    />
  );
}
