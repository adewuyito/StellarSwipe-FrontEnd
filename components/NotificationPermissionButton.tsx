"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestNotificationPermission } from "@/lib/notifications";
import { useNotificationPreference } from "@/hooks/useNotificationPreference";

export function NotificationPermissionButton() {
  const [isRequesting, setIsRequesting] = useState(false);
  const { permissionStatus, setPermissionStatus, deniedMessage, showDeniedMessage } =
    useNotificationPreference();

  if (permissionStatus === "granted" || permissionStatus === "denied") {
    if (deniedMessage && permissionStatus === "denied") {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-600">
          <Bell size={14} />
          <span>Notifications are disabled. Check your browser settings to enable.</span>
          <button onClick={() => showDeniedMessage()} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      );
    }
    return null;
  }

  const handleEnableNotifications = async () => {
    setIsRequesting(true);
    try {
      const permission = await requestNotificationPermission();
      setPermissionStatus(permission);
      if (permission === "denied") {
        showDeniedMessage();
      }
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Button
      onClick={handleEnableNotifications}
      disabled={isRequesting}
      variant="outline"
      size="sm"
      aria-label="Enable notifications"
    >
      <Bell size={16} className="mr-1" />
      Enable Notifications
    </Button>
  );
}
