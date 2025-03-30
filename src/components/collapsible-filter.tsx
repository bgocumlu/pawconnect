"use client"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleFilterProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  activeFilterCount?: number
  onReset?: () => void
  defaultExpanded?: boolean
  className?: string
}

export function CollapsibleFilter({
  title,
  icon,
  children,
  activeFilterCount = 0,
  onReset,
  defaultExpanded = false,
  className,
}: CollapsibleFilterProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className={cn("rounded-2xl border-2 shadow-xs hover:shadow-md transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg">
            {icon || <Filter className="h-5 w-5 mr-2 text-primary" />}
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && onReset && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-xs h-7 rounded-full text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 rounded-full h-8 px-3 border-primary/20 hover:bg-primary/10"
            >
              {activeFilterCount > 0 && (
                <Badge
                  variant="default"
                  className="mr-1 rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
              <span className="text-sm">{isExpanded ? "Hide" : "Show"} Filters</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 ml-1 opacity-70" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-70" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && <CardContent className="animate-slide-up">{children}</CardContent>}
    </Card>
  )
}

