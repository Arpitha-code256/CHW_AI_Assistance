import React from 'react';
import { Heart, Stethoscope, Database, Layers, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span>Community Health Worker Assistance Platform</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A digital health assistance system designed for rural and semi-urban community health workers (e.g., ASHA/ANM)
              to automate household health surveys, maternal-child wellness tracking, and immunization monitoring.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-emerald-400 border border-slate-700">
                <Layers className="w-3 h-3" /> React + Vite
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-cyan-400 border border-slate-700">
                Tailwind CSS
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-emerald-300 border border-slate-700">
                <Terminal className="w-3 h-3" /> Node + Express
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-green-400 border border-slate-700">
                <Database className="w-3 h-3" /> MongoDB + Mongoose
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">Project Modules</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">• Maternal & Child Care (MCH)</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Routine Immunization Tracker</li>
              <li className="hover:text-white transition-colors cursor-pointer">• Household Survey Registry</li>
              <li className="hover:text-white transition-colors cursor-pointer">• High-Risk Alert Management</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Community Health Worker Assistance Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with care for public health empowerment <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
