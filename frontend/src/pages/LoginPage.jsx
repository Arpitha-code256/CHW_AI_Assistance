import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Lock,
  Mail,
  Building2,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldAlert,
  Sparkles,
  WifiOff
} from 'lucide-react';

export default function LoginPage({ onLogin, onLogout }) {
  const [role, setRole] = useState('CHW');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phcCenter, setPhcCenter] = useState('PHC-04 North Valley Sector');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickFill = (roleType) => {
    setRole(roleType);
    if (roleType === 'CHW') {
      setEmail('asha.anita@phc-health.gov');
      setPassword('chwSecure2025!');
      setPhcCenter('PHC-04 North Valley Sector');
    } else if (roleType === 'Supervisor') {
      setEmail('dr.sharma@district-health.gov');
      setPassword('supervisorPass99#');
      setPhcCenter('District Health Office - Sector 2');
    } else {
      setEmail('admin@chw-assist.org');
      setPassword('adminMasterKey#');
      setPhcCenter('Central Health Mission HQ');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onLogin({
        name: email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase()),
        role,
        email,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50/40 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top back navigation */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home & Diagnostics</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Healthcare Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Worker Assistance Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
            Primary Healthcare Center & Community Health Worker Secure Access
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-200/90 sm:px-10">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Welcome, {email.split('@')[0]}!</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Authentication simulation successful for role <span className="font-semibold text-emerald-700">{role}</span> at <span className="font-semibold">{phcCenter}</span>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                    setPassword('');
                    onLogout();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  Log Out / Switch Account
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select User Role
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {[
                    { id: 'CHW', label: 'ASHA / CHW' },
                    { id: 'Supervisor', label: 'Supervisor' },
                    { id: 'Admin', label: 'Admin' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleQuickFill(tab.id)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        role === tab.id
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Fill Preset Indicator */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Quick-Fill:
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickFill(role)}
                  className="text-emerald-700 font-semibold hover:underline"
                >
                  Auto-fill demo credentials
                </button>
              </div>

              {/* Email / Worker ID Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Worker ID / Official Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. asha.anita@phc-health.gov"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Access Password
                  </label>
                  <a href="#forgot" className="text-[11px] font-medium text-emerald-700 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white text-slate-900 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* PHC Center Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assigned Primary Health Centre (PHC)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <select
                    value={phcCenter}
                    onChange={(e) => setPhcCenter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors bg-white text-slate-900"
                  >
                    <option value="PHC-04 North Valley Sector">PHC-04 North Valley Sector</option>
                    <option value="PHC-12 East River Sub-Centre">PHC-12 East River Sub-Centre</option>
                    <option value="Community Health Centre - Central">Community Health Centre - Central</option>
                    <option value="District Health Office - Sector 2">District Health Office - Sector 2</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-600/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Sign In to Health Portal</span>
                )}
              </button>

              {/* Field Mode Banner */}
              <div className="pt-2">
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
                  <WifiOff className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-tight">
                    <span className="font-semibold">Field Worker Offline Notice:</span> In low-connectivity sectors, surveys remain accessible offline and sync automatically upon PHC reconnect.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Security & Support Footer */}
        <div className="mt-6 text-center text-xs text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            Protected by National Health Mission Portal Guidelines
          </p>
          <p>Emergency PHC Helpline: <span className="font-semibold text-slate-700">104 / 108</span></p>
        </div>
      </div>
    </div>
  );
}
