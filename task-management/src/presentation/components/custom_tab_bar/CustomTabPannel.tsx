import React from "react";

function CustomTabPannel({
  children,
  index,
  value,
}: {
  children: React.ReactNode;
  index: number;
  value: number;
}) {
  return <>{value === index && <>{children}</>}</>;
}

export default CustomTabPannel;
