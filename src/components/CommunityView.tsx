import React, { useState } from 'react';
import { CommunityPost, CommunityReply } from '../types';
import { COMMUNITY_POSTS } from '../data/mockData';
import {
  MessageSquare,
  Send,
  PlusCircle,
  Heart,
  CheckCircle2,
  Filter,
  User,
  Share2,
  Sparkles,
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<'ALL' | 'QUESTIONS' | 'DOCTOR_ANSWERED'>('ALL');

  // New post modal
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'برمجة' | 'رياضيات' | 'ذكاء اصطناعي'>('برمجة');

  // Inline reply inputs
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesType =
      selectedType === 'ALL' ||
      (selectedType === 'DOCTOR_ANSWERED' && post.isAnsweredByDoctor);
    return matchesCat && matchesType;
  });

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: p.replies.map((r) =>
            r.id === replyId ? { ...r, likes: r.likes + 1 } : r
          ),
        };
      })
    );
  };

  const handleAddReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;

    const newReply: CommunityReply = {
      id: `rep_${Date.now()}`,
      authorName: 'أحمد محمد الشناوي',
      authorRole: 'student',
      content: text.trim(),
      timestamp: 'الآن',
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              repliesCount: p.repliesCount + 1,
              replies: [...p.replies, newReply],
            }
          : p
      )
    );

    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      authorName: 'أحمد محمد الشناوي',
      authorRole: 'student',
      authorDept: 'طالب — هندسة حاسب الفرقة الثانية',
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      timestamp: 'الآن',
      repliesCount: 0,
      views: 1,
      likes: 0,
      isAnsweredByDoctor: false,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#DCE7FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B7A90] mb-1">
            <span>المجتمع الأكاديمي التفاعلي</span>
            <span>·</span>
            <span>قسم هندسة الحاسب</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2342]">
            مجتمع الأسئلة والنقاشات الأكاديمية
          </h1>
          <p className="text-xs text-[#6B7A90] mt-0.5">
            اسأل، ناقش، وتفاعل مباشرة مع زملائك وأعضاء هيئة التدريس المعتمدين.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white rounded-xl text-xs font-extrabold transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>طرح سؤال أو موضوع جديد</span>
        </button>
      </div>

      {/* Filter Chips & Type Controls (Buttons as required by design rules) */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE7FA] shadow-xs space-y-3">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#6B7A90] ml-1">التصنيف:</span>
          {[
            { id: 'ALL', label: 'جميع الأقسام' },
            { id: 'برمجة', label: 'البرمجة والخوارزميات' },
            { id: 'رياضيات', label: 'الرياضيات المتقطعة' },
            { id: 'ذكاء اصطناعي', label: 'الذكاء الاصطناعي' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0A4CB3] text-white shadow-xs'
                  : 'bg-[#F8FBFF] text-[#64748B] hover:text-[#0F2342] border border-[#DCE7FA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EEF3FB]">
          <span className="text-xs font-bold text-[#6B7A90] ml-1">العرض:</span>
          {[
            { id: 'ALL', label: 'الكل' },
            { id: 'DOCTOR_ANSWERED', label: 'إجابات الدكاترة المعتمدة فقط ✓' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedType === type.id
                  ? 'bg-[#EAF1FF] text-[#0A4CB3]'
                  : 'text-[#64748B] hover:text-[#0F2342]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE7FA] shadow-xs space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A4CB3] text-white flex items-center justify-center font-black text-sm shrink-0">
                  {post.authorName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#0F2342]">{post.authorName}</span>
                    <span className="text-xs text-[#94A3B8]">·</span>
                    <span className="text-xs text-[#6B7A90]">{post.authorDept}</span>
                  </div>
                  <div className="text-xs text-[#94A3B8] flex items-center gap-2 mt-0.5">
                    <span>{post.timestamp}</span>
                    <span>·</span>
                    <span className="text-[#0A4CB3] font-bold">مقرر {post.category}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleLikePost(post.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[#EEF3FB] text-xs font-bold text-[#E53935] transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-mono tabular-nums">{post.likes}</span>
              </button>
            </div>

            {/* Post Title & Content */}
            <div className="space-y-2">
              <h2 className="text-base font-extrabold text-[#0F2342]">{post.title}</h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Post Meta */}
            <div className="flex items-center gap-4 text-xs text-[#6B7A90] pt-2 border-t border-[#EEF3FB]">
              <span>{post.repliesCount} ردود</span>
              <span>·</span>
              <span>{post.views} مشاهدة</span>
            </div>

            {/* Replies Thread */}
            {post.replies.length > 0 && (
              <div className="space-y-3 pt-2">
                {post.replies.map((reply) => {
                  const isDoctor = reply.authorRole === 'doctor' || reply.isDoctorCertified;
                  return (
                    <div
                      key={reply.id}
                      className={`p-4 rounded-xl text-xs sm:text-sm transition-all ${
                        isDoctor
                          ? 'bg-[#F0FDF4] border-2 border-[#15803D] shadow-xs'
                          : 'bg-[#F8FBFF] border border-[#DCE7FA]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                              isDoctor ? 'bg-[#15803D]' : 'bg-[#7C3AED]'
                            }`}
                          >
                            {reply.authorName[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-extrabold ${
                                  isDoctor ? 'text-[#15803D]' : 'text-[#0F2342]'
                                }`}
                              >
                                {reply.authorName}
                              </span>
                              {isDoctor && (
                                <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#166534] text-[10px] font-black rounded-md flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>رد معتمد من الدكتور</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#6B7A90]">
                              {reply.authorBadge || 'طالب'} • {reply.timestamp}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLikeReply(post.id, reply.id)}
                          className="flex items-center gap-1 text-xs font-bold text-[#E53935] hover:opacity-80 cursor-pointer"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                          <span className="font-mono tabular-nums">{reply.likes}</span>
                        </button>
                      </div>

                      <p
                        className={`text-xs leading-relaxed ${
                          isDoctor ? 'text-[#14532D] font-medium' : 'text-[#334155]'
                        }`}
                      >
                        {reply.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Inline Reply Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="اكتب تعقيبك أو استفسارك هنا..."
                value={replyInputs[post.id] || ''}
                onChange={(e) =>
                  setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddReply(post.id);
                  }
                }}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DCE7FA] text-xs font-medium text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3] bg-[#F8FBFF]"
              />
              <button
                onClick={() => handleAddReply(post.id)}
                className="px-4 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE NEW POST MODAL */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#DCE7FA] shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF3FB] mb-4">
              <h3 className="text-base font-extrabold text-[#0F2342] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#0A4CB3]" />
                <span>طرح سؤال أو موضوع دراسي جديد</span>
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-[#6B7A90] hover:text-[#0F2342] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                  عنوان السؤال الرئيسي:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: كيف يتم تطبيق QuickSort في C++ وما أثر اختيار الـ Pivot؟"
                  className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                  المقرر والتصنيف:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                >
                  <option value="برمجة">البرمجة وهياكل البيانات (CS101 / CS102)</option>
                  <option value="رياضيات">الرياضيات المتقطعة (MATH101)</option>
                  <option value="ذكاء اصطناعي">الذكاء الاصطناعي (CS105)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B7A90] mb-1">
                  التفاصيل والشرح:
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="اكتب استفسارك بالتفصيل حتى يتمكن الدكتور والزملاء من تقديم إجابة دقيقة..."
                  className="w-full p-2.5 rounded-xl border border-[#DCE7FA] text-xs font-bold text-[#0F2342] focus:outline-2 focus:outline-[#0A4CB3]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0A4CB3] hover:bg-[#083D91] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
                >
                  نشر السؤال في المجتمع
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-[#6B7A90] font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
