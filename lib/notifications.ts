export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission !== 'default') {
    return Notification.permission;
  }

  return await Notification.requestPermission();
}

export function canShowNotification(): boolean {
  return 'Notification' in window && Notification.permission === 'granted';
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (canShowNotification()) {
    new Notification(title, options);
  }
}
