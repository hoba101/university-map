import React, { useState, useEffect } from 'react';
import { DoctorProfile, StudentContribution } from '../types';
import { PENDING_CONTRIBUTIONS } from '../data/mockData';
import {
  QrCode,
  UserCheck,
  CheckCircle2,
  XCircle,
  FileText,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Users,
  Check,
} from 'lucide-react';

interface DoctorPortalViewProps {
  doctor: DoctorProfile;
}

export const DoctorPortalView: React.FC<DoctorPortalViewProps> = ({ doctor }) => {
  const [qrCounter, setQrCounter] = useState(20);
  const [isLectureActive, setIsLectureActive] = useState(true);
  const [liveStats, setLiveStats] = useState({
    present: 45,
    late: 3,
    absent: 5,
    manual: 2,
    totalRegistered: 55,
  });

  const [contributions, setContributions] = useState<StudentContribution[]>(PENDING_CONTRIBUTIONS);
  const [manualCode, setManualCode] = useState('');
  const [manualReason, setManualReason] = useState('لا يملك هاتفاً ذكياً داخل القاعة');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Rotating QR code counter
  useEffect(() => {
    if (!isLectureActive) return;
    const interval = setInterval(() => {
      setQrCounter((prev) => (prev <= 1 ? 20 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLectureActive]);

  const handleManualRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    setLiveStats((prev) => ({
      ...prev,
      present: prev.present + 1,
      manual: prev.manual + 1,
      absent: Math.max(0, prev.absent - 1),
    }));

    setToastMsg(`تم تسجيل الطالب ${manualCode} يدوياً بنجاح وتوثيق سبب الإعفاء في سجل التدقيق.`);
    setManualCode('');
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleApproveContribution = (id: string) => {
    setContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'معتمد' } : c))
    );
    setToastMsg('تم اعتماد الملخص بنجاح ونشره في مكتبة القسم مع شارة مساهم معتمد للطالب.');
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRejectContribution = (id: string) => {
    setContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'مرفوض' } : c))
    );
    setToastMsg('تم إرسال طلب تعديل وملاحظات الأستاذ للطالب.');
    setTimeout(() => setToastMsg(null), 3500);
  };

  const presentPercentage = Math.round((liveStats.present / liveStats.totalRegistered) * 100);

  return (
    <div className="space-y-6">
      {/* Doctor Profile Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={doctor.avatarUrl}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0A4CB3] shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-[#0F2342]">{doctor.name}</h1>
              <span className="px-2.5 py-0.5 bg-[#DCFCE7] text-[#15803D] text-xs font-black rounded-md">
                أستاذ معتمد ✓
              </span>
            </div>
            <p className="text-xs text-[#6B7A90] mt-0.5">{doctor.title}</p>
            <p className="text-xs text-[#0A4CB3] font-bold mt-1">
              المقررات النشطة: {doctor.coursesTaught.join(' • ')}
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-[#EEF3FB] rounded-xl text-xs text-[#0A4CB3] font-bold flex items-center gap-2 border border-[#DCE7FA] shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>صلاحيات إدارة المحاضرات والاعتماد مفعلة</span>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="p-4 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (1 col): Rotating QR Lecture Hub */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-[#0A4CB3] via-[#1056C7] to-[#3D7DE0] rounded-2xl p-6 text-white text-center shadow-md">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase mb-2">
              المحاضرة الحالية (Live)
            </span>
            <h2 className="text-lg font-extrabold">CS101 — هياكل البيانات</h2>
            <p className="text-xs text-blue-100 mt-0.5 mb-4">
              مدرج 302 كلية الهندسة • الاثنين 08:00 – 10:00
            </p>

            {/* Rotating QR Box */}
            <div className="relative w-44 h-44 bg-white rounded-2xl mx-auto flex items-center justify-center text-[#0A4CB3] shadow-inner mb-4">
              {isLectureActive ? (
                <>
                  <QrCode className="w-32 h-32" />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-[#0A4CB3] text-white rounded-lg text-xs font-mono font-black flex items-center gap-1 shadow-xs">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{qrCounter} ثانية</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-3 text-[#E53935]">
                  <XCircle className="w-12 h-12 mx-auto mb-1" />
                  <span className="text-xs font-black">جلسة الحضور مغلقة</span>
                </div>
              )}
            </div>

            <p className="text-xs text-blue-100 mb-4 font-semibold">
              QR دوار كل 20 ثانية لمنع تناقل الصور بين الطلاب
            </p>

            {isLectureActive ? (
              <button
                onClick={() => {
                  if (confirm('هل ترغب في إنهاء المحاضرة واعتماد كشف الحضور النهائي؟')) {
                    setIsLectureActive(false);
                    setToastMsg('تم إغلاق المحاضرة بنجاح وتسجيل جميع الطلاب المتبقين غائبين.');
                  }
                }}
                className="w-full py-3 bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                إغلاق المحاضرة وتسجيل الغائبين
              </button>
            ) : (
              <button
                onClick={() => setIsLectureActive(true)}
                className="w-full py-3 bg-white text-[#0A4CB3] font-extrabold text-xs rounded-xl hover:bg-blue-50 transition-all cursor-pointer"
              >
                إعادة تفعيل رمز الحضور
              </button>
            )}
          </div>
        </div>

        {/* Right (2 cols): Attendance Roster & Manual Entry & Contribution Moderation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Roster Stats Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#0F2342]">كشف الحضور اللحظي لليوم</h3>
                <p className="text-xs text-[#6B7A90]">إجمالي الطلاب المقيدين في المقرر: 55 طالباً</p>
              </div>
              <span className="text-lg font-black text-[#0A4CB3] font-mono tabular-nums">
                {presentPercentage}% نسبة الحضور
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="p-3 bg-[#F0FDF4] rounded-xl border border-[#DCFCE7]">
                <span className="block text-xl font-black text-[#15803D] font-mono tabular-nums">
                  {liveStats.present}
                </span>
                <span className="text-xs font-bold text-[#166534]">حاضر</span>
              </div>
              <div className="p-3 bg-[#FEF3C7] rounded-xl border border-[#FDE68A]">
                <span className="block text-xl font-black text-[#B45309] font-mono tabular-nums">
                  {liveStats.late}
                </span>
                <span className="text-xs font-bold text-[#92400E]">متأخر</span>
              </div>
              <div className="p-3 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]">
                <span className="block text-xl font-black text-[#1D4ED8] font-mono tabular-nums">
                  {liveStats.manual}
                </span>
                <span className="text-xs font-bold text-[#1E40AF]">يدوي (Audit)</span>
              </div>
              <div className="p-3 bg-[#FEF2F2] rounded-xl border border-[#FEE2E2]">
                <span className="block text-xl font-black text-[#DC2626] font-mono tabular-nums">
                  {liveStats.absent}
                </span>
                <span className="text-xs font-bold text-[#991B1B]">غائب</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#EEF3FB] rounded-full h-2 overflow-hidden mt-2">
              <div
                className="bg-[#0A4CB3] h-full rounded-full transition-all duration-500"
                style={{ width: `${presentPercentage}%` }}
              />
            </div>
          </div>

          {/* Manual Student Attendance with Audit Log */}
          <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-5 h-5 text-[#0A4CB3]" />
              <h3 className="text-sm font-extrabold text-[#0F2342]">
                تسجيل يدوي للطلاب الذين لا يملكون هواتف
              </h3>
            </div>
            <p className="text-xs text-[#6B7A90] mb-4">
              تسجيل استثنائي موثق بـ Audit Log لمنع التلاعب وحفظ حقوق الحضور.
            </p>

            <form onSubmit={handleManualRegister} className="space-y-3">
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
                    السبب للتسجيل اليدوي:
                  </label>
                  <input
                    type="text"
                    required
                    value={manualReason}
                    onChange={(e) => setManualReason(e.target.value)}
                    placeholder="مثال: لا يملك هاتف ذكي / عطل فني"
                    className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>تسجيل manual مع توثيق Audit Log</span>
              </button>
            </form>
          </div>

          {/* Student Contributions & Summaries Review Deck */}
          <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EEF3FB]">
              <div>
                <h3 className="text-sm font-extrabold text-[#0F2342]">
                  اعتماد ملخصات ومساهمات الطلاب
                </h3>
                <p className="text-xs text-[#6B7A90]">
                  الملخصات المعتمدة تنشر لجميع الطلاب في مكتبة القسم
                </p>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                {contributions.filter((c) => c.status === 'معلق').length} قيد الانتظار
              </span>
            </div>

            <div className="space-y-3">
              {contributions.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-[#DCE7FA] hover:bg-[#F8FBFF] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#0A4CB3]">{item.courseCode}</span>
                      <span className="text-[#94A3B8]">·</span>
                      <span className="font-bold text-[#0F2342]">{item.title}</span>
                    </div>
                    <div className="text-[11px] text-[#6B7A90]">
                      مقدّم من الطالب: <b className="text-[#0F2342]">{item.studentName}</b> ({item.studentCode}) • تاريخ التقديم: {item.submittedAt}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    {item.status === 'معلق' ? (
                      <>
                        <button
                          onClick={() => handleApproveContribution(item.id)}
                          className="px-3 py-1.5 bg-[#15803D] hover:bg-emerald-800 text-white font-extrabold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>اعتماد</span>
                        </button>
                        <button
                          onClick={() => handleRejectContribution(item.id)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#475569] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          طلب تعديل
                        </button>
                      </>
                    ) : item.status === 'معتمد' ? (
                      <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>تم الاعتماد ونشره في المكتبة</span>
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">تم طلب التعديل</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
