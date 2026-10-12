import React, { useState } from 'react';
import { UniversityEvent } from '../types';
import { UNIVERSITY_EVENTS } from '../data/mockData';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Share2,
  Building,
  Check,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const [events, setEvents] = useState<UniversityEvent[]>(UNIVERSITY_EVENTS);
  const [activeFacultyTab, setActiveFacultyTab] = useState('engineering');

  const handleToggleInterest = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== id) return ev;
        const newInterested = !ev.isInterestedByUser;
        return {
          ...ev,
          isInterestedByUser: newInterested,
          interestedCount: newInterested ? ev.interestedCount + 1 : ev.interestedCount - 1,
        };
      })
    );
  };

  const faculties = [
    {
      id: 'engineering',
      name: 'كلية الهندسة',
      icon: '⚙️',
      headline: 'فوز فريق الروبوتيات بمسابقة الابتكار الدولية',
      description: 'حصد طلاب هندسة الحاسب المركز الأول في مسابقة الأنظمة الذكية المستقلة.',
      dean: 'أ.د. حسام عثمان',
      established: '1816 م',
      image: '/src/assets/images/faculty_engineering_1791793431664.jpg',
    },
    {
      id: 'medicine',
      name: 'كلية الطب (قصر العيني)',
      icon: '✚',
      headline: 'المؤتمر السنوي للجراحة الروبوتية المتقدمة',
      description: 'تنظيم ورش عمل سريرية لأحدث تقنيات المناظير والذكاء الاصطناعي في التشخيص.',
      dean: 'أ.د. حسام عبد الغفار',
      established: '1827 م',
      image: '/src/assets/images/cairo_university_campus_1791793417702.jpg',
    },
    {
      id: 'science',
      name: 'كلية العلوم',
      icon: '✿',
      headline: 'افتتاح معمل النانوتكنولوجي وتطبيقات الطاقة الخضراء',
      description: 'تجهيزات بحثية متقدمة لخدمة طلاب الدراسات العليا والباحثين في الفيزياء والكيمياء.',
      dean: 'أ.د. طارق مصطفى',
      established: '1925 م',
      image: '/src/assets/images/faculty_engineering_1791793431664.jpg',
    },
    {
      id: 'arts',
      name: 'كلية الآداب',
      icon: '✎',
      headline: 'انطلاق الموسم الثقافي وجائزة الإبداع والترجمة',
      description: 'سلسلة ندوات فكرية ومسابقات الترجمة الأدبية للغات الشرقية والأوروبية.',
      dean: 'أ.د. نجلاء رأفت',
      established: '1908 م',
      image: '/src/assets/images/cairo_university_campus_1791793417702.jpg',
    },
  ];

  const selectedFaculty = faculties.find((f) => f.id === activeFacultyTab) || faculties[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B7A90] mb-1">
            <span>الحياة الجامعية والمشاركات</span>
            <span>·</span>
            <span>جامعة القاهرة</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2342]">
            الفعاليات والأقسام العامة
          </h1>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            اكتشف المعارض والندوات المفتوحة لجميع طلاب كليات الجامعة والصفحات التعريفية للكليات.
          </p>
        </div>

        <div className="px-3.5 py-1.5 bg-[#EEF3FB] text-[#0A4CB3] rounded-full text-xs font-bold shrink-0">
          دخول مجاني لجميع طلاب جامعة القاهرة
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-[#0F2342] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0A4CB3]" />
          <span>أبرز الفعاليات والندوات القادمة</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-5 border border-[#DCE7FA] hover:border-[#0A4CB3] transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  {/* Date badge */}
                  <div className="w-14 h-14 rounded-2xl bg-[#EAF1FF] text-[#0A4CB3] flex flex-col items-center justify-center font-black shrink-0 shadow-xs">
                    <span className="text-xl leading-none font-mono tabular-nums">{ev.day}</span>
                    <span className="text-[11px] text-[#6B7A90] font-bold mt-0.5">{ev.month}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-[#0A4CB3]">{ev.faculty}</span>
                    <h3 className="text-sm font-extrabold text-[#0F2342] mt-0.5 leading-snug">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#6B7A90] pt-1 border-t border-[#EEF3FB]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-mono tabular-nums">{ev.timeRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EEF3FB] flex items-center justify-between gap-2">
                <span className="text-xs text-[#6B7A90] font-semibold">
                  <b className="text-[#0F2342] font-mono tabular-nums">{ev.interestedCount}</b> طالب مهتم
                </span>

                <button
                  onClick={() => handleToggleInterest(ev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    ev.isInterestedByUser
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#0A4CB3] hover:bg-[#083D91] text-white shadow-xs'
                  }`}
                >
                  {ev.isInterestedByUser ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>مسجل اهتمامك ✓</span>
                    </>
                  ) : (
                    <span>سجل اهتمام</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Faculty Hubs (Public Departments) */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs space-y-5">
        <div>
          <h2 className="text-base font-extrabold text-[#0F2342] flex items-center gap-2">
            <Building className="w-4 h-4 text-[#0A4CB3]" />
            <span>الصفحات العامة لكليات الجامعة</span>
          </h2>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            محتوى عام وإخباري متاح للجميع دون الدخول إلى المواد الأكاديمية التخصصية.
          </p>
        </div>

        {/* Faculty Tab Switcher */}
        <div className="flex flex-wrap gap-2">
          {faculties.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFacultyTab(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeFacultyTab === f.id
                  ? 'bg-[#0A4CB3] text-white shadow-xs'
                  : 'bg-[#F8FBFF] text-[#64748B] hover:text-[#0F2342] border border-[#DCE7FA]'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Faculty Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-[#F8FBFF] rounded-2xl border border-[#DCE7FA]">
          <div className="md:col-span-1 rounded-xl overflow-hidden h-44 md:h-auto relative shadow-xs">
            <img
              src={selectedFaculty.image}
              alt={selectedFaculty.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6B7A90]">
                <span>تأسست: {selectedFaculty.established}</span>
                <span>·</span>
                <span>عميد الكلية: {selectedFaculty.dean}</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#0F2342]">{selectedFaculty.name}</h3>
              <div className="p-3 bg-white rounded-xl border border-[#DCE7FA] text-xs space-y-1">
                <span className="font-extrabold text-[#0A4CB3] block">
                  أحدث الأخبار: {selectedFaculty.headline}
                </span>
                <p className="text-[#475569] leading-relaxed">{selectedFaculty.description}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#6B7A90]">
              <span>محتوى الصفحة عام (Public API)</span>
              <button
                onClick={() => alert(`جاري الانتقال للبوابة الإخبارية لـ ${selectedFaculty.name}`)}
                className="text-[#0A4CB3] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>زيارة صفحة الكلية</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
