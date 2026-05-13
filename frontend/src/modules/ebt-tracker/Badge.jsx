import React from "react";

export function Badge({ children, tone = "neutral" }) {
  return <span className={`ebt-badge ebt-badge--${tone}`}>{children}</span>;
}
