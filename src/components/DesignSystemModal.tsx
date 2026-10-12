import React from 'react';
import { Palette, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-[#DCE7FA] shadow-2xl animate-in zoom-in-95 space-y-6 text-right">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB]">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#0A4CB3]" />
            <h2 className="text-lg font-black text-[#0F2342]">
              دليل التصميم الموحد (Unified Design System v2.0)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Colors Swatches */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-[#0F2342]">لوحة الألوان المعتمدة للبوابة</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-[#DCE7FA] bg-[#F8FBFF]">
              <div className="h-10 rounded-lg bg-[#0A4CB3] mb-2 shadow-xs" />
              <b className="text-[#0A4CB3] block">Primary #0A4CB3</b>
              <span className="text-[#6B7A90] text-[11px]">الأزرار والهيدر والروابط</span>
            </div>

            <div className="p-3 rounded-xl border border-[#DCE7FA] bg-[#F8FBFF]">
              <div className="h-10 rounded-lg bg-gradient-to-r from-[#0A4CB3] to-[#5B9BFF] mb-2 shadow-xs" />
              <b className="text-[#0A4CB3] block">Gradient #5B9BFF</b>
              <span className="text-[#6B7A90] text-[11px]">صندوق الـ QR والترحيب</span>
            </div>

            <div className="p-3 rounded-xl border border-[#DCE7FA] bg-[#F8FBFF]">
              <div className="h-10 rounded-lg bg-[#EEF3FB] border border-[#DCE7FA] mb-2" />
              <b className="text-[#0F2342] block">Background #EEF3FB</b>
              <span className="text-[#6B7A90] text-[11px]">خلفية الصفحات الهادئة</span>
            </div>

            <div className="p-3 rounded-xl border border-[#DCE7FA] bg-[#F8FBFF]">
              <div className="h-10 rounded-lg bg-[#15803D] mb-2 shadow-xs" />
              <b className="text-[#15803D] block">Success #15803D</b>
              <span className="text-[#6B7A90] text-[11px]">اعتماد الدكاترة والحضور</span>
            </div>
          </div>
        </div>

        {/* Typography Scale */}
        <div className="space-y-2 text-xs">
          <h3 className="text-sm font-extrabold text-[#0F2342]">الخط والقياسات الطباعية (Typography)</h3>
          <p className="text-[#6B7A90] leading-relaxed">
            الخط المعتمد: <b>Cairo (400, 600, 700, 800)</b> • عناوين الأقسام: 18-24px Bold • نصوص الشرح: 14-15px • البيانات الوصفية: 11-12px • جميع الصفحات والاتجاهات: <b>RTL</b>.
          </p>
        </div>

        {/* Architectural Principles */}
        <div className="space-y-3 p-4 bg-[#F8FBFF] rounded-xl border border-[#DCE7FA] text-xs space-y-2">
          <h4 className="font-extrabold text-[#0A4CB3]">قواعد صارمة للمنظومة (Architectural Invariants):</h4>
          <ul className="space-y-2 text-[#475569] list-disc list-inside">
            <li>
              <b>تقييد المكتبة بقسم الطالب:</b> لا يختار الطالب قسمه من قائمة، بل يؤخذ القسم والسنة من اعتماده الأكاديمي تلقائياً (هندسة حاسب - سنة 2).
            </li>
            <li>
              <b>قفل زر مسح الـ QR:</b> يُعطل زر تسجيل الحضور فور أول نقرة لمنع التكرار مع فحص النطاق الجغرافي (30 متراً) وبصمة جهاز الطالب.
            </li>
            <li>
              <b>الـ QR الدوار للدكتور:</b> يتغير رمز الاستجابة السريعة كل 20 ثانية لمنع تصويره من شاشة القاعة وتداوله خارجها.
            </li>
            <li>
              <b>إيصال استلام رقمي إلزامي:</b> كل واجب أو تسليم ينشئ إيصالاً موثقاً برقم جامعي وختم زمني فوري.
            </li>
            <li>
              <b>هوية ردود هيئة التدريس:</b> تمييز ردود الأساتذة بإطار أخضر وشارة معتمدة لمنع تضليل الطلاب.
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
        >
          فهمت ذلك، إغلاق الدليل
        </button>
      </div>
    </div>
  );
};
