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
  MapPin
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
    publishTarget: { cities: ['1', '2'], sides: ['B', 'C'] },
    createdAt: '2026-04-20',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '2026 豪宅施工标准详解',
    type: 'video',
    author: '李经理',
    publishStatus: 'published',
    publishTarget: { cities: ['1', '3'], sides: ['B'] },
    createdAt: '2026-04-18',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=3088&auto=format&fit=crop'
  },
  {
    id: '3',
    title: '智慧家居：未来的居住方式',
    type: 'graphic',
    author: '张技师',
    publishStatus: 'draft',
    publishTarget: { cities: [], sides: [] },
    createdAt: '2026-04-22',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function ContentOperation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contentType, setContentType] = useState<'all' | 'graphic' | 'video'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const filteredContent = MOCK_CONTENT.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = contentType === 'all' || item.type === contentType;
    return matchesSearch && matchesType;
  });

  const handleOpenModal = (item?: ContentItem) => {
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

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

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索内容标题、作者..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">
          {[
            { id: 'all', label: '全部' },
            { id: 'graphic', label: '图文', icon: FileText },
            { id: 'video', label: '视频', icon: Video },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setContentType(tab.id as any)}
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
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 border border-slate-200 text-sm font-bold">
          <Filter size={16} />
          <span>高级筛选</span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContent.map((item, index) => (
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
                <div className="flex gap-2 w-full">
                  <button className="flex-1 bg-white hover:bg-slate-100 text-slate-800 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    预览
                  </button>
                  <button onClick={() => handleOpenModal(item)} className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md p-1.5 rounded-lg transition-colors">
                    <Edit2 size={14} />
                  </button>
                </div>
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
                  <div className="flex -space-x-1">
                    {item.publishTarget.cities.slice(0, 3).map(cityId => (
                      <div key={cityId} className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">
                        {MOCK_CITIES.find(c => c.id === cityId)?.name[0]}
                      </div>
                    ))}
                    {item.publishTarget.cities.length > 3 && (
                      <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[8px] font-bold text-slate-400">
                        +{item.publishTarget.cities.length - 3}
                      </div>
                    )}
                    {item.publishTarget.cities.length === 0 && (
                      <span className="text-[10px] text-slate-300 font-medium italic">未同步站点</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Users size={12} className="text-orange-500" />
                    受众端
                  </div>
                  <div className="flex gap-1">
                    {item.publishTarget.sides.includes('B') && (
                      <span className="px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[9px] font-black border border-orange-100">Practitioner</span>
                    )}
                    {item.publishTarget.sides.includes('C') && (
                      <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black border border-blue-100">Customer</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
                          <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 ml-1">内容标题</label>
                          <input 
                            type="text" 
                            placeholder="输入引人入胜的标题..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                            defaultValue={editingItem?.title}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 ml-1">内容类型</label>
                            <select 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white outline-none"
                              defaultValue={editingItem?.type || 'graphic'}
                            >
                              <option value="graphic">图文文章</option>
                              <option value="video">视频内容</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5 ml-1">首屏封面图 (URL)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="https://..."
                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-mono focus:bg-white outline-none"
                                defaultValue={editingItem?.coverImage}
                              />
                              <button className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 transition-colors">
                                <ImageIcon size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="inline-flex items-center gap-2 border-b-2 border-blue-600 pb-1">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">正文内容</span>
                      </div>
                      <div className="min-h-[240px] bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center text-center">
                        <FileText className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="text-slate-400 text-sm font-medium">这里将集成富文本编辑器 / 视频播放器配置</p>
                        <button className="mt-4 px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-500 transition-all">
                          打开高级编辑器
                        </button>
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
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                            <MapPin size={12} className="text-red-500" />
                            发布至城市
                          </label>
                          <button className="text-[10px] font-bold text-blue-600 hover:underline">全选城市</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {MOCK_CITIES.map(city => (
                            <label 
                              key={city.id}
                              className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                                editingItem?.publishTarget.cities.includes(city.id)
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                              }`}
                            >
                              <input type="checkbox" className="hidden" defaultChecked={editingItem?.publishTarget.cities.includes(city.id)} />
                              {city.name} [交易中心]
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Side Selection */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-3 flex items-center gap-1">
                          <Users size={12} className="text-orange-500" />
                          目标分发端
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: 'B', label: 'B 端从业者中心', desc: '展示给设计师、工长等专业合作伙伴' },
                            { id: 'C', label: 'C 端业主中心', desc: '面向潜在装修业主与个人客户' },
                          ].map(side => (
                            <label 
                              key={side.id}
                              className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                                editingItem?.publishTarget.sides.includes(side.id as any)
                                  ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/10'
                                  : 'bg-white border-slate-100 hover:border-slate-200'
                              }`}
                            >
                              <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                editingItem?.publishTarget.sides.includes(side.id as any) ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'
                              }`}>
                                {editingItem?.publishTarget.sides.includes(side.id as any) && <CheckCircle2 size={10} className="text-white" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-black text-slate-800">{side.label}</p>
                                <p className="text-[10px] text-slate-400 mt-1 leading-tight font-medium">{side.desc}</p>
                              </div>
                              <input type="checkbox" className="hidden" defaultChecked={editingItem?.publishTarget.sides.includes(side.id as any)} />
                            </label>
                          ))}
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
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  <span>删除草稿</span>
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                  <button className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    <span>立即发布并同步</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
