import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  FileText, 
  Video, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  Trash2, 
  Globe, 
  Users, 
  Building2,
  CheckCircle2,
  X,
  Filter,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar
} from 'lucide-react';

interface City {
  id: string;
  name: string;
}

interface ContentItem {
  id: string;
  title: string;
  type: 'graphic' | 'video';
  author: string;
  publishStatus: 'published' | 'draft' | 'scheduled';
  publishTarget: {
    cities: string[];
    sides: ('B' | 'C')[];
  };
  createdAt: string;
  coverImage: string;
}

const MOCK_CITIES: City[] = [
  { id: '1', name: '上海' },
  { id: '2', name: '北京' },
  { id: '3', name: '成都' },
  { id: '4', name: '南京' },
  { id: '5', name: '武汉' },
  { id: '6', name: '杭州' },
];

const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: '大宅设计中的美学演进',
    type: 'graphic',
    author: '王小美',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '2'], sides: ['C'] },
    createdAt: '2026-04-20',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '2026 豪宅施工标准详解',
    type: 'video',
    author: '李经理',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '3'], sides: ['C'] },
    createdAt: '2026-04-18',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=3088&auto=format&fit=crop'
  },
  {
    id: '3',
    title: '智慧家居：未来的居住方式',
    type: 'graphic',
    author: '张技师',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '2'], sides: ['C'] },
    createdAt: '2026-04-22',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    title: '现代简约风：80平米极致利用',
    type: 'graphic',
    author: '设计师陈',
    publishStatus: 'published',
    publishTarget: { cities: ['4', '5'], sides: ['C'] },
    createdAt: '2026-04-15',
    coverImage: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    title: '硬核施工：水电工程避坑指南',
    type: 'video',
    author: '工头老李',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '2', '3'], sides: ['C'] },
    createdAt: '2026-04-10',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '6',
    title: '侘寂风装修：留白的艺术',
    type: 'graphic',
    author: '设计师赵',
    publishStatus: 'published',
    publishTarget: { cities: ['6'], sides: ['C'] },
    createdAt: '2026-04-05',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41fa562e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '7',
    title: '别墅软装：提升质感的5个细节',
    type: 'graphic',
    author: '李经理',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '2'], sides: ['C'] },
    createdAt: '2026-04-25',
    coverImage: 'https://images.unsplash.com/photo-1616489953149-8e7c09930777?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '8',
    title: '极简厨卫标准流程演示',
    type: 'video',
    author: '王小美',
    publishStatus: 'published',
    publishTarget: { cities: ['4'], sides: ['C'] },
    createdAt: '2026-04-24',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '9',
    title: '材料百科：如何挑选优质岩板',
    type: 'graphic',
    author: '张技师',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '2', '3', '4', '5', '6'], sides: ['C'] },
    createdAt: '2026-04-23',
    coverImage: 'https://images.unsplash.com/photo-1599380388902-60193bb96366?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '10',
    title: '法式复古装修：优雅永不过时',
    type: 'graphic',
    author: '设计师陈',
    publishStatus: 'published',
    publishTarget: { cities: ['3'], sides: ['C'] },
    createdAt: '2026-04-21',
    coverImage: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=2074&auto=format&fit=crop'
  }
];

export default function ContentOperation() {
  const [contentType, setContentType] = useState<'all' | 'graphic' | 'video'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<ContentItem | null>(null);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [modalValidationErrors, setModalValidationErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  // Advanced Filter States
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterCities, setFilterCities] = useState<string[]>([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredContent = MOCK_CONTENT.filter(item => {
    const matchesType = contentType === 'all' || item.type === contentType;
    
    // Date range filter
    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = matchesDate && item.createdAt >= dateRange.start;
    }
    if (dateRange.end) {
      matchesDate = matchesDate && item.createdAt <= dateRange.end;
    }
    
    // City filter
    let matchesCity = true;
    if (filterCities.length > 0) {
      matchesCity = item.publishTarget.cities.some(cityId => filterCities.includes(cityId));
    }

    return matchesType && matchesDate && matchesCity;
  });

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenPreview = (item: ContentItem) => {
    setPreviewItem(item);
    setIsPreviewModalOpen(true);
  };

  const handleOpenModal = (item?: ContentItem) => {

    setEditingItem(item || null);
    setModalValidationErrors([]);
    setIsModalOpen(true);
  };

  const handleTypeChange = (type: 'all' | 'graphic' | 'video') => {
    setContentType(type);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: { start: string, end: string }) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handleCityToggle = (cityId: string) => {
    setEditingItem(prev => {
      if (!prev) {
        return {
          id: 'new',
          title: '',
          type: 'graphic',
          author: '当前用户',
          publishStatus: 'draft',
          publishTarget: { cities: [cityId], sides: ['C'] },
          createdAt: new Date().toISOString().split('T')[0],
          coverImage: ''
        };
      }
      
      const currentCities = prev.publishTarget.cities;
      const newCities = currentCities.includes(cityId)
        ? currentCities.filter(id => id !== cityId)
        : [...currentCities, cityId];
        
      return {
        ...prev,
        publishTarget: {
          ...prev.publishTarget,
          cities: newCities
        }
      };
    });
  };

  const handleSelectAllCities = () => {
    setEditingItem(prev => {
      const allCityIds = MOCK_CITIES.map(c => c.id);
      if (!prev) {
        return {
          id: 'new',
          title: '',
          type: 'graphic',
          author: '当前用户',
          publishStatus: 'draft',
          publishTarget: { cities: allCityIds, sides: ['C'] },
          createdAt: new Date().toISOString().split('T')[0],
          coverImage: ''
        };
      }
      
      const isAllSelected = prev.publishTarget.cities.length === allCityIds.length;
      return {
        ...prev,
        publishTarget: {
          ...prev.publishTarget,
          cities: isAllSelected ? [] : allCityIds
        }
      };
    });
  };

  const handleCityFilterToggle = (cityId: string) => {
    setFilterCities(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId) 
        : [...prev, cityId]
    );
    setCurrentPage(1);
  };

  const handleCityChange = (cityId: string) => {
    // Legacy support or single select if needed
    setFilterCities(cityId ? [cityId] : []);
    setCurrentPage(1);
  };

  const handleSaveContent = () => {
    if (!editingItem) return;

    const errors: string[] = [];
    if (!editingItem.title.trim()) errors.push('title');
    if (!editingItem.type) errors.push('type');
    if (!editingItem.coverImage) errors.push('coverImage');
    if (editingItem.publishTarget.cities.length === 0) errors.push('cities');

    if (errors.length > 0) {
      setModalValidationErrors(errors);
      showToast('请完整填写内容信息后再发布', 'info');
      return;
    }

    // Success case
    setModalValidationErrors([]);
    showToast('发布成功！内容已同步至选定城市', 'success');
    
    // Simulate server delay and close modal
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

  const handleDeleteContent = () => {
    // In a real app, this would be an API call
    showToast('内容已成功删除', 'success');
    setIsDeleteConfirmOpen(false);
    setIsModalOpen(false);
  };

  const publishedTradingCentersCount = new Set(
    MOCK_CONTENT.filter(item => item.publishStatus === 'published')
      .flatMap(item => item.publishTarget.cities)
  ).size;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">内容运营</h1>
          <p className="text-slate-500 text-sm mt-1">管理平台图文与视频内容，精准推送至各城市运营中心</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>创建内容</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">
          {[
            { id: 'all', label: '全部' },
            { id: 'graphic', label: '图文', icon: FileText },
            { id: 'video', label: '视频', icon: Video },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTypeChange(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                contentType === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon && <tab.icon size={14} />}
              {tab.label}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
            showAdvancedFilter 
              ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-inner' 
              : 'text-slate-600 hover:bg-slate-50 border-slate-200'
          }`}
        >
          <Filter size={16} />
          <span>高级筛选</span>
          {(dateRange.start || dateRange.end || filterCities.length > 0) && (
            <div className="w-2 h-2 rounded-full bg-blue-500 ml-1 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          )}
        </button>
      </div>

      {/* Advanced Filter Panel */}
      <AnimatePresence>
        {showAdvancedFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <button 
                onClick={() => setShowAdvancedFilter(false)}
                className="absolute top-4 right-4 p-1 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
              >
                <X size={14} />
              </button>

              {/* Date Filter */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 flex items-center gap-1">
                  <Calendar size={12} className="text-blue-500" />
                  发布时间区间
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="date" 
                    value={dateRange.start}
                    onChange={(e) => handleDateRangeChange({ ...dateRange, start: e.target.value })}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                  />
                  <span className="text-slate-400 font-bold">至</span>
                  <input 
                    type="date" 
                    value={dateRange.end}
                    onChange={(e) => handleDateRangeChange({ ...dateRange, end: e.target.value })}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
                  />
                  {(dateRange.start || dateRange.end) && (
                    <button 
                      onClick={() => handleDateRangeChange({ start: '', end: '' })}
                      className="ml-2 text-xs text-blue-600 font-bold hover:underline"
                    >
                      重置日期
                    </button>
                  )}
                </div>
              </div>

              {/* City Filter (Multi-select) */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-3 ml-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-red-500" />
                    筛选城市交易中心 (多选)
                  </span>
                  {filterCities.length > 0 && (
                    <button 
                      onClick={() => setFilterCities([])}
                      className="text-[10px] text-blue-600 font-bold hover:underline"
                    >
                      清空所选
                    </button>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {MOCK_CITIES.map(city => {
                    const isSelected = filterCities.includes(city.id);
                    return (
                      <button
                        key={city.id}
                        onClick={() => handleCityFilterToggle(city.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'
                        }`}
                      >
                        {city.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedContent.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
          >
            {/* Cover Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img 
                src={item.coverImage} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button 
                  onClick={() => handleOpenModal(item)} 
                  className="w-full bg-white hover:bg-slate-100 text-slate-800 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300"
                >
                  <Edit2 size={14} />
                  <span>编辑内容</span>
                </button>
              </div>
              <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/20 text-white ${
                item.type === 'video' ? 'bg-orange-500/80' : 'bg-blue-500/80'
              }`}>
                {item.type === 'video' ? '视频内容' : '图文内容'}
              </div>
            </div>

            {/* Content Info */}
            <div className="p-5">
              <h3 className="font-bold text-slate-800 leading-snug line-clamp-2 h-10 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {item.author[0]}
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.author}</span>
                <span className="text-[10px] text-slate-300 ml-auto font-mono">{item.createdAt}</span>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Globe size={12} className="text-blue-500" />
                    发布中心
                  </div>
                  <div className="text-[11px] font-black text-slate-600">
                    {item.publishTarget.cities.length} 个城市交易中心
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Users size={12} className="text-orange-500" />
                    受众端
                  </div>
                          <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black border border-blue-100">业主端</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredContent.length)} 条，共 {filteredContent.length} 条内容
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl transition-all ${
                currentPage === 1 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl transition-all ${
                currentPage === totalPages 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${editingItem ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                    {editingItem ? <Edit2 size={20} /> : <Plus size={20} />}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {editingItem ? '编辑内容' : '发布新内容'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">创建并同步内容到选定的城市运营中心</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Basic Info */}
                  <div className="lg:col-span-7 space-y-6">
                    <section className="space-y-4">
                      <div className="inline-flex items-center gap-2 border-b-2 border-blue-600 pb-1">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">基础信息</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-[11px] font-bold uppercase mb-1.5 ml-1 transition-colors ${modalValidationErrors.includes('title') ? 'text-rose-500' : 'text-slate-400'}`}>内容标题</label>
                          <input 
                            type="text" 
                            placeholder="输入引人入胜的标题..."
                            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold focus:bg-white outline-none transition-all ${
                              modalValidationErrors.includes('title') ? 'border-rose-400 ring-4 ring-rose-500/5 bg-rose-50/30' : 'border-slate-200 focus:border-blue-500'
                            }`}
                            value={editingItem?.title || ''}
                            onChange={(e) => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : { 
                              id: 'new', 
                              title: e.target.value, 
                              type: 'graphic', 
                              author: '当前用户', 
                              publishStatus: 'draft', 
                              publishTarget: { cities: [], sides: ['C'] }, 
                              createdAt: new Date().toISOString().split('T')[0], 
                              coverImage: '' 
                            })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-[11px] font-bold uppercase mb-1.5 ml-1 transition-colors ${modalValidationErrors.includes('type') ? 'text-rose-500' : 'text-slate-400'}`}>内容类型</label>
                            <select 
                              className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold focus:bg-white outline-none transition-all ${
                                modalValidationErrors.includes('type') ? 'border-rose-400 ring-4 ring-rose-500/5 bg-rose-50/30' : 'border-slate-200 focus:border-blue-500'
                              }`}
                              value={editingItem?.type || 'graphic'}
                              onChange={(e) => {
                                const type = e.target.value as 'graphic' | 'video';
                                setEditingItem(prev => prev ? { ...prev, type } : { 
                                  id: 'new', 
                                  title: '', 
                                  type, 
                                  author: '当前用户', 
                                  publishStatus: 'draft', 
                                  publishTarget: { cities: [], sides: ['C'] }, 
                                  createdAt: new Date().toISOString().split('T')[0], 
                                  coverImage: '' 
                                });
                              }}
                            >
                              <option value="graphic">图文文章</option>
                              <option value="video">视频内容</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-[11px] font-bold uppercase mb-3 ml-1 flex items-center justify-between transition-colors ${modalValidationErrors.includes('coverImage') ? 'text-rose-500' : 'text-slate-400'}`}>
                              <span>{editingItem?.type === 'video' ? '内容封面图' : '上传内容图片'}</span>
                              {editingItem?.coverImage && <span className="text-emerald-500 font-bold">已就绪</span>}
                            </label>
                            
                            <div className="space-y-4">
                              {/* Preview Area */}
                              {editingItem?.coverImage && (
                                <div className={`relative group overflow-hidden rounded-2xl border-4 shadow-xl aspect-video bg-slate-100 transition-colors ${modalValidationErrors.includes('coverImage') ? 'border-rose-100' : 'border-white'}`}>
                                  <img 
                                    src={editingItem.coverImage} 
                                    className="w-full h-full object-cover" 
                                    alt="Preview" 
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                      onClick={() => setEditingItem(prev => prev ? { ...prev, coverImage: '' } : null)}
                                      className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg hover:bg-rose-600 transition-colors"
                                    >
                                      移除并重选
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Upload Trigger */}
                              {!editingItem?.coverImage && (
                                <button 
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className={`w-full h-32 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all group ${
                                    modalValidationErrors.includes('coverImage') 
                                      ? 'bg-rose-50 border-rose-300 text-rose-400 hover:bg-rose-100' 
                                      : 'bg-slate-50 hover:bg-blue-50 border-slate-200 hover:border-blue-300 text-slate-400 hover:text-blue-500'
                                  }`}
                                >
                                  <div className={`w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${modalValidationErrors.includes('coverImage') ? 'shadow-rose-100' : ''}`}>
                                    <ImageIcon size={24} />
                                  </div>
                                  <span className="font-black tracking-tight">{editingItem?.type === 'video' ? '上传封面图片' : '上传内容图片'}</span>
                                  <p className="text-[10px] opacity-60 mt-1 font-medium italic">推荐尺寸 16:9, 支持 JPG/PNG/WEBP</p>
                                </button>
                              )}
                              
                              <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = URL.createObjectURL(file);
                                    setEditingItem(prev => prev ? { ...prev, coverImage: url } : { 
                                      id: 'new', 
                                      title: '', 
                                      type: 'graphic', 
                                      author: '当前用户', 
                                      publishStatus: 'draft', 
                                      publishTarget: { cities: [], sides: ['C'] }, 
                                      createdAt: new Date().toISOString().split('T')[0], 
                                      coverImage: url 
                                    });
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="inline-flex items-center gap-2 border-b-2 border-blue-600 pb-1">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                          {editingItem?.type === 'video' ? '上传视频' : '正文内容'}
                        </span>
                      </div>
                      <div className="min-h-[240px] bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center text-center">
                        {editingItem?.type === 'video' ? (
                          <>
                            <Video className="w-10 h-10 text-blue-400 mb-3" />
                            <p className="text-slate-500 text-sm font-bold">点击或拖拽视频文件到此处</p>
                            <p className="text-slate-400 text-[10px] mt-1">支持 MP4, MOV, AVI (最大 500MB)</p>
                            <button className="mt-4 px-6 py-2 bg-blue-600 rounded-xl text-xs font-bold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-all">
                              选择视频文件
                            </button>
                          </>
                        ) : (
                          <>
                            <FileText className="w-10 h-10 text-slate-300 mb-3" />
                            <p className="text-slate-400 text-sm font-medium">这里将集成富文本编辑器</p>
                            <button className="mt-4 px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-500 transition-all">
                              打开高级编辑器
                            </button>
                          </>
                        )}
                      </div>
                    </section>
                  </div>

                  {/* Right Column: Publish Settings */}
                  <div className="lg:col-span-5 space-y-6">
                    <section className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-6">
                      <div className="flex items-center gap-2">
                        <Globe className="text-blue-600" size={18} />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">发布与同步设置</span>
                      </div>

                      {/* City Selection */}
                      <div className={`p-4 rounded-3xl border transition-all ${modalValidationErrors.includes('cities') ? 'bg-rose-50/50 border-rose-200 ring-4 ring-rose-500/5' : ''}`}>
                        <div className="flex items-center justify-between mb-3">
                          <label className={`text-[11px] font-bold uppercase flex items-center gap-1 transition-colors ${modalValidationErrors.includes('cities') ? 'text-rose-500' : 'text-slate-500'}`}>
                            <MapPin size={12} className={modalValidationErrors.includes('cities') ? 'text-rose-500' : 'text-red-500'} />
                            发布至城市
                          </label>
                          <button 
                            onClick={handleSelectAllCities}
                            className="text-[10px] font-bold text-blue-600 hover:underline"
                          >
                            {(editingItem?.publishTarget?.cities?.length || 0) === MOCK_CITIES.length ? '取消全选' : '全选城市'}
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {MOCK_CITIES.map(city => {
                            const isSelected = editingItem?.publishTarget?.cities?.includes(city.id);
                            return (
                              <button 
                                key={city.id}
                                type="button"
                                onClick={() => {
                                  handleCityToggle(city.id);
                                  if (modalValidationErrors.includes('cities')) {
                                    setModalValidationErrors(prev => prev.filter(e => e !== 'cities'));
                                  }
                                }}
                                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                                    : modalValidationErrors.includes('cities')
                                      ? 'bg-white border-rose-200 text-slate-400 hover:border-rose-300'
                                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                                }`}
                              >
                                {isSelected ? <CheckCircle2 size={10} /> : <MapPin size={10} className={modalValidationErrors.includes('cities') ? 'text-rose-300' : 'text-slate-300'} />}
                                {city.name} [交易中心]
                              </button>
                            );
                          })}
                        </div>
                      </div>

                              {/* Side Selection */}
                              <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-1">
                                  <Users size={12} className="text-orange-500" />
                                  投放分发端 (已固定为业主端)
                                </label>
                                <div className="space-y-2">
                                  {[
                                    { id: 'C', label: '业主端', desc: '面向潜在装修业主与个人客户' },
                                  ].map(side => {
                                    const isChecked = true;
                                    return (
                                      <div 
                                        key={side.id}
                                        className="flex items-start gap-3 p-4 rounded-2xl border bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/10 cursor-default"
                                      >
                                        <div className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-blue-600 border-blue-600">
                                          <CheckCircle2 size={10} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-xs font-black text-slate-800">{side.label}</p>
                                          <p className="text-[10px] text-slate-400 mt-1 leading-tight font-medium">{side.desc}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                      {/* Action Alert */}
                      <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3">
                        <Building2 className="text-blue-400 shrink-0" size={18} />
                        <p className="text-[11px] text-slate-500 leading-relaxed italic">
                          注意：发布后的内容将实时同步至选定城市的手机端「发现」版块，请确保内容的合规性。
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                <button 
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  <span>删除内容</span>
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveContent}
                    className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    <span>立即发布并同步</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewModalOpen && previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Cover Display */}
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img 
                  src={previewItem.coverImage} 
                  className="w-full h-full object-cover"
                  alt="Content Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <button 
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all active:scale-90"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/20 text-white ${
                      previewItem.type === 'video' ? 'bg-orange-500/80' : 'bg-blue-500/80'
                    }`}>
                      {previewItem.type === 'video' ? '视频内容' : '图文内容'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-wider">
                      {previewItem.publishStatus === 'published' ? '已发布' : '草稿'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight drop-shadow-xl">
                    {previewItem.title}
                  </h2>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-lg font-black text-slate-400 border border-slate-100">
                      {previewItem.author[0]}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">创建作者</p>
                      <p className="text-sm font-black text-slate-800">{previewItem.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Calendar size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">发布日期</p>
                      <p className="text-sm font-black text-slate-800">{previewItem.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} className="text-blue-500" />
                        同步城市中心
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        共 {previewItem.publishTarget.cities.length} 个城市交易中心
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {previewItem.publishTarget.cities.length > 0 ? (
                        previewItem.publishTarget.cities.map(cityId => (
                          <div key={cityId} className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                            {MOCK_CITIES.find(c => c.id === cityId)?.name} [交易中心]
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">暂无分配城市</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Users size={14} className="text-orange-500" />
                      投放分发设置
                    </h3>
                    <div className="flex gap-2">
                      {previewItem.publishTarget.sides.includes('C') && (
                        <div className="flex-1 p-4 bg-orange-50 border border-orange-100 rounded-3xl">
                          <p className="text-xs font-black text-orange-700">业主分发端 (C-Side)</p>
                          <p className="text-[10px] text-orange-600/70 mt-1">内容将在业主移动端 App 发现页展示</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-slate-50/50 border-t border-slate-100 shrink-0">
                <button 
                  onClick={() => {
                    setIsPreviewModalOpen(false);
                    handleOpenModal(previewItem);
                  }}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Edit2 size={16} />
                  进入编辑模式
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">确认删除内容？</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                删除后交易中心将不再展示该内容，此操作不可撤回。
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-sm font-bold transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={handleDeleteContent}
                  className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-rose-500/20 transition-all"
                >
                  确认删除
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300">
          <div className={`px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border ${
            toast.type === 'success' 
              ? 'bg-emerald-500 border-emerald-400 text-white' 
              : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} className="text-blue-400" />}
            <span className="text-sm font-bold tracking-tight">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
