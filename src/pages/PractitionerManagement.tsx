import { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Star, 
  MapPin, 
  Hammer, 
  Wrench,
  CheckCircle,
  MoreVertical,
  ChevronRight,
  TrendingUp,
  UserPlus
} from 'lucide-react';

interface Practitioner {
  id: string;
  name: string;
  category: string;
  level: 'Junior' | 'Senior' | 'Expert';
  rating: number;
  location: string;
  projectsCount: number;
  status: 'Available' | 'Working' | 'Resting';
}

const mockPractitioners: Practitioner[] = [
  { id: 'P001', name: '王木工', category: '木工', level: 'Expert', rating: 4.9, location: '上海/浦东', projectsCount: 124, status: 'Working' },
  { id: 'P002', name: '李瓦工', category: '瓦工', level: 'Senior', rating: 4.7, location: '上海/静安', projectsCount: 86, status: 'Available' },
  { id: 'P003', name: '张水电', category: '水电工', level: 'Senior', rating: 4.8, location: '上海/徐汇', projectsCount: 92, status: 'Resting' },
  { id: 'P004', name: '赵油漆', category: '油漆工', level: 'Junior', rating: 4.5, location: '上海/闵行', projectsCount: 34, status: 'Available' },
  { id: 'P005', name: '刘小龙', category: '全屋定制', level: 'Expert', rating: 5.0, location: '上海/青浦', projectsCount: 210, status: 'Working' },
];

export default function PractitionerManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');

  const filteredPractitioners = mockPractitioners.filter(p => {
    const matchesSearch = p.name.includes(searchTerm) || p.category.includes(searchTerm);
    const matchesStatus = statusFilter === '全部' || 
      (statusFilter === '承接中' && p.status === 'Working') ||
      (statusFilter === '可预约' && p.status === 'Available') ||
      (statusFilter === '休息中' && p.status === 'Resting');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[20px] font-semibold text-slate-900">从业者名录</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-blue-700 transition-all">
            + 招募入驻
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center bg-white border border-slate-200 rounded px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="按姓名、技种搜索..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-[13px] ml-2 w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded px-3 py-1.5 text-[13px] font-medium text-slate-600 outline-none hover:bg-slate-50 transition-all"
          >
            <option value="全部">全部状态</option>
            <option value="承接中">承接中</option>
            <option value="可预约">可预约</option>
            <option value="休息中">休息中</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPractitioners.map((worker) => (
          <div key={worker.id} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:border-[#2563eb] transition-all overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[15px] flex items-center gap-2">
                      {worker.name}
                      {worker.level === 'Expert' && <span className="text-[#92400e] bg-[#fef3c7] text-[10px] px-1.5 py-0.5 rounded font-bold">EXPERT</span>}
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">{worker.category}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-500">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 border border-slate-100 rounded mb-6">
                <div className="p-3 border-r border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">星级</p>
                  <p className="text-[14px] font-bold text-slate-800 mt-1">{worker.rating}</p>
                </div>
                <div className="p-3 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">案例</p>
                  <p className="text-[14px] font-bold text-slate-800 mt-1">{worker.projectsCount}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-500">服务区域</span>
                  <span className="text-slate-700">{worker.location}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-500">当前状态</span>
                  <span className={`font-semibold ${worker.status === 'Working' || worker.status === 'Available' ? 'text-[#166534]' : 'text-slate-400'}`}>
                    {worker.status === 'Working' ? '承接中' : worker.status === 'Available' ? '可预约' : '休息中'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-[#f8fafc]">
              <span className="text-[11px] text-slate-400 font-mono">#{worker.id}</span>
              <button className="text-[#2563eb] text-[12px] font-semibold hover:underline">查看档案</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
