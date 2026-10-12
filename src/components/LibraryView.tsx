import React, { useState } from 'react';
import { LibraryMaterial } from '../types';
import { LIBRARY_MATERIALS } from '../data/mockData';
import {
  Lock,
  Search,
  Download,
  Filter,
  FileText,
  FileSpreadsheet,
  Archive,
  Upload,
  CheckCircle,
  Clock,
  Check,
} from 'lucide-react';

export const LibraryView: React.FC = () => {
  const [materials, setMaterials] = useState<LibraryMaterial[]>(LIBRARY_MATERIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<'ALL' | 'PDF' | 'PPT' | 'ZIP'>('ALL');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [selectedWeek, setSelectedWeek] = useState('ALL');
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCourse, setUploadCourse] = useState('CS101');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = formatFilter === 'ALL' || m.format === formatFilter;
    const matchesCourse = selectedCourse === 'ALL' || m.courseCode === selectedCourse;
    const matchesWeek = selectedWeek === 'ALL' || m.week.toString() === selectedWeek;
    return matchesSearch && matchesFormat && matchesCourse && matchesWeek;
  });

  const handleDownload = (mat: LibraryMaterial) => {
    // Increment local download count
    setMaterials((prev) =>
      prev.map((item) => (item.id === mat.id ? { ...item, downloads: item.downloads + 1 } : item))
    );
    setDownloadNotification(`جاري بدء تحميل: ${mat.title} (${mat.fileSize})`);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 3500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
      setUploadTitle('');
    }, 2000);
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'PDF':
        return {
          bg: 'bg-[#FEE2E2] text-[#DC2626]',
          icon: FileText,
          label: 'PDF',
        };
      case 'PPT':
        return {
          bg: 'bg-[#FFEDD5] text-[#EA580C]',
          icon: FileSpreadsheet,
          label: 'PPT',
        };
      case 'ZIP':
        return {
          bg: 'bg-[#F3E8FF] text-[#7E22CE]',
          icon: Archive,
          label: 'ZIP',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700',
          icon: FileText,
          label: format,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Strict Department Locking Banner */}
      <div className="bg-gradient-to-r from-[#EAF1FF] via-[#F4F8FF] to-white border-2 border-[#0A4CB3] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-[#0A4CB3]">
              مكتبة قسمك الأكاديمي: هندسة الحاسب — الفرقة الثانية
            </h2>
          </div>
          <p className="text-xs text-[#6B7A90] mt-1">
            وفقاً لسياسة الجامعة: تقتصر المكتبة حصرياً على مقررات ومراجع قسمك وسنتك الدراسية. تم
            حجب مراجع الأقسام الأخرى تلقائياً لمنع التشتت والخلط.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-1.5 bg-[#0A4CB3] text-white rounded-full text-xs font-black flex items-center gap-1.5 shadow-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>مقيد بقسمك 🔒</span>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3.5 py-1.5 bg-white border border-[#0A4CB3] text-[#0A4CB3] hover:bg-[#EEF3FB] rounded-full text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>رفع ملخص للاعتماد</span>
          </button>
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadNotification && (
        <div className="p-4 bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46] rounded-xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#059669]" />
            <span>{downloadNotification}</span>
          </div>
          <span className="text-[11px] text-[#047857]">تم توثيق طلب التحميل</span>
        </div>
      )}

      {/* Search and Filters Deck */}
      <div className="bg-white rounded-2xl p-5 border border-[#DCE7FA] shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6B7A90] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في كتب وملفات قسمك: اسم المقرر، موضوع المحاضرة، الأسبوع..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-[#DCE7FA] text-sm text-[#0F2342] placeholder-[#94A3B8] focus:outline-2 focus:outline-[#0A4CB3] bg-[#F8FBFF]"
          />
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Course select (Strictly from department) */}
          <div>
            <label className="block text-xs font-bold text-[#6B7A90] mb-1">المادة (من قسمك فقط):</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] bg-white focus:outline-2 focus:outline-[#0A4CB3]"
            >
              <option value="ALL">جميع مقررات هندسة الحاسب</option>
              <option value="CS101">CS101 — هياكل البيانات والخوارزميات</option>
              <option value="CS102">CS102 — تنظيم الحاسب وأنظمة التشغيل</option>
              <option value="CS105">CS105 — مقدمة الذكاء الاصطناعي</option>
              <option value="MATH101">MATH101 — الرياضيات المتقطعة</option>
              <option value="ENG101">ENG101 — اللغة الإنجليزية الفنية</option>
            </select>
          </div>

          {/* Week select */}
          <div>
            <label className="block text-xs font-bold text-[#6B7A90] mb-1">الأسبوع الدراسي:</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] bg-white focus:outline-2 focus:outline-[#0A4CB3]"
            >
              <option value="ALL">جميع الأسابيع الدراسية</option>
              <option value="1">الأسبوع الأول</option>
              <option value="2">الأسبوع الثاني</option>
              <option value="3">الأسبوع الثالث</option>
              <option value="4">الأسبوع الرابع</option>
              <option value="5">الأسبوع الخامس (الحالي)</option>
            </select>
          </div>

          {/* Format selector buttons */}
          <div>
            <label className="block text-xs font-bold text-[#6B7A90] mb-1">نوع الملف:</label>
            <div className="flex items-center gap-1 p-1 bg-[#F8FBFF] rounded-xl border border-[#DCE7FA]">
              {(['ALL', 'PDF', 'PPT', 'ZIP'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormatFilter(fmt)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    formatFilter === fmt
                      ? 'bg-white text-[#0A4CB3] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F2342]'
                  }`}
                >
                  {fmt === 'ALL' ? 'الكل' : fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((mat) => {
            const badge = getFormatBadge(mat.format);
            const Icon = badge.icon;
            return (
              <div
                key={mat.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE7FA] hover:border-[#0A4CB3] transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* File info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${badge.bg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#0A4CB3]">{mat.courseCode}</span>
                      <span className="text-xs text-[#94A3B8]">·</span>
                      <span className="text-xs text-[#6B7A90] truncate">{mat.courseName}</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#0F2342] mt-0.5 truncate">
                      {mat.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B7A90] mt-1.5">
                      <span>الأسبوع {mat.week}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{mat.fileSize}</span>
                      <span>·</span>
                      <span>رفع: {mat.uploadedBy}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{mat.downloads} تحميل</span>
                    </div>
                  </div>
                </div>

                {/* Download Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EEF3FB] shrink-0">
                  <button
                    onClick={() => handleDownload(mat)}
                    className="px-4 py-2 bg-[#EAF1FF] hover:bg-[#0A4CB3] text-[#0A4CB3] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل الملف</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-10 border border-[#DCE7FA] text-center space-y-2">
            <FileText className="w-10 h-10 text-[#6B7A90] mx-auto opacity-50" />
            <h3 className="text-sm font-extrabold text-[#0F2342]">لا توجد ملفات مطابقة لبحثك</h3>
            <p className="text-xs text-[#6B7A90]">
              تأكد من اختيار المادة والأسبوع المناسبين لقسم هندسة الحاسب.
            </p>
          </div>
        )}
      </div>

      {/* Upload Student Summary Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#DCE7FA] shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB] mb-4">
              <h3 className="text-base font-extrabold text-[#0F2342] flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0A4CB3]" />
                <span>رفع ملخص طلابي للاعتماد الأكاديمي</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {uploadSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-[#0F2342]">تم إرسال الملف بنجاح!</h4>
                <p className="text-xs text-[#6B7A90] leading-relaxed">
                  الملخص الآن في حالة <span className="font-bold text-amber-600">معلق (Pending)</span> للمراجعة من قبل
                  أستاذ المقرر. بمجرد اعتماده سيظهر لجميع زملائك في قسم هندسة الحاسب مع شارة مساهم معتمد.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="p-3 bg-[#EEF3FB] rounded-xl text-xs text-[#0A4CB3] font-semibold leading-relaxed">
                  يجب أن تكون الملخصات مطابقة للمنهج الدراسي المعتمد وخالية من الأخطاء العلمية ليتم اعتمادها من الدكتور.
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B7A90] mb-1">عنوان الملخص:</label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="مثال: ملخص خوارزميات الترتيب والبحث الثنائي - أسبوع 3"
                    className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B7A90] mb-1">المقرر الدراسي:</label>
                  <select
                    value={uploadCourse}
                    onChange={(e) => setUploadCourse(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342]"
                  >
                    <option value="CS101">CS101 — هياكل البيانات</option>
                    <option value="CS102">CS102 — تنظيم الحاسب والـ OS</option>
                    <option value="CS105">CS105 — الذكاء الاصطناعي</option>
                  </select>
                </div>

                {/* File Dropzone Simulator */}
                <div className="border-2 border-dashed border-[#DCE7FA] rounded-xl p-6 text-center space-y-2 bg-[#F8FBFF]">
                  <Upload className="w-8 h-8 text-[#0A4CB3] mx-auto opacity-70" />
                  <div className="text-xs font-bold text-[#0F2342]">
                    اسحب ملف الملخص هنا (PDF أو PPT)
                  </div>
                  <div className="text-[11px] text-[#6B7A90]">الحد الأقصى للملف: 25 ميجابايت</div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    إرسال للمراجعة الأكاديمية
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2.5 bg-slate-100 text-[#6B7A90] font-bold text-xs rounded-xl hover:bg-slate-200 transition-all cursor-pointer"
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
