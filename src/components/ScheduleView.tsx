import React, { useState } from 'react';
import { CourseSlot } from '../types';
import { WEEKLY_SCHEDULE } from '../data/mockData';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Filter,
  Download,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('الاثنين');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'];

  const filteredSlots = WEEKLY_SCHEDULE.filter((slot) => {
    const matchesDay = slot.dayOfWeek === selectedDay;
    const matchesCourse = filterCourse === 'all' || slot.code.startsWith(filterCourse);
    return matchesDay && matchesCourse;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const getBorderColor = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'border-r-4 border-r-[#0A4CB3]';
      case 'teal':
        return 'border-r-4 border-r-[#0D9488]';
      case 'purple':
        return 'border-r-4 border-r-[#7C3AED]';
      case 'amber':
        return 'border-r-4 border-r-[#F59E0B]';
      default:
        return 'border-r-4 border-r-[#0A4CB3]';
    }
  };

  const getTagBg = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'text-[#0A4CB3] bg-[#EAF1FF]';
      case 'teal':
        return 'text-[#0F766E] bg-[#CCFBF1]';
      case 'purple':
        return 'text-[#6D28D9] bg-[#EDE9FE]';
      case 'amber':
        return 'text-[#B45309] bg-[#FEF3C7]';
      default:
        return 'text-[#0A4CB3] bg-[#EAF1FF]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B7A90] mb-1">
            <span>كلية الهندسة — جامعة القاهرة</span>
            <span>·</span>
            <span>هندسة الحاسب (الفرقة الثانية)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2342]">
            جدول المحاضرات والسكاشن الأسبوعي
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            الفصل الدراسي الأول 2026 / 2027 • معتمد رسمياً من قسم الشؤون والجداول
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl border border-[#DCE7FA] hover:bg-[#EEF3FB] text-[#0A4CB3] transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
              isRefreshing ? 'opacity-50' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>تحديث الجدول</span>
          </button>
          <button
            onClick={() => alert('تم استخراج نسخة PDF من الجدول الدراسي وحفظها بجهازك.')}
            className="px-3.5 py-2.5 rounded-xl bg-[#0A4CB3] text-white hover:bg-[#083D91] transition-all text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>تحميل PDF</span>
          </button>
        </div>
      </div>

      {/* Week Navigator & Day Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE7FA] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB] text-xs font-bold text-[#0F2342]">
          <span className="text-[#6B7A90]">الأسبوع الدراسي الخامس: 25 – 29 أكتوبر 2026</span>
          <span className="text-[#15803D] flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>نظام الحضور المباشر مفعل</span>
          </span>
        </div>

        {/* Days Selector */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {days.map((day, idx) => {
            const isSelected = selectedDay === day;
            const daySlotsCount = WEEKLY_SCHEDULE.filter((s) => s.dayOfWeek === day).length;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-3 px-2 rounded-xl text-center transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A4CB3] text-white border-[#0A4CB3] shadow-sm'
                    : 'bg-[#F8FBFF] text-[#0F2342] border-[#DCE7FA] hover:bg-[#EEF3FB]'
                }`}
              >
                <span className="block text-xs font-bold">{day}</span>
                <span className={`block text-lg font-black mt-0.5 ${isSelected ? 'text-white' : 'text-[#0A4CB3]'}`}>
                  {25 + idx}
                </span>
                <span
                  className={`block text-[10px] mt-0.5 ${
                    isSelected ? 'text-blue-100' : 'text-[#6B7A90]'
                  }`}
                >
                  {daySlotsCount} محاضرات
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter by Subject */}
        <div className="flex items-center gap-2 pt-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#6B7A90]" />
          <span className="font-bold text-[#6B7A90]">تصفية المقرر:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'CS101', label: 'هياكل البيانات (CS101)' },
              { id: 'CS102', label: 'تنظيم الحاسب (CS102)' },
              { id: 'MATH101', label: 'الرياضيات المتقطعة' },
              { id: 'CS105', label: 'الذكاء الاصطناعي' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterCourse(f.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterCourse === f.id
                    ? 'bg-[#EAF1FF] text-[#0A4CB3]'
                    : 'text-[#64748B] hover:text-[#0F2342]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lectures Time Slots List */}
      <div className="space-y-3">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className={`bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs ${getBorderColor(
                slot.colorVariant
              )} hover:shadow-sm transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-black ${getTagBg(slot.colorVariant)}`}>
                      {slot.code}
                    </span>
                    <h3 className="text-base font-extrabold text-[#0F2342]">{slot.name}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B7A90]">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#64748B]" />
                      <span className="font-semibold">{slot.doctorName}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                      <span>{slot.hall}</span>
                    </div>
                  </div>
                </div>

                {/* Right Timing */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#EEF3FB] shrink-0">
                  <div className="flex items-center gap-1 text-[#0A4CB3] font-bold text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>توقيت المحاضرة</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#0F2342] font-mono tabular-nums mt-0.5">
                    {slot.timeStart} — {slot.timeEnd}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-10 border border-[#DCE7FA] text-center space-y-2">
            <Calendar className="w-10 h-10 text-[#6B7A90] mx-auto opacity-50" />
            <h3 className="text-sm font-extrabold text-[#0F2342]">لا توجد محاضرات في هذا اليوم</h3>
            <p className="text-xs text-[#6B7A90]">
              تمتع بيومك الدراسي أو راجع المقررات عبر المكتبة الرقمية والتكليفات.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
