import React, { useState } from 'react';
import { UserRole } from './types';
import {
  INITIAL_STUDENT,
  INITIAL_DOCTOR,
  WEEKLY_SCHEDULE,
  INITIAL_ASSIGNMENTS,
  UNIVERSITY_EVENTS,
  COMMUNITY_POSTS,
  PORTAL_NOTIFICATIONS,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ScheduleView } from './components/ScheduleView';
import { LibraryView } from './components/LibraryView';
import { AttendanceView } from './components/AttendanceView';
import { AssignmentsView } from './components/AssignmentsView';
import { CommunityView } from './components/CommunityView';
import { DoctorPortalView } from './components/DoctorPortalView';
import { EventsView } from './components/EventsView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { NotificationsModal } from './components/NotificationsModal';
import { DesignSystemModal } from './components/DesignSystemModal';
import { MobileSimulatorModal } from './components/MobileSimulatorModal';
import {
  BookOpen,
  Calendar,
  FolderOpen,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  Sparkles,
  User,
  Settings,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notifications, setNotifications] = useState(PORTAL_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const handleRoleToggle = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'doctor' && (activeTab === 'profile' || activeTab === 'dashboard')) {
      setActiveTab('doctor');
    } else if (role === 'student' && activeTab === 'doctor') {
      setActiveTab('dashboard');
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const todaySlots = WEEKLY_SCHEDULE.filter((s) => s.dayOfWeek === 'الاثنين');

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF3FB] text-[#0F2342] font-sans antialiased selection:bg-[#0A4CB3] selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleToggle={handleRoleToggle}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenMobileSimulator={() => setIsMobileSimulatorOpen(true)}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 sm:pb-12">
        {activeTab === 'dashboard' && (
          <DashboardView
            currentRole={currentRole}
            student={INITIAL_STUDENT}
            doctor={INITIAL_DOCTOR}
            todaySlots={todaySlots}
            assignments={INITIAL_ASSIGNMENTS}
            events={UNIVERSITY_EVENTS}
            communityPosts={COMMUNITY_POSTS}
            onNavigate={setActiveTab}
            onQuickScanAttendance={() => setActiveTab('attendance')}
          />
        )}

        {activeTab === 'schedule' && <ScheduleView />}

        {activeTab === 'library' && <LibraryView />}

        {activeTab === 'attendance' && (
          <AttendanceView currentRole={currentRole} onRoleToggle={setCurrentRole} />
        )}

        {activeTab === 'assignments' && <AssignmentsView />}

        {activeTab === 'community' && <CommunityView />}

        {activeTab === 'doctor' && <DoctorPortalView doctor={INITIAL_DOCTOR} />}

        {activeTab === 'events' && <EventsView />}

        {activeTab === 'profile' && (
          <ProfileView student={INITIAL_STUDENT} onNavigate={setActiveTab} />
        )}

        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Footer (Aligned with Cairo University Identity) */}
      <footer className="mt-auto bg-white border-t border-[#DCE7FA] py-6 px-4 text-center text-xs text-[#6B7A90]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#0A4CB3]">جامعة القاهرة — البوابة الذكية</span>
            <span>·</span>
            <span>كلية الهندسة</span>
            <span>·</span>
            <span>هندسة الحاسب (سنة 2)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="hover:text-[#0A4CB3] font-bold"
            >
              حسابي
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('settings')}
              className="hover:text-[#0A4CB3] font-bold"
            >
              الإعدادات والأمان
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDesignSystemOpen(true)}
              className="hover:text-[#0A4CB3] font-bold"
            >
              دليل التصميم الموحد
            </button>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            Better Education .. A Wider Future • 2026/2027
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Sticky for touch devices, 5 items per wireframe) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#DCE7FA] px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'dashboard', label: 'الرئيسية', icon: BookOpen },
          { id: 'schedule', label: 'الجدول', icon: Calendar },
          { id: 'community', label: 'المجتمع', icon: MessageSquare },
          { id: 'library', label: 'المكتبة', icon: FolderOpen },
          { id: 'attendance', label: 'الحضور', icon: CheckCircle2 },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-1 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                isActive ? 'text-[#0A4CB3] font-black' : 'text-[#64748B]'
              }`}
            >
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      <NotificationsModal
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />

      <MobileSimulatorModal
        isOpen={isMobileSimulatorOpen}
        onClose={() => setIsMobileSimulatorOpen(false)}
      />
    </div>
  );
}
