import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, CalendarDays, ClipboardList, UserPlus, Users } from 'lucide-react';
import { appointments, followUps, readMembers, visits } from '../data/healthOperations';

function Dashboard({ backendHealth, checkBackendHealth, checkingHealth }) {
  const [members, setMembers] = useState(readMembers);

  useEffect(() => {
    const refreshMembers = () => setMembers(readMembers());
    window.addEventListener('storage', refreshMembers);
    window.addEventListener('chw:members-updated', refreshMembers);

    return () => {
      window.removeEventListener('storage', refreshMembers);
      window.removeEventListener('chw:members-updated', refreshMembers);
    };
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const visitsToday = visits.filter((visit) => visit.date === today).length;
  const openAppointments = appointments.filter((appointment) => appointment.status !== 'Completed').length;
  const openFollowUps = followUps.filter((item) => item.status !== 'Completed').length;
  const backendOnline = backendHealth?.status === 'healthy';
  const metrics = [
    { label: 'Community members', value: members.length, icon: Users, tone: 'text-emerald-700 bg-emerald-50', to: '/community-members' },
    { label: "Today's visits", value: visitsToday, icon: ClipboardList, tone: 'text-teal-700 bg-teal-50', to: '/visits' },
    { label: 'Open appointments', value: openAppointments, icon: CalendarDays, tone: 'text-sky-700 bg-sky-50', to: '/appointments' },
    { label: 'Open follow-ups', value: openFollowUps, icon: AlertTriangle, tone: 'text-amber-700 bg-amber-50', to: '/follow-ups' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-emerald-700">Worker overview</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">A current snapshot of your community health work.</p>
        </div>
        <Link to="/add-member" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
          <UserPlus className="h-4 w-4" /> Add member
        </Link>
      </div>

      <section aria-label="Operational metrics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, tone, to }) => (
          <Link key={label} to={to} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </div>
            <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Work queue</h2>
            <p className="mt-0.5 text-xs text-slate-500">Shortcuts to records that need attention.</p>
          </div>
          <div className="divide-y divide-slate-100">
            <Link to="/follow-ups" className="flex items-center justify-between px-5 py-4 hover:bg-slate-50">
              <span className="flex items-center gap-3"><AlertTriangle className="h-4 w-4 text-amber-600" /><span className="text-sm font-medium text-slate-800">Follow-ups to review</span></span>
              <span className="text-sm font-semibold text-slate-700">{openFollowUps}</span>
            </Link>
            <Link to="/appointments" className="flex items-center justify-between px-5 py-4 hover:bg-slate-50">
              <span className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-sky-600" /><span className="text-sm font-medium text-slate-800">Appointments not completed</span></span>
              <span className="text-sm font-semibold text-slate-700">{openAppointments}</span>
            </Link>
            <Link to="/community-members" className="flex items-center justify-between px-5 py-4 hover:bg-slate-50">
              <span className="flex items-center gap-3"><Users className="h-4 w-4 text-emerald-700" /><span className="text-sm font-medium text-slate-800">Registered community members</span></span>
              <span className="text-sm font-semibold text-slate-700">{members.length}</span>
            </Link>
          </div>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-700" />
            <h2 className="font-semibold text-slate-900">System status</h2>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <span className={`h-2.5 w-2.5 rounded-full ${backendOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            API {backendOnline ? 'connected' : 'unavailable'}
          </p>
          <p className="mt-2 text-xs text-slate-500">{backendHealth?.message || (backendOnline ? 'Health check passed.' : 'Waiting for the backend health check.')}</p>
          <button type="button" onClick={checkBackendHealth} disabled={checkingHealth} className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900 disabled:opacity-50">
            {checkingHealth ? 'Checking…' : 'Check connection'}
          </button>
          <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">Member records are saved in this browser. Appointment, visit, and follow-up summaries currently use the app’s sample records.</p>
        </aside>
      </section>
    </div>
  );
}

export default Dashboard;