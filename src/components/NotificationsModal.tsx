import React, { useState } from 'react';
import { PortalNotification } from '../types';
import {
  Bell,
  CheckCircle2,
  Calendar,
  FolderOpen,
  MessageSquare,
  AlertTriangle,
  X,
  Check,
} from 'lucide-react';

interface NotificationsModalProps {
  notifications: PortalNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
}) => {
  const [filter, setFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (filter === 'ALL') return true;
    return n.category === filter;
  });

  const getCategoryIcon = (cat: PortalNotification['category']) => {
    switch (cat) {
      case 'جدول':
        return Calendar;
      case 'مكتبة':
        return FolderOpen;
      case 'مجتمع':
        return MessageSquare;
      case 'تأخير':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#DCE7FA] shadow-2xl animate-in zoom-in-95 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB]">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0A4CB3]" />
            <h2 className="text-base font-extrabold text-[#0F2342]">مركز الإشعارات الجامعية</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1 text-xs">
            {['ALL', 'جدول', 'مكتبة', 'مجتمع', 'تأخير'].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  filter === c
                    ? 'bg-[#0A4CB3] text-white'
                    : 'bg-[#F8FBFF] text-[#64748B] hover:text-[#0F2342]'
                }`}
              >
                {c === 'ALL' ? 'الكل' : c}
              </button>
            ))}
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-[#0A4CB3] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>تعليم الكل كمقروء</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = getCategoryIcon(item.category);
              const isLate = item.category === 'تأخير';
              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                    !item.isRead
                      ? 'bg-[#F8FBFF] border-[#DCE7FA]'
                      : 'bg-white border-slate-100 opacity-80'
                  }`}
                >
                  {/* Dot */}
                  <div className="mt-1.5 shrink-0">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        !item.isRead
                          ? isLate
                            ? 'bg-[#E53935]'
                            : 'bg-[#0A4CB3]'
                          : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-extrabold ${
                          isLate ? 'text-[#E53935]' : 'text-[#0F2342]'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-[#94A3B8] font-mono tabular-nums">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[#475569] leading-relaxed">{item.details}</p>
                    <span className="inline-block text-[10px] font-bold text-[#6B7A90]">
                      تصنيف: {item.category}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-[#6B7A90]">لا توجد إشعارات حالياً</div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F2342] text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          إغلاق النافذة
        </button>
      </div>
    </div>
  );
};
