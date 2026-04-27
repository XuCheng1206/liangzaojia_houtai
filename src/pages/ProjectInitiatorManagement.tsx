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
  ChevronRight
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

const mockInitiators: ProjectInitiator[] = [
  { id: 'I2001', name: '陈先生', phone: '138****1122', status: 'Pending', leadsCount: 0, submittedAt: '2026-04-20 14:30', location: '北京' },
  { id: 'I2002', name: '林如烟', phone: '139****3344', status: 'Approved', leadsCount: 12, submittedAt: '2026-04-10 09:15', location: '上海' },
  { id: 'I2003', name: '郑经理', phone: '137****5566', status: 'Approved', leadsCount: 5, submittedAt: '2026-04-12 11:00', location: '广州' },
  { id: 'I2004', name: '赵大海', phone: '131****7788', status: 'Rejected', leadsCount: 0, submittedAt: '2026-04-15 16:45', location: '深圳' },
  { id: 'I2005', name: '孙主管', phone: '136****9900', status: 'Pending', leadsCount: 0, submittedAt: '2026-04-21 10:20', location: '西安' },
];

export default function ProjectInitiatorManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInitiators = mockInitiators.filter(i => {
    const matchesTab = activeTab === 'all' || i.status.toLowerCase() === activeTab;
    const matchesSearch = i.name.includes(searchTerm) || i.phone.includes(searchTerm) || i.id.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

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
              placeholder="搜索姓名、手机号、编号..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all"
            />
          </div>
          <div className="text-xs text-slate-400 font-medium">
            共 {filteredInitiators.length} 位发起人
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">发起人信息</th>
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
                    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700">
                      <Target size={14} className="text-slate-300" />
                      {initiator.leadsCount}
                    </div>
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
                    暂无人进行发起人申请
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
