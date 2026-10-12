import React from 'react';
import { UserRole } from '../types';
import {
  GraduationCap,
  Bell,
  Smartphone,
  BookOpen,
  Calendar,
  FolderOpen,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  Sparkles,
  UserCheck,
  Menu,
  X,
  Palette,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleToggle: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenMobileSimulator: () => void;
  onOpenDesignSystem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleToggle,
  activeTab,
  onTabChange,
  unreadCount,
  onOpenNotifications,
  onOpenMobileSimulator,
  onOpenDesignSystem,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'الرئيسية', icon: BookOpen },
    { id: 'schedule', label: 'الجدول', icon: Calendar },
    { id: 'library', label: 'المكتبة', icon: FolderOpen },
    { id: 'attendance', label: 'الحضور', icon: CheckCircle2 },
    { id: 'assignments', label: 'مهامي', icon: FileCheck },
    { id: 'community', label: 'المجتمع', icon: MessageSquare },
    { id: 'events', label: 'الفعاليات', icon: Sparkles },
    ...(currentRole === 'doctor' ? [{ id: 'doctor', label: 'لوحة الدكتور', icon: UserCheck }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE7FA] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Zone 1: Brand Wordmark (Single Line, Crisp Identity) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-3 text-right group focus-visible:outline-[#0A4CB3] focus-visible:outline-2 rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A4CB3] to-[#5B9BFF] text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                ج
              </div>
              <div className="leading-tight">
                <span className="block font-black text-base lg:text-lg text-[#0A4CB3] tracking-tight">
                  جامعة القاهرة
                </span>
                <span className="block text-xs font-semibold text-[#6B7A90]">
                  البوابة الأكاديمية الذكية
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean Single-line Typography) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-[#0F2342]">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#EAF1FF] text-[#0A4CB3] font-bold'
                      : 'text-[#475569] hover:text-[#0A4CB3] hover:bg-[#F8FBFF]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-[#0A4CB3]' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Design System Reference Button */}
            <button
              onClick={onOpenDesignSystem}
              title="دليل التصميم الموحد"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-[#0A4CB3] bg-[#EEF3FB] hover:bg-[#DCE7FA] rounded-lg transition-colors border border-[#DCE7FA]"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>دليل التصميم</span>
            </button>

            {/* Mobile Simulator Trigger */}
            <button
              onClick={onOpenMobileSimulator}
              title="معاينة واجهة الموبايل"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-[#0F2342] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#0A4CB3]" />
              <span className="hidden md:inline">محاكي الهاتف</span>
            </button>

            {/* Notifications Trigger */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-[#475569] hover:text-[#0A4CB3] hover:bg-[#EEF3FB] rounded-lg transition-colors focus-visible:outline-[#0A4CB3]"
              aria-label="الإشعارات"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#E53935] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Button */}
            <div className="p-0.5 bg-[#EEF3FB] rounded-xl flex items-center border border-[#DCE7FA]">
              <button
                onClick={() => onRoleToggle('student')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentRole === 'student'
                    ? 'bg-white text-[#0A4CB3] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F2342]'
                }`}
              >
                طالب
              </button>
              <button
                onClick={() => onRoleToggle('doctor')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  currentRole === 'doctor'
                    ? 'bg-white text-[#0A4CB3] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F2342]'
                }`}
              >
                دكتور
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0F2342] hover:bg-slate-100 rounded-lg"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#DCE7FA] animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-bold text-right flex items-center gap-2 ${
                    activeTab === item.id
                      ? 'bg-[#EAF1FF] text-[#0A4CB3]'
                      : 'text-[#475569] hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => {
                  onOpenDesignSystem();
                  setMobileMenuOpen(false);
                }}
                className="text-[#0A4CB3] font-bold"
              >
                عرض دليل التصميم v2
              </button>
              <span>نظام البوابة الذكية v3.0</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
