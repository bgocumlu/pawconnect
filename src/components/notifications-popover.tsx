"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { notifications } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length)

  const markAllAsRead = () => {
    setUnreadCount(0)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full h-10 w-10 flex items-center justify-center"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 rounded-xl" sideOffset={8}>
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3 pt-4 px-4">
            <div className="flex items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-3 py-1 rounded-full"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <CardDescription>You have {unreadCount} unread notifications</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[60vh] overflow-auto p-0">
            <div className="flex flex-col">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/30",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="" />
                        <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{notification.name}</span> {notification.content}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">No notifications</div>
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

