import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function SectionHeader({ title, description, icon, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h1 className="text-3xl font-bold mb-2 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h1>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

