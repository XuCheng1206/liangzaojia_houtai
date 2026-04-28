import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UsersRound, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Target,
  MoreVertical,
  ChevronRight,
  X,
  Phone,
  Calendar,
  AlertTriangle,
  Building2,
  Wallet,
  Maximize
} from 'lucide-react';

interface ProjectInitiator {
  id: string;
  name: string;
  phone: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  leadsCount: number;
  submittedAt: string;
  location: string;
}

interface Lead {
  id: string;
  initiatorId: string;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
  projectName: string;
  budget: string;
  area: string;
}

const mockInitiators: ProjectInitiator[] = [
  { id: 'I2001', name: '陈先生', phone: '138****1122', status: 'Pending', leadsCount: 0, submittedAt: '2026-04-20 14:30', location: '北京' },
  { id: 'I2002', name: '林如烟', phone: '139****3344', status: 'Approved', leadsCount: 12, submittedAt: '2026-04-10 09:15', location: '上海' },
  { id: 'I2003', name: '郑经理', phone: '137****5566', status: 'Approved', leadsCount: 5, submittedAt: '2026-04-12 11:00', location: '广州' },
  { id: 'I2004', name: '赵大海', phone: '131****7788', status: 'Rejected', leadsCount: 0, submittedAt: '2026-04-15 16:45', location: '深圳' },
  { id: 'I2005', name: '孙主管', phone: '136****9900', status: 'Pending', leadsCount: 0, submittedAt: '2026-04-21 10:20', location: '西安' },
];

const mockLeads: Lead[] = [
  { 
    id: 'L1001', 
    initiatorId: 'I2002', 
    name: '张三', 
    phone: '138****8888', 
    status: '待对接', 
    createdAt: '2026-04-20',
    projectName: '西山映月精装项目',
    budget: '20-30万',
    area: '120㎡'
  },
  { 
    id: 'L1002', 
    initiatorId: 'I2002', 
    name: '李四', 
    phone: '139****7777', 
    status: '跟进中', 
    createdAt: '2026-04-21',
    projectName: '龙湖首开·天青色',
    budget: '50-80万',
    area: '240㎡'
  },
  { 
    id: 'L1003', 
    initiatorId: 'I2002', 
    name: '王五', 
    phone: '137****6666', 
    status: '已成交', 
    createdAt: '2026-04-22',
    projectName: '碧桂园·时代风华',
    budget: '15-20万',
    area: '89㎡'
  },
  { 
    id: 'L1004', 
    initiatorId: 'I2003', 
    name: '赵六', 
    phone: '136****5555', 
    status: '待对接', 
    createdAt: '2026-04-23',
    projectName: '中铁建·青秀城',
    budget: '30-40万',
    area: '143㎡'
  },
  { 
    id: 'L1005', 
    initiatorId: 'I2003', 
    name: '钱七', 
    phone: '135****4444', 
    status: '已成交', 
    createdAt: '2026-04-24',
    projectName: '万科·翡翠山',
    budget: '100万+',
    area: '320㎡'
  },
];

export default function ProjectInitiatorManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInitiator, setSelectedInitiator] = useState<ProjectInitiator | null>(null);

  const filteredInitiators = mockInitiators.filter(i => {
    const matchesTab = activeTab === 'all' || i.status.toLowerCase() === activeTab;
    const matchesSearch = i.name.includes(searchTerm) || i.phone.includes(searchTerm) || i.id.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const currentInitiatorLeads = selectedInitiator 
    ? mockLeads.filter(l => l.initiatorId === selectedInitiator.id)
    : [];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">项目发起人管理</h1>
          <p className="text-slate-500 text-sm mt-1">审核并管理平台线索提供者（项目发起人）资料及推广数据</p>
        </div>
        <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab === 'all' ? '全部' : tab === 'pending' ? '待审核' : tab === 'approved' ? '已入驻' : '已驳回'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索姓名、手机号" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all"
            />
          </div>
          <div className="text-xs text-slate-400 font-medium">
            共 {filteredInitiators.length} 位项目发起人
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">项目发起人信息</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">所在地区</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">身份标签</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">发布线索数</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">申请日期</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">当前状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInitiators.length > 0 ? filteredInitiators.map((initiator) => (
                <tr key={initiator.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                        {initiator.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{initiator.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{initiator.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{initiator.location}</td>
                  <td className="px-6 py-4">
                    {initiator.status === 'Approved' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[10px] font-bold">
                        <ShieldCheck size={10} />
                        项目发起人
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">尚未获得标签</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => initiator.leadsCount > 0 && setSelectedInitiator(initiator)}
                      disabled={initiator.leadsCount === 0}
                      className={`group flex items-center justify-center gap-1.5 font-bold text-slate-700 mx-auto px-3 py-1 rounded-lg transition-all ${
                        initiator.leadsCount > 0 
                          ? 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer' 
                          : 'cursor-default opacity-60'
                      }`}
                    >
                      <Target size={14} className={initiator.leadsCount > 0 ? "text-blue-400 group-hover:text-blue-500" : "text-slate-300"} />
                      {initiator.leadsCount}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">{initiator.submittedAt.split(' ')[0]}</td>
                  <td className="px-6 py-4">
                    {initiator.status === 'Approved' && (
                      <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 w-fit border border-emerald-100">
                        <CheckCircle2 size={12} />
                        已入驻
                      </span>
                    )}
                    {initiator.status === 'Pending' && (
                      <span className="flex items-center gap-1.5 text-amber-600 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 w-fit border border-amber-100">
                        <Clock size={12} />
                        待审核
                      </span>
                    )}
                    {initiator.status === 'Rejected' && (
                      <span className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-50 w-fit border border-red-100">
                        <XCircle size={12} />
                        已驳回
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/initiators/${initiator.id}`}
                      className="inline-block px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                      审核详情
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400 text-sm">
                    暂无人进行项目发起人申请
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads List Modal */}
      {selectedInitiator && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">发布线索明细</h3>
                  <p className="text-xs text-slate-500">项目发起人：{selectedInitiator.name} · {selectedInitiator.phone}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInitiator(null)}
                className="w-10 h-10 rounded-2xl text-slate-400 hover:bg-white hover:text-slate-600 transition-all border border-transparent hover:border-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
              {currentInitiatorLeads.length > 0 ? (
                currentInitiatorLeads.map(lead => (
                  <div key={lead.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-blue-100 hover:bg-blue-50/20 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm text-slate-600 flex items-center justify-center text-xs font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-sm block leading-none">{lead.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{lead.phone}</span>
                      </div>
                      <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        lead.status === '已成交' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : lead.status === '待对接'
                          ? 'bg-amber-50 border-amber-100 text-amber-600'
                          : 'bg-blue-50 border-blue-100 text-blue-600'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 mb-3 bg-white/50 p-2.5 rounded-xl border border-slate-100/50">
                      <div className="col-span-2 flex items-center gap-2 text-[11px] text-slate-600">
                        <Building2 size={12} className="text-blue-500" />
                        <span className="text-slate-400">项目：</span>
                        <span className="font-bold">{lead.projectName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Wallet size={12} className="text-amber-500" />
                        <span className="text-slate-400">预算：</span>
                        <span className="font-bold">{lead.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Maximize size={12} className="text-indigo-500" />
                        <span className="text-slate-400">面积：</span>
                        <span className="font-bold">{lead.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100/50">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-400" />
                        {lead.createdAt}
                      </div>
                      <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-slate-300">ID:</span>
                        <span className="font-mono">{lead.id}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 text-slate-300">
                    <Target size={32} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">暂无发布的线索内容</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedInitiator(null)}
                className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all shadow-sm"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

