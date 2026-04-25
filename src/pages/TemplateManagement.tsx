import { useState } from 'react';
import { 
  LayoutTemplate, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Edit, 
  Copy, 
  Trash2, 
  Eye,
  Folders,
  ChevronDown
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: 'Contract' | 'SOP' | 'Protocol' | 'Report';
  updatedBy: string;
  updatedAt: string;
  usages: number;
}

const mockTemplates: Template[] = [
  { id: 'T001', name: '全屋定制标准施工协议', category: 'Contract', updatedBy: '管理员', updatedAt: '2026-04-10', usages: 145 },
  { id: 'T002', name: '从业者入驻审核标准 V2.0', category: 'SOP', updatedBy: '李四', updatedAt: '2026-03-25', usages: 89 },
  { id: 'T003', name: '家装施工过程周报模板', category: 'Report', updatedBy: '管理员', updatedAt: '2026-04-15', usages: 312 },
  { id: 'T004', name: '师徒带教关系确认书', category: 'Protocol', updatedBy: '管理员', updatedAt: '2026-04-05', usages: 45 },
  { id: 'T005', name: '售后维保服务流程手册', category: 'SOP', updatedBy: '钱七', updatedAt: '2026-02-14', usages: 120 },
];

export default function TemplateManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = mockTemplates
    .filter(t => selectedCategory === 'All' || t.category === selectedCategory)
    .filter(t => t.name.includes(searchTerm) || t.updatedBy.includes(searchTerm));

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">模板管理</h1>
          <p className="text-slate-500 text-sm mt-1">管理系统协议、施工标准、报告及各类文档模板</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          <Plus size={18} />
          <span>新建模板</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar categories */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">模板目录</h2>
            <div className="space-y-1">
              {[
                { name: '全部模板', icon: LayoutTemplate, count: 24, id: 'All' },
                { name: '协议合同', icon: FileText, count: 8, id: 'Contract' },
                { name: '作业大纲', icon: Folders, count: 6, id: 'SOP' },
                { name: '业务协议', icon: Plus, count: 5, id: 'Protocol' },
                { name: '报表模板', icon: Edit, count: 5, id: 'Report' },
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <cat.icon size={16} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Template List */}
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索模板标题、修改人..." 
                className="bg-transparent border-none outline-none text-sm ml-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
              <Filter size={18} />
              <span className="text-sm font-bold">高级检索</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <div key={template.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:border-blue-200 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    template.category === 'Contract' ? 'bg-amber-50 text-amber-600' :
                    template.category === 'SOP' ? 'bg-blue-50 text-blue-600' :
                    template.category === 'Report' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    <FileText size={24} />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="编辑">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="复制">
                      <Copy size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="删除">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg mb-1 leading-snug">{template.name}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">分类:</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{template.category}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">累计使用</p>
                      <p className="text-sm font-bold text-slate-700">{template.usages} 次</p>
                    </div>
                    <div className="w-[1px] h-6 bg-slate-100"></div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">更新时间</p>
                      <p className="text-sm font-bold text-slate-700">{template.updatedAt}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                    <Eye size={14} />
                    预览
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
