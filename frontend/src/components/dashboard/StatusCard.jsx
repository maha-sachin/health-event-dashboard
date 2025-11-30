import React from 'react';
import { cn } from "@/lib/utils";

export default function StatusCard({ title, count, icon: Icon, variant = "default", subtitle }) {
  const variants = {
    critical: "bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20",
    warning: "bg-gradient-to-br from-amber-500/10 to-orange-600/5 border-amber-500/20",
    info: "bg-gradient-to-br from-blue-500/10 to-indigo-600/5 border-blue-500/20",
    success: "bg-gradient-to-br from-emerald-500/10 to-green-600/5 border-emerald-500/20",
    default: "bg-gradient-to-br from-slate-500/10 to-slate-600/5 border-slate-500/20"
  };

  const iconVariants = {
    critical: "text-red-500 bg-red-500/10",
    warning: "text-amber-500 bg-amber-500/10",
    info: "text-blue-500 bg-blue-500/10",
    success: "text-emerald-500 bg-emerald-500/10",
    default: "text-slate-400 bg-slate-500/10"
  };

  const countVariants = {
    critical: "text-red-400",
    warning: "text-amber-400",
    info: "text-blue-400",
    success: "text-emerald-400",
    default: "text-slate-300"
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02]",
      variants[variant]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <p className={cn("mt-2 text-3xl font-bold tracking-tight", countVariants[variant])}>
            {count}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className={cn("rounded-lg p-2.5", iconVariants[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}