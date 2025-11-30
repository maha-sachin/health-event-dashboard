import React from 'react';
import { cn } from "@/lib/utils";

export default function EnvironmentBadge({ environment }) {
  const config = {
    PRD: "bg-red-500/20 text-red-300 border-red-500/30",
    NPR: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    DEV: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    SANDBOX: "bg-slate-500/20 text-slate-300 border-slate-500/30"
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded px-2 py-0.5 text-xs font-bold border",
      config[environment] || config.DEV
    )}>
      {environment}
    </span>
  );
}