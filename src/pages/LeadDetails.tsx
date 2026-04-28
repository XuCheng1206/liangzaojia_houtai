import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  FileText, 
  Send, 
  Clock, 
  CheckCircle,
  MessageSquare,
  Image as ImageIcon,
  Paperclip,
  X,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';

const mockEmployees = [
  { id: '1', name: '李四', phone: '138****0001' },
  { id: '2', name: '张三', phone: '139****0002' },
  { id: '3', name: '王五', phone: '137****0003' },
  { id: '4', name: '赵六', phone: '136****0004' }
];

interface Attachment {
  name: string;
  type: 'image' | 'file';
  url: string;
}

// Mock data builder for demonstration
const getMockLeadDetails = (id: string) => ({
  id,
  name: '王家梁',
  phone: '138-xxxx-8888',
  status: '转化中',
  source: id === '2' ? '项目发起人' : (id === '1' ? '百度搜索' : '线下活动'),
  provider: id === '2' ? '陈先生' : '-',
  assignedTo: ['李四'],
  createdAt: '2026-04-16 10:20',
  projectName: '绿地世纪城3期装修',
  projectLocation: '上海市浦东新区张江路100号',
  floorArea: '120',
  styleNeeds: '现代简约',
  budgetNeeds: '30',
  timelineNeeds: '希望3个月内完工',
  functionalNeeds: '需要增加储物空间，做开放式厨房，次卧要做榻榻米。',
  remarks: '客户比较看重环保材料，对甲醛敏感。',
  history: [
    { 
      id: 2, 
      time: '2026-04-17 14:30', 
      type: 'note', 
      user: '李四', 
      content: '已初步电话沟通，客户周末有空看设计方案，已加微信发送初步案例。',
      attachments: [
        { name: '客厅意向图.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' }
      ] as Attachment[]
    },
    { 
      id: 1, 
      time: '2026-04-16 10:20', 
      type: 'system', 
      user: '系统', 
      content: '系统自动将线索分配给 李四',
      attachments: [] as Attachment[]
    }
  ]
});

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [lead, setLead] = useState(getMockLeadDetails(id || '1'));
  const [newNote, setNewNote] = useState('');
  const [history, setHistory] = useState(lead.history);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAssignError, setShowAssignError] = useState(false);
  const [currentAssignees, setCurrentAssignees] = useState<string[]>(lead.assignedTo);
  const [assignSearch, setAssignSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConfirmAssign = () => {
    if (currentAssignees.length === 0) {
      setShowAssignError(true);
      showToast('请选择分配人员', 'info');
      return;
    }
    setShowAssignError(false);
    setLead({ ...lead, assignedTo: currentAssignees });
    setShowAssignModal(false);
    showToast('分配成功', 'success');
  };

  const handleStatusChange = (newStatus: string) => {
    setLead({ ...lead, status: newStatus });
    showToast(`线索状态已变更为：${newStatus}`, 'success');
  };

  const handleSaveEdit = () => {
    // Define the fields to validate
    const requiredFields: { key: keyof typeof editedLead; label: string }[] = [
      { key: 'name', label: '客户姓名' },
      { key: 'phone', label: '联系电话' },
      { key: 'projectName', label: '项目名称' },
      { key: 'projectLocation', label: '项目位置' },
      { key: 'floorArea', label: '户型面积' },
      { key: 'styleNeeds', label: '风格倾向' },
      { key: 'budgetNeeds', label: '预算需求' },
      { key: 'timelineNeeds', label: '工期需求' },
      { key: 'functionalNeeds', label: '功能需求' },
      { key: 'remarks', label: '备注说明' },
      { key: 'source', label: '线索来源' },
      { key: 'provider', label: '提供人' }
    ];

    // Check for missing fields
    const missingKeys = requiredFields
      .filter(field => {
        const value = editedLead[field.key];
        return typeof value === 'string' ? !value.trim() : !value;
      })
      .map(f => f.key);

    if (missingKeys.length > 0) {
      setValidationErrors(missingKeys as string[]);
      const labels = requiredFields
        .filter(f => missingKeys.includes(f.key))
        .map(f => f.label)
        .join('、');
      
      showToast(`请填充：${labels}`, 'info');
      return;
    }

    setValidationErrors([]);
    setLead(editedLead);
    setIsEditing(false);
    showToast('保存成功', 'success');
  };

  const handleCancelEdit = () => {
    setEditedLead(lead);
    setValidationErrors([]);
    setIsEditing(false);
  };
  
  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.includes(assignSearch) || emp.phone.includes(assignSearch)
  );

  const toggleAssignee = (name: string) => {
    setCurrentAssignees(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const handleAddNote = () => {
    if (!newNote.trim() && attachments.length === 0) return;
    
    // Create current timestamp string 'YYYY-MM-DD HH:mm'
    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const note = {
      id: Date.now(),
      time: timeString,
      type: 'note',
      user: '管理员', // Mocked user
      content: newNote,
      attachments: [...attachments]
    };
    
    setHistory([note, ...history]);
    setNewNote('');
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments: Attachment[] = [];
      const filesArr = Array.from(e.target.files) as File[];
      filesArr.forEach(file => {
        const isImage = file.type.startsWith('image/');
        newAttachments.push({
          name: file.name,
          type: isImage ? 'image' : 'file',
          url: URL.createObjectURL(file) // Mock URL for preview
        });
      });
      setAttachments(prev => [...prev, ...newAttachments]);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/leads')}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{lead.projectName || `${lead.name} 的装修线索`}</h1>
              <div className="relative flex items-center">
                <select 
                  value={lead.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={!isEditing}
                  className={`pl-2.5 pr-7 py-1 rounded text-[12px] font-bold appearance-none outline-none transition-all border border-transparent ${
                    !isEditing ? 'cursor-default' : 'cursor-pointer hover:border-slate-300'
                  } ${
                    lead.status === '待对接' ? 'bg-purple-50 text-purple-600' :
                    lead.status === '待分配' ? 'bg-amber-50 text-amber-600' :
                    lead.status === '转化中' ? 'bg-blue-50 text-blue-600' :
                    lead.status === '已转化' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-slate-100 text-slate-500'
                  }`}
                >
                  <option value="待对接" className="bg-white text-slate-800">待对接</option>
                  <option value="待分配" className="bg-white text-slate-800">待分配</option>
                  <option value="转化中" className="bg-white text-slate-800">转化中</option>
                  <option value="已转化" className="bg-white text-slate-800">已转化</option>
                  <option value="已关闭" className="bg-white text-slate-800">已关闭</option>
                </select>
                {isEditing && (
                  <ChevronDown className={`absolute right-1.5 w-3.5 h-3.5 pointer-events-none ${
                      lead.status === '待对接' ? 'text-purple-600' :
                      lead.status === '待分配' ? 'text-amber-600' :
                      lead.status === '转化中' ? 'text-blue-600' :
                      lead.status === '已转化' ? 'text-emerald-600' :
                      'text-slate-500'
                  }`} />
                )}
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-1">编号：L-202604-{lead.id} · 创建于 {lead.createdAt}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancelEdit}
                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-blue-700 transition-all"
              >
                保存修改
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
              >
                编辑信息
              </button>
              <button 
                onClick={() => setShowAssignModal(true)}
                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
              >
                转交/分配
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              客户与项目信息
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-slate-400 mb-1">客户姓名</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedLead.name} 
                    onChange={e => setEditedLead({...editedLead, name: e.target.value})} 
                    className={`w-full px-3 py-1.5 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all ${
                      validationErrors.includes('name') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="font-bold text-slate-800">{lead.name}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">联系电话</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedLead.phone} 
                    onChange={e => setEditedLead({...editedLead, phone: e.target.value})} 
                    className={`w-full px-3 py-1.5 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all ${
                      validationErrors.includes('phone') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="font-bold text-slate-800 flex items-center gap-2">
                    {lead.phone}
                    <button className="p-1 hover:bg-blue-50 text-blue-600 rounded">
                      <Phone size={14} />
                    </button>
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">项目名称</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedLead.projectName} 
                    onChange={e => setEditedLead({...editedLead, projectName: e.target.value})} 
                    className={`w-full px-3 py-1.5 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all ${
                      validationErrors.includes('projectName') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="font-medium text-slate-800">{lead.projectName}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">项目位置</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedLead.projectLocation} 
                    onChange={e => setEditedLead({...editedLead, projectLocation: e.target.value})} 
                    className={`w-full px-3 py-1.5 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none transition-all ${
                      validationErrors.includes('projectLocation') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="font-medium text-slate-800 flex items-start gap-1">
                    <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    {lead.projectLocation}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              需求属性
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 mb-6">
              <div className={`p-3 rounded-xl border transition-all ${
                validationErrors.includes('floorArea') ? 'bg-rose-50 border-rose-200 ring-4 ring-rose-500/5' : 'bg-slate-50 border-slate-100'
              }`}>
                <p className={`text-[11px] font-bold uppercase mb-1 ${validationErrors.includes('floorArea') ? 'text-rose-500' : 'text-slate-400'}`}>户型面积</p>
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={editedLead.floorArea} 
                      onChange={e => setEditedLead({...editedLead, floorArea: e.target.value})} 
                      className={`w-full px-2 py-1 border rounded text-sm bg-white outline-none focus:border-blue-500 transition-all ${
                        validationErrors.includes('floorArea') ? 'border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200'
                      }`} 
                    />
                  </div>
                ) : (
                  <p className="font-bold text-slate-800 text-sm">{lead.floorArea} ㎡</p>
                )}
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                validationErrors.includes('styleNeeds') ? 'bg-rose-50 border-rose-200 ring-4 ring-rose-500/5' : 'bg-slate-50 border-slate-100'
              }`}>
                <p className={`text-[11px] font-bold uppercase mb-1 ${validationErrors.includes('styleNeeds') ? 'text-rose-500' : 'text-slate-400'}`}>风格倾向</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedLead.styleNeeds} 
                    onChange={e => setEditedLead({...editedLead, styleNeeds: e.target.value})} 
                    className={`w-full px-2 py-1 border rounded text-sm bg-white outline-none focus:border-blue-500 transition-all ${
                      validationErrors.includes('styleNeeds') ? 'border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="font-bold text-slate-800 text-sm">{lead.styleNeeds}</p>
                )}
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                validationErrors.includes('budgetNeeds') ? 'bg-rose-50 border-rose-200 ring-4 ring-rose-500/5' : 'bg-slate-50 border-slate-100'
              }`}>
                <p className={`text-[11px] font-bold uppercase mb-1 ${validationErrors.includes('budgetNeeds') ? 'text-rose-500' : 'text-slate-400'}`}>预算需求</p>
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={editedLead.budgetNeeds} 
                      onChange={e => setEditedLead({...editedLead, budgetNeeds: e.target.value})} 
                      className={`w-full px-2 py-1 border rounded text-sm bg-white outline-none focus:border-blue-500 transition-all ${
                        validationErrors.includes('budgetNeeds') ? 'border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200'
                      }`} 
                    />
                  </div>
                ) : (
                  <p className="font-bold text-slate-800 text-sm">{lead.budgetNeeds} 万元</p>
                )}
              </div>
              <div className={`p-3 rounded-xl border transition-all ${
                validationErrors.includes('timelineNeeds') ? 'bg-rose-50 border-rose-200 ring-4 ring-rose-500/5' : 'bg-slate-50 border-slate-100'
              }`}>
                <p className={`text-[11px] font-bold uppercase mb-1 ${validationErrors.includes('timelineNeeds') ? 'text-rose-500' : 'text-slate-400'}`}>工期需求</p>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedLead.timelineNeeds} 
                    onChange={e => setEditedLead({...editedLead, timelineNeeds: e.target.value})} 
                    className={`w-full px-2 py-1 border rounded text-sm bg-white outline-none focus:border-blue-500 transition-all ${
                      validationErrors.includes('timelineNeeds') ? 'border-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="font-bold text-slate-800 text-sm truncate" title={lead.timelineNeeds}>{lead.timelineNeeds}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className={`text-sm font-bold mb-2 ${validationErrors.includes('functionalNeeds') ? 'text-rose-500' : 'text-slate-700'}`}>详细功能需求：</h3>
                {isEditing ? (
                  <textarea 
                    value={editedLead.functionalNeeds} 
                    onChange={e => setEditedLead({...editedLead, functionalNeeds: e.target.value})} 
                    className={`w-full h-24 p-3 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none resize-none transition-all ${
                      validationErrors.includes('functionalNeeds') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-slate-100">
                    {lead.functionalNeeds || '未填写'}
                  </p>
                )}
              </div>
              <div>
                <h3 className={`text-sm font-bold mb-2 ${validationErrors.includes('remarks') ? 'text-rose-500' : 'text-slate-700'}`}>其他备注说明：</h3>
                {isEditing ? (
                  <textarea 
                    value={editedLead.remarks} 
                    onChange={e => setEditedLead({...editedLead, remarks: e.target.value})} 
                    className={`w-full h-24 p-3 border rounded-xl text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none resize-none transition-all ${
                      validationErrors.includes('remarks') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20 shadow-[0_0_0_2px_rgba(244,63,94,0.1)]' : 'border-slate-200'
                    }`} 
                  />
                ) : (
                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-slate-100">
                    {lead.remarks || '无'}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className={`text-sm mb-1 ${validationErrors.includes('source') ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>线索来源</p>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedLead.source} 
                  onChange={e => setEditedLead({...editedLead, source: e.target.value})} 
                  className={`w-full px-3 py-1.5 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none max-w-[150px] transition-all ${
                    validationErrors.includes('source') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20' : 'border-slate-200'
                  }`} 
                />
              ) : (
                <p className="font-medium text-slate-800">{lead.source}</p>
              )}
            </div>
            <div>
              <p className={`text-sm mb-1 ${validationErrors.includes('provider') ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>提供人</p>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedLead.provider} 
                  onChange={e => setEditedLead({...editedLead, provider: e.target.value})} 
                  className={`w-full px-3 py-1.5 border rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-blue-500 outline-none max-w-[150px] transition-all ${
                    validationErrors.includes('provider') ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20' : 'border-slate-200'
                  }`} 
                />
              ) : (
                <p className="font-medium text-slate-800">{lead.provider}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">当前转化人员</p>
              <div className="flex items-center gap-2 flex-wrap mt-1.5">
                {currentAssignees.length > 0 ? (
                  currentAssignees.map((assignee, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                        {assignee.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700 text-xs">{assignee}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">暂无分配人员</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tracking & Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px] sticky top-24">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-600" />
                跟进与转化记录
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {history.map((item, index) => (
                <div key={item.id} className="relative pl-6">
                  {/* Timeline line */}
                  {index !== history.length - 1 && (
                    <div className="absolute left-1.5 top-5 bottom-[-24px] w-0.5 bg-slate-100"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    item.type === 'system' ? 'bg-slate-300' : 'bg-blue-500'
                  }`}></div>
                  
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-bold text-[13px] text-slate-800">{item.user}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{item.time}</span>
                  </div>
                  
                  <div className={`text-[13px] leading-relaxed p-3 rounded-xl ${
                    item.type === 'system' 
                    ? 'bg-slate-50 text-slate-500 border border-slate-100' 
                    : 'bg-blue-50 text-blue-800'
                  }`}>
                    {item.content}
                    {item.attachments && item.attachments.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {item.attachments.map((file, i) => (
                          <div key={i} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden bg-white">
                            {file.type === 'image' ? (
                              <img src={file.url} alt="attachment" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-2">
                                <FileText size={20} className="text-slate-400 mb-1" />
                                <span className="text-[9px] text-slate-500 font-medium text-center line-clamp-2 w-full truncate">{file.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="记录本次沟通详情、客户反馈即下一步规划..."
                className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none mb-3 bg-white h-24"
              />
              
              {attachments.length > 0 && (
                <div className="flex gap-2 mb-3 overflow-x-auto custom-scrollbar pb-2">
                  {attachments.map((file, i) => (
                    <div key={i} className="relative shrink-0 w-16 h-16 rounded-lg border border-slate-200 overflow-hidden bg-white group">
                      {file.type === 'image' ? (
                        <img src={file.url} alt="attachment" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1">
                          <FileText size={16} className="text-slate-400 mb-0.5" />
                          <span className="text-[8px] text-slate-500 font-medium text-center line-clamp-1 w-full truncate">{file.name}</span>
                        </div>
                      )}
                      <button 
                        onClick={() => removeAttachment(i)}
                        className="absolute right-1 top-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-slate-400 relative">
                  <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 hover:text-slate-600 transition-colors"
                  >
                    <Paperclip size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = 'image/*';
                        fileInputRef.current.click();
                        // Reset it back after click
                        setTimeout(() => {
                           if(fileInputRef.current) fileInputRef.current.accept = 'image/*,.pdf,.doc,.docx';
                        }, 100);
                      }
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 hover:text-slate-600 transition-colors"
                  >
                    <ImageIcon size={18} />
                  </button>
                </div>
                <button 
                  onClick={handleAddNote}
                  disabled={!newNote.trim() && attachments.length === 0}
                  className="px-5 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-xl font-bold text-sm shadow-sm transition-all"
                >
                  <Send size={14} />
                  发布记录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assignee Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col max-h-[80vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">转交/分配线索</h3>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="搜索手机号、姓名"
                  value={assignSearch}
                  onChange={(e) => setAssignSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:bg-white outline-none transition-colors"
                />
              </div>

              <div>
                <p className={`text-xs font-bold mb-2 transition-colors ${showAssignError && currentAssignees.length === 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                  已选择分配人员 ({currentAssignees.length})
                </p>
                <div className={`flex flex-wrap gap-2 p-2 rounded-xl transition-all border ${
                  showAssignError && currentAssignees.length === 0 
                    ? 'bg-rose-50 border-rose-200 ring-4 ring-rose-500/5' 
                    : 'border-transparent'
                }`}>
                  {currentAssignees.length > 0 ? currentAssignees.map(name => (
                    <div key={name} className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg border-2 border-blue-200">
                      <span className="text-xs font-bold text-blue-700">{name}</span>
                      <button 
                        onClick={() => {
                          toggleAssignee(name);
                          if (currentAssignees.length <= 1) setShowAssignError(true);
                        }}
                        className="text-blue-400 hover:text-red-500 transition-colors"
                        title="取消分配"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )) : (
                    <div className="w-full">
                      <span className={`text-xs italic py-1.5 block ${showAssignError ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                        {showAssignError ? '⚠️ 请至少选择一位分配人员' : '未分配任何人员'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto mb-2 custom-scrollbar">
                <p className="text-xs font-bold text-slate-400 mb-2">选择人员列表</p>
                <div className="space-y-2">
                  {filteredEmployees.map(emp => (
                    <div 
                      key={emp.id}
                      onClick={() => toggleAssignee(emp.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        currentAssignees.includes(emp.name)
                          ? 'border-blue-500 bg-blue-50/30'
                          : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">{emp.name}</div>
                          <div className="text-[10px] text-slate-500">{emp.phone}</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        currentAssignees.includes(emp.name)
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-slate-300'
                      }`}>
                        {currentAssignees.includes(emp.name) && <Check size={12} />}
                      </div>
                    </div>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <div className="text-center py-4 text-sm text-slate-400">没有找到匹配的人员</div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => {
                  setCurrentAssignees(lead.assignedTo); // Reset
                  setShowAssignError(false);
                  setShowAssignModal(false);
                }}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleConfirmAssign}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-all"
              >
                确认分配
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300">
          <div className={`px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border ${
            toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
              : 'bg-blue-50 border-blue-100 text-blue-600'
          }`}>
            <CheckCircle size={20} className={toast.type === 'success' ? "text-emerald-500" : "text-blue-500"} />
            <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
