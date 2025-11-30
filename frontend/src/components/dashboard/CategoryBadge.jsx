import React from 'react';
import { cn } from "@/lib/utils";
import { Zap, Calendar, Bell } from 'lucide-react';

export default function CategoryBadge({ category }) {
  const config = {
    issue: {
      bg: "bg-red-500/10 border-red-500/20",
      text: "text-red-400",
      icon: Zap,
      label: "Issue"
    },
    scheduledChange: {
      bg: "bg-blue-500/10 border-blue-500/20",
      text: "text-blue-400",
      icon: Calendar,
      label: "Scheduled"
    },
    accountNotification: {
      bg: "bg-slate-500/10 border-slate-500/20",
      text: "text-slate-400",
      icon: Bell,
      label: "Notification"
    }
  };

  const { bg, text, icon: Icon, label } = config[category] || config.issue;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
      bg, text
    )}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}