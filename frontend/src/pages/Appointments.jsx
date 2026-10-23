import React, { useEffect, useState } from 'react';
import { Calendar, Plus, MapPin, User, CheckCircle2, Clock, X } from 'lucide-react';
import { appointments as initialAppointments } from '../data/healthOperations';

const APPOINTMENTS_STORAGE_KEY = 'chwAppointments';

export default function Appointments() {
  const [appointments, setAppointments] = useState(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY) || 'null');
      const appointmentsToLoad = Array.isArray(stored) ? stored : initialAppointments;
      return appointmentsToLoad.map((appointment) =>
        appointment.status === 'Upcoming' ? { ...appointment, status: 'Scheduled' } : appointment,
      );
    } catch {
      return initialAppointments;
    }
  });
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ memberName: '', date: '', time: '', provider: '', location: '', purpose: '' });

  useEffect(() => {
    window.localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const updateForm = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const addAppointment = (event) => {
    event.preventDefault();
    setAppointments((current) => [{ ...formData, id: Date.now(), status: 'Scheduled' }, ...current]);
    setFormData({ memberName: '', date: '', time: '', provider: '', location: '', purpose: '' });
    setFormOpen(false);
  };

  const updateStatus = (id, status) => {
    setAppointments((current) => current.map((appointment) => appointment.id === id ? { ...appointment, status } : appointment));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Clinical Appointments</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track and coordinate appointments between community members and PHC doctors.
          </p>
        </div>

        <button onClick={() => setFormOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs">
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form onSubmit={addAppointment} className="w-full max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">New appointment</h2>
              <button type="button" onClick={() => setFormOpen(false)} aria-label="Close" className="text-slate-500 hover:text-slate-800"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['memberName', 'Community member', 'text'],
                ['purpose', 'Appointment purpose', 'text'],
                ['date', 'Date', 'date'],
                ['time', 'Time', 'time'],
                ['provider', 'Provider / clinician', 'text'],
                ['location', 'Location', 'text'],
              ].map(([name, label, type]) => (
                <label key={name} className="text-sm font-medium text-slate-700">
                  {label}
                  <input required name={name} type={type} value={formData[name]} onChange={updateForm} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
              <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Add appointment</button>
            </div>
          </form>
        </div>
      )}

      {/* Appointment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  apt.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : apt.status === 'Cancelled'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}
              >
                {apt.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {apt.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">APT-00{apt.id}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{apt.memberName}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{apt.purpose}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{apt.date} • {apt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{apt.provider}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{apt.location}</span>
              </div>
            </div>
            <label className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-600">
              Appointment status
              <select value={apt.status} onChange={(event) => updateStatus(apt.id, event.target.value)} className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs">
                {['Scheduled', 'Completed', 'Cancelled'].map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
