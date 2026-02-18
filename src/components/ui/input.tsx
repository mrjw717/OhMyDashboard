import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-[hsl(var(--text-muted))] selection:bg-primary selection:text-primary-foreground h-10 w-full min-w-0 rounded-xl border border-transparent bg-[radial-gradient(circle_at_18%_0%,hsl(var(--bg-secondary))/92%,hsl(var(--bg-primary))/72%)] px-3.5 py-2 text-sm text-[hsl(var(--text-primary))] shadow-[inset_0_0_0_1px_hsl(var(--border)/0.5),0_10px_30px_-26px_hsl(var(--ring)/0.4)] transition-[color,box-shadow,border,background] outline-none backdrop-blur-[3px] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
        "dark:bg-[radial-gradient(circle_at_30%_10%,hsl(var(--bg-primary))/60%,hsl(var(--bg-secondary))/35%)] dark:shadow-[inset_0_0_0_1px_hsl(var(--border)/0.35),0_14px_36px_-30px_hsl(var(--ring)/0.6)]",
        "hover:bg-[radial-gradient(circle_at_18%_0%,hsl(var(--bg-secondary))/98%,hsl(var(--bg-primary))/78%)] dark:hover:bg-[radial-gradient(circle_at_25%_10%,hsl(var(--bg-primary))/70%,hsl(var(--bg-secondary))/40%)]",
        "hover:shadow-[inset_0_0_0_1px_hsl(var(--border)/0.75),0_18px_38px_-28px_hsl(var(--ring)/0.45)]",
        "focus-visible:bg-[radial-gradient(circle_at_18%_0%,hsl(var(--bg-secondary))/100%,hsl(var(--bg-primary))/85%)] dark:focus-visible:bg-[radial-gradient(circle_at_28%_18%,hsl(var(--bg-primary))/75%,hsl(var(--bg-secondary))/45%)]",
        "focus-visible:-translate-y-0.5 focus-visible:shadow-[inset_0_0_0_1px_hsl(var(--ring)/0.55),0_20px_52px_-26px_hsl(var(--ring)/0.55),0_0_34px_-12px_hsl(var(--ring)/0.45)] dark:focus-visible:shadow-[inset_0_0_0_1px_hsl(var(--ring)/0.5),0_22px_56px_-28px_hsl(var(--ring)/0.65),0_0_38px_-14px_hsl(var(--ring)/0.5)]",
        "aria-invalid:shadow-[inset_0_0_0_1px_hsl(var(--color-error)),0_12px_34px_-24px_hsl(var(--color-error)/0.4)] aria-invalid:ring-[hsl(var(--color-error))]/25 dark:aria-invalid:ring-[hsl(var(--color-error))]/35",
        className
      )}
      {...props}
    />
  )
}

export { Input }
