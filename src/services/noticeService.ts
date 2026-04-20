import { Notice } from '@/types';
import { v4 as uuidv4 } from 'uuid';

class NoticeService {
  getAllNotices(data: { notices: Notice[] }): Notice[] {
    const now = new Date();
    return [...data.notices]
      .filter(n => !n.validUntil || new Date(n.validUntil) >= now)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getNoticeById(data: { notices: Notice[] }, id: string): Notice | undefined {
    return data.notices.find(n => n.id === id);
  }

  addNotice(data: { notices: Notice[] }, notice: Omit<Notice, 'id' | 'createdAt'>): Notice {
    const newNotice: Notice = {
      ...notice,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    data.notices.push(newNotice);
    return newNotice;
  }

  deleteNotice(data: { notices: Notice[] }, id: string): boolean {
    const index = data.notices.findIndex(n => n.id === id);
    if (index === -1) return false;
    data.notices.splice(index, 1);
    return true;
  }
}

export const noticeService = new NoticeService();