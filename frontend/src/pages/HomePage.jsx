import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Baby,
  Syringe,
  Activity,
  HeartPulse,
  CheckCircle2,
  AlertTriangle,
  Server,
  ArrowRight,
  Database,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';

export default function HomePage({ backendHealth, checkBackendHealth, checkingHealth }) {
  const isOnline = backendHealth && backendHealth.status === 'healthy';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200 py-16 sm:py-24">
        {/* Subtle background decorative blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
          <div className="absolute -top-10 left-1/4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-300/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Gen Primary Care Assistance</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Empowering <span className="text-emerald-600">Community Health</span> Workers on the Frontlines
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A digital platform built to assist grassroots healthcare workers (ASHA/ANM) with household health
                registries, maternal-child wellness tracking, routine immunization schedules, and high-risk referral coordination.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-600/25 transition-all text-sm group"
                >
                  <span>Launch Worker Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href="#health-monitor"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs text-sm transition-all"
                >
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Check Backend Status</span>
                </a>
              </div>

              {/* Quick Trust / Feature Chips */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rural & Urban PHCs
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Offline-First Design
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> MERN Stack Architecture
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Quick Card / Status Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <HeartPulse className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">PHC Health Operations</h2>
                      <p className="text-xs text-slate-500">Live system status & metrics</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Node
                  </span>
                </div>

                {/* Metric Summary Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Households</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">450+</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Assigned to Sector 4</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Due Visits</p>
                    <p className="text-2xl font-extrabold text-amber-600 mt-1">12</p>
                    <p className="text-[11px] text-amber-700 font-medium mt-0.5">Scheduled this week</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">MCH Tracking</p>
                    <p className="text-2xl font-extrabold text-teal-600 mt-1">28</p>
                    <p className="text-[11px] text-teal-700 font-medium mt-0.5">High-priority mothers</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Immunization</p>
                    <p className="text-2xl font-extrabold text-indigo-600 mt-1">98%</p>
                    <p className="text-[11px] text-indigo-700 font-medium mt-0.5">Completed for infants</p>
                  </div>
                </div>

                {/* Backend API live indicator pill */}
                <div className="p-3 rounded-xl bg-slate-900 text-white text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold text-slate-200">Express Backend Service</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {isOnline ? 'CONNECTED' : 'STANDBY'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Endpoint: <code className="text-slate-300">/api/health</code></span>
                    <span>Port: <code className="text-slate-300">5050</code></span>
                  </div>
                </div>

                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <span>Sign In as Health Worker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Backend Health Monitor Section */}
      <section id="health-monitor" className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Live System Verification
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Full-Stack Connectivity Diagnostics</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Verifying communication between React Frontend (Port 5173) and Express Backend API (Port 5050)
                </p>
              </div>

              <button
                onClick={checkBackendHealth}
                disabled={checkingHealth}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingHealth ? 'animate-spin' : ''}`} />
                <span>{checkingHealth ? 'Testing Endpoint...' : 'Re-test /api/health'}</span>
              </button>
            </div>

            {/* Diagnostic Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
              {/* Frontend Node */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Frontend Client</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-base font-bold text-white">React 19 + Vite</p>
                <p className="text-xs text-emerald-400">Port 5173 • Active</p>
              </div>

              {/* Backend API Node */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Backend Server</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                </div>
                <p className="text-base font-bold text-white">
                  {isOnline ? 'Express API Online' : 'Connecting to API'}
                </p>
                <p className={`text-xs ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isOnline ? 'GET /api/health → 200 OK' : 'Checking port 5050...'}
                </p>
              </div>

              {/* Database Config */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Database Layer</span>
                  <Database className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-base font-bold text-white">MongoDB + Mongoose</p>
                <p className="text-xs text-slate-400">
                  {backendHealth?.database
                    ? `Status: ${backendHealth.database.status}`
                    : 'Configured in src/config/db.js'}
                </p>
              </div>

              {/* Uptime / Latency */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Server Uptime</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-base font-bold text-white">
                  {backendHealth?.uptimeSeconds !== undefined
                    ? `${backendHealth.uptimeSeconds}s active`
                    : 'Ready'}
                </p>
                <p className="text-xs text-slate-400">
                  {backendHealth?.timestamp ? new Date(backendHealth.timestamp).toLocaleTimeString() : 'Awaiting start'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules Section */}
      <section id="features" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Designed for Community Health Workflows
            </h2>
            <p className="text-sm text-slate-600">
              Everything required to assist frontline workers in managing primary health interventions across assigned rural sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Household & Census Registry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintain comprehensive household profiles, demographic surveys, socio-economic risk factors, and member health histories.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span>View Survey Module</span> &rarr;
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Maternal & Child Health (MCH)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track antenatal care checkups (ANC 1-4), high-risk pregnancies, nutrition status, and institutional delivery referrals.
              </p>
              <div className="pt-2 text-xs font-semibold text-rose-600 flex items-center gap-1">
                <span>Maternal Care Tracker</span> &rarr;
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Syringe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Immunization Schedule</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated due-date calculation for BCG, OPV, Pentavalent, Rotavirus, and Measles-Rubella vaccines with missed dose alerts.
              </p>
              <div className="pt-2 text-xs font-semibold text-teal-600 flex items-center gap-1">
                <span>Vaccine Due Lists</span> &rarr;
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">High-Risk Alerts & PHC Sync</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediate flag generation for critical vitals, severe malnutrition, or maternal distress with direct alert routing to PHC Medical Officers.
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-600 flex items-center gap-1">
                <span>Emergency Referral</span> &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Architecture Overview */}
      <section id="architecture" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              Technical Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Full-Stack College Mini-Project Structure
            </h2>
            <p className="text-sm text-slate-600">
              Clean separation of concerns with modern frontend tooling and a modular REST API backend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Tree */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between font-sans font-bold text-slate-900 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  Frontend Layer (React + Vite + Tailwind)
                </span>
                <span className="text-xs text-slate-500 font-mono">community-health-worker/frontend/</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed whitespace-pre font-mono text-[11px] overflow-x-auto">
{`frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation & Live Status Pill
│   │   └── Footer.jsx        # Academic metadata & Links
│   ├── pages/
│   │   ├── HomePage.jsx      # Overview & Diagnostic cards
│   │   └── LoginPage.jsx     # Healthcare Worker Portal Login
│   ├── App.jsx               # React Router configuration
│   ├── index.css             # Tailwind CSS & Typography
│   └── main.jsx              # React root entrypoint
├── index.html                # App shell & Google Fonts
├── vite.config.js            # Tailwind + React Vite plugins
└── package.json              # React 19, Lucide, Router`}
              </div>
            </div>

            {/* Backend Tree */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between font-sans font-bold text-slate-900 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                  Backend Layer (Node.js + Express + Mongoose)
                </span>
                <span className="text-xs text-slate-500 font-mono">community-health-worker/backend/</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed whitespace-pre font-mono text-[11px] overflow-x-auto">
{`backend/
├── src/
│   ├── config/
│   │   └── db.js             # Mongoose connection & status
│   ├── controllers/
│   │   └── healthController.js # /api/health handler
│   ├── models/
│   │   └── Worker.js         # Community Health Worker schema
│   ├── routes/
│   │   └── healthRoutes.js   # Health router configuration
│   ├── middleware/
│   │   └── errorHandler.js   # 404 & Global error handlers
│   └── server.js             # Express app & Port 5050 listener
├── .env.example              # Environment variable template
├── .env                      # Local development config
└── package.json              # Express, Mongoose, CORS, Morgan`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to test the Health Worker Portal?
          </h2>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto leading-relaxed">
            Log in to preview the worker dashboard interface with role-based permissions for ASHA workers, ANMs, and PHC Medical Officers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 font-bold text-sm shadow-md hover:bg-slate-100 transition-all"
            >
              Access Worker Login Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
