export type UserRole = 'student' | 'doctor';

export interface StudentProfile {
  id: string;
  code: string; // e.g. 2024CS015
  name: string;
  department: string; // e.g. هندسة الحاسب
  faculty: string; // e.g. كلية الهندسة - جامعة القاهرة
  year: string; // e.g. السنة الثانية (الفرقة الثانية)
  academicStatus: 'نشط' | 'متعثر';
  avatarUrl: string;
  gpa: number;
  attendanceRate: number; // e.g. 85%
  coursesCount: number;
  downloadedFilesCount: number;
  approvedContributionsCount: number;
  deviceFingerprint: string; // e.g. Galaxy S23 (مسجل)
  mfaEnabled: boolean;
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string; // e.g. أستاذ مساعد - علوم الحاسب
  department: string;
  faculty: string;
  avatarUrl: string;
  coursesTaught: string[];
  activeLectureId?: string;
}

export interface CourseSlot {
  id: string;
  code: string; // CS101
  name: string;
  doctorName: string;
  dayOfWeek: 'السبت' | 'الأحد' | 'الاثنين' | 'الثلاثاء' | 'الأربعاء';
  timeStart: string; // 08:00
  timeEnd: string; // 10:00
  hall: string; // قاعة 302 هندسة
  colorVariant: 'primary' | 'teal' | 'purple' | 'amber';
  isToday?: boolean;
}

export interface LibraryMaterial {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  format: 'PDF' | 'PPT' | 'ZIP';
  fileSize: string;
  week: number;
  uploadDate: string;
  downloads: number;
  restrictedDept: string;
  restrictedYear: string;
  uploadedBy: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  dueDate: string;
  totalGrade: number;
  status: 'submitted' | 'late' | 'upcoming';
  submittedDate?: string;
  score?: number;
  latePenaltyNote?: string;
  receiptNumber?: string;
  extensionRequested?: boolean;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  courseCode: string;
  courseName: string;
  doctorName: string;
  status: 'present_qr' | 'late' | 'manual_audit' | 'absent';
  method: 'QR_SCANNED' | 'MANUAL_ENTRY' | 'AUTO_ABSENT';
  timestamp: string;
  hall: string;
  note?: string;
}

export interface CommunityReply {
  id: string;
  authorName: string;
  authorRole: 'doctor' | 'student' | 'ta';
  authorBadge?: string;
  content: string;
  timestamp: string;
  likes: number;
  isDoctorCertified?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: 'doctor' | 'student';
  authorDept: string;
  title: string;
  content: string;
  category: 'برمجة' | 'رياضيات' | 'ذكاء اصطناعي' | 'عام';
  timestamp: string;
  repliesCount: number;
  views: number;
  likes: number;
  isAnsweredByDoctor?: boolean;
  replies: CommunityReply[];
}

export interface StudentContribution {
  id: string;
  studentName: string;
  studentCode: string;
  title: string;
  courseCode: string;
  submittedAt: string;
  status: 'معلق' | 'معتمد' | 'مرفوض';
  fileUrl?: string;
}

export interface UniversityEvent {
  id: string;
  day: string; // 25
  month: string; // أكتوبر
  title: string;
  timeRange: string;
  location: string;
  faculty: string;
  isFree: boolean;
  interestedCount: number;
  isInterestedByUser?: boolean;
}

export interface PortalNotification {
  id: string;
  category: 'جدول' | 'مكتبة' | 'مجتمع' | 'تأخير';
  title: string;
  details: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
