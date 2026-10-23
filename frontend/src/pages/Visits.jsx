import React, { useEffect, useState } from 'react';
import { Clock, Plus, CheckCircle2, XCircle, X } from 'lucide-react';
import { visits as initialVisits } from '../data/healthOperations';

const VISITS_STORAGE_KEY = 'chwVisits';

export default function Visits() {
  const [filter, setFilter] = useState('All');
  const [visits, setVisits] = useState(() => {
    try {
      const storedVisits = JSON.parse(window.localStorage.getItem(VISITS_STORAGE_KEY) || 'null');
      return Array.isArray(storedVisits) ? storedVisits : initialVisits;
    } catch {
      return initialVisits;
    }
  });
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newVisit, setNewVisit] = useState({
    memberName: '',
    date: '',
    time: '',
    visitType: '',
    worker: '',
  });

  useEffect(() => {
    window.localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(visits));
  }, [visits]);

  const scheduleVisit = (event) => {
    event.preventDefault();
    setVisits((currentVisits) => [
      { ...newVisit, id: Date.now(), status: 'Scheduled' },
      ...currentVisits,
    ]);
    setNewVisit({ memberName: '', date: '', time: '', visitType: '', worker: '' });
    setShowScheduleForm(false);
  };

  const updateVisitStatus = (visitId, status) => {
    setVisits((currentVisits) =>
      currentVisits.map((visit) => (visit.id === visitId ? { ...visit, status } : visit)),
    );
  };

  const filteredVisits = filter === 'All' ? visits : visits.filter((v) => v.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Home & Sector Visits</h1>
          <p className="text-sm text-slate-600 mt-1">
            Schedule, manage, and record household visits conducted by frontline workers.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {showScheduleForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form onSubmit={scheduleVisit} className="w-full max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Schedule a visit</h2>
              <button type="button" onClick={() => setShowScheduleForm(false)} aria-label="Close" className="text-slate-500 hover:text-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Community member
              <input required value={newVisit.memberName} onChange={(event) => setNewVisit({ ...newVisit, memberName: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Visit type
              <input required value={newVisit.visitType} onChange={(event) => setNewVisit({ ...newVisit, visitType: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium text-slate-700">
                Date
                <input required type="date" value={newVisit.date} onChange={(event) => setNewVisit({ ...newVisit, date: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Time
                <input required type="time" value={newVisit.time} onChange={(event) => setNewVisit({ ...newVisit, time: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Assigned worker
              <input required value={newVisit.worker} onChange={(event) => setNewVisit({ ...newVisit, worker: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowScheduleForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Add scheduled visit</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {['All', 'Scheduled', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === tab
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="p-3.5">Community Member</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Visit Type</th>
                <th className="p-3.5">Assigned Worker</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No visits recorded for status "{filter}".
                  </td>
                </tr>
              ) : (
                filteredVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-semibold text-slate-900">{visit.memberName}</td>
                    <td className="p-3.5 text-slate-500">
                      {visit.date} at {visit.time}
                    </td>
                    <td className="p-3.5">{visit.visitType}</td>
                    <td className="p-3.5 text-slate-600">{visit.worker}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          visit.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : visit.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {visit.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                        {visit.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                        {visit.status === 'Scheduled' && <Clock className="w-3 h-3" />}
                        {visit.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <select
                        aria-label={`Status for ${visit.memberName}`}
                        value={visit.status}
                        onChange={(event) => updateVisitStatus(visit.id, event.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        {['Scheduled', 'Completed', 'Cancelled'].map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
