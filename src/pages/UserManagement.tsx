import { useState } from 'react';
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Shield 
} from 'lucide-react';

export type UserSource = 'B-小程序' | 'C-小程序';
export type PractitionerRole = '设计师' | '工长' | '拆除工' | '水电工' | '木工' | '泥瓦工' | '油漆工' | '其他';

interface User {
  id: string;
  name: string;
  phone: string;
  source: UserSource;
  professionalRole?: PractitionerRole;
  createdAt: string;
  lastLogin: string;
  city?: string;
}

const mockUsers: User[] = [
  { id: 'U001', name: '张工', phone: '138****8888', source: 'B-小程序', professionalRole: '工长', createdAt: '2026-04-10', lastLogin: '2026-04-20 10:30', city: '北京' },
  { id: 'U002', name: '李设计师', phone: '139****1234', source: 'B-小程序', professionalRole: '设计师', createdAt: '2026-03-15', lastLogin: '2026-04-21 08:22', city: '上海' },
  { id: 'U003', name: '王客户', phone: '135****9999', source: 'C-小程序', createdAt: '2026-04-18', lastLogin: '2026-04-21 09:15', city: '深圳' },
  { id: 'U004', name: '赵木工', phone: '137****7777', source: 'B-小程序', professionalRole: '木工', createdAt: '2026-04-20', lastLogin: '-', city: '西安' },
  { id: 'U005', name: '孙客户', phone: '131****0000', source: 'C-小程序', createdAt: '2026-01-20', lastLogin: '2026-03-30 14:15', city: '广州' },
  { id: 'U006', name: '周水电', phone: '133****1111', source: 'B-小程序', professionalRole: '水电工', createdAt: '2026-02-05', lastLogin: '2026-04-16 09:45', city: '南阳' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'B' | 'C'>('All');
  const [roleFilter, setRoleFilter] = useState<PractitionerRole | 'All'>('All');

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = u.name.includes(searchTerm) || u.phone.includes(searchTerm) || u.id.includes(searchTerm);
    const matchesTab = activeTab === 'All' || (activeTab === 'B' ? u.source === 'B-小程序' : u.source === 'C-小程序');
    const matchesRole = roleFilter === 'All' || u.professionalRole === roleFilter;
    return matchesSearch && matchesTab && matchesRole;
  });

  const stats = {
    total: mockUsers.length,
    bSide: mockUsers.filter(u => u.source === 'B-小程序').length,
    cSide: mockUsers.filter(u => u.source === 'C-小程序').length,
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[20px] font-semibold text-slate-900">用户管理</h1>
          <p className="text-slate-500 text-sm mt-1">管理B端从业者与C端装修客户的注册信息</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: '总用户数', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'B端从业者', value: stats.bSide, icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'C端装修客户', value: stats.cSide, icon: Mail, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {/* Tab Switcher & Toolbar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="flex items-center px-6 pt-4 gap-8">
            {[
              { id: 'All', label: '全部用户' },
              { id: 'B', label: 'B端从业者' },
              { id: 'C', label: 'C端装修客户' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setRoleFilter('All');
                }}
                className={`pb-3 text-sm font-bold transition-all relative ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
              </button>
            ))}
          </div>
          
          <div className="p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded px-3 py-1.5 w-64">
                <Search size={16} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="搜索ID、姓名、手机号..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none text-[13px] ml-2 w-full text-slate-700 placeholder:text-slate-400"
                />
              </div>
              
              {activeTab === 'B' && (
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded px-3 py-1.5 text-[13px] text-slate-600 outline-none hover:bg-slate-50 font-medium"
                >
                  <option value="All">全部工种</option>
                  {['设计师', '工长', '拆除工', '水电工', '木工', '泥瓦工', '油漆工'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="flex items-center text-xs text-slate-400 font-medium">
              共找到 <span className="text-slate-900 mx-1 font-bold">{filteredUsers.length}</span> 条记录
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-6 py-3 text-[12px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">编号 / 用户</th>
                <th className="px-6 py-3 text-[12px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">联系电话</th>
                <th className="px-6 py-3 text-[12px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">来源渠道</th>
                <th className="px-6 py-3 text-[12px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">
                  {activeTab === 'C' ? '注册城市' : '工种 / 城市'}
                </th>
                <th className="px-6 py-3 text-[12px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">创建时间</th>
                <th className="px-6 py-3 text-[12px] font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[14px] uppercase ${
                        user.source === 'B-小程序' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono tracking-tighter">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600 font-medium">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      user.source === 'B-小程序' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'
                    }`}>
                      {user.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    {user.source === 'B-小程序' ? (
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-bold">{user.professionalRole}</span>
                        <span className="text-[11px] text-slate-400">{user.city || '-'}</span>
                      </div>
                    ) : (
                      <span className="text-slate-800 font-bold">{user.city || '未知'}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-[#2563eb] hover:bg-blue-50 px-2 py-1 rounded transition-colors font-bold text-xs">详情</button>
                      <button className="text-slate-400 hover:text-slate-600 p-1 rounded">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-2 bg-[#f8fafc]">
          <button className="px-3 py-1 border border-slate-200 rounded text-[12px] bg-white hover:bg-slate-50 text-slate-500 font-medium">上一页</button>
          <button className="px-3 py-1 bg-[#2563eb] text-white rounded text-[12px] font-bold">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded text-[12px] bg-white hover:bg-slate-50 text-slate-500 font-medium">下一页</button>
        </div>
      </div>
    </div>
  );
}
