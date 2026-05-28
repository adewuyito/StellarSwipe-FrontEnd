import { useState, useEffect } from 'react';

const NOTIFICATION_ALERTS_KEY = 'stellarswipe:notification-alerts-enabled';

export function useNotificationPreference() {
  const [alertsEnabled, setAlertsEnabled] = useState<boolean | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [deniedMessage, setDeniedMessage] = useState(false);

  useEffect(() => {
    // Load stored preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(NOTIFICATION_ALERTS_KEY);
      setAlertsEnabled(stored ? JSON.parse(stored) : true);

      // Check current permission status
      if ('Notification' in window) {
        setPermissionStatus(Notification.permission);
      }
    }
  }, []);

  const toggleAlerts = (enabled: boolean) => {
    setAlertsEnabled(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem(NOTIFICATION_ALERTS_KEY, JSON.stringify(enabled));
    }
  };

  const showDeniedMessage = () => {
    setDeniedMessage(true);
    setTimeout(() => setDeniedMessage(false), 5000);
  };

  return {
    alertsEnabled: alertsEnabled ?? true,
    toggleAlerts,
    permissionStatus,
    setPermissionStatus,
    deniedMessage,
    showDeniedMessage,
  };
}
