import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Layout, 
  Image as ImageIcon, 
  ListChecks, 
  BarChart3, 
  Settings2, 
  Monitor, 
  ShoppingBag,
  ExternalLink,
  Save,
  CheckCircle2,
  HelpCircle,
  Plus,
  Trash2,
  GripVertical,
  Globe,
  LayoutGrid,
  RefreshCw
} from 'lucide-react';

export default function TradingCenterConfig() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'b' | 'c'>('b');

  // Initial stats data from image
  const [bConfig, setBConfig] = useState({
    banners: [
      {
        title: '数字诚信档案职业资产',
        subtitle: '每一项工程数据永久记录，打造属于您的金牌职业口碑',
        tag: '数字赋能',
        imageUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?q=80&w=2070&auto=format&fit=crop',
        link: 'https://h5.example.com/assets'
      }
    ],
    stats: [
      { label: '本月新增线索', value: '5,800+' },
      { label: '累计结算金额', value: '¥2.4亿' },
      { label: '资金安全保障', value: '100%' }
    ],
    reasonsTitle: '您选择我们的理由',
    reasonsMoreText: '模式详情',
    reasonsLink: 'https://h5.example.com/reasons-details',
    reasonsImageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    digitalWorld: {
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
      link: 'https://h5.example.com/digital-world'
    },
    kingkong: [
      {
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        link: 'https://h5.example.com/kingkong-1',
        title: '设计师'
      }
    ],
    premiumRecruitment: {
      bgImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      itemImageUrl: 'https://images.unsplash.com/photo-1605146768851-eda79da4a270?q=80&w=2070&auto=format&fit=crop',
      link: 'https://h5.example.com/premium-recruitment'
    },
    promotions: [
      {
        title: '项目发起人',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
        link: 'https://h5.example.com/promotions'
      }
    ]
  });

  const handleSave = () => {
    alert('交易中心配置已保存成功！');
    navigate('/cities');
  };

  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const onlineCities = [
    { id: '1', name: '上海交易中心', province: '上海' },
    { id: '2', name: '北京交易中心', province: '北京' },
    { id: '3', name: '成都交易中心', province: '四川' },
    { id: '4', name: '南京交易中心', province: '江苏' },
    { id: '5', name: '武汉交易中心', province: '湖北' },
    { id: '6', name: '广州交易中心', province: '广东' }
  ];

  const handleSyncSelected = () => {
    if (selectedCities.length === 0) {
      alert('请至少选择一个交易中心');
      return;
    }
    alert(`配置已成功同步到：${selectedCities.map(id => onlineCities.find(c => c.id === id)?.name).join(', ')}`);
    setShowSyncModal(false);
  };

  const toggleCity = (cityId: string) => {
    setSelectedCities(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId) 
        : [...prev, cityId]
    );
  };

  const addBanner = () => {
    const newBanner = {
      title: '新 Banner 标题',
      subtitle: '描述内容...',
      tag: '推荐',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
      link: ''
    };
    setBConfig({
      ...bConfig,
      banners: [...bConfig.banners, newBanner]
    });
  };

  const removeBanner = (index: number) => {
    const newBanners = bConfig.banners.filter((_, i) => i !== index);
    setBConfig({ ...bConfig, banners: newBanners });
  };

  const updateBanner = (index: number, field: string, value: string) => {
    const newBanners = [...bConfig.banners];
    newBanners[index] = { ...newBanners[index], [field]: value };
    setBConfig({ ...bConfig, banners: newBanners });
  };

  const addPromotion = () => {
    const newPromotion = {
      title: '新活动名称',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
      link: 'https://h5.example.com/promotions'
    };
    setBConfig({
      ...bConfig,
      promotions: [...bConfig.promotions, newPromotion]
    });
  };

  const removePromotion = (index: number) => {
    const newPromotions = bConfig.promotions.filter((_, i) => i !== index);
    setBConfig({ ...bConfig, promotions: newPromotions });
  };

  const updatePromotion = (index: number, field: string, value: string) => {
    const newPromotions = [...bConfig.promotions];
    newPromotions[index] = { ...newPromotions[index], [field]: value };
    setBConfig({ ...bConfig, promotions: newPromotions });
  };

  const addKingKong = () => {
    const newItem = {
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      link: 'https://h5.example.com/kingkong',
      title: '新项'
    };
    setBConfig({
      ...bConfig,
      kingkong: [...bConfig.kingkong, newItem]
    });
  };

  const removeKingKong = (index: number) => {
    const newItems = bConfig.kingkong.filter((_, i) => i !== index);
    setBConfig({ ...bConfig, kingkong: newItems });
  };

  const updateKingKong = (index: number, field: string, value: string) => {
    const newItems = [...bConfig.kingkong];
    newItems[index] = { ...newItems[index], [field]: value };
    setBConfig({ ...bConfig, kingkong: newItems });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/cities')}
            className="p-2 hover:bg-white rounded-lg text-slate-500 transition-all border border-transparent hover:border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">交易中心配置</h1>
            <p className="text-slate-500 text-sm mt-1">配置此站点的B端及C端前端展示内容与业务逻辑</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSyncModal(true)}
            className="px-4 py-2 rounded-xl text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 flex items-center gap-2 transition-all"
          >
            <RefreshCw size={16} />
            <span>保存配置到多个交易中心</span>
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            <span>保存配置</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 bg-white rounded-t-2xl px-2">
        <button 
          onClick={() => setActiveTab('b')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'b' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          <div className={`p-1 rounded ${activeTab === 'b' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
            <ShoppingBag size={14} />
          </div>
          B端交易中心 (师傅/项目发起人端)
        </button>
        <button 
          onClick={() => setActiveTab('c')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'c' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          <div className={`p-1 rounded ${activeTab === 'c' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
            <Layout size={14} />
          </div>
          C端交易中心 (业主端)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Editor Side */}
        <div className="lg:col-span-12 space-y-8">
          {activeTab === 'b' ? (
            <>
              {/* Banner Config */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ImageIcon size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">首屏 Banner 管理</h2>
                      <p className="text-xs text-slate-400 font-medium">支持配置多个轮播图及 H5 跳转链接</p>
                    </div>
                  </div>
                  <button 
                    onClick={addBanner}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                  >
                    <Plus size={14} />
                    <span>添加 Banner</span>
                  </button>
                </div>

                <div className="space-y-8">
                  {bConfig.banners.map((banner, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 relative group animate-in fade-in duration-300"
                    >
                      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                        {index + 1}
                      </div>
                      
                      {bConfig.banners.length > 1 && (
                        <button 
                          onClick={() => removeBanner(index)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">主标题文字</label>
                            <input 
                              type="text" 
                              value={banner.title}
                              onChange={e => updateBanner(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm font-bold text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">跳转链接 (H5 页面)</label>
                            <div className="flex items-center gap-2">
                              <div className="px-2 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-400">
                                <ExternalLink size={14} />
                              </div>
                              <input 
                                type="text" 
                                placeholder="https://..."
                                value={banner.link}
                                onChange={e => updateBanner(index, 'link', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-xs font-mono text-blue-600"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">副标题/描述</label>
                            <textarea 
                              rows={3}
                              value={banner.subtitle}
                              onChange={e => updateBanner(index, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-xs font-medium text-slate-600 resize-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">背景图片 URL</label>
                            <input 
                              type="text" 
                              value={banner.imageUrl}
                              onChange={e => updateBanner(index, 'imageUrl', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-[11px] font-mono"
                            />
                          </div>
                          <div className="h-20 bg-slate-200 rounded-xl overflow-hidden shadow-inner relative group/img">
                            <img src={banner.imageUrl} alt="preview" className="w-full h-full object-cover transition-transform group-hover/img:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[9px] font-black uppercase text-slate-800">Preview</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Statistics Config */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BarChart3 className="text-blue-600" size={20} />
                    概览统计数据配置
                  </h2>
                  <span className="text-[10px] font-bold text-slate-400">最多配置 3 项</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bConfig.stats.map((stat, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-300 uppercase">Stat {i + 1}</span>
                        <div className="flex gap-1">
                          <button className="p-1 text-slate-400 hover:text-slate-600"><GripVertical size={12} /></button>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        placeholder="数值"
                        value={stat.value}
                        onChange={e => {
                          const newStats = [...bConfig.stats];
                          newStats[i].value = e.target.value;
                          setBConfig({...bConfig, stats: newStats});
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
                      />
                      <input 
                        type="text" 
                        placeholder="标签描述"
                        value={stat.label}
                        onChange={e => {
                          const newStats = [...bConfig.stats];
                          newStats[i].label = e.target.value;
                          setBConfig({...bConfig, stats: newStats});
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-medium text-slate-500 outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Reasons Config */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ListChecks size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">核心价值宣导配置</h2>
                      <p className="text-xs text-slate-400 font-medium">配置为何选择我们的栏目标题与形象图</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <div className="w-1 h-3 bg-yellow-400 rounded-full"></div>
                      栏目标题
                    </label>
                    <input 
                      type="text" 
                      placeholder="例如: 您选择我们的理由"
                      value={bConfig.reasonsTitle}
                      onChange={e => setBConfig({...bConfig, reasonsTitle: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <div className="w-1 h-3 bg-blue-400 rounded-full"></div>
                        链接文案
                      </label>
                      <input 
                        type="text" 
                        placeholder="例如: 模式详情"
                        value={bConfig.reasonsMoreText}
                        onChange={e => setBConfig({...bConfig, reasonsMoreText: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">跳转链接 (H5)</label>
                      <input 
                        type="text" 
                        placeholder="https://..."
                        value={bConfig.reasonsLink}
                        onChange={e => setBConfig({...bConfig, reasonsLink: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-blue-600 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50/30 border border-slate-100 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <div className="w-1 h-3 bg-red-400 rounded-full"></div>
                      栏目图片 URL
                    </label>
                    <input 
                      type="text" 
                      value={bConfig.reasonsImageUrl}
                      onChange={e => setBConfig({...bConfig, reasonsImageUrl: e.target.value})}
                      placeholder="输入宣导图片链接..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-mono focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 text-slate-400">
                      图片内容预览
                    </label>
                    <div className="relative aspect-[21/9] max-w-sm bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
                      {bConfig.reasonsImageUrl ? (
                        <img 
                          src={bConfig.reasonsImageUrl} 
                          alt="reasons-preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <ImageIcon size={32} className="mb-2 opacity-20" />
                          <span className="text-xs">暂无预览图</span>
                        </div>
                      )}
                      
                      {/* Floating UI Simulation Over Preview */}
                      {bConfig.reasonsImageUrl && (
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded shadow-sm">
                                {bConfig.reasonsTitle}
                              </span>
                              <span className="text-[9px] font-bold text-white/80 flex items-center gap-1">
                                {bConfig.reasonsMoreText} <ExternalLink size={8} />
                              </span>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Recruitment & Promotions */}
              <div className="flex flex-col gap-8">
                {/* Premium */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-8">
                  <h2 className="text-lg font-bold text-slate-800">大宅·豪宅专属招募配置</h2>
                  
                  {/* Part 1: Module Background */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">背景图配置</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                          背景图 URL
                        </label>
                        <input 
                          type="text" 
                          value={bConfig.premiumRecruitment.bgImageUrl}
                          onChange={e => setBConfig({
                            ...bConfig,
                            premiumRecruitment: { ...bConfig.premiumRecruitment, bgImageUrl: e.target.value }
                          })}
                          placeholder="输入背景图片链接..."
                          className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] font-mono focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-300 uppercase">背景预览</label>
                        <div className="relative aspect-[16/6] max-w-sm bg-slate-100 rounded-xl border border-slate-200 overflow-hidden group">
                          {bConfig.premiumRecruitment.bgImageUrl ? (
                            <img 
                              src={bConfig.premiumRecruitment.bgImageUrl} 
                              alt="bg-preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon size={24} className="opacity-20" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Recruitment Content */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">招募内容配置</span>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">图片素材 URL (招募图)</label>
                          <input 
                            type="text" 
                            value={bConfig.premiumRecruitment.itemImageUrl}
                            onChange={e => setBConfig({
                              ...bConfig,
                              premiumRecruitment: { ...bConfig.premiumRecruitment, itemImageUrl: e.target.value }
                            })}
                            placeholder="输入招募内容图片链接..."
                            className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-[11px] font-mono focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                            <ExternalLink size={10} className="text-blue-500" /> H5 跳转链接
                          </label>
                          <input 
                            type="text" 
                            value={bConfig.premiumRecruitment.link}
                            onChange={e => setBConfig({
                              ...bConfig,
                              premiumRecruitment: { ...bConfig.premiumRecruitment, link: e.target.value }
                            })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-mono text-blue-600 focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-slate-300 uppercase">招募图预览</label>
                        <div className="relative aspect-square max-w-[160px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center p-2 group">
                          {bConfig.premiumRecruitment.itemImageUrl ? (
                            <img 
                              src={bConfig.premiumRecruitment.itemImageUrl} 
                              alt="item-preview" 
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                              <ImageIcon size={20} className="mb-1 opacity-20" />
                              <span className="text-[10px]">无图</span>
                            </div>
                          )}
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-bold text-blue-600 shadow-sm">
                             <ExternalLink size={8} /> H5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marketing Entry Config */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">营销配置</h2>
                        <p className="text-xs text-slate-400 font-medium">配置首页底部的活动营销入口</p>
                      </div>
                    </div>
                    <button 
                      onClick={addPromotion}
                      className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors border border-orange-100"
                    >
                      <Plus size={14} />
                      <span>添加活动</span>
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    {bConfig.promotions.map((promo, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-50/30 border border-slate-200 rounded-2xl relative group"
                      >
                        <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                          {index + 1}
                        </div>
                        
                        {bConfig.promotions.length > 1 && (
                          <button 
                            onClick={() => removePromotion(index)}
                            className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                              活动名称
                            </label>
                            <input 
                              type="text" 
                              value={promo.title}
                              onChange={e => updatePromotion(index, 'title', e.target.value)}
                              placeholder="输入活动名称..."
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">活动图片 URL</label>
                              <input 
                                type="text" 
                                value={promo.imageUrl}
                                onChange={e => updatePromotion(index, 'imageUrl', e.target.value)}
                                placeholder="输入图片链接..."
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-mono focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                H5 跳转链接
                              </label>
                              <input 
                                type="text" 
                                value={promo.link}
                                onChange={e => updatePromotion(index, 'link', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-mono text-blue-600 focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 pt-2">
                            <label className="block text-[10px] font-bold text-slate-300 uppercase">活动图片预览</label>
                            <div className="relative aspect-[16/5] max-w-md bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex items-center justify-center group">
                              {promo.imageUrl ? (
                                <img 
                                  src={promo.imageUrl} 
                                  alt="promo-preview" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                  <ImageIcon size={24} className="opacity-20" />
                                  <span className="text-[10px] mt-1">暂无图片预览</span>
                                </div>
                              )}
                              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                <ImageIcon size={10} /> Promo {index + 1}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Digital World Introduction Config */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">数字世界介绍配置</h2>
                      <p className="text-xs text-slate-400 font-medium">配置数字世界版块的落地介绍图与链接</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50/30 border border-slate-100 rounded-2xl">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                          图片 URL
                        </label>
                        <input 
                          type="text" 
                          value={bConfig.digitalWorld.imageUrl}
                          onChange={e => setBConfig({
                            ...bConfig,
                            digitalWorld: { ...bConfig.digitalWorld, imageUrl: e.target.value }
                          })}
                          placeholder="输入图片链接..."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-mono focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                          <ExternalLink size={10} className="text-blue-500" /> H5 跳转链接
                        </label>
                        <input 
                          type="text" 
                          value={bConfig.digitalWorld.link}
                          onChange={e => setBConfig({
                            ...bConfig,
                            digitalWorld: { ...bConfig.digitalWorld, link: e.target.value }
                          })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-mono text-blue-600 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-300 uppercase">图片内容预览</label>
                      <div className="relative aspect-video max-w-sm bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
                        {bConfig.digitalWorld.imageUrl ? (
                          <img 
                            src={bConfig.digitalWorld.imageUrl} 
                            alt="dw-preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                            <ImageIcon size={24} className="opacity-20" />
                            <span className="text-[10px] mt-1">暂无预览</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* King Kong Config (Quick Entry) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <LayoutGrid size={20} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-800">金刚位配置</h2>
                        <p className="text-xs text-slate-400 font-medium">配置首页顶部的快捷入口图标与链接</p>
                      </div>
                    </div>
                    <button 
                      onClick={addKingKong}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                    >
                      <Plus size={14} />
                      <span>添加项</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bConfig.kingkong.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl relative group"
                      >
                        {bConfig.kingkong.length > 1 && (
                          <button 
                            onClick={() => removeKingKong(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-300 hover:text-red-500 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 shrink-0 bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt="icon" className="w-full h-full object-contain" />
                              ) : (
                                <ImageIcon size={20} className="text-slate-200" />
                              )}
                            </div>
                            <div className="flex-1">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">名称</label>
                              <input 
                                type="text" 
                                value={item.title}
                                onChange={e => updateKingKong(index, 'title', e.target.value)}
                                className="w-full bg-transparent text-sm font-bold border-b border-transparent focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">图片 URL</label>
                              <input 
                                type="text" 
                                value={item.imageUrl}
                                onChange={e => updateKingKong(index, 'imageUrl', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">H5 链接</label>
                              <input 
                                type="text" 
                                value={item.link}
                                onChange={e => updateKingKong(index, 'link', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-blue-600 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 opacity-20">
                <Layout size={40} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">C端业主交易中心配置</h2>
              <p className="text-slate-500 mt-2">C端页面目前使用全局默认模板，如需自定义配置请联系技术支持。</p>
              <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20">
                启用独立配置
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sync Selection Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowSyncModal(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">同步配置到多个站点</h3>
                <p className="text-xs text-slate-400 mt-1">请选择需要覆盖配置的已上线交易中心</p>
              </div>
              <button 
                onClick={() => setShowSyncModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              >
                <Plus className="rotate-45" size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {onlineCities.map(city => (
                  <button 
                    key={city.id}
                    onClick={() => toggleCity(city.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left group ${
                      selectedCities.includes(city.id)
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      selectedCities.includes(city.id)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-300 group-hover:border-blue-400'
                    }`}>
                      {selectedCities.includes(city.id) && <CheckCircle2 size={12} />}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${selectedCities.includes(city.id) ? 'text-blue-700' : 'text-slate-700'}`}>
                        {city.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">{city.province}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-500">
                已选中 <span className="text-blue-600">{selectedCities.length}</span> 个站点
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSyncModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSyncSelected}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  <span>确定并同步</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
