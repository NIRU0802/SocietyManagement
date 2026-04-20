import { Notification } from '@/types';
import { v4 as uuidv4 } from 'uuid';

class NotificationService {
  getAllNotifications(data: { notifications: Notification[] }): Notification[] {
    return [...data.notifications].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getUnreadCount(data: { notifications: Notification[] }): number {
    return data.notifications.filter(n => !n.read).length;
  }

  addNotification(data: { notifications: Notification[] }, notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: uuidv4(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    data.notifications.unshift(newNotification);
    return newNotification;
  }

  markAsRead(data: { notifications: Notification[] }, id: string): Notification | undefined {
    const index = data.notifications.findIndex(n => n.id === id);
    if (index === -1) return undefined;
    data.notifications[index] = {
      ...data.notifications[index],
      read: true,
    };
    return data.notifications[index];
  }

  markAllAsRead(data: { notifications: Notification[] }): void {
    data.notifications.forEach(n => {
      n.read = true;
    });
  }

  deleteNotification(data: { notifications: Notification[] }, id: string): boolean {
    const index = data.notifications.findIndex(n => n.id === id);
    if (index === -1) return false;
    data.notifications.splice(index, 1);
    return true;
  }
}

export const notificationService = new NotificationService();