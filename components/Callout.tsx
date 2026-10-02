import React from "react";
import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

interface CalloutProps {
  type?: "info" | "tip" | "warning" | "success";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const configs = {
    info: {
      icon: Info,
      bg: "bg-blue-50/60 dark:bg-blue-950/20",
      border: "border-blue-200/80 dark:border-blue-800/40",
      text: "text-blue-900 dark:text-blue-200",
      iconColor: "text-blue-600 dark:text-blue-400",
      defaultTitle: "Note",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-amber-50/60 dark:bg-amber-950/20",
      border: "border-amber-200/80 dark:border-amber-800/40",
      text: "text-amber-950 dark:text-amber-200",
      iconColor: "text-amber-600 dark:text-amber-400",
      defaultTitle: "Tip",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-rose-50/60 dark:bg-rose-950/20",
      border: "border-rose-200/80 dark:border-rose-800/40",
      text: "text-rose-950 dark:text-rose-200",
      iconColor: "text-rose-600 dark:text-rose-400",
      defaultTitle: "Important",
    },
    success: {
      icon: CheckCircle2,
      bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
      border: "border-emerald-200/80 dark:border-emerald-800/40",
      text: "text-emerald-950 dark:text-emerald-200",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      defaultTitle: "Success",
    },
  };

  const config = configs[type] || configs.info;
  const IconComponent = config.icon;

  return (
    <div
      role="note"
      className={`my-6 p-4 rounded-xl border ${config.bg} ${config.border} transition-colors`}
    >
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="space-y-1.5 min-w-0 flex-1">
          <h4 className={`text-sm font-semibold tracking-tight ${config.text}`}>
            {title || config.defaultTitle}
          </h4>
          <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
