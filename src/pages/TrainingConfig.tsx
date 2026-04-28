import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Plus, 
  X, 
  Save,
  PlayCircle,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface TrainingItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  coverUrl: string;
  createdAt: string;
}

export default function TrainingConfig() {
  const navigate = useNavigate();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<string[]>(['工艺标准', '良知素养']);
  const [category, setCategory] = useState('工艺标准');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ 
    id: string, 
    title: string, 
    type: 'training' | 'category',
    isWarning?: boolean 
  } | null>(null);

  const handleAddCategory = () => {
    if (newCatName.trim() && !categories.includes(newCatName.trim())) {
      setCategories(prev => [...prev, newCatName.trim()]);
      setCategory(newCatName.trim());
      setNewCatName('');
      setShowAddCategory(false);
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    // Check if any training items are using this category
    const isUsed = trainingList.some(item => item.category === catToDelete);
    if (isUsed) {
      setDeleteConfirm({ 
        id: catToDelete, 
        title: catToDelete, 
        type: 'category', 
        isWarning: true 
      });
      return;
    }

    setDeleteConfirm({ id: catToDelete, title: catToDelete, type: 'category', isWarning: false });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === 'training') {
      setTrainingList(prev => prev.filter(item => item.id !== deleteConfirm.id));
      if (editingId === deleteConfirm.id) {
        handleCancelEdit();
      }
    } else {
      setCategories(prev => prev.filter(c => c !== deleteConfirm.id));
      if (category === deleteConfirm.id) {
        setCategory(categories.find(c => c !== deleteConfirm.id) || '');
      }
    }
    setDeleteConfirm(null);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [trainingList, setTrainingList] = useState<TrainingItem[]>([
    {
      id: 'T1001',
      title: '水电施工标准工艺详解',
      category: '工艺标准',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      coverUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
      createdAt: '2026-04-20'
    },
    {
      id: 'T1002',
      title: '职业道德与良知养成',
      category: '良知素养',
      videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      coverUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop',
      createdAt: '2026-04-21'
    }
  ]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 500 * 1024 * 1024) {
        alert('视频文件不能超过 500MB');
        return;
      }
      setVideoFile(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('封面图片不能超过 10MB');
        return;
      }
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (item: TrainingItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setCoverPreview(item.coverUrl);
    // Clear specifically uploaded files as we are using URLs for existing items
    setVideoFile(null);
    setCoverFile(null);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setCategory('工艺标准');
    setVideoFile(null);
    setCoverFile(null);
    setCoverPreview(null);
    setShowErrors(false);
  };

  const handleSave = () => {
    // 验证所有字段是否填写完成
    const isTitleValid = !!title.trim();
    const isCategoryValid = !!category;
    // 封面：有新上传的文件，或者已有预览图
    const hasCover = !!coverFile || !!coverPreview;
    // 视频：新上传的文件，或者编辑模式下已有视频 URL
    const currentItem = trainingList.find(i => i.id === editingId);
    const hasVideo = !!videoFile || (!!editingId && currentItem && currentItem.videoUrl && currentItem.videoUrl !== '#');

    if (!isTitleValid || !isCategoryValid || !hasCover || !hasVideo) {
      setShowErrors(true);
      showToast('需要填写完成才能发布', 'error');
      return;
    }

    setShowErrors(false);

    if (editingId) {
      setTrainingList(trainingList.map(item => 
        item.id === editingId 
          ? { 
              ...item, 
              title, 
              category, 
              coverUrl: coverFile ? URL.createObjectURL(coverFile) : item.coverUrl,
              videoUrl: videoFile ? URL.createObjectURL(videoFile) : item.videoUrl
            } 
          : item
      ));
    } else {
      const newItem: TrainingItem = {
        id: `T${Date.now()}`,
        title,
        category,
        videoUrl: videoFile ? URL.createObjectURL(videoFile) : '#',
        coverUrl: coverPreview || '',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTrainingList([newItem, ...trainingList]);
    }
    
    showToast('发布成功', 'success');
    handleCancelEdit();
  };

  const handleDeleteTraining = (id: string, title: string) => {
    setDeleteConfirm({ id, title, type: 'training' });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/certs')}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-500 bg-white border border-slate-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">培训学习配置</h1>
          <p className="text-slate-500 text-sm mt-0.5">配置工匠入驻前的必修培训视频</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：新增配置表单 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {editingId ? <Save size={18} className="text-blue-600" /> : <Plus size={18} className="text-blue-600" />}
                {editingId ? '编辑培训视频' : '新增培训视频'}
              </div>
              {editingId && (
                <button 
                  onClick={handleCancelEdit}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  取消编辑
                </button>
              )}
            </h2>

            <div className="space-y-5">
              {/* 标题 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">培训标题</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (showErrors) setShowErrors(false);
                  }}
                  placeholder="请输入培训课程名称"
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm outline-none transition-all ${
                    showErrors && !title.trim() 
                      ? 'border-rose-500 ring-4 ring-rose-500/10' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                  }`}
                />
                {showErrors && !title.trim() && (
                  <p className="text-[10px] text-rose-500 font-bold mt-1.5 ml-1">请填写培训标题</p>
                )}
              </div>

              {/* 分类 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">培训分类</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <div key={cat} className="group/cat relative">
                      <button
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-2 pr-6 rounded-xl text-xs font-bold border transition-all ${
                          category === cat 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(cat);
                        }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-300 hover:text-red-500 opacity-0 group-hover/cat:opacity-100 transition-all"
                        title="删除分类"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {!showAddCategory ? (
                    <button
                      onClick={() => setShowAddCategory(true)}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all flex items-center gap-1"
                    >
                      <Plus size={14} />
                      新增
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-left-2 duration-200">
                      <input 
                        autoFocus
                        type="text" 
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                        placeholder="分类名称"
                        className="flex-1 px-3 py-2 bg-white border border-blue-200 rounded-xl text-xs outline-none"
                      />
                      <button 
                        onClick={handleAddCategory}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Save size={14} />
                      </button>
                      <button 
                        onClick={() => setShowAddCategory(false)}
                        className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 封面上传 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">上传封面</label>
                <div 
                  onClick={() => {
                    coverInputRef.current?.click();
                    if (showErrors) setShowErrors(false);
                  }}
                  className={`group relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                    (showErrors && !coverFile && !coverPreview)
                      ? 'border-rose-500 bg-rose-50/30'
                      : coverPreview 
                        ? 'border-blue-200 bg-blue-50/20' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {coverPreview ? (
                    <>
                      <img src={coverPreview} alt="Preview" className="w-full h-full object-cover rounded-[14px]" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[14px]">
                        <p className="text-white text-xs font-bold">点击更换封面</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={28} className="text-slate-400 mb-2" />
                      <p className="text-slate-500 text-xs font-medium">推荐 16:9 比例，最大 10MB</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={coverInputRef} 
                    onChange={handleCoverUpload} 
                    className="hidden" 
                  />
                </div>
              </div>

              {/* 视频上传 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">上传视频</label>
                <div 
                  onClick={() => {
                    videoInputRef.current?.click();
                    if (showErrors) setShowErrors(false);
                  }}
                  className={`px-4 py-4 rounded-2xl border-2 border-dashed flex items-center gap-3 cursor-pointer transition-all ${
                    (showErrors && !videoFile && (!editingId || (trainingList.find(i => i.id === editingId)?.videoUrl === '#')))
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : videoFile 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-500'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${videoFile ? 'bg-white shadow-sm' : 'bg-white'}`}>
                    <Video size={20} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold truncate">
                      {videoFile ? videoFile.name : '选择视频文件'}
                    </p>
                    <p className="text-[10px] opacity-70">支持 mp4, mov 格式，最大 500MB</p>
                  </div>
                  {videoFile && <PlayCircle size={18} className="text-emerald-500" />}
                  <input 
                    type="file" 
                    accept="video/*" 
                    ref={videoInputRef} 
                    onChange={handleVideoUpload} 
                    className="hidden" 
                  />
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="w-full py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-4"
              >
                发布
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：历史配置列表 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">已发布的培训列表</h2>
              <span className="text-[10px] bg-white border border-slate-200 text-slate-400 px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                共 {trainingList.length} 条记录
              </span>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              {trainingList.map((item) => (
                <div key={item.id} className="group flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-3 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                  <div className="relative w-32 aspect-video rounded-xl overflow-hidden shrink-0">
                    <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <PlayCircle size={24} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100`}>
                        {item.category}
                      </span>
                      <h3 className="font-bold text-slate-800 text-sm truncate">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <div className="flex items-center gap-1">
                        <FileText size={12} />
                        发布于 {item.createdAt}
                      </div>
                      <span className="text-slate-200">•</span>
                      <div className="flex items-center gap-1">
                        <Video size={12} />
                        MP4 视频
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => handleDeleteTraining(item.id, item.title)}
                      className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {trainingList.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300 py-12">
                <Video size={48} className="mb-4 opacity-20" />
                <p className="text-sm italic">暂无培训视频，开始配置第一个课程吧</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 删除确认 / 警告对话框 */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
              deleteConfirm.isWarning ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-500'
            }`}>
              <AlertTriangle size={24} />
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {deleteConfirm.isWarning ? '无法删除分类' : '确认删除'}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {deleteConfirm.isWarning ? (
                <>
                  分类 <span className="font-bold text-slate-800">“{deleteConfirm.title}”</span> 下已有培训内容。请先变更相关视频的分类后再执行删除操作。
                </>
              ) : (
                <>
                  您确定要删除 {deleteConfirm.type === 'category' ? '分类' : '培训内容'} <span className="font-bold text-slate-800">“{deleteConfirm.title}”</span> 吗？
                  {deleteConfirm.type === 'training' && ' 此操作将无法撤销。'}
                </>
              )}
            </p>

            <div className="flex gap-3">
              {deleteConfirm.isWarning ? (
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  我知道了
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
                  >
                    取消
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
                  >
                    确认删除
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast 提示 */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300">
          <div className={`px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border ${
            toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
              : 'bg-rose-50 border-rose-100 text-rose-600'
          }`}>
            {toast.type === 'success' ? (
              <PlayCircle size={20} className="fill-emerald-600/10" />
            ) : (
              <AlertTriangle size={20} className="fill-rose-600/10" />
            )}
            <span className="font-bold text-sm">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
