import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Clock,
  User,
  MoreVertical
} from 'lucide-react';

type WorkerRole = '工长' | '设计师' | '拆除工' | '水电工' | '木工' | '泥瓦工' | '油漆工';

interface Certification {
  id: string;
  userName: string;
  phone: string;
  role: WorkerRole;
  userType: 'Worker' | 'Studio' | 'Enterprise';
  certType: 'Skill' | 'Identity' | 'Safety';
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  experienceYears: number;
}

const mockCerts: Certification[] = [
  { 
    id: 'C1001', 
    userName: '张师傅', 
    phone: '138****0001',
    role: '水电工',
    userType: 'Worker', 
    certType: 'Skill', 
    status: 'Pending', 
    submittedAt: '2026-04-16 09:15',
    experienceYears: 8
  },
  { 
    id: 'C1002', 
    userName: '林悦', 
    phone: '139****2288',
    role: '设计师',
    userType: 'Studio', 
    certType: 'Identity', 
    status: 'Pending', 
    submittedAt: '2026-04-16 11:30',
    experienceYears: 5
  },
  { 
    id: 'C1003', 
    userName: '刘大山', 
    phone: '137****9911',
    role: '工长',
    userType: 'Enterprise', 
    certType: 'Skill', 
    status: 'Approved', 
    submittedAt: '2026-04-14 14:00',
    experienceYears: 12
  },
  { 
    id: 'C1004', 
    userName: '陈工', 
    phone: '135****4433',
    role: '木工',
    userType: 'Worker', 
    certType: 'Skill', 
    status: 'Pending', 
    submittedAt: '2026-04-16 15:45',
    experienceYears: 10
  },
];

export default function CertificationManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCerts = mockCerts.filter(c => {
    const matchesTab = activeTab === 'all' || c.status.toLowerCase() === activeTab;
    const matchesSearch = c.userName.includes(searchTerm) || c.id.includes(searchTerm) || c.role.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">认证审核</h1>
          <p className="text-slate-500 text-sm mt-1">审核工长、设计师及各类技工的从业资质信息</p>
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
              {tab === 'all' ? '全部' : tab === 'pending' ? '待审核' : tab === 'approved' ? '已通过' : '未通过'}
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
              placeholder="搜索姓名、角色、或编号..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
          </div>
          <div className="text-xs text-slate-400 font-medium">
            共 {filteredCerts.length} 条申请
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">申请信息</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">工种角色</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">认证项目</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">从业年限</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">申请时间</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">当前状态</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCerts.length > 0 ? filteredCerts.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                        {cert.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{cert.userName}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{cert.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      cert.role === '设计师' ? 'bg-purple-50 text-purple-600' :
                      cert.role === '工长' ? 'bg-sky-50 text-sky-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {cert.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium text-sm">
                      <FileText size={14} className="text-slate-300" />
                      {cert.certType === 'Skill' ? '技能证书认证' : cert.certType === 'Identity' ? '实名身份认证' : '安全合规认证'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{cert.experienceYears} 年</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{cert.submittedAt}</td>
                  <td className="px-6 py-4">
                    {cert.status === 'Approved' && (
                      <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold px-2 py-1 rounded-full bg-emerald-50 w-fit">
                        <CheckCircle2 size={12} />
                        已通过
                      </span>
                    )}
                    {cert.status === 'Pending' && (
                      <span className="flex items-center gap-1.5 text-amber-600 text-xs font-bold px-2 py-1 rounded-full bg-amber-50 w-fit">
                        <Clock size={12} />
                        审核中
                      </span>
                    )}
                    {cert.status === 'Rejected' && (
                      <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold px-2 py-1 rounded-full bg-red-50 w-fit">
                        <XCircle size={12} />
                        被驳回
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/certs/${cert.id}`)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      审核详情
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400 italic">
                    暂无待处理的审核申请
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
