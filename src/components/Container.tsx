import { CSSProperties, ReactNode } from "react";

export default function Container({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`container mx-auto px-2 md:px-10 lg:px-20 ${
        className ?? ""
      }`}
      style={style ? style : {}}
    >
      {children}
    </div>
  );
}
