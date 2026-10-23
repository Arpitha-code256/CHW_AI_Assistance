import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, Plus, X } from 'lucide-react';
import { followUps as initialFollowUps } from '../data/healthOperations';

const FOLLOW_UPS_STORAGE_KEY = 'chwFollowUps';

function getToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function getStatus(item) {
  if (item.status === 'Completed') return 'Completed';
  return item.dueDate < getToday() ? 'Overdue' : 'Pending';
}

export default function FollowUps() {
  const [followups, setFollowups] = useState(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(FOLLOW_UPS_STORAGE_KEY) || 'null');
      return Array.isArray(stored) ? stored : initialFollowUps;
    } catch {
      return initialFollowUps;
    }
  });
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ memberName: '', reason: '', dueDate: getToday(), worker: '' });

  useEffect(() => {
    window.localStorage.setItem(FOLLOW_UPS_STORAGE_KEY, JSON.stringify(followups));
  }, [followups]);

  const addFollowUp = (event) => {
    event.preventDefault();
    setFollowups((current) => [{ ...formData, id: Date.now(), status: 'Pending' }, ...current]);
    setFormData({ memberName: '', reason: '', dueDate: getToday(), worker: '' });
    setFormOpen(false);
  };

  const markCompleted = (id) => {
    setFollowups((current) => current.map((item) => item.id === id ? { ...item, status: 'Completed' } : item));
  };

  const pendingCount = followups.filter((item) => getStatus(item) === 'Pending').length;
  const overdueCount = followups.filter((item) => getStatus(item) === 'Overdue').length;
  const completedCount = followups.filter((item) => getStatus(item) === 'Completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Patient Follow-ups</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track pending, completed, and overdue health surveillance tasks for vulnerable patients.
          </p>
        </div>

        <button onClick={() => setFormOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs">
          <Plus className="w-4 h-4" />
          <span>New Follow-up</span>
        </button>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form onSubmit={addFollowUp} className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">New follow-up</h2>
              <button type="button" onClick={() => setFormOpen(false)} aria-label="Close" className="text-slate-500 hover:text-slate-800"><X className="h-5 w-5" /></button>
            </div>
            <label className="block text-sm font-medium text-slate-700">Community member
              <input required maxLength="100" value={formData.memberName} onChange={(event) => setFormData({ ...formData, memberName: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">Follow-up reason
              <textarea required maxLength="500" rows="3" value={formData.reason} onChange={(event) => setFormData({ ...formData, reason: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">Due date
                <input required type="date" value={formData.dueDate} onChange={(event) => setFormData({ ...formData, dueDate: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="block text-sm font-medium text-slate-700">Assigned worker
                <input required maxLength="100" value={formData.worker} onChange={(event) => setFormData({ ...formData, worker: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Add follow-up</button>
            </div>
          </form>
        </div>
      )}

      {/* Summary Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Tasks</p>
            <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
          </div>
          <Clock className="w-6 h-6 text-amber-500" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Overdue Reminders</p>
            <p className="text-2xl font-bold text-rose-600">{overdueCount}</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-rose-500" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Completed</p>
            <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      {/* Follow-up List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {followups.map((item) => {
            const status = getStatus(item);
            return (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{item.memberName}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : status === 'Overdue'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                    {status === 'Overdue' && <AlertTriangle className="w-3 h-3" />}
                    {status === 'Pending' && <Clock className="w-3 h-3" />}
                    {status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{item.reason}</p>
                <p className="text-[11px] text-slate-400">
                  Due by <span className="font-medium text-slate-700">{item.dueDate}</span> • Assigned to {item.worker}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {status !== 'Completed' && (
                  <button onClick={() => markCompleted(item.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors">
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
