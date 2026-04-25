import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Search, User, Plus, FileText, Component } from 'lucide-react';

const mockAssignees = [
  { id: '1', name: '李四', phone: '13911112222', role: '销售经理' },
  { id: '2', name: '钱七', phone: '13533334444', role: '区域主管' },
  { id: '3', name: '张经理', phone: '13855556666', role: '销售' },
  { id: '4', name: '赵主管', phone: '13777778888', role: '销售主管' },
];

export default function AddLead() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectLocation: '',
    ownerName: '',
    contactPhone: '',
    floorArea: '',
    functionalNeeds: '',
    styleNeeds: '',
    budgetNeeds: '',
    timelineNeeds: '',
    remarks: '',
    leadSource: '',
    leadProvider: '',
    status: '待对接',
    assigneeName: ''
  });

  const [showAssigneeModal, setShowAssigneeModal] = useState(false);
  const [assigneeSearch, setAssigneeSearch] = useState('');
  
  const [leadSources, setLeadSources] = useState(['抖音', '朋友推荐', '自然进店', '线上推广', '其他']);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [newSource, setNewSource] = useState('');

  const filteredAssignees = mockAssignees.filter(a => 
    a.name.includes(assigneeSearch) || a.phone.includes(assigneeSearch)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Simulate save functionality
    console.log('Saved Lead Data:', formData);
    navigate('/leads');
  };

  const inputClassName = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-colors";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => navigate('/leads')}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">新增线索</h1>
              <p className="text-slate-500 text-sm mt-1">录入新的客户项目线索信息</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => navigate('/leads')}
              className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
            >
              取消
            </button>
            <button 
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-blue-700 transition-all"
            >
              <Save size={16} />
              保存线索
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 客户与项目信息 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">客户与项目信息</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">客户姓名 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="ownerName"
                    required
                    placeholder="客户姓名" 
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-slate-400 mb-1">联系电话 <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    name="contactPhone"
                    required
                    placeholder="客户手机号" 
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">项目名称 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="projectName"
                    required
                    placeholder="项目名称" 
                    value={formData.projectName}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-slate-400 mb-1">项目位置 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="projectLocation"
                    required
                    placeholder="项目位置" 
                    value={formData.projectLocation}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            {/* 需求属性 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">需求属性</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">户型面积 (㎡)</p>
                  <input 
                    type="number" 
                    name="floorArea"
                    placeholder="如：120" 
                    value={formData.floorArea}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-sm bg-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">风格倾向</p>
                  <input 
                    type="text" 
                    name="styleNeeds"
                    placeholder="如：现代简约" 
                    value={formData.styleNeeds}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-sm bg-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">预算需求 (万元)</p>
                  <input 
                    type="number" 
                    name="budgetNeeds"
                    placeholder="如：30" 
                    value={formData.budgetNeeds}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-sm bg-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">工期需求</p>
                  <input 
                    type="text" 
                    name="timelineNeeds"
                    placeholder="希望3个月内" 
                    value={formData.timelineNeeds}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-sm bg-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-slate-400 mb-1">详细功能需求</h3>
                  <textarea 
                    name="functionalNeeds"
                    rows={4}
                    placeholder="填写客户对空间功能的具体要求..." 
                    value={formData.functionalNeeds}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none resize-none transition-colors"
                  ></textarea>
                </div>
                <div>
                  <h3 className="text-sm text-slate-400 mb-1">其他备注说明</h3>
                  <textarea 
                    name="remarks"
                    rows={4}
                    placeholder="其他需要注意的事项补充..." 
                    value={formData.remarks}
                    onChange={handleChange}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none resize-none transition-colors"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧边栏属性 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Component className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">附加信息</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">线索状态 <span className="text-red-500">*</span></label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                  >
                    <option value="待对接">待对接</option>
                    <option value="待分配">待分配</option>
                    <option value="转化中">转化中</option>
                    <option value="已转化">已转化</option>
                    <option value="已关闭">已关闭</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">线索来源</label>
                  <div className="flex gap-2">
                    <select 
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleChange}
                      className={inputClassName}
                    >
                      <option value="">选择线索来源</option>
                      {leadSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowAddSourceModal(true)}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center shrink-0 bg-white"
                      title="添加来源"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">提供人</label>
                  <input 
                    type="text" 
                    name="leadProvider"
                    placeholder="填写推荐人" 
                    value={formData.leadProvider}
                    onChange={handleChange}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">线索转化人员</label>
                  <div 
                    onClick={() => setShowAssigneeModal(true)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 hover:bg-white hover:border-blue-500 outline-none transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span className={formData.assigneeName ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                      {formData.assigneeName || '点击选择分配人员'}
                    </span>
                    <User size={16} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Assignee Search Modal */}
      {showAssigneeModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">选择线索转化人员</h3>
              <button 
                onClick={() => setShowAssigneeModal(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 border-b border-slate-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="搜索姓名或手机号..."
                  value={assigneeSearch}
                  onChange={(e) => setAssigneeSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {filteredAssignees.length > 0 ? (
                filteredAssignees.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, assigneeName: user.name }));
                      setShowAssigneeModal(false);
                      setAssigneeSearch('');
                    }}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5 font-mono">{user.phone}</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      {user.role}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-sm">
                  没有找到匹配的人员
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Add Lead Source Modal */}
      {showAddSourceModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">添加线索来源</h3>
              <button 
                type="button"
                onClick={() => setShowAddSourceModal(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <label className="block text-sm font-bold text-slate-700 mb-2">来源名称</label>
              <input 
                type="text" 
                autoFocus
                placeholder="输入新的线索来源..."
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
              />
            </div>

            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button 
                type="button"
                onClick={() => setShowAddSourceModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                type="button"
                onClick={() => {
                  if (newSource.trim()) {
                    setLeadSources(prev => [...prev, newSource.trim()]);
                    setFormData(prev => ({ ...prev, leadSource: newSource.trim() }));
                    setNewSource('');
                    setShowAddSourceModal(false);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

