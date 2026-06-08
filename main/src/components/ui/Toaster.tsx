"use client";

import { useToastStore } from "@/lib/store/toast";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colorMap = {
  success: "border-green-500/30 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
  error: "border-red-500/30 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
  info: "border-blue-500/30 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
};

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => {
        const Icon = iconMap[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg",
              colorMap[t.type],
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <p className="text-sm font-medium">{t.message}</p>
            <button
              onClick={() => remove(t.id)}
              className="ml-2 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
