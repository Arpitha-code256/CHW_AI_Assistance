import React, { useEffect, useState } from 'react';
import { Download, Users, CheckCircle2, Clock, FileText, Printer } from 'lucide-react';
import {
  appointments as initialAppointments,
  followUps as initialFollowUps,
  readHealthRecords,
  readMembers,
  visits as initialVisits,
} from '../data/healthOperations';

const STORAGE_KEYS = {
  appointments: 'chwAppointments',
  followUps: 'chwFollowUps',
  visits: 'chwVisits',
};

function readStoredArray(key, fallback) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(key) || 'null');
    return Array.isArray(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function readReportData() {
  return {
    members: readMembers(),
    visits: readStoredArray(STORAGE_KEYS.visits, initialVisits),
    appointments: readStoredArray(STORAGE_KEYS.appointments, initialAppointments),
    followUps: readStoredArray(STORAGE_KEYS.followUps, initialFollowUps),
    records: readHealthRecords(),
  };
}

function getLocalDate(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function getRangeStart(range) {
  const today = new Date();
  if (range === 'This Month') return getLocalDate(new Date(today.getFullYear(), today.getMonth(), 1));
  if (range === 'This Week') {
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return getLocalDate(monday);
  }
  return '';
}

function getReportRows(data) {
  return [
    ...data.members.map((member) => ({ type: 'Member', member: member.name, date: '', status: 'Registered', details: '', assigned: '', location: '' })),
    ...data.visits.map((visit) => ({ type: 'Home visit', member: visit.memberName, date: visit.date, status: visit.status, details: visit.visitType, assigned: visit.worker, location: '' })),
    ...data.appointments.map((appointment) => ({ type: 'Appointment', member: appointment.memberName, date: appointment.date, status: appointment.status, details: appointment.purpose, assigned: appointment.provider, location: appointment.location })),
    ...data.followUps.map((item) => ({ type: 'Follow-up', member: item.memberName, date: item.dueDate, status: item.status, details: item.reason, assigned: item.worker, location: '' })),
    ...data.records.map((record) => ({
      type: 'Health record',
      member: record.memberName,
      date: record.date,
      status: 'Recorded',
      details: [record.symptoms, record.bp && `BP: ${record.bp}`, record.sugar && `Sugar: ${record.sugar}`, record.weight && `Weight: ${record.weight}`, record.medication && `Medication: ${record.medication}`].filter(Boolean).join('; '),
      assigned: record.worker,
      location: '',
    })),
  ].filter((row) => row.member);
}

function escapeCsv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

export default function Reports() {
  const [timeRange, setTimeRange] = useState('All Time');
  const [data, setData] = useState(readReportData);

  useEffect(() => {
    const refresh = () => setData(readReportData());
    window.addEventListener('storage', refresh);
    window.addEventListener('chw:members-updated', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('chw:members-updated', refresh);
    };
  }, []);

  const rangeStart = getRangeStart(timeRange);
  const inRange = (item, dateField = 'date') => !rangeStart || !item[dateField] || item[dateField] >= rangeStart;
  const visits = data.visits.filter((item) => inRange(item));
  const appointments = data.appointments.filter((item) => inRange(item));
  const followUps = data.followUps.filter((item) => inRange(item, 'dueDate'));
  const records = data.records.filter((item) => inRange(item));
  const reportRows = getReportRows(data).filter((row) => !rangeStart || !row.date || row.date >= rangeStart);
  const today = getLocalDate(new Date());
  const completedVisits = visits.filter((item) => item.status === 'Completed').length;
  const scheduledVisits = visits.filter((item) => item.status === 'Scheduled' || item.status === 'Pending').length;
  const overdueFollowUps = followUps.filter((item) => item.status !== 'Completed' && item.dueDate < today).length;
  const completedAppointments = appointments.filter((item) => item.status === 'Completed').length;

  const stats = [
    { label: 'Community Members', value: data.members.length, change: 'Registered in this browser', icon: Users, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Completed Field Visits', value: completedVisits, change: `${visits.length} total in selected range`, icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Scheduled Visits', value: scheduledVisits, change: `${appointments.length} appointments in range`, icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Health Records', value: records.length, change: 'Saved in selected range', icon: FileText, color: 'text-teal-700', bg: 'bg-teal-50' },
  ];

  const exportCsv = () => {
    const columns = ['Type', 'Community Member', 'Date', 'Status', 'Details', 'Assigned To', 'Location'];
    const rows = reportRows.map((row) => [row.type, row.member, row.date, row.status, row.details, row.assigned, row.location]);
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-report-${timeRange.toLowerCase().replaceAll(' ', '-')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="health-report" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <style>{`@media print { @page { margin: 12mm; } body * { visibility: hidden !important; } #health-report, #health-report * { visibility: visible !important; } #health-report { position: absolute; left: 0; top: 0; width: 100%; max-width: none; padding: 0; } #health-report .no-print, #health-report .report-grid { display: none !important; } #health-report table { width: 100%; border-collapse: collapse; font-size: 9pt; } #health-report th, #health-report td { border: 1px solid #aaa; padding: 5px; text-align: left; } }`}</style>
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Health Reports & Analytics</h1>
          <p className="text-sm text-slate-600 mt-1">Live totals and activity from locally saved community health data.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={timeRange} onChange={(event) => setTimeRange(event.target.value)} className="px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700">
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="All Time">All Time</option>
          </select>
          <button onClick={exportCsv} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800">
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="report-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase">{item.label}</span>
                <span className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center`}><Icon className="w-4 h-4" /></span>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{item.value}</p>
              <p className="text-xs text-slate-500">{item.change}</p>
            </div>
          );
        })}
      </div>

      <section className="bg-white p-5 rounded-xl border border-slate-200">
        <h2 className="text-base font-bold text-slate-900">Program activity</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <p><span className="block text-xl font-bold text-slate-900">{completedAppointments}</span><span className="text-slate-500">Completed appointments</span></p>
          <p><span className="block text-xl font-bold text-slate-900">{followUps.filter((item) => item.status === 'Completed').length}</span><span className="text-slate-500">Completed follow-ups</span></p>
          <p><span className="block text-xl font-bold text-rose-700">{overdueFollowUps}</span><span className="text-slate-500">Overdue follow-ups</span></p>
          <p><span className="block text-xl font-bold text-slate-900">{reportRows.length}</span><span className="text-slate-500">Report rows</span></p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">Community health activity</h2>
          <p className="mt-1 text-xs text-slate-500">Members, visits, appointments, follow-ups, and recorded health observations.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="p-3">Type</th><th className="p-3">Member</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Details</th><th className="p-3">Assigned to</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportRows.length ? reportRows.map((row, index) => (
                <tr key={`${row.type}-${row.member}-${row.date}-${index}`}>
                  <td className="p-3 font-medium text-slate-800">{row.type}</td><td className="p-3">{row.member}</td><td className="p-3">{row.date || '-'}</td><td className="p-3">{row.status}</td><td className="p-3">{row.details || '-'}</td><td className="p-3">{row.assigned || '-'}</td>
                </tr>
              )) : <tr><td colSpan="6" className="p-8 text-center text-slate-500">No activity recorded for this period.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}