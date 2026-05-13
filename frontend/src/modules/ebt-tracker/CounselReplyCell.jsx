import React from "react";
import { Badge } from "./Badge.jsx";

export function CounselReplyCell({ parties }) {
  if (!parties?.length) {
    return <span className="ebt-muted">—</span>;
  }

  return (
    <div className="ebt-counsel-stack">
      {parties.map((p) => (
        <div key={p.id} className="ebt-counsel-line">
          <span className="ebt-counsel-label">{p.label}</span>
          <span className="ebt-counsel-meta">
            {p.lastReplyDate ? <Badge tone="date">{p.lastReplyDate}</Badge> : <span className="ebt-muted">—</span>}
            <Badge tone={p.replyStatus === "Responded" ? "ok" : "warn"}>{p.replyStatus}</Badge>
          </span>
        </div>
      ))}
    </div>
  );
}
