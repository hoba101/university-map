import React, { useState } from 'react';
import {
  Bell,
  Globe,
  Shield,
  Eye,
  KeyRound,
  Smartphone,
  CheckCircle,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [reminders48h, setReminders48h] = useState(true);
  const [newFileAlert, setNewFileAlert] = useState(true);
  const [communityReplyAlert, setCommunityReplyAlert] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [showNameInCommunity, setShowNameInCommunity] = useState(true);
  const [showProfileOtherDepts, setShowProfileOtherDepts] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [font, setFont] = useState('Cairo');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2342]">إعدادات البوابة والحساب</h1>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            تحكم في تنبيهات المحاضرات، التحقق الأمني، وخيارات العرض والخصوصية.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#0A4CB3] hover:bg-[#083D91] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          حفظ التغييرات
        </button>
      </div>

      {savedToast && (
        <div className="p-4 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-[#059669]" />
          <span>تم حفظ الإعدادات بنجاح وتطبيق التفضيلات على حسابك الأكاديمي.</span>
        </div>
      )}

      {/* Notifications Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold text-[#0F2342] flex items-center gap-2 pb-2 border-b border-[#EEF3FB]">
          <Bell className="w-4 h-4 text-[#0A4CB3]" />
          <span>تفضيلات الإشعارات والتنبيهات</span>
        </h2>

        <div className="space-y-3 divide-y divide-[#EEF3FB]">
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-extrabold text-[#0F2342] block">
                تذكير المحاضرات المسبق (T-48h)
              </span>
              <span className="text-[11px] text-[#6B7A90]">
                إرسال تنبيه قبل 48 ساعة من مواعيد المحاضرات والتسليمات الهامة.
              </span>
            </div>
            <button
              onClick={() => setReminders48h(!reminders48h)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                reminders48h ? 'bg-[#0A4CB3]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  reminders48h ? 'right-6.5' : 'right-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-extrabold text-[#0F2342] block">
                إشعار إضافة مراجع وملفات جديدة في موادك
              </span>
              <span className="text-[11px] text-[#6B7A90]">
                تنبيه فوري بمجرد رفع أستاذ المقرر سلايدات أو شيتات في مكتبة القسم.
              </span>
            </div>
            <button
              onClick={() => setNewFileAlert(!newFileAlert)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                newFileAlert ? 'bg-[#0A4CB3]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  newFileAlert ? 'right-6.5' : 'right-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-extrabold text-[#0F2342] block">
                تنبيه رد الدكتور أو المعيد في المنتدى
              </span>
              <span className="text-[11px] text-[#6B7A90]">
                إشعار فوري عند اعتماد إجابة أو إضافة تعليق من عضو هيئة تدريس.
              </span>
            </div>
            <button
              onClick={() => setCommunityReplyAlert(!communityReplyAlert)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                communityReplyAlert ? 'bg-[#0A4CB3]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  communityReplyAlert ? 'right-6.5' : 'right-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-xs font-extrabold text-[#0F2342] block">
                ملخص يومي مجمع (Digest) بدلاً من الفوري
              </span>
              <span className="text-[11px] text-[#6B7A90]">
                تجميع التحديثات في رسالة واحدة كل صباح.
              </span>
            </div>
            <button
              onClick={() => setDailyDigest(!dailyDigest)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                dailyDigest ? 'bg-[#0A4CB3]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  dailyDigest ? 'right-6.5' : 'right-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Language and Font Display */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold text-[#0F2342] flex items-center gap-2 pb-2 border-b border-[#EEF3FB]">
          <Globe className="w-4 h-4 text-[#0A4CB3]" />
          <span>اللغة والعرض المرئي</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#6B7A90] mb-1">لغة الواجهة:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342]"
            >
              <option value="ar">العربية (اللغة الرسمية للبوابة)</option>
              <option value="en">English (Partial terminology support)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B7A90] mb-1">نوع الخط العربي:</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342]"
            >
              <option value="Cairo">خط Cairo المعتمد (الافتراضي الرسمي)</option>
              <option value="Tajawal">خط Tajawal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security and MFA */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold text-[#0F2342] flex items-center gap-2 pb-2 border-b border-[#EEF3FB]">
          <Shield className="w-4 h-4 text-[#0A4CB3]" />
          <span>الأمان والتحقق الثنائي (2FA MFA)</span>
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-[#0F2342] block">
              التحقق بخطوتين (Two-Factor Authentication)
            </span>
            <span className="text-[11px] text-[#6B7A90]">
              طلب رمز تأكيد إضافي عبر OTP عند تسجيل الدخول من جهاز جديد.
            </span>
          </div>
          <button
            onClick={() => setMfaEnabled(!mfaEnabled)}
            className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
              mfaEnabled ? 'bg-[#0A4CB3]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                mfaEnabled ? 'right-6.5' : 'right-1'
              }`}
            />
          </button>
        </div>

        <div className="pt-3 border-t border-[#EEF3FB] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-[#0F2342] block">الأجهزة المرتبطة:</span>
            <span className="text-[#6B7A90]">جهاز واحد نشط: Samsung Galaxy S23 (كود معتمد #EG-882)</span>
          </div>

          <button
            onClick={() => alert('تم إرسال طلب إعادة تعيين كلمة المرور إلى بريدك الجامعي الرسمي.')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F2342] font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>تغيير كلمة المرور</span>
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold text-[#0F2342] flex items-center gap-2 pb-2 border-b border-[#EEF3FB]">
          <Eye className="w-4 h-4 text-[#0A4CB3]" />
          <span>الخصوصية والظهور</span>
        </h2>

        <div className="space-y-3 divide-y divide-[#EEF3FB]">
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-[#0F2342]">إظهار اسمي الحقيقي في المنتدى الأكاديمي</span>
            <button
              onClick={() => setShowNameInCommunity(!showNameInCommunity)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                showNameInCommunity ? 'bg-[#0A4CB3]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  showNameInCommunity ? 'right-6.5' : 'right-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-xs font-bold text-[#0F2342]">إظهار ملفي لطلاب الأقسام الأخرى</span>
            <button
              onClick={() => setShowProfileOtherDepts(!showProfileOtherDepts)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                showProfileOtherDepts ? 'bg-[#0A4CB3]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  showProfileOtherDepts ? 'right-6.5' : 'right-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
