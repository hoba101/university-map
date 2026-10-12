import React from 'react';
import { StudentProfile } from '../types';
import {
  User,
  GraduationCap,
  ShieldCheck,
  Smartphone,
  Calendar,
  CheckCircle2,
  FolderOpen,
  FileCheck,
  ArrowLeft,
} from 'lucide-react';

interface ProfileViewProps {
  student: StudentProfile;
  onNavigate: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ student, onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Student Identity Card / Cover Banner */}
      <div className="bg-gradient-to-r from-[#0A4CB3] via-[#1E60CE] to-[#5B9BFF] rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white/30 shadow-md shrink-0"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-black">
              ✓
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{student.name}</h1>
              <span className="px-2.5 py-0.5 bg-white text-[#0A4CB3] rounded-full text-xs font-black">
                {student.academicStatus}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 font-mono">
              كود الطالب: {student.code} • {student.department}
            </p>
            <p className="text-xs text-blue-200">
              {student.faculty} • {student.year}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-xs space-y-1 shrink-0">
          <div className="text-blue-100">المعدل التراكمي (GPA):</div>
          <div className="text-2xl font-black font-mono tabular-nums text-white">
            {student.gpa} / 4.00
          </div>
          <div className="text-[11px] text-emerald-300 font-bold">تقدير: ممتاز مع مرتبة الشرف</div>
        </div>
      </div>

      {/* Stats 3-Col Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs text-center">
          <span className="block text-xs font-bold text-[#6B7A90]">نسبة الحضور التراكمية</span>
          <span className="block text-2xl font-extrabold text-[#0A4CB3] font-mono tabular-nums mt-1">
            {student.attendanceRate}%
          </span>
          <div className="w-full bg-[#EEF3FB] rounded-full h-2 overflow-hidden mt-3">
            <div
              className="bg-[#0A4CB3] h-full rounded-full"
              style={{ width: `${student.attendanceRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs text-center">
          <span className="block text-xs font-bold text-[#6B7A90]">المقررات المسجلة</span>
          <span className="block text-2xl font-extrabold text-[#0F2342] font-mono tabular-nums mt-1">
            {student.coursesCount} مقررات
          </span>
          <span className="block text-[11px] text-emerald-600 font-bold mt-2">18 ساعة معتمدة</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs text-center">
          <span className="block text-xs font-bold text-[#6B7A90]">المراجع المحملة والمساهمات</span>
          <span className="block text-2xl font-extrabold text-[#0F2342] font-mono tabular-nums mt-1">
            {student.downloadedFilesCount} ملف
          </span>
          <span className="block text-[11px] text-[#0A4CB3] font-bold mt-2">
            {student.approvedContributionsCount} ملخص معتمد
          </span>
        </div>
      </div>

      {/* Enrolled Courses & Security Device */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Courses */}
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#0F2342] pb-2 border-b border-[#EEF3FB]">
            المقررات الدراسية المسجلة هذا الفصل
          </h3>

          <div className="space-y-2.5">
            {[
              { code: 'CS101', name: 'Data Structures & Algorithms', hours: '4 ساعات' },
              { code: 'CS102', name: 'Computer Organization & Architecture', hours: '4 ساعات' },
              { code: 'MATH101', name: 'Discrete Mathematics', hours: '3 ساعات' },
              { code: 'CS105', name: 'Introduction to AI', hours: '3 ساعات' },
              { code: 'ENG101', name: 'Technical English for Engineers', hours: '2 ساعة' },
            ].map((c) => (
              <div
                key={c.code}
                className="p-3 rounded-xl bg-[#F8FBFF] border border-[#DCE7FA] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-[#0A4CB3]">{c.code}</span>
                  <span className="text-slate-400 mx-2">·</span>
                  <span className="font-bold text-[#0F2342]">{c.name}</span>
                </div>
                <span className="text-[#6B7A90] font-mono">{c.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Device Info */}
        <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-[#0F2342] pb-2 border-b border-[#EEF3FB] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0A4CB3]" />
            <span>الأمان وبصمة الجهاز المرتبط</span>
          </h3>

          <div className="space-y-3 text-xs text-[#475569]">
            <div className="p-3 bg-[#EEF3FB] rounded-xl flex items-center justify-between">
              <div>
                <span className="font-extrabold text-[#0A4CB3] block">الجهاز المسجل للحضور:</span>
                <span className="font-mono text-[#0F2342] mt-0.5">{student.deviceFingerprint}</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-black">
                نشط
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-[#0F2342] block">التحقق بخطوتين (MFA):</span>
              <p className="text-[11px] text-[#6B7A90]">
                مفعل بواسطة البريد الجامعي المعتمد ورقم الهاتف المسجل في شؤون الطلاب.
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] leading-relaxed">
              تنبيه: لتغيير الجهاز المسجل أو تحديث بيانات القيد، يرجى التوجه إلى إدارة شؤون الطلاب بمبنى كلية الهندسة مصطحباً بطاقة تحقيق الشخصية الجامعية.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
