import React from 'react';
import { AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import { cn } from "@/lib/utils";

const actionabilityConfig = {
  ACTION_REQUIRED: {
    label: 'Action Required',
    icon: AlertOctagon,
    className: 'bg-red-500/20 text-red-300 border-red-500/30'
  },
  ACTION_MAY_BE_REQUIRED: {
    label: 'Action May Be Required',
    icon: AlertTriangle,
    className: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  INFORMATIONAL: {
    label: 'Informational',
    icon: Info,
    className: 'bg-slate-500/20 text-slate-300 border-slate-600'
  }
};

export default function ActionabilityBadge({ actionability }) {
  const config = actionabilityConfig[actionability] || actionabilityConfig.INFORMATIONAL;
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border",
      config.className
    )}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}