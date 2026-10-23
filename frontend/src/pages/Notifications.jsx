import React, { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Visit Reminder',
      title: 'Upcoming Scheduled Visit: Sita Devi',
      message: 'Maternal ANC Checkup scheduled for today at 10:30 AM.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 2,
      type: 'Follow-up Alert',
      title: 'Overdue Follow-up: Sanjay Rawat',
      message: 'TB medication adherence checkup was due on 2025-02-20.',
      time: '3 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'System Announcement',
      title: 'Monthly Vaccination Drive Scheduled',
      message: 'Pulse polio and routine MR drive starts this Thursday at Sector 4 Sub-centre.',
      time: '1 day ago',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            System alerts, reminders for scheduled visits, and patient surveillance notices.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            You have no notifications at this time.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                item.read ? 'bg-white' : 'bg-emerald-50/30'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.read
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-emerald-100 text-emerald-600 font-bold'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {item.type}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600">{item.message}</p>
                  <p className="text-[11px] text-slate-400">{item.time}</p>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={() => markRead(item.id)}
                  className="shrink-0 text-xs font-semibold text-emerald-600 hover:text-emerald-800"
                >
                  Mark read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
