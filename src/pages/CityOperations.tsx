import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Map as MapIcon, 
  Search, 
  Building2, 
  Users, 
  Target, 
  TrendingUp, 
  MoreHorizontal,
  ChevronRight,
  Plus,
  Activity
} from 'lucide-react';

interface CityCenter {
  id: string;
  name: string;
  manager: string;
  status: 'Active' | 'UnderConstruction' | 'Inactive';
  workersCount: number;
  monthlyRevenue: string;
  growth: string;
}

const mockCities: CityCenter[] = [
  { id: 'C-SH', name: '上海运营中心', manager: '管理员', status: 'Active', workersCount: 450, monthlyRevenue: '¥ 1,240,000', growth: '+15.2%' },
  { id: 'C-HZ', name: '杭州运营中心', manager: '李四', status: 'Active', workersCount: 280, monthlyRevenue: '¥ 860,000', growth: '+8.4%' },
  { id: 'C-SZ', name: '苏州运营中心', manager: '钱七', status: 'UnderConstruction', workersCount: 45, monthlyRevenue: '¥ 120,000', growth: '+45.0%' },
  { id: 'C-NB', name: '宁波运营中心', manager: '王五', status: 'Active', workersCount: 156, monthlyRevenue: '¥ 420,000', growth: '-2.1%' },
];

export default function CityOperations() {
  const navigate = useNavigate();
  const [listType, setListType] = useState<'ops' | 'trading'>('ops');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = mockCities.filter(city => 
    city.name.includes(searchTerm) || 
    city.manager.includes(searchTerm) || 
    city.id.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">城市管理系统</h1>
          <p className="text-slate-500 text-sm mt-1">管理各城市运营中心、交易中心及区域业绩</p>
        </div>
        <button 
          onClick={() => navigate('/cities/add')}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
        >
          <Plus size={18} />
          <span>增加运营中心</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Activity size={20} />
            </div>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase">Real-time</span>
          </div>
          <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">平台总产值</p>
          <p className="text-3xl font-black mb-6 tracking-tight">¥ 2,640,000</p>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <TrendingUp size={14} />
            <span>同比上月增长 12.8%</span>
          </div>
        </div>
        
        {mockCities.slice(0, 2).map((city, i) => (
          <div key={city.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{city.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{city.id}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-50 text-emerald-600">
                运营中
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">负责人</p>
                <p className="text-sm font-bold text-slate-800">{city.manager}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">从业者</p>
                <p className="text-sm font-bold text-slate-800">{city.workersCount} 人</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex">
            <button 
              onClick={() => setListType('ops')}
              className={`px-8 py-5 text-sm font-bold border-b-2 transition-all ${listType === 'ops' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              运营中心管理
            </button>
            <button 
              onClick={() => setListType('trading')}
              className={`px-8 py-5 text-sm font-bold border-b-2 transition-all ${listType === 'trading' ? 'border-blue-600 text-blue-600 bg-blue-50/30' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              交易中心管理
            </button>
          </div>
          <div className="p-4 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 w-64 lg:w-80 mr-4 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder={`搜索${listType === 'ops' ? '运营中心' : '交易中心'}...`} 
              className="bg-transparent border-none outline-none text-xs ml-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{listType === 'ops' ? '中心名称' : '交易中心名称'}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">负责人</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{listType === 'ops' ? '运营状态' : '当前状态'}</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCities.map((city) => (
                <tr key={city.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800 text-sm">
                    {listType === 'ops' ? city.name : `${city.name.replace('运营中心', '')}交易中心`}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{city.manager}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <span className="text-xs font-bold text-slate-700">运营中</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(listType === 'ops' ? `/cities/edit/${city.id}` : `/cities/trading-config/${city.id}`)}
                      className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1 justify-end ml-auto"
                    >
                      配置
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
