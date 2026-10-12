import React, { useState, useEffect } from 'react';
import { UserRole, AttendanceRecord } from '../types';
import { ATTENDANCE_HISTORY } from '../data/mockData';
import {
  QrCode,
  MapPin,
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  UserCheck,
  XCircle,
  FileText,
} from 'lucide-react';

interface AttendanceViewProps {
  currentRole: UserRole;
  onRoleToggle: (role: UserRole) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ currentRole, onRoleToggle }) => {
  // Student state
  const [hasScannedToday, setHasScannedToday] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [scanSuccessMessage, setScanSuccessMessage] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(ATTENDANCE_HISTORY);

  // Doctor state
  const [qrCounter, setQrCounter] = useState(20);
  const [doctorLiveCount, setDoctorLiveCount] = useState({
    present: 45,
    late: 3,
    absent: 5,
    manual: 2,
  });
  const [manualCode, setManualCode] = useState('');
  const [manualReason, setManualReason] = useState('لا يملك هاتفاً ذكياً أثناء المحاضرة');
  const [manualSuccessMsg, setManualSuccessMsg] = useState<string | null>(null);
  const [isLectureClosed, setIsLectureClosed] = useState(false);

  // Countdown timer for Doctor's rotating QR
  useEffect(() => {
    if (currentRole !== 'doctor' || isLectureClosed) return;
    const interval = setInterval(() => {
      setQrCounter((prev) => {
        if (prev <= 1) {
          return 20; // reset 20s cycle
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentRole, isLectureClosed]);

  // Student Scan handler
  const handleStudentScan = () => {
    if (hasScannedToday || isVerifying) return;
    setIsVerifying(true);

    // Simulate geofence & device checking
    setTimeout(() => {
      setIsVerifying(false);
      setHasScannedToday(true);
      const newRecord: AttendanceRecord = {
        id: `att_${Date.now()}`,
        date: '2026-10-12',
        courseCode: 'CS101',
        courseName: 'Data Structures & Algorithms',
        doctorName: 'د. محمد عبد العال',
        status: 'present_qr',
        method: 'QR_SCANNED',
        timestamp: new Date().toLocaleTimeString('ar-EG'),
        hall: 'مدرج 302 — كلية الهندسة',
        note: 'تم التحقق من الموقع الجغرافي (مسافة 14 متراً من المنصة) وبصمة الجهاز #EG-882',
      };
      setAttendanceRecords([newRecord, ...attendanceRecords]);
      setScanSuccessMessage(
        'تم تسجيل حضورك بنجاح! تم قفل الزر وتوثيق المحاضرة في السجل الأكاديمي.'
      );
    }, 1400);
  };

  // Doctor manual entry
  const handleDoctorManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    setDoctorLiveCount((prev) => ({
      ...prev,
      present: prev.present + 1,
      manual: prev.manual + 1,
      absent: Math.max(0, prev.absent - 1),
    }));

    setManualSuccessMsg(`تم تسجيل الطالب ${manualCode} يدوياً بنجاح مع إيداع سجل التدقيق (Audit Log).`);
    setManualCode('');
    setTimeout(() => {
      setManualSuccessMsg(null);
    }, 3500);
  };

  const getStatusDetails = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present_qr':
        return {
          label: 'حاضر (مسح QR)',
          badge: 'text-[#15803D] bg-[#DCFCE7]',
          icon: CheckCircle2,
        };
      case 'late':
        return {
          label: 'متأخر',
          badge: 'text-[#B45309] bg-[#FEF3C7]',
          icon: Clock,
        };
      case 'manual_audit':
        return {
          label: 'تسجيل يدوي (معتمد)',
          badge: 'text-[#0A4CB3] bg-[#EAF1FF]',
          icon: FileText,
        };
      case 'absent':
        return {
          label: 'غائب',
          badge: 'text-[#DC2626] bg-[#FEE2E2]',
          icon: XCircle,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Notice & Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE7FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0A4CB3]" />
          <div>
            <h2 className="text-sm font-extrabold text-[#0F2342]">
              منظومة الحضور الذكي والتحقق الجغرافي (CU Smart Attendance)
            </h2>
            <p className="text-xs text-[#6B7A90]">
              تعتمد البوابة التحقق من الموقع الجغرافي (30 متراً من المنصة) وربط الجلسة بجهاز واحد معتمد.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-[#6B7A90]">معاينة الوضع:</span>
          <button
            onClick={() => onRoleToggle('student')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentRole === 'student'
                ? 'bg-[#0A4CB3] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#0F2342]'
            }`}
          >
            واجهة الطالب
          </button>
          <button
            onClick={() => onRoleToggle('doctor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentRole === 'doctor'
                ? 'bg-[#0A4CB3] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#0F2342]'
            }`}
          >
            لوحة الدكتور
          </button>
        </div>
      </div>

      {/* STUDENT INTERFACE */}
      {currentRole === 'student' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Scan QR Box */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0A4CB3] via-[#2563EB] to-[#5B9BFF] rounded-2xl p-6 text-white text-center shadow-md relative overflow-hidden">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-black tracking-wider uppercase mb-3">
                المحاضرة الحالية: CS101
              </span>
              <h3 className="text-xl font-extrabold">تسجيل الحضور والغياب</h3>
              <p className="text-xs text-blue-100 mt-1 mb-6">
                قاعة 302 هندسة • د. محمد عبد العال
              </p>

              {/* Dynamic QR Animation Frame */}
              <div className="relative w-36 h-36 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#0A4CB3] shadow-inner mb-6">
                <QrCode className="w-24 h-24" />
                {isVerifying && (
                  <div className="absolute inset-0 bg-[#0A4CB3]/80 rounded-2xl flex flex-col items-center justify-center text-white backdrop-blur-xs">
                    <RefreshCw className="w-8 h-8 animate-spin mb-1" />
                    <span className="text-xs font-black">جاري التحقق...</span>
                  </div>
                )}
                {hasScannedToday && (
                  <div className="absolute inset-0 bg-emerald-600/90 rounded-2xl flex flex-col items-center justify-center text-white backdrop-blur-xs">
                    <CheckCircle2 className="w-10 h-10 mb-1" />
                    <span className="text-xs font-black">تم التسجيل بنجاح</span>
                  </div>
                )}
              </div>

              {/* Action Button: Disables after first scan strictly as required */}
              <button
                onClick={handleStudentScan}
                disabled={hasScannedToday || isVerifying}
                className={`w-full py-3.5 font-black text-sm rounded-xl transition-all shadow-sm ${
                  hasScannedToday
                    ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed opacity-90'
                    : isVerifying
                    ? 'bg-blue-200 text-blue-900 cursor-wait'
                    : 'bg-white hover:bg-blue-50 text-[#0A4CB3] cursor-pointer'
                }`}
              >
                {hasScannedToday
                  ? 'تم تسجيل الحضور (الزر معطل)'
                  : isVerifying
                  ? 'جاري فحص الموقع والجهاز...'
                  : 'مسح الرمز وتسجيل الحضور الآن'}
              </button>

              {/* Geofence & Device Rules */}
              <div className="mt-4 pt-4 border-t border-white/20 space-y-1 text-[11px] text-blue-100 text-right">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                  <span>التحقق من الموقع: نطاق القاعة (أقل من 30 متراً)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                  <span>ربط الحساب: جهاز واحد مخصص لمنع تكرار التسجيل</span>
                </div>
              </div>
            </div>

            {scanSuccessMessage && (
              <div className="mt-4 p-4 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-xl text-xs font-bold animate-in fade-in flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                <span>{scanSuccessMessage}</span>
              </div>
            )}
          </div>

          {/* Right: History & Breakdown Stats */}
          <div className="lg:col-span-2 space-y-5">
            {/* Summary Progress Box */}
            <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB]">
                <div>
                  <h3 className="text-base font-extrabold text-[#0F2342]">
                    إحصائيات حضور الفصل الدراسي
                  </h3>
                  <p className="text-xs text-[#6B7A90]">
                    الحد الأدنى المطلوب لدخول الامتحان النهائي: 75%
                  </p>
                </div>
                <span className="text-2xl font-extrabold text-[#0A4CB3] font-mono tabular-nums">
                  85%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
                  <span className="block font-black text-[#15803D] text-base font-mono tabular-nums">
                    17
                  </span>
                  <span className="text-[#166534] font-bold text-[11px]">حاضر QR</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A]">
                  <span className="block font-black text-[#B45309] text-base font-mono tabular-nums">
                    1
                  </span>
                  <span className="text-[#92400E] font-bold text-[11px]">متأخر</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE]">
                  <span className="block font-black text-[#1D4ED8] text-base font-mono tabular-nums">
                    1
                  </span>
                  <span className="text-[#1E40AF] font-bold text-[11px]">يدوي معتمد</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2]">
                  <span className="block font-black text-[#DC2626] text-base font-mono tabular-nums">
                    1
                  </span>
                  <span className="text-[#991B1B] font-bold text-[11px]">غياب</span>
                </div>
              </div>
            </div>

            {/* Attendance History Audit Table */}
            <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
              <h3 className="text-sm font-extrabold text-[#0F2342] mb-3">
                سجل الحضور الأكاديمي الأخير
              </h3>

              <div className="space-y-3">
                {attendanceRecords.map((rec) => {
                  const stat = getStatusDetails(rec.status);
                  const Icon = stat.icon;
                  return (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-xl border border-[#DCE7FA] hover:bg-[#F8FBFF] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#0F2342]">{rec.courseCode}</span>
                          <span className="text-[#64748B]">·</span>
                          <span className="text-[#0A4CB3] font-bold">{rec.courseName}</span>
                        </div>
                        <div className="text-[11px] text-[#6B7A90] flex flex-wrap items-center gap-x-2">
                          <span>{rec.doctorName}</span>
                          <span>·</span>
                          <span>{rec.hall}</span>
                          <span>·</span>
                          <span className="text-slate-500">{rec.note}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EEF3FB]">
                        <span className="font-mono text-[#6B7A90] tabular-nums">
                          {rec.date} {rec.timestamp}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${stat.badge}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{stat.label}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* DOCTOR INTERFACE */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Rotating QR Generator Box */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0A4CB3] via-[#1056C7] to-[#3D7DE0] rounded-2xl p-6 text-white text-center shadow-md">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-black tracking-wider uppercase mb-2">
                لوحة الأستاذ المحاضر
              </span>
              <h3 className="text-xl font-extrabold">محاضرة CS101 — هياكل البيانات</h3>
              <p className="text-xs text-blue-100 mt-1 mb-4">
                الاثنين • 08:00 – 10:00 • مدرج 302 هندسة
              </p>

              {/* Dynamic Rotating QR frame with 20s Countdown */}
              <div className="relative w-40 h-40 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#0A4CB3] shadow-inner mb-4">
                {isLectureClosed ? (
                  <div className="text-center p-3 text-[#E53935]">
                    <XCircle className="w-12 h-12 mx-auto mb-1" />
                    <span className="text-xs font-black">تم إغلاق المحاضرة</span>
                  </div>
                ) : (
                  <>
                    <QrCode className="w-28 h-28" />
                    {/* Floating circular countdown badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#0A4CB3] text-white rounded-md text-[11px] font-mono font-black flex items-center gap-1 shadow-xs">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>{qrCounter}s</span>
                    </div>
                  </>
                )}
              </div>

              {!isLectureClosed ? (
                <>
                  <div className="text-xs text-blue-100 mb-4 font-semibold">
                    رمز QR دوار يتغير تلقائياً كل 20 ثانية لمنع تصويره أو مشاركته خارج القاعة
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من إنهاء جلسة الحضور وتسجيل جميع المتبقين غائبين؟')) {
                        setIsLectureClosed(true);
                      }
                    }}
                    className="w-full py-3 bg-[#E53935] hover:bg-red-700 text-white font-black text-xs rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    إغلاق المحاضرة وتسجيل الغائبين
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLectureClosed(false)}
                  className="w-full py-3 bg-white text-[#0A4CB3] font-black text-xs rounded-xl hover:bg-blue-50 transition-all cursor-pointer"
                >
                  إعادة فتح جلسة الحضور
                </button>
              )}
            </div>
          </div>

          {/* Doctor Live Roster & Manual Override with Audit */}
          <div className="lg:col-span-2 space-y-5">
            {/* Live Count Bar */}
            <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
              <h3 className="text-base font-extrabold text-[#0F2342] mb-1">
                كشف الحضور المباشر اليوم
              </h3>
              <p className="text-xs text-[#6B7A90] mb-4">
                تحديث لحظي لعدد الطلاب المسجلين داخل القاعة
              </p>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#DCFCE7]">
                  <span className="block text-2xl font-black text-[#15803D] font-mono tabular-nums">
                    {doctorLiveCount.present}
                  </span>
                  <span className="text-xs font-bold text-[#166534]">حاضر الآن</span>
                </div>
                <div className="p-3 bg-[#FEF3C7] rounded-xl border border-[#FDE68A]">
                  <span className="block text-2xl font-black text-[#B45309] font-mono tabular-nums">
                    {doctorLiveCount.late}
                  </span>
                  <span className="text-xs font-bold text-[#92400E]">متأخر</span>
                </div>
                <div className="p-3 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]">
                  <span className="block text-2xl font-black text-[#1D4ED8] font-mono tabular-nums">
                    {doctorLiveCount.manual}
                  </span>
                  <span className="text-xs font-bold text-[#1E40AF]">يدوي (Audit)</span>
                </div>
                <div className="p-3 bg-[#FEF2F2] rounded-xl border border-[#FEE2E2]">
                  <span className="block text-2xl font-black text-[#DC2626] font-mono tabular-nums">
                    {doctorLiveCount.absent}
                  </span>
                  <span className="text-xs font-bold text-[#991B1B]">غائب</span>
                </div>
              </div>
            </div>

            {/* Manual Attendance with Audit Log */}
            <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-5 h-5 text-[#0A4CB3]" />
                <h3 className="text-sm font-extrabold text-[#0F2342]">
                  تسجيل يدوي استثنائي لمن لا يملك هاتفاً (مع سجل التدقيق)
                </h3>
              </div>
              <p className="text-xs text-[#6B7A90] mb-4">
                يتم تسجيل سبب الإعفاء الأكاديمي مع بصمة معرف الأستاذ واسم الطالب في ملف الـ Audit الرسمي.
              </p>

              {manualSuccessMsg && (
                <div className="mb-4 p-3.5 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-xl text-xs font-bold">
                  {manualSuccessMsg}
                </div>
              )}

              <form onSubmit={handleDoctorManualSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                      كود الطالب الجامعي:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: 2024CS020"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                      سبب التسجيل اليدوي (للتدقيق الأكاديمي):
                    </label>
                    <input
                      type="text"
                      required
                      value={manualReason}
                      onChange={(e) => setManualReason(e.target.value)}
                      placeholder="مثال: نفاد بطارية / لا يملك هاتف ذكي"
                      className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>تسجيل الطالب مع Audit Log الموثق</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
