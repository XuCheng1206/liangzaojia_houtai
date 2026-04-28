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
  FileText
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

  const handleAddCategory = () => {
    if (newCatName.trim() && !categories.includes(newCatName.trim())) {
      setCategories([...categories, newCatName.trim()]);
      setCategory(newCatName.trim());
      setNewCatName('');
      setShowAddCategory(false);
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    // Check if any training items are using this category
    const isUsed = trainingList.some(item => item.category === catToDelete);
    if (isUsed) {
      alert(`无法删除：分类“${catToDelete}”下已有培训内容，请变更相关内容的分类后再删除。`);
      return;
    }

    if (window.confirm(`确定要删除分类“${catToDelete}”吗？`)) {
      setCategories(categories.filter(c => c !== catToDelete));
      if (category === catToDelete) {
        setCategory(categories[0] || '');
      }
    }
  };

  const [trainingList, setTrainingList] = useState<TrainingItem[]>([
    {
      id: 'T1001',
      title: '水电施工标准工艺详解',
      category: '工艺标准',
      videoUrl: '#',
      coverUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop',
      createdAt: '2026-04-20'
    },
    {
      id: 'T1002',
      title: '职业道德与良知养成',
      category: '良知素养',
      videoUrl: '#',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setCategory('工艺标准');
    setVideoFile(null);
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleSave = () => {
    if (!title) {
      alert('请填写培训标题');
      return;
    }

    if (!editingId && (!videoFile || !coverFile)) {
      alert('请上传视频和封面');
      return;
    }

    if (editingId) {
      setTrainingList(trainingList.map(item => 
        item.id === editingId 
          ? { 
              ...item, 
              title, 
              category, 
              coverUrl: coverFile ? (coverPreview || '') : item.coverUrl,
              videoUrl: videoFile ? URL.createObjectURL(videoFile) : item.videoUrl
            } 
          : item
      ));
      alert('修改成功');
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
      alert('发布成功');
    }
    
    handleCancelEdit();
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
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入培训课程名称"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
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
                  onClick={() => coverInputRef.current?.click()}
                  className={`group relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                    coverPreview ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
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
                  onClick={() => videoInputRef.current?.click()}
                  className={`px-4 py-4 rounded-2xl border-2 border-dashed flex items-center gap-3 cursor-pointer transition-all ${
                    videoFile ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-500'
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
                <Save size={18} />
                发布并保存
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
                    <button className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
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
    </div>
  );
}
