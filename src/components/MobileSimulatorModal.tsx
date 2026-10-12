import React, { useState } from 'react';
import {
  Smartphone,
  Calendar,
  FolderOpen,
  MessageSquare,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  X,
  FileText,
} from 'lucide-react';

interface MobileSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSimulatorModal: React.FC<MobileSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'schedule' | 'library' | 'community' | 'attendance'>('home');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 border border-[#DCE7FA] shadow-2xl animate-in zoom-in-95 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB]">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#0A4CB3]" />
            <div>
              <h2 className="text-base font-extrabold text-[#0F2342]">
                محاكي تطبيق الهاتف الذكي (Mobile App Simulator)
              </h2>
              <p className="text-xs text-[#6B7A90]">
                معاينة مباشرة للتصميم على شاشات الهواتف الذكية (iOS & Android) بنفس الهيكل الموحد
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Screen Switcher */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-[#EEF3FB] rounded-xl text-xs max-w-md mx-auto">
          {[
            { id: 'home', label: 'الرئيسية' },
            { id: 'schedule', label: 'الجدول' },
            { id: 'library', label: 'المكتبة' },
            { id: 'community', label: 'المجتمع' },
            { id: 'attendance', label: 'الحضور' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id as any)}
              className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                activeScreen === s.id
                  ? 'bg-white text-[#0A4CB3] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F2342]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Phone Frame Simulator */}
        <div className="flex justify-center py-2">
          <div className="w-[330px] sm:w-[350px] bg-white border-8 border-[#0A2342] rounded-[42px] overflow-hidden shadow-2xl flex flex-col text-right">
            {/* iPhone Top Status Bar */}
            <div className="bg-white px-6 pt-3 pb-1 flex justify-between items-center text-[11px] font-bold text-[#0F2342]">
              <span>9:41</span>
              {/* Notch */}
              <div className="w-24 h-4 bg-[#0A2342] rounded-full mx-auto" />
              <span className="font-mono">5G ▮▮▮</span>
            </div>

            {/* Mobile Header */}
            <div className="px-4 py-3 border-b border-[#DCE7FA] text-center bg-white">
              <span className="block font-black text-sm text-[#0A4CB3]">جامعة القاهرة</span>
              <span className="block text-[11px] text-[#6B7A90]">هندسة الحاسب — سنة 2</span>
            </div>

            {/* Mobile Screen Body */}
            <div className="p-4 bg-[#F8FBFF] min-h-[460px] max-h-[460px] overflow-y-auto space-y-3 text-xs">
              {activeScreen === 'home' && (
                <>
                  <div className="p-4 bg-gradient-to-r from-[#0A4CB3] to-[#3D7DE0] text-white rounded-2xl shadow-xs">
                    <span className="text-[10px] text-blue-100 font-bold block">مرحباً أحمد 👋</span>
                    <b className="text-sm font-extrabold block mt-0.5">محاضرة CS101 بعد 20 دقيقة</b>
                    <span className="text-[10px] text-blue-200 block mt-1">مدرج 305 — مبنى الهندسة</span>
                  </div>

                  <div className="bg-gradient-to-br from-[#0A4CB3] to-[#5B9BFF] text-white p-4 rounded-2xl text-center space-y-2">
                    <b className="text-xs font-bold block">الحضور والغياب</b>
                    <div className="w-16 h-16 bg-white text-[#0A4CB3] rounded-xl mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
                      <QrCode className="w-10 h-10" />
                    </div>
                    <button className="w-full py-2 bg-white text-[#0A4CB3] font-black text-xs rounded-xl shadow-xs">
                      مسح رمز المحاضرة
                    </button>
                    <span className="text-[9px] text-blue-100 block">تحقق موقع 30م • جهاز واحد</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#DCE7FA] shadow-xs">
                    <span className="text-[11px] font-black text-[#0F2342] block">تنبيه تسليم متأخر</span>
                    <span className="text-[10px] text-[#E53935] block mt-0.5">
                      Assignment 2 OS — يقبل مع خصم 10%
                    </span>
                  </div>
                </>
              )}

              {activeScreen === 'schedule' && (
                <>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 text-center">
                    {['السبت 25', 'الأحد 26', 'الاثنين 27', 'الثلاثاء 28', 'الأربعاء 29'].map(
                      (d, idx) => (
                        <div
                          key={d}
                          className={`min-w-14 p-2 rounded-xl border text-[10px] font-bold ${
                            idx === 2
                              ? 'bg-[#0A4CB3] text-white border-[#0A4CB3]'
                              : 'bg-white text-[#0F2342] border-[#DCE7FA]'
                          }`}
                        >
                          {d}
                        </div>
                      )
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-xl border-r-4 border-r-[#0A4CB3] border border-[#DCE7FA] shadow-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <b className="text-xs text-[#0F2342]">CS101 Data Structures</b>
                      <span className="text-[10px] text-[#0A4CB3] font-bold">08:00 - 10:00</span>
                    </div>
                    <span className="text-[10px] text-[#6B7A90] block">د. محمد عبد العال • مدرج 302</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border-r-4 border-r-[#0D9488] border border-[#DCE7FA] shadow-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <b className="text-xs text-[#0F2342]">CS102 Computer Org</b>
                      <span className="text-[10px] text-[#0D9488] font-bold">10:30 - 12:30</span>
                    </div>
                    <span className="text-[10px] text-[#6B7A90] block">د. سارة مصطفى • قاعة 105</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border-r-4 border-r-[#7C3AED] border border-[#DCE7FA] shadow-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <b className="text-xs text-[#0F2342]">MATH101 Discrete Math</b>
                      <span className="text-[10px] text-[#7C3AED] font-bold">01:00 - 03:00</span>
                    </div>
                    <span className="text-[10px] text-[#6B7A90] block">د. أحمد شوقي • قاعة 210</span>
                  </div>
                </>
              )}

              {activeScreen === 'library' && (
                <>
                  <div className="p-2.5 bg-blue-50 border border-[#0A4CB3] rounded-xl text-[10px] text-[#0A4CB3] font-bold">
                    🔒 مكتبة قسم هندسة الحاسب — سنة 2 (مقيد بقسمك)
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#DCE7FA] shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black text-[10px]">
                        PDF
                      </span>
                      <div>
                        <b className="text-[11px] text-[#0F2342] block">Lecture 5 - Data Structures</b>
                        <span className="text-[9px] text-[#6B7A90]">CS101 • الأسبوع 5 • 2.4MB</span>
                      </div>
                    </div>
                    <span className="text-[#0A4CB3] font-black text-sm">↓</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#DCE7FA] shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-black text-[10px]">
                        PPT
                      </span>
                      <div>
                        <b className="text-[11px] text-[#0F2342] block">Chapter 3 - Operating Systems</b>
                        <span className="text-[9px] text-[#6B7A90]">CS102 • الأسبوع 4 • 5.8MB</span>
                      </div>
                    </div>
                    <span className="text-[#0A4CB3] font-black text-sm">↓</span>
                  </div>
                </>
              )}

              {activeScreen === 'community' && (
                <>
                  <div className="p-3 bg-white rounded-xl border border-[#DCE7FA] shadow-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#6B7A90]">
                      <b className="text-[#0F2342]">أحمد محمد</b>
                      <span>• منذ 3 ساعات</span>
                    </div>
                    <b className="text-[11px] text-[#0F2342] block leading-snug">
                      هل يمكنني استخدام مكتبة Pandas في تحليل البيانات لمشروع التخرج؟
                    </b>
                    <span className="text-[9px] text-[#0A4CB3] font-bold">5 ردود • 120 مشاهدة</span>
                  </div>

                  <div className="p-3 bg-[#F0FDF4] border border-[#15803D] rounded-xl shadow-xs space-y-1 text-[10px]">
                    <div className="flex justify-between items-center">
                      <b className="text-[#15803D]">د. سارة مصطفى</b>
                      <span className="text-[#15803D] font-bold">شارة دكتور ✓</span>
                    </div>
                    <p className="text-[#14532D] leading-relaxed">
                      نعم يا أحمد، Pandas من أفضل المكتبات عالمياً ومعتمدة بالكامل في المشروع.
                    </p>
                  </div>
                </>
              )}

              {activeScreen === 'attendance' && (
                <>
                  <div className="bg-gradient-to-br from-[#0A4CB3] to-[#5B9BFF] text-white p-5 rounded-2xl text-center space-y-2">
                    <b className="text-sm block">محاضرة هياكل البيانات CS101</b>
                    <span className="text-[10px] text-blue-100 block">الاثنين 08:00 • مدرج 302</span>
                    <div className="w-20 h-20 bg-white text-[#0A4CB3] rounded-2xl mx-auto flex items-center justify-center font-bold shadow-inner">
                      <QrCode className="w-12 h-12" />
                    </div>
                    <button className="w-full py-2.5 bg-white text-[#0A4CB3] font-black text-xs rounded-xl shadow-xs">
                      مسح الرمز الآن (تسجيل حضور)
                    </button>
                    <span className="text-[9px] text-blue-100 block">
                      صالح داخل القاعة فقط • تحقق موقع 30م • جهاز واحد
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#DCE7FA] text-[10px] space-y-1">
                    <b className="text-[#0F2342] block">سجل حضورك اليوم:</b>
                    <span className="text-emerald-700 font-bold block">✓ حاضر بنجاح بالـ QR (08:04 ص)</span>
                  </div>
                </>
              )}
            </div>

            {/* 5-Item Mobile Bottom Navigation Bar (as strict rule in wireframe) */}
            <div className="bg-white border-t border-[#DCE7FA] flex text-[10px] font-bold text-[#6B7A90]">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'schedule', label: 'الجدول' },
                { id: 'community', label: 'المجتمع' },
                { id: 'library', label: 'المكتبة' },
                { id: 'attendance', label: 'الحضور' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id as any)}
                  className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                    activeScreen === item.id ? 'text-[#0A4CB3] font-black' : 'hover:text-[#0F2342]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F2342] text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            إغلاق المحاكي والعودة للويب
          </button>
        </div>
      </div>
    </div>
  );
};
