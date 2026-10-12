import React, { useState } from 'react';
import { Assignment } from '../types';
import { INITIAL_ASSIGNMENTS } from '../data/mockData';
import {
  FileCheck,
  AlertTriangle,
  Clock,
  Upload,
  CheckCircle2,
  FileText,
  Calendar,
  ShieldCheck,
  HelpCircle,
  X,
} from 'lucide-react';

export const AssignmentsView: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'LATE' | 'SUBMITTED'>('ALL');
  
  // Modals
  const [activeUploadModal, setActiveUploadModal] = useState<Assignment | null>(null);
  const [activeExtensionModal, setActiveExtensionModal] = useState<Assignment | null>(null);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    receiptNo: string;
    courseCode: string;
    timestamp: string;
    assignmentTitle: string;
  } | null>(null);

  // Upload Form state
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadNotes, setUploadNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Extension Form state
  const [extensionReason, setExtensionReason] = useState('');
  const [extensionSubmitted, setExtensionSubmitted] = useState(false);

  const filteredAssignments = assignments.filter((asg) => {
    if (filter === 'UPCOMING') return asg.status === 'upcoming';
    if (filter === 'LATE') return asg.status === 'late';
    if (filter === 'SUBMITTED') return asg.status === 'submitted';
    return true;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUploadModal) return;
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      const generatedReceipt = `CU-ENG-${activeUploadModal.courseCode}-${Date.now().toString().slice(-5)}`;
      const nowStr = new Date().toLocaleString('ar-EG');

      // Update assignment status
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === activeUploadModal.id
            ? {
                ...a,
                status: 'submitted',
                submittedDate: nowStr,
                receiptNumber: generatedReceipt,
                score: Math.round(a.totalGrade * 0.9), // simulate preliminary grade
              }
            : a
        )
      );

      setSubmissionReceipt({
        receiptNo: generatedReceipt,
        courseCode: activeUploadModal.courseCode,
        timestamp: nowStr,
        assignmentTitle: activeUploadModal.title,
      });

      setActiveUploadModal(null);
      setSelectedFileName('');
      setUploadNotes('');
    }, 1200);
  };

  const handleExtensionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExtensionModal || !extensionReason.trim()) return;

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === activeExtensionModal.id ? { ...a, extensionRequested: true } : a
      )
    );

    setExtensionSubmitted(true);
    setTimeout(() => {
      setExtensionSubmitted(false);
      setActiveExtensionModal(null);
      setExtensionReason('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Policy Banner */}
      <div className="bg-[#FFF8E1] border-2 border-[#FFD54F] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-extrabold text-[#92400E]">
              تعليمات تسليم التكليفات والأبحاث الأكاديمية
            </h2>
            <p className="text-xs text-[#78350F] mt-1 leading-relaxed">
              جميع التسليمات تتم حصراً عبر هذه البوابة مع إصدار إيصال استلام رقمي وختم زمني معتمد.
              يمنع تماماً إرسال الواجبات عبر البريد الإلكتروني أو الواتساب لحفظ حقوق الطالب في التقييم.
            </p>
          </div>
        </div>
      </div>

      {/* Submission Receipt Success Banner */}
      {submissionReceipt && (
        <div className="bg-[#ECFDF5] border-2 border-[#10B981] rounded-2xl p-5 shadow-sm space-y-3 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#065F46] font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#059669]" />
              <span>إيصال استلام رسمي موثق (Official Submission Receipt)</span>
            </div>
            <button
              onClick={() => setSubmissionReceipt(null)}
              className="text-[#065F46] hover:text-black font-bold text-xs"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white/80 rounded-xl text-xs">
            <div>
              <span className="text-[#6B7A90] block">رقم الإيصال الأكاديمي:</span>
              <span className="font-mono font-black text-[#0A4CB3] text-sm tabular-nums">
                {submissionReceipt.receiptNo}
              </span>
            </div>
            <div>
              <span className="text-[#6B7A90] block">المقرر والتكليف:</span>
              <span className="font-bold text-[#0F2342]">
                {submissionReceipt.courseCode} — {submissionReceipt.assignmentTitle}
              </span>
            </div>
            <div>
              <span className="text-[#6B7A90] block">الختم الزمني للاستلام:</span>
              <span className="font-mono text-[#065F46] font-bold tabular-nums">
                {submissionReceipt.timestamp}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-[#DCE7FA] shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-[#F8FBFF] rounded-xl border border-[#DCE7FA] text-xs">
          {[
            { id: 'ALL', label: 'جميع المهام' },
            { id: 'UPCOMING', label: 'القادمة' },
            { id: 'LATE', label: 'المتأخرة' },
            { id: 'SUBMITTED', label: 'المُسلّمة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                filter === tab.id
                  ? 'bg-white text-[#0A4CB3] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F2342]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-[#6B7A90] hidden sm:inline">
          {filteredAssignments.length} تكليفات مسجلة
        </span>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => {
          const isSubmitted = asg.status === 'submitted';
          const isLate = asg.status === 'late';
          const isUpcoming = asg.status === 'upcoming';

          return (
            <div
              key={asg.id}
              className={`bg-white rounded-2xl p-5 border shadow-xs transition-all ${
                isLate
                  ? 'border-[#E53935]/50 bg-[#FFFBFB]'
                  : isSubmitted
                  ? 'border-[#DCE7FA]'
                  : 'border-[#DCE7FA]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEF3FB]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#0A4CB3]">{asg.courseCode}</span>
                    <span className="text-xs text-[#94A3B8]">·</span>
                    <span className="text-xs text-[#6B7A90] font-semibold">{asg.courseName}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#0F2342] mt-0.5">{asg.title}</h3>
                </div>

                {/* Status Badges */}
                <div className="shrink-0">
                  {isSubmitted && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-full text-xs font-black">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تم التسليم بنجاح</span>
                    </span>
                  )}
                  {isLate && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-full text-xs font-black">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>متأخر LATE</span>
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#EAF1FF] text-[#0A4CB3] rounded-full text-xs font-black">
                      <Clock className="w-3.5 h-3.5" />
                      <span>موعد قادم</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Sub-details */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1 text-[#6B7A90]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>تاريخ الاستحقاق: <b className="text-[#0F2342] font-mono tabular-nums">{asg.dueDate}</b></span>
                    <span>·</span>
                    <span>الدرجة الكلية: <b className="text-[#0F2342] font-mono tabular-nums">{asg.totalGrade} درجات</b></span>
                    {asg.score !== undefined && (
                      <>
                        <span>·</span>
                        <span className="text-[#15803D] font-bold">
                          الدرجة المحرزة: <b className="font-mono tabular-nums">{asg.score} / {asg.totalGrade}</b>
                        </span>
                      </>
                    )}
                  </div>

                  {asg.receiptNumber && (
                    <div className="text-[11px] text-[#0A4CB3] font-bold font-mono">
                      رقم الإيصال: {asg.receiptNumber} • سلمت في {asg.submittedDate}
                    </div>
                  )}

                  {asg.latePenaltyNote && (
                    <div className="text-[11px] text-[#DC2626] font-semibold">
                      {asg.latePenaltyNote}
                    </div>
                  )}

                  {asg.extensionRequested && (
                    <div className="text-[11px] text-amber-700 font-bold">
                      تم تقديم طلب تمديد للأستاذ وهو قيد المراجعة الأكاديمية
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  {isLate && (
                    <>
                      <button
                        onClick={() => setActiveUploadModal(asg)}
                        className="px-3.5 py-2 bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع التسليم الآن</span>
                      </button>
                      <button
                        onClick={() => setActiveExtensionModal(asg)}
                        className="px-3.5 py-2 bg-white border border-[#DCE7FA] hover:bg-slate-50 text-[#0F2342] font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-[#0A4CB3]" />
                        <span>طلب تمديد بعذر</span>
                      </button>
                    </>
                  )}

                  {isUpcoming && (
                    <button
                      onClick={() => setActiveUploadModal(asg)}
                      className="px-4 py-2 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع الحل مبكراً</span>
                    </button>
                  )}

                  {isSubmitted && (
                    <button
                      onClick={() =>
                        alert(`بيانات الإيصال الأكاديمي المعتمد:\nرقم: ${asg.receiptNumber}\nتاريخ التسليم: ${asg.submittedDate}`)
                      }
                      className="px-3.5 py-2 bg-[#EAF1FF] text-[#0A4CB3] font-bold text-xs rounded-xl hover:bg-[#DCE7FA] transition-all cursor-pointer"
                    >
                      عرض إيصال التسليم
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar for Score */}
              {asg.score !== undefined && (
                <div className="mt-3 w-full bg-[#EEF3FB] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#15803D] h-full rounded-full"
                    style={{ width: `${(asg.score / asg.totalGrade) * 100}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* UPLOAD MODAL */}
      {activeUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#DCE7FA] shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB] mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#0F2342] flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#0A4CB3]" />
                  <span>رفع ملف التكليف: {activeUploadModal.courseCode}</span>
                </h3>
                <p className="text-xs text-[#6B7A90] mt-0.5">{activeUploadModal.title}</p>
              </div>
              <button
                onClick={() => setActiveUploadModal(null)}
                className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Dropzone */}
              <div className="border-2 border-dashed border-[#0A4CB3]/40 rounded-xl p-6 text-center space-y-2 bg-[#F8FBFF]">
                <FileText className="w-8 h-8 text-[#0A4CB3] mx-auto opacity-70" />
                <div className="text-xs font-bold text-[#0F2342]">
                  اختر ملف الحل أو الكود البرمجي (PDF، ZIP، CPP، IPYNB)
                </div>
                <input
                  type="file"
                  required
                  id="assignment-file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFileName(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="assignment-file"
                  className="inline-block px-4 py-2 bg-white border border-[#DCE7FA] rounded-xl text-xs font-bold text-[#0A4CB3] hover:bg-blue-50 cursor-pointer shadow-xs"
                >
                  {selectedFileName ? `الملف المختار: ${selectedFileName}` : 'استعراض من الجهاز'}
                </label>
                <div className="text-[11px] text-[#6B7A90]">الحد الأقصى للحجم: 50 ميجابايت</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                  ملاحظات إضافية للأستاذ (اختياري):
                </label>
                <textarea
                  rows={2}
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                  placeholder="مثال: تم إرفاق تقرير الأداء ومقارنة التعقيد الزمني..."
                  className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'جاري التحقق وإصدار الإيصال...' : 'تأكيد التسليم واستخراج الإيصال'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveUploadModal(null)}
                  className="px-4 py-2.5 bg-slate-100 text-[#6B7A90] font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXTENSION REQUEST MODAL */}
      {activeExtensionModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#DCE7FA] shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB] mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#0F2342] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#0A4CB3]" />
                  <span>تقديم طلب تمديد رسمي بعذر</span>
                </h3>
                <p className="text-xs text-[#6B7A90] mt-0.5">{activeExtensionModal.title}</p>
              </div>
              <button
                onClick={() => setActiveExtensionModal(null)}
                className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {extensionSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-[#0F2342]">تم إرسال طلب التمديد!</h4>
                <p className="text-xs text-[#6B7A90]">
                  تم توجيه الطلب إلى أستاذ المقرر وسيصلك إشعار فوري في البوابة عند البت في الطلب.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExtensionSubmit} className="space-y-4">
                <div className="p-3 bg-[#FEF3C7] rounded-xl text-xs text-[#92400E] font-semibold leading-relaxed">
                  تنبيه: يتطلب قبول التمديد وجود سبب قهري موثق (عذر طبي، تعارض جداول معتمد) ويخضع لتقدير دكتور المادة.
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                    سبب طلب التمديد والمبرر الأكاديمي:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={extensionReason}
                    onChange={(e) => setExtensionReason(e.target.value)}
                    placeholder="اشرح السبب بالتفصيل، مثال: تعرضت لوعكة صحية طارئة ومرفق التقرير من الإدارة الطبية..."
                    className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    إرسال الطلب للأستاذ
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveExtensionModal(null)}
                    className="px-4 py-2.5 bg-slate-100 text-[#6B7A90] font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
