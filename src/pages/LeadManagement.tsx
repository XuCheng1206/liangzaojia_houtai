import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  BadgeAlert,
  Calendar,
  MoreVertical,
  ExternalLink
} from 'lucide-react';

export type LeadStatus = '待对接' | '待分配' | '转化中' | '已转化' | '已关闭';

interface Lead {
  id: string;
  name: string;
  source: string;
  phone: string;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
}

const mockLeads: Lead[] = [
  { id: '1', name: '王家梁', source: '百度搜索', phone: '138-xxxx-8888', status: '待对接', assignedTo: '管理员', createdAt: '2026-04-16' },
  { id: '2', name: '陆美玲', source: '项目发起人', phone: '139-xxxx-1234', status: '待分配', assignedTo: '李四', createdAt: '2026-04-15' },
  { id: '3', name: '周杰', source: '抖音广告', phone: '135-xxxx-9999', status: '转化中', assignedTo: '钱七', createdAt: '2026-04-14' },
  { id: '4', name: '曾志伟', source: '线下活动', phone: '137-xxxx-7777', status: '已转化', assignedTo: '李四', createdAt: '2026-04-10' },
  { id: '5', name: '刘德华', source: '官网留言', phone: '131-xxxx-0000', status: '已关闭', assignedTo: '-', createdAt: '2026-04-16' },
];

export default function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'全部' | LeadStatus>('全部');
  const navigate = useNavigate();

  const filteredLeads = mockLeads.filter(l => {
    const matchesSearch = l.name.includes(searchTerm) || l.phone.includes(searchTerm);
    const matchesStatus = statusFilter === '全部' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[20px] font-semibold text-slate-900">线索列表</h1>
        </div>
        <button 
          onClick={() => navigate('/leads/add')}
          className="bg-[#2563eb] text-white px-4 py-2 rounded font-medium text-[13px] hover:bg-blue-700 transition-all"
        >
          + 新增线索
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        {/* Toolbar Placeholder or Search */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded px-3 py-1.5 w-64">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索客户姓名、电话..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-[13px] ml-2 w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as '全部' | LeadStatus)}
              className="bg-white border border-slate-200 rounded px-3 py-1.5 text-[13px] text-slate-600 outline-none hover:bg-slate-50 font-medium"
            >
              <option value="全部">全部状态</option>
              <option value="待对接">待对接</option>
              <option value="待分配">待分配</option>
              <option value="转化中">转化中</option>
              <option value="已转化">已转化</option>
              <option value="已关闭">已关闭</option>
            </select>
          </div>
          
          <div className="flex items-center text-xs text-slate-400 font-medium">
            共 <span className="text-slate-900 mx-1 font-bold">{filteredLeads.length}</span> 条线索
          </div>
        </div>

        {/* List */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">编号</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">客户姓名</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">联系电话</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">来源</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">当前状态</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">创建时间</th>
                <th className="px-6 py-3 text-[14px] font-semibold text-slate-500 border-b border-slate-200">操作</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500 font-mono text-[12px]">L-202604-{lead.id}</td>
                  <td className="px-6 py-4 border-b border-slate-100 font-medium text-slate-800">{lead.name}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600">{lead.phone}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-600">{lead.source}</td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[12px] font-medium ${
                      lead.status === '待对接' ? 'bg-purple-50 text-purple-600' :
                      lead.status === '待分配' ? 'bg-amber-50 text-amber-600' :
                      lead.status === '转化中' ? 'bg-blue-50 text-blue-600' :
                      lead.status === '已转化' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500">2026-04-{lead.createdAt.slice(-2)} 10:20</td>
                  <td 
                    onClick={() => navigate(`/leads/${lead.id}`)}
                    className="px-6 py-4 border-b border-slate-100 text-[#2563eb] cursor-pointer hover:underline font-medium"
                  >
                    查看详情
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder to match design */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-2 bg-white">
          <button className="px-3 py-1 border border-slate-200 rounded text-[12px] bg-white hover:bg-slate-50">上一页</button>
          <button className="px-3 py-1 bg-[#2563eb] text-white rounded text-[12px]">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded text-[12px] bg-white hover:bg-slate-50">2</button>
          <button className="px-3 py-1 border border-slate-200 rounded text-[12px] bg-white hover:bg-slate-50">下一页</button>
        </div>
      </div>
    </div>
  );
}
