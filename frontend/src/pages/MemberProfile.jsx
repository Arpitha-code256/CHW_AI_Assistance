import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Heart,
  Calendar,
  Clock,
  PlusCircle,
  Edit3,
  ShieldCheck
} from 'lucide-react';

export default function MemberProfile() {
  const { id } = useParams();

  // Initial demonstration profile (will connect to backend in Phase 9)
  const member = {
    id: id || '1',
    name: 'Ravi Kumar',
    age: 35,
    gender: 'Male',
    phone: '9876543210',
    address: 'House No. 14, Sector 3, North Valley Village',
    healthCondition: 'Mild Hypertension',
    emergencyContact: 'Sunita Kumar (Wife) - 9876543211',
    assignedWorker: 'Anita Devi (ASHA Worker)',
    registrationDate: '2025-01-15',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/community-members"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Community Members</span>
        </Link>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl shadow-xs">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{member.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Member
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Member ID: <code className="text-slate-700">CHW-MEM-{member.id}</code> • Registered {member.registrationDate}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" /> {member.age} yrs • {member.gender}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {member.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {member.address}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Member</span>
          </button>
          <Link
            to="/health-records"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Health Record</span>
          </Link>
        </div>
      </div>

      {/* Grid of details: Health Status, Visits, Appointments, Follow-ups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Vitals & Condition */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Health Condition</span>
          </div>
          <p className="text-base font-bold text-slate-900">{member.healthCondition}</p>
          <p className="text-xs text-slate-500">Emergency: {member.emergencyContact}</p>
        </div>

        {/* Card 2: Visits */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Visit History</span>
          </div>
          <p className="text-base font-bold text-slate-900">2 Routine Visits</p>
          <p className="text-xs text-slate-500">Last visited: 12 days ago</p>
        </div>

        {/* Card 3: Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Appointments</span>
          </div>
          <p className="text-base font-bold text-slate-900">1 Scheduled</p>
          <p className="text-xs text-slate-500">PHC General Checkup</p>
        </div>

        {/* Card 4: Assigned Worker */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Care Provider</span>
          </div>
          <p className="text-base font-bold text-slate-900">{member.assignedWorker}</p>
          <p className="text-xs text-slate-500">North Valley Primary Health Center</p>
        </div>
      </div>
    </div>
  );
}
