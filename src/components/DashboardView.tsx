import React from 'react';
import {
  StudentProfile,
  DoctorProfile,
  UserRole,
  CourseSlot,
  Assignment,
  UniversityEvent,
  CommunityPost,
} from '../types';
import {
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  QrCode,
  FolderOpen,
  MessageSquare,
  FileText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface DashboardViewProps {
  currentRole: UserRole;
  student: StudentProfile;
  doctor: DoctorProfile;
  todaySlots: CourseSlot[];
  assignments: Assignment[];
  events: UniversityEvent[];
  communityPosts: CommunityPost[];
  onNavigate: (tab: string) => void;
  onQuickScanAttendance: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  student,
  doctor,
  todaySlots,
  assignments,
  events,
  communityPosts,
  onNavigate,
  onQuickScanAttendance,
}) => {
  const nextSlot = todaySlots[0];
  const urgentAssignment = assignments.find((a) => a.status === 'late' || a.status === 'upcoming');

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A4CB3] via-[#1056C7] to-[#3D7DE0] text-white p-6 sm:p-8 shadow-sm">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img
            src="/src/assets/images/cairo_university_campus_1791793417702.jpg"
            alt="حرم جامعة القاهرة"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold mb-3 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {currentRole === 'student'
                ? 'جلسة معتمدة • كلية الهندسة — جامعة القاهرة'
                : 'لوحة أستاذ المقرر • قسم هندسة الحاسب'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {currentRole === 'student' ? (
              <>مرحباً بك، {student.name.split(' ')[0]} 👋</>
            ) : (
              <>أهلاً بك، {doctor.name} 🎓</>
            )}
          </h1>

          <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            {currentRole === 'student'
              ? 'بوابتك الذكية لمتابعة جدول المحاضرات، الحضور الفوري بالـ QR، مراجع قسمك الحصرية، وتسليم التكليفات الأكاديمية.'
              : 'يمكنك الآن إطلاق رمز QR الدوار للمحاضرة الجارية، تسجيل الحضور اليدوي للطلاب، ومراجعة الواجبات المرفوعة.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {currentRole === 'student' ? (
              <>
                <button
                  onClick={onQuickScanAttendance}
                  className="px-5 py-2.5 bg-white text-[#0A4CB3] rounded-xl font-extrabold text-sm shadow-sm hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#0A4CB3]" />
                  <span>تسجيل الحضور الآن</span>
                </button>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>عرض جدول اليوم</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('doctor')}
                className="px-5 py-2.5 bg-white text-[#0A4CB3] rounded-xl font-extrabold text-sm shadow-sm hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#0A4CB3]" />
                <span>فتح مولد الـ QR للمحاضرة</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Key Metric Cards (Zero-pill clean layout) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Rate */}
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B7A90] font-bold mb-2">
            <span>نسبة الحضور التراكمية</span>
            <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0A4CB3] font-mono tabular-nums">
              {student.attendanceRate}%
            </span>
            <span className="text-xs text-[#15803D] font-bold">17 من 20 محاضرة</span>
          </div>
          <div className="mt-3 w-full bg-[#EEF3FB] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#0A4CB3] h-full rounded-full transition-all duration-500"
              style={{ width: `${student.attendanceRate}%` }}
            />
          </div>
        </div>

        {/* Next Lecture */}
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B7A90] font-bold mb-2">
            <span>المحاضرة القادمة</span>
            <Clock className="w-4 h-4 text-[#0A4CB3]" />
          </div>
          {nextSlot ? (
            <div>
              <div className="text-lg font-extrabold text-[#0F2342] truncate">{nextSlot.code}</div>
              <div className="text-xs text-[#6B7A90] flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3 h-3 text-[#64748B] shrink-0" />
                <span className="truncate">{nextSlot.hall}</span>
              </div>
              <div className="text-xs font-bold text-[#0A4CB3] mt-2 font-mono tabular-nums">
                {nextSlot.timeStart} — {nextSlot.timeEnd}
              </div>
            </div>
          ) : (
            <div className="text-sm font-bold text-[#6B7A90]">لا توجد محاضرات لاحقة اليوم</div>
          )}
        </div>

        {/* Academic Department & Year */}
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B7A90] font-bold mb-2">
            <span>القسم الأكاديمي المقيد</span>
            <ShieldCheck className="w-4 h-4 text-[#0A4CB3]" />
          </div>
          <div className="text-base font-extrabold text-[#0F2342]">{student.department}</div>
          <div className="text-xs text-[#6B7A90] mt-1">{student.year}</div>
          <div className="text-xs text-[#15803D] font-bold mt-2">محتوى المكتبة موثق لقسمك</div>
        </div>

        {/* Submissions & Deadlines */}
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B7A90] font-bold mb-2">
            <span>التسليمات والمهام</span>
            <AlertTriangle className="w-4 h-4 text-[#E53935]" />
          </div>
          {urgentAssignment ? (
            <div>
              <div className="text-sm font-extrabold text-[#0F2342] truncate">
                {urgentAssignment.courseCode}
              </div>
              <div className="text-xs text-[#E53935] font-bold mt-1 truncate">
                {urgentAssignment.status === 'late' ? 'تكليف متأخر • يتطلب رفعاً' : 'موعد قادم قريباً'}
              </div>
              <button
                onClick={() => onNavigate('assignments')}
                className="text-xs font-extrabold text-[#0A4CB3] hover:underline mt-2 flex items-center gap-1"
              >
                <span>متابعة التسليم</span>
                <ArrowLeft className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="text-sm font-bold text-[#15803D]">جميع التكليفات مُسلّمة بالكامل</div>
          )}
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Quick Attendance Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Today's Classes & Community Highlight */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EEF3FB]">
              <div>
                <h2 className="text-lg font-extrabold text-[#0F2342]">جدول محاضرات اليوم (الاثنين)</h2>
                <p className="text-xs text-[#6B7A90] mt-0.5">
                  الفصل الدراسي الأول 2026/2027 • 4 محاضرات مقررة
                </p>
              </div>
              <button
                onClick={() => onNavigate('schedule')}
                className="text-xs font-extrabold text-[#0A4CB3] hover:underline flex items-center gap-1"
              >
                <span>عرض الأسبوع كاملاً</span>
                <ArrowLeft className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {todaySlots.slice(0, 3).map((slot, index) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl border border-[#DCE7FA] hover:border-[#0A4CB3] transition-colors bg-[#F8FBFF] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE7FA] flex flex-col items-center justify-center shrink-0">
                      <span className="text-[11px] font-black text-[#0A4CB3]">#{index + 1}</span>
                      <span className="text-[10px] text-[#6B7A90] font-mono">محاضرة</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#0F2342]">{slot.code}</span>
                        <span className="text-xs text-[#64748B]">·</span>
                        <span className="text-xs font-bold text-[#0A4CB3]">{slot.name}</span>
                      </div>
                      <div className="text-xs text-[#6B7A90] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{slot.doctorName}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{slot.hall}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EEF3FB]">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-extrabold text-[#0F2342] font-mono tabular-nums">
                        {slot.timeStart} – {slot.timeEnd}
                      </span>
                    </div>
                    <button
                      onClick={onQuickScanAttendance}
                      className="px-3 py-1.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      تسجيل الحضور
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Community Activity Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EEF3FB]">
              <div>
                <h2 className="text-lg font-extrabold text-[#0F2342]">أحدث مناقشات مجتمع قسمك</h2>
                <p className="text-xs text-[#6B7A90] mt-0.5">
                  إجابات موثقة من أعضاء هيئة التدريس والمعيدين
                </p>
              </div>
              <button
                onClick={() => onNavigate('community')}
                className="text-xs font-extrabold text-[#0A4CB3] hover:underline flex items-center gap-1"
              >
                <span>المجتمع الأكاديمي</span>
                <ArrowLeft className="w-3 h-3" />
              </button>
            </div>

            {communityPosts.slice(0, 1).map((post) => (
              <div key={post.id} className="space-y-3">
                <div className="p-4 bg-white rounded-xl border border-[#DCE7FA]">
                  <div className="flex items-center gap-2 text-xs text-[#6B7A90] mb-1.5">
                    <span className="font-bold text-[#0F2342]">{post.authorName}</span>
                    <span>·</span>
                    <span>{post.timestamp}</span>
                    <span>·</span>
                    <span className="text-[#0A4CB3] font-bold">مقرر {post.category}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F2342] mb-2">{post.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">{post.content}</p>
                </div>

                {/* Doctor's certified answer preview */}
                {post.replies[0] && (
                  <div className="p-4 bg-[#F0FDF4] rounded-xl border border-[#86EFAC] text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#15803D]">
                          {post.replies[0].authorName}
                        </span>
                        <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#166534] text-[10px] font-bold rounded-md">
                          إجابة دكتور معتمدة ✓
                        </span>
                      </div>
                      <span className="text-[#15803D] font-bold">♥ {post.replies[0].likes}</span>
                    </div>
                    <p className="text-[#14532D] leading-relaxed line-clamp-2">
                      {post.replies[0].content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Attendance QR Box & University Events */}
        <div className="space-y-6">
          {/* Geofenced Smart QR Box */}
          <div className="bg-gradient-to-br from-[#0A4CB3] via-[#2563EB] to-[#5B9BFF] rounded-2xl p-6 text-white text-center shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-black tracking-wider uppercase mb-2">
                نظام الحضور الذكي
              </span>
              <h3 className="text-xl font-extrabold">امسح رمز QR للحضور</h3>
              <p className="text-xs text-blue-100 mt-1 mb-5">
                صالح فقط أثناء المحاضرة الجارية • تحقق تلقائي من الموقع الجغرافي (30 متراً)
              </p>

              {/* QR Icon Frame */}
              <div className="w-28 h-28 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#0A4CB3] shadow-inner mb-5">
                <QrCode className="w-16 h-16" />
              </div>

              <button
                onClick={onQuickScanAttendance}
                className="w-full py-3 bg-white hover:bg-blue-50 text-[#0A4CB3] font-black text-sm rounded-xl transition-all shadow-sm cursor-pointer"
              >
                مسح الرمز الآن (بدء التحقق)
              </button>

              <div className="mt-3 text-[11px] text-blue-200">
                جهاز واحد مسجل • الحساب مرتبط برقم الطالب 2024CS015
              </div>
            </div>
          </div>

          {/* Upcoming Events Box */}
          <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EEF3FB]">
              <h3 className="text-sm font-extrabold text-[#0F2342] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0A4CB3]" />
                <span>أحدث الفعاليات الجامعية</span>
              </h3>
              <button
                onClick={() => onNavigate('events')}
                className="text-xs font-bold text-[#0A4CB3] hover:underline"
              >
                عرض الكل
              </button>
            </div>

            <div className="space-y-3">
              {events.slice(0, 2).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FBFF] border border-[#EEF3FB]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EAF1FF] text-[#0A4CB3] flex flex-col items-center justify-center shrink-0 font-extrabold">
                    <span className="text-sm leading-none">{ev.day}</span>
                    <span className="text-[10px] text-[#6B7A90] font-bold">{ev.month}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-extrabold text-[#0F2342] truncate">{ev.title}</h4>
                    <p className="text-[11px] text-[#6B7A90] mt-1 truncate">{ev.location}</p>
                    <div className="text-[10px] text-[#0A4CB3] font-bold mt-1">
                      {ev.timeRange}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs space-y-2">
            <div className="text-xs font-bold text-[#6B7A90] mb-2">وصول سريع لخدمات البوابة</div>
            <button
              onClick={() => onNavigate('library')}
              className="w-full text-right p-3 rounded-xl hover:bg-[#EEF3FB] transition-colors flex items-center justify-between text-xs font-extrabold text-[#0F2342]"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#0A4CB3]" />
                <span>مكتبة قسم هندسة الحاسب (سنة 2)</span>
              </div>
              <ArrowLeft className="w-3.5 h-3.5 text-[#6B7A90]" />
            </button>
            <button
              onClick={() => onNavigate('assignments')}
              className="w-full text-right p-3 rounded-xl hover:bg-[#EEF3FB] transition-colors flex items-center justify-between text-xs font-extrabold text-[#0F2342]"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E53935]" />
                <span>تسليمات التكليفات والواجبات</span>
              </div>
              <ArrowLeft className="w-3.5 h-3.5 text-[#6B7A90]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
