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
        },
      }}
      children={children}
    />
  );
}
