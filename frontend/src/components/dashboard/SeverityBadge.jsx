import React from 'react';
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

export default function SeverityBadge({ severity }) {
  const config = {
    CRITICAL: {
      bg: "bg-red-500/15 border-red-500/30",
      text: "text-red-400",
      icon: AlertTriangle,
      pulse: true
    },
    HIGH: {
      bg: "bg-orange-500/15 border-orange-500/30",
      text: "text-orange-400",
      icon: AlertCircle,
      pulse: false
    },
    MEDIUM: {
      bg: "bg-amber-500/15 border-amber-500/30",
      text: "text-amber-400",
      icon: Info,
      pulse: false
    },
    LOW: {
      bg: "bg-blue-500/15 border-blue-500/30",
      text: "text-blue-400",
      icon: CheckCircle,
      pulse: false
    }
  };

  const { bg, text, icon: Icon, pulse } = config[severity] || config.MEDIUM;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      bg, text,
      pulse && "animate-pulse"
    )}>
      <Icon className="h-3 w-3" />
      {severity}
    </span>
  );
}