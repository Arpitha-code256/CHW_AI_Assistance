import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Stethoscope,
  LayoutDashboard,
  Users,
  FileText,
  Clock,
  Calendar,
  AlertCircle,
  BookOpen,
  Bell,
  BarChart3,
  Settings as SettingsIcon,
  LogIn,
  Menu,
  X,
  ChevronDown,
  MessageCircle
} from 'lucide-react';

export default function Navbar({ backendOnline, loggedIn, account }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();
  const accountName = typeof account?.name === 'string' ? account.name.trim() : '';
  const hasAccount = Boolean(loggedIn && accountName);

  const isCurrent = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Members', path: '/community-members', icon: Users },
    { name: 'Records', path: '/health-records', icon: FileText },
    { name: 'Visits', path: '/visits', icon: Clock },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
  ];

  const moreLinks = [
    { name: 'Health Assistant', path: '/health-assistant', icon: MessageCircle },
    { name: 'Follow-ups', path: '/follow-ups', icon: AlertCircle },
    { name: 'Health Education', path: '/health-education', icon: BookOpen },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                CareAssist <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">CHW</span>
              </span>
              <p className="text-[10px] sm:text-[11px] text-slate-500 -mt-0.5 hidden sm:block">Community Health Worker Assistance</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isCurrent('/') ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {navLinks.map((item) => {
              const active = isCurrent(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    active ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* More Modules Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  moreLinks.some((l) => isCurrent(l.path))
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <span>Modules</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-200 py-1.5 z-50 text-xs"
                >
                  {moreLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3.5 py-2 transition-colors ${
                          isCurrent(item.path)
                            ? 'text-emerald-700 bg-emerald-50 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-600" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Notifications Link */}
            <Link
              to="/notifications"
              className={`p-2 rounded-xl border transition-colors relative ${
                isCurrent('/notifications')
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              className={`p-2 rounded-xl border transition-colors ${
                isCurrent('/settings')
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
              title="Profile & Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </Link>

            {/* Backend Connectivity Status Pill */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                backendOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
              title={backendOnline ? 'Backend API responding on port 5050' : 'Checking port 5050'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>API: {backendOnline ? 'Online' : 'Checking'}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{hasAccount ? 'Logged in' : 'Logged out'}</span>
            </div>

            {/* Account holder */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] uppercase">
                {hasAccount ? accountName.slice(0, 1) : <LogIn className="w-3.5 h-3.5" />}
              </span>
              <span>{hasAccount ? accountName : 'Login'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/notifications"
              className="p-1.5 rounded-lg text-slate-600 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 text-xs">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg font-medium ${
              isCurrent('/') ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home Overview
          </Link>

          {[...navLinks, ...moreLinks].map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${
                  active ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-slate-700 font-medium py-1"
            >
              <SettingsIcon className="w-4 h-4 text-slate-500" />
              <span>Profile & Settings</span>
            </Link>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                backendOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {backendOnline ? 'Online' : 'Checking'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
              {hasAccount ? 'Logged in' : 'Logged out'}
            </span>
          </div>

          <div className="pt-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
            >
              <LogIn className="w-4 h-4" />
              <span>Worker Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
