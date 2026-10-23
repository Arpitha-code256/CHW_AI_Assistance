import React, { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { readHealthRecords, readMembers, saveHealthRecords } from '../data/healthOperations';

function getToday() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

export default function HealthRecords() {
  const [records, setRecords] = useState(readHealthRecords);
  const [members] = useState(readMembers);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [formData, setFormData] = useState({
    memberName: '',
    date: getToday(),
    bp: '',
    sugar: '',
    weight: '',
    symptoms: '',
    medication: '',
  });

  const updateForm = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaveError('');

    let worker = 'Community Health Worker';
    try {
      const account = JSON.parse(window.localStorage.getItem('chwAccount') || 'null');
      if (typeof account?.name === 'string') worker = account.name;
    } catch {
      // Keep the generic worker label when saved account data is invalid.
    }

    const newRecord = {
      ...formData,
      id: Date.now(),
      bp: formData.bp ? `${formData.bp} mmHg` : 'Not recorded',
      sugar: formData.sugar ? `${formData.sugar} mg/dL` : 'Not recorded',
      weight: formData.weight ? `${formData.weight} kg` : 'Not recorded',
      symptoms: formData.symptoms.trim() || 'No symptoms recorded',
      medication: formData.medication.trim() || 'None recorded',
      worker,
    };

    try {
      const updatedRecords = [newRecord, ...records];
      saveHealthRecords(updatedRecords);
      setRecords(updatedRecords);
      setFormData({ memberName: '', date: getToday(), bp: '', sugar: '', weight: '', symptoms: '', medication: '' });
      setFormOpen(false);
    } catch {
      setSaveError('Could not save this record in browser storage. Check available storage and try again.');
    }
  };

  const filtered = records.filter(
    (r) =>
      (r.memberName || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.symptoms || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Health Records</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Vitals & Care Logs
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Maintain community member vitals, symptoms, observations, and prescribed medication logs.
          </p>
        </div>

        <button type="button" onClick={() => setFormOpen(!formOpen)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs">
          <Plus className="w-4 h-4" />
          <span>{formOpen ? 'Close form' : 'New Health Record'}</span>
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">New health record</h2>
              <p className="mt-1 text-xs text-slate-500">Enter observed information. Leave unknown measurements blank.</p>
            </div>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Close form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-xs font-semibold text-slate-700">Member name
              <input name="memberName" value={formData.memberName} onChange={updateForm} list="health-record-members" required maxLength="100" placeholder="Select or enter a name" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
              <datalist id="health-record-members">{members.map((member) => <option key={member.id} value={member.name} />)}</datalist>
            </label>
            <label className="text-xs font-semibold text-slate-700">Record date
              <input type="date" name="date" value={formData.date} onChange={updateForm} required className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Blood pressure
              <input name="bp" value={formData.bp} onChange={updateForm} placeholder="e.g. 120/80" maxLength="20" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Blood sugar (mg/dL)
              <input type="number" min="0" step="any" name="sugar" value={formData.sugar} onChange={updateForm} placeholder="e.g. 95" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Weight (kg)
              <input type="number" min="0" step="any" name="weight" value={formData.weight} onChange={updateForm} placeholder="e.g. 62.5" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Medication
              <input name="medication" value={formData.medication} onChange={updateForm} maxLength="200" placeholder="Medication or none" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </label>
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2 lg:col-span-3">Symptoms / notes
              <textarea name="symptoms" value={formData.symptoms} onChange={updateForm} rows="3" maxLength="1000" placeholder="Observations, symptoms, or care notes" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
            </label>
          </div>
          {saveError && <p role="alert" className="text-sm text-rose-700">{saveError}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Save record</button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by community member name or symptoms..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="p-3.5">Member Name</th>
                <th className="p-3.5">Record Date</th>
                <th className="p-3.5">Blood Pressure</th>
                <th className="p-3.5">Blood Sugar</th>
                <th className="p-3.5">Weight</th>
                <th className="p-3.5">Symptoms / Notes</th>
                <th className="p-3.5">Medication</th>
                <th className="p-3.5">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-500">
                    No health records match your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-semibold text-slate-900">{record.memberName}</td>
                    <td className="p-3.5 text-slate-500">{record.date}</td>
                    <td className="p-3.5 font-medium text-emerald-700">{record.bp}</td>
                    <td className="p-3.5">{record.sugar}</td>
                    <td className="p-3.5">{record.weight || 'Not recorded'}</td>
                    <td className="p-3.5 max-w-xs truncate">{record.symptoms}</td>
                    <td className="p-3.5 text-teal-700">{record.medication}</td>
                    <td className="p-3.5 text-slate-500 text-xs">{record.worker}</td>
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
