# Smart University Portal — Cairo University | university-map

> A smart all-in-one university portal for students and faculty: schedules, smart QR attendance, department-scoped library, assignment submissions, and academic community.

line 3
>
> `to make the life ease`

**Repo:** https://github.com/hoba101/university-map — branch `main` — generated from `google-gemini/aistudio-repository-template`

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Roles & Permissions](#roles--permissions)
- [Key Business Rules](#key-business-rules)
- [Design System](#design-system)
- [Scripts](#scripts)
- [AI Studio Notes](#ai-studio-notes)

## Overview

A fully Arabic RTL web UI for Cairo University - Faculty of Engineering that puts a student's daily life in one place instead of scattered groups and PDFs:

A 2nd-year Computer Engineering student (`2024CS015`) opens the dashboard and finds today's lectures + late assignments + only his department's files + his department's community questions + university events, and records attendance by scanning the lecture QR.

Doctors get a dedicated portal: open a lecture with a rotating QR, manually register students with no phone, and approve student files.

All data is currently `mock` from `src/data/mockData.ts` — no backend yet. Ready to plug into a real `v1` API.

## Features

| Module | File | Description |
|---|---|---|
| Dashboard | `DashboardView.tsx` | Today's lectures + assignments + events + community posts + quick scan-attendance button |
| Schedule | `ScheduleView.tsx` | Weekly timetable with days, halls, and doctors |
| Library | `LibraryView.tsx` | Books/slides for your department only, filter by course, week, and type |
| Attendance | `AttendanceView.tsx` | QR scan for students + open/close lecture for doctors + `present_qr / late / manual_audit / absent` log |
| Assignments | `AssignmentsView.tsx` | `submitted / late / upcoming` + receipt number + extension request + late penalty |
| Community | `CommunityView.tsx` | Questions and discussions + doctor-certified answers `isDoctorCertified` |
| Doctor Portal | `DoctorPortalView.tsx` | Active lecture + live attendance + manual entry + contribution approvals |
| Events | `EventsView.tsx` | Seminars and fairs + interested button `interestedCount` |
| Profile | `ProfileView.tsx` | Code, department, year + attendance rate + GPA + registered devices |
| Settings | `SettingsView.tsx` | Language, font, notifications, MFA, password change |
| Notifications | `NotificationsModal.tsx` | Filter `schedule / library / community / late` + mark all as read |
| Design System | `DesignSystemModal.tsx` | Unified colors, fonts, and components |
| Mobile Simulator | `MobileSimulatorModal.tsx` | Preview the mobile layout inside the web |
| Navbar | `Navbar.tsx` | Top bar + `student / doctor` switch + 5-item mobile bottom bar |

## Tech Stack

- **Frontend:** React `19.0.1` + React DOM + TypeScript `ES2022` + Vite `8.3.0` + `@vitejs/plugin-react 6.1.1`
- **Styling:** Tailwind CSS `4.3.3` + `@tailwindcss/vite` + `index.css` CSS variables + `Cairo + JetBrains Mono` fonts
- **Icons/Anim:** `lucide-react 0.546.0` + `motion 12.23.24`
- **AI/Server:** `@google/genai 2.4.0` + `express 4.21.2` + `dotenv 17.2.3`
- **Dev:** `tsx`, `esbuild`, `autoprefixer`, `@types/*`

## File Structure

```
university-map/
├── index.html              # Vite entry + RTL + Cairo + #root + /src/main.tsx
├── metadata.json           # Portal name/description + MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API
├── package.json            # react-example 0.0.0 + dev/build/preview/clean/lint scripts
├── vite.config.ts          # react + tailwind + @ alias + HMR/DISABLE_HMR
├── tsconfig.json           # ES2022 + bundler + react-jsx + @/* + noEmit
├── .env.example            # GEMINI_API_KEY + APP_URL
├── .gitignore              # node_modules/dist/.env/*.log
└── src/
    ├── main.tsx            # createRoot(App) + index.css
    ├── index.css           # Color variables + scrollbar
    ├── App.tsx             # Role switch + 10 tabs + navbar + footer + modals
    ├── types/index.ts      # UserRole + 11 interfaces (StudentProfile/DoctorProfile/CourseSlot/LibraryMaterial/Assignment/AttendanceRecord/CommunityPost/Reply/Event/Notification/Contribution)
    ├── data/mockData.ts    # All mock data: INITIAL_STUDENT/DOCTOR/WEEKLY_SCHEDULE/ASSIGNMENTS/EVENTS/POSTS/NOTIFICATIONS
    ├── components/
    │   ├── Navbar.tsx
    │   ├── DashboardView.tsx
    │   ├── ScheduleView.tsx
    │   ├── LibraryView.tsx
    │   ├── AttendanceView.tsx
    │   ├── AssignmentsView.tsx
    │   ├── CommunityView.tsx
    │   ├── DoctorPortalView.tsx
    │   ├── EventsView.tsx
    │   ├── ProfileView.tsx
    │   ├── SettingsView.tsx
    │   ├── NotificationsModal.tsx
    │   ├── DesignSystemModal.tsx
    │   └── MobileSimulatorModal.tsx
    └── assets/             # Currently empty
```

## Quick Start

```bash
git clone https://github.com/hoba101/university-map.git
cd university-map
npm install
cp .env.example .env
# Put your key inside .env
npm run dev      # http://localhost:3000 --host 0.0.0.0
npm run build    # production dist/
npm run preview  # preview production build
npm run lint     # tsc --noEmit
npm run clean    # remove dist
```

## Environment Variables

| Variable | Source | Usage |
|---|---|---|
| `GEMINI_API_KEY` | Secrets in AI Studio | Server-side Gemini calls only, never expose in frontend |
| `APP_URL` | Auto-injected Cloud Run URL | Self-referential links + OAuth callbacks + endpoints |
| `DISABLE_HMR` | `true` in AI Studio | Disables HMR and file watching to avoid flicker during agent edits |

## Roles & Permissions

- `student`: dashboard + schedule + own-department library + QR attendance + assignments + community + events + profile + settings.
- `doctor`: everything above + `DoctorPortalView` (open/close lecture + manual entry + file approvals). Switched from `Navbar` via `handleRoleToggle` in `App.tsx`.

One device fingerprint `deviceFingerprint` per user — one student = one device to prevent attendance fraud.

## Key Business Rules

1. **Library scoped to department + year:** every `LibraryMaterial` has `restrictedDept + restrictedYear` (Computer Engineering - Year 2). Students never pick the department, filtering comes from their account.
2. **4 attendance states:** `present_qr` via QR scan + `late` + `manual_audit` via doctor manual entry with reason + auto `absent` after close. Every manual entry is audited.
3. **Assignments with receipt:** `receiptNumber` + timestamp after upload, late shows `latePenaltyNote` and extension-request button.
4. **Community with certified answers:** doctor replies flagged `isDoctorCertified + isAnsweredByDoctor`.
5. **4 notification types:** `schedule / library / community / late` — late is red.

## Design System

- **Full RTL** `lang="ar" dir="rtl"` + Cairo font (400-900) and `JetBrains Mono` for code.
- **Colors:** `--primary #0A4CB3` / `--primary-light #5B9BFF` / `--primary-dark #083D91` / background `#EEF3FB` / cards `#FFFFFF` / text `#0F2342` / muted `#6B7A90` / border `#DCE7FA` — light morning mode only.
- **Rules:** `rounded-2xl` cards + soft shadow + Cairo University footer `Better Education .. A Wider Future • 2026/2027` + 5-item mobile bottom nav.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview` |
| `npm run clean` | `rm -rf dist` |
| `npm run lint` | `tsc --noEmit` |

## AI Studio Notes

- Generated from the AI Studio template, do not edit the `DISABLE_HMR` block in `vite.config.ts`.
- `metadata.json` requires `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` — all Gemini calls must be server-side.
- The original repo has no `README`, `LICENSE`, or tests — this file is a proposed doc, push it via PR.
- Suggested next step: replace `mockData` with a real API `GET /library?week&type&search` filtered by JWT + `Swagger /swagger.json` to generate types.
-------------------------------------------------------------------------------------------------------------------------------------------------------------
# البوابة الجامعية الذكية — جامعة القاهرة | university-map

> بوابة جامعية ذكية متكاملة للطلاب وأعضاء هيئة التدريس: الجداول، الحضور الذكي بالـ QR، المكتبة التخصصية، تسليم المهام والمجتمع الأكاديمي.
>
> `to make the life ease`

**الريبو:** https://github.com/hoba101/university-map — فرع `main` — قالب مولّد من `google-gemini/aistudio-repository-template`

---

## المحتويات

- [الفكرة](#الفكرة)
- [المميزات](#المميزات)
- [التقنيات](#التقنيات)
- [هيكل الملفات](#هيكل-الملفات)
- [التشغيل السريع](#التشغيل-السريع)
- [متغيرات البيئة](#متغيرات-البيئة)
- [الأدوار والصلاحيات](#الأدوار-والصلاحيات)
- [قواعد البيزنس المهمة](#قواعد-البيزنس-المهمة)
- [نظام التصميم](#نظام-التصميم)
- [السكريبتات](#السكريبتات)
- [ملاحظات AI Studio](#ملاحظات-ai-studio)

## الفكرة

واجهة ويب عربية كاملة RTL لجامعة القاهرة - كلية الهندسة، تجمع حياة الطالب اليومية في مكان واحد بدل التشتت بين الجروبات والـ PDFs:

طالب سنة 2 هندسة حاسب (`2024CS015`) يفتح الرئيسية يلاقي محاضرات النهاردة + مهام متأخرة + ملفات قسمه فقط + أسئلة مجتمع قسمه + فعاليات الجامعة، ويسجل حضوره بمسح QR المحاضرة.

الدكتور له بوابة خاصة: يفتح محاضرة بـ QR دوّار، يسجل يدوي لمن لا يملك هاتف، ويعتمد ملفات الطلاب.

كل البيانات حالياً `mock` من `src/data/mockData.ts` — لا باك إند بعد. جاهزة للربط بـ API حقيقي `v1`.

## المميزات

| الوحدة | الملف | الوصف |
|---|---|---|
| الرئيسية Dashboard | `DashboardView.tsx` | محاضرات اليوم + مهام + فعاليات + بوستات مجتمع + زر مسح حضور سريع |
| الجدول | `ScheduleView.tsx` | جدول أسبوعي بالأيام والقاعات والدكاترة |
| المكتبة | `LibraryView.tsx` | كتب/سلايدات مواد قسمك فقط، فلترة بالمادة والأسبوع والنوع |
| الحضور | `AttendanceView.tsx` | مسح QR للطالب + فتح/قفل محاضرة للدكتور + سجل `present_qr / late / manual_audit / absent` |
| المهام | `AssignmentsView.tsx` | `submitted / late / upcoming` + رقم إيصال + طلب تمديد + خصم تأخير |
| المجتمع | `CommunityView.tsx` | أسئلة ومناقشات + ردود معتمدة من الدكتور `isDoctorCertified` |
| بوابة الدكتور | `DoctorPortalView.tsx` | المحاضرة النشطة + الحضور اللحظي + التسجيل اليدوي + اعتماد مساهمات |
| الفعاليات | `EventsView.tsx` | ندوات ومعارض + زر مهتم `interestedCount` |
| حسابي | `ProfileView.tsx` | الكود والقسم والسنة + نسبة الحضور + GPA + الأجهزة المسجلة |
| الإعدادات | `SettingsView.tsx` | اللغة والخط والإشعارات و MFA وتغيير الباسورد |
| الإشعارات | `NotificationsModal.tsx` | فلترة `جدول / مكتبة / مجتمع / تأخير` + تعليم الكل مقروء |
| دليل التصميم | `DesignSystemModal.tsx` | الألوان والخطوط والمكونات الموحدة |
| محاكي الموبايل | `MobileSimulatorModal.tsx` | معاينة شكل الموبايل داخل الويب |
| النافبار | `Navbar.tsx` | علوي + تبديل `student / doctor` + سفلي للموبايل 5 عناصر |

## التقنيات

- **Frontend:** React `19.0.1` + React DOM + TypeScript `ES2022` + Vite `8.3.0` + `@vitejs/plugin-react 6.1.1`
- **Styling:** Tailwind CSS `4.3.3` + `@tailwindcss/vite` + `index.css` بمتغيرات CSS + خط `Cairo + JetBrains Mono`
- **Icons/Anim:** `lucide-react 0.546.0` + `motion 12.23.24`
- **AI/Server:** `@google/genai 2.4.0` + `express 4.21.2` + `dotenv 17.2.3`
- **Dev:** `tsx`, `esbuild`, `autoprefixer`, `@types/*`

## هيكل الملفات

```
university-map/
├── index.html              # دخلة Vite + RTL + Cairo + #root + /src/main.tsx
├── metadata.json           # اسم ووصف البوابة + MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API
├── package.json            # react-example 0.0.0 + scripts dev/build/preview/clean/lint
├── vite.config.ts          # react + tailwind + alias @ + HMR/DISABLE_HMR
├── tsconfig.json           # ES2022 + bundler + react-jsx + @/* + noEmit
├── .env.example            # GEMINI_API_KEY + APP_URL
├── .gitignore              # node_modules/dist/.env/*.log
└── src/
    ├── main.tsx            # createRoot(App) + index.css
    ├── index.css           # متغيرات الألوان + scrollbar
    ├── App.tsx             # تبديل الدور + التبويبات العشرة + نافبار + فوتر + مودالات
    ├── types/index.ts      # UserRole + 11 interface (StudentProfile/DoctorProfile/CourseSlot/LibraryMaterial/Assignment/AttendanceRecord/CommunityPost/Reply/Event/Notification/Contribution)
    ├── data/mockData.ts    # كل البيانات التجريبية: INITIAL_STUDENT/DOCTOR/WEEKLY_SCHEDULE/ASSIGNMENTS/EVENTS/POSTS/NOTIFICATIONS
    ├── components/
    │   ├── Navbar.tsx
    │   ├── DashboardView.tsx
    │   ├── ScheduleView.tsx
    │   ├── LibraryView.tsx
    │   ├── AttendanceView.tsx
    │   ├── AssignmentsView.tsx
    │   ├── CommunityView.tsx
    │   ├── DoctorPortalView.tsx
    │   ├── EventsView.tsx
    │   ├── ProfileView.tsx
    │   ├── SettingsView.tsx
    │   ├── NotificationsModal.tsx
    │   ├── DesignSystemModal.tsx
    │   └── MobileSimulatorModal.tsx
    └── assets/             # فارغ حالياً
```

## التشغيل السريع

```bash
git clone https://github.com/hoba101/university-map.git
cd university-map
npm install
cp .env.example .env
# حط مفتاحك في .env
npm run dev      # http://localhost:3000 --host 0.0.0.0
npm run build    # إنتاج dist/
npm run preview  # معاينة الإنتاج
npm run lint     # tsc --noEmit
npm run clean    # مسح dist
```

## متغيرات البيئة

| المتغير | منين | الاستخدام |
|---|---|---|
| `GEMINI_API_KEY` | Secrets في AI Studio | مكالمات Gemini من السيرفر فقط، لا تحطه في الفرونت |
| `APP_URL` | يحقن تلقائياً Cloud Run URL | روابط ذاتية + OAuth callbacks + endpoints |
| `DISABLE_HMR` | `true` في AI Studio | يقفل HMR و file watching لمنع الوميض أثناء تعديل الـ agent |

## الأدوار والصلاحيات

- `student`: داشبورد + جدول + مكتبة قسمه + حضور QR + مهام + مجتمع + فعاليات + حسابي + إعدادات.
- `doctor`: كل ما سبق + `DoctorPortalView` (فتح/قفل محاضرة + تسجيل manual + اعتماد ملفات). التبديل من `Navbar` بزر `handleRoleToggle` في `App.tsx`.

الجهاز مربوط ببصمة واحدة `deviceFingerprint` — طالب واحد = جهاز واحد لمنع تزوير الحضور.

## قواعد البيزنس المهمة

1. **المكتبة مقيدة بالقسم والسنة:** كل `LibraryMaterial` فيه `restrictedDept + restrictedYear` (هندسة الحاسب - سنة 2). الطالب لا يختار القسم، الفلترة من حسابه فقط.
2. **الحضور 4 حالات:** `present_qr` بمسح QR + `late` متأخر + `manual_audit` بتسجيل الدكتور اليدوي مع السبب + `absent` تلقائي بعد القفل. كل يدوي يتسجل audit.
3. **المهام بإيصال:** بعد الرفع رقم `receiptNumber` + ختم زمني، المتأخر `latePenaltyNote` وزر طلب تمديد.
4. **المجتمع بإجابة معتمدة:** رد الدكتور مميز `isDoctorCertified + isAnsweredByDoctor`.
5. **الإشعارات 4 أنواع:** `جدول / مكتبة / مجتمع / تأخير` — المتأخر أحمر.

## نظام التصميم

- **RTL كامل** `lang="ar" dir="rtl"` + خط Cairo (400-900) ونصوص كود `JetBrains Mono`.
- **الألوان:** `--primary #0A4CB3` / `--primary-light #5B9BFF` / `--primary-dark #083D91` / الخلفية `#EEF3FB` / الكروت `#FFFFFF` / النص `#0F2342` / الرمادي `#6B7A90` / الحدود `#DCE7FA` — مود صباحي فاتح فقط.
- **القواعد:** كروت `rounded-2xl` + ظل خفيف + فوتر هوية جامعة القاهرة `Better Education .. A Wider Future • 2026/2027` + نافبار سفلي 5 عناصر للموبايل.

## السكريبتات

| الأمر | الوصف |
|---|---|
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview` |
| `npm run clean` | `rm -rf dist` |
| `npm run lint` | `tsc --noEmit` |

## ملاحظات AI Studio

- المشروع مولّد من قالب AI Studio، `vite.config.ts` لا تعدل جزء `DISABLE_HMR`.
- `metadata.json` يطلب صلاحية `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` — أي استدعاء Gemini يكون server-side فقط.
- لا يوجد `README` أو `LICENSE` أو تستات في الريبو الأصلي — الملف ده مقترح توثيق، ارفعه ب PR.
- الخطوة الجاية المقترحة: ربط `mockData` بـ API حقيقي `GET /library?week&type&search` بفلترة JWT + `Swagger /swagger.json` لتوليد Types.
