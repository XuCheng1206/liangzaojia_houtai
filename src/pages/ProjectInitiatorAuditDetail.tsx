import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  CreditCard, 
  MapPin, 
  Briefcase, 
  History,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Paperclip,
  Image as ImageIcon,
  X
} from 'lucide-react';

interface Attachment {
  name: string;
  type: 'image' | 'file';
  url: string;
}

interface Attachment {
  name: string;
  type: 'image' | 'file';
  url: string;
}

interface InitiatorAudit {
  id: string;
  name: string;
  phone: string;
  idNumber: string;
  city: string;
  professions: string[];
  experience: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  auditRemark?: string;
  auditAttachments?: Attachment[];
}

const getMockAudit = (id: string): InitiatorAudit => {
  // If ID matches I2002 or I2003 (mock data from ProjectInitiatorManagement), treat as Approved/Rejected
  if (id === 'I2001') {
    return {
      id: 'I2001',
      name: '陈先生',
      phone: '13888881122',
      idNumber: '110101199001011234',
      city: '北京',
      professions: ['房产销售', '装修销售'],
      experience: '在房产中介行业工作8年，积累了大量毛坯房精准客户资源，希望能通过平台盘活这些线索。',
      submittedAt: '2026-04-20 14:30',
      status: 'Pending'
    };
  }

  if (id === 'I2002') {
    return {
      id: 'I2002',
      name: '林如烟',
      phone: '13988883344',
      idNumber: '110101199001011234',
      city: '上海',
      professions: ['小区物业', '其他'],
      experience: '在物业公司担任客服经理5年，对小区业主装修需求有深度把握。',
      submittedAt: '2026-04-10 09:15',
      status: 'Approved',
      auditRemark: '该申请人资质匹配，从业经历真实，沟通后确认其拥有高质量线索资源，通过审核。',
      auditAttachments: [
        { name: '从业证明.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1554224155-1696413575b9?w=400&q=80' },
        { name: '物业资格证.pdf', type: 'file', url: '#' }
      ]
    };
  }

  if (id === 'I2003') {
    return {
      id: 'I2003',
      name: '郑经理',
      phone: '13788885566',
      idNumber: '110101199001013344',
      city: '广州',
      professions: ['小区物业'],
      experience: '广州大型社区物业管理经验，拥有丰富的业主装修一手里资源。',
      submittedAt: '2026-04-12 11:00',
      status: 'Approved',
      auditRemark: '该用户已通过实名核验，且具备丰富的线下资源整合能力，建议入驻。',
      auditAttachments: []
    };
  }

  if (id === 'I2004') { // Mocking a rejected one
    return {
      id: 'I2004',
      name: '赵大海',
      phone: '13188887788',
      idNumber: '110101199001018888',
      city: '深圳',
      professions: ['主材销售'],
      experience: '从事主材销售3个月，想了解一下平台。',
      submittedAt: '2026-04-15 16:45',
      status: 'Rejected',
      auditRemark: '从业经验过短，无法提供充足的证据证明其线索获取能力，暂且驳回申请，建议补充从业资历后再次申请。',
      auditAttachments: []
    };
  }

  return {
    id: id || 'I2005',
    name: '孙主管',
    phone: '13688889900',
    idNumber: '110101199001019900',
    city: '西安',
    professions: ['小区物业'],
    experience: '物业主管，掌握大量存量房装修资源。',
    submittedAt: '2026-04-21 10:20',
    status: 'Pending'
  };
};

export default function ProjectInitiatorAuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audit, setAudit] = useState(getMockAudit(id || ''));
  const [remark, setRemark] = useState(audit.auditRemark || '');
  const [attachments, setAttachments] = useState<Attachment[]>(audit.auditAttachments || []);
  const [showError, setShowError] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = () => {
    if (!remark.trim()) {
      setShowError(true);
      showToast('请填写审核备注信息', 'error');
      return;
    }
    setShowError(false);
    // In a real app, you would call an API here
    setAudit({ ...audit, status: 'Approved', auditRemark: remark });
    showToast('审核通过，已为该用户打上“项目发起人”标签', 'success');
  };

  const handleReject = () => {
    if (!remark.trim()) {
      setShowError(true);
      showToast('请填写审核备注信息（驳回说明）', 'error');
      return;
    }
    setShowError(false);
    setAudit({ ...audit, status: 'Rejected', auditRemark: remark });
    showToast('审核已驳回', 'success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArr = Array.from(files) as File[];
      const newAttachments: Attachment[] = filesArr.map(file => ({
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file)
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const professionsList = ['房产销售', '小区物业', '装修销售', '主材销售', '其他'];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/initiators')}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200 transition-colors text-slate-500 bg-white border border-slate-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">项目发起人审核详情</h1>
          <p className="text-slate-500 text-sm mt-0.5">申请编号：{audit.id} · 提交时间：{audit.submittedAt}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Status Banner for Completed Audits */}
        {audit.status !== 'Pending' && (
          <div className={`p-5 rounded-2xl flex items-center gap-4 border-2 ${
            audit.status === 'Approved' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm shadow-emerald-200/20' 
              : 'bg-rose-50 border-rose-100 text-rose-700 shadow-sm shadow-rose-200/20'
          } animate-in fade-in slide-in-from-top-2 duration-500`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              audit.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}>
              {audit.status === 'Approved' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">
                审核结果：{audit.status === 'Approved' ? '已入驻（审核通过）' : '已驳回'}
              </h3>
              <p className="text-sm opacity-80 mt-0.5">
                操作记录：系统管理员 于 {audit.submittedAt} 完成审核
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-800">基本信息</h2>
          </div>
          
          <div className="p-8 space-y-8">
            {/* 1. 姓名 */}
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">1. 姓名</label>
              <div className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-medium">
                {audit.name}
              </div>
            </div>

            {/* 2. 联系电话 */}
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">2. 联系电话</label>
              <div className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-medium flex items-center gap-2">
                <Phone size={16} className="text-slate-400" />
                {audit.phone}
              </div>
            </div>

            {/* 3. 身份证号 */}
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">3. 身份证号</label>
              <div className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-medium flex items-center gap-2">
                <CreditCard size={16} className="text-slate-400" />
                {audit.idNumber}
              </div>
            </div>

            {/* 4. 所在城市 */}
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">4. 所在城市</label>
              <div className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-medium flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" />
                {audit.city}
              </div>
            </div>

            {/* 5. 所在职业 */}
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">5. 所在职业（可多选）</label>
              <div className="flex flex-wrap gap-3">
                {professionsList.map(p => (
                  <div 
                    key={p} 
                    className={`px-6 py-3 rounded-2xl text-sm font-medium border transition-all ${
                      audit.professions.includes(p)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-slate-100 text-slate-400'
                    }`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. 从业履历 */}
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">6. 从业履历</label>
              <div className="w-full px-6 py-5 bg-slate-50 rounded-2xl text-slate-600 text-sm leading-relaxed border border-slate-100">
                {audit.experience}
              </div>
            </div>
          </div>
        </div>

        {/* 审核操作区 */}
        <div className={`bg-white rounded-2xl border shadow-sm p-6 transition-all duration-300 ${
          audit.status === 'Approved' ? 'border-emerald-200 bg-emerald-50/5' : (audit.status === 'Rejected' ? 'border-rose-200' : 'border-slate-200')
        }`}>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className={`block text-sm font-bold ${
                audit.status === 'Approved' ? 'text-emerald-700' : (audit.status === 'Rejected' ? 'text-rose-700' : 'text-slate-700')
              }`}>
                {audit.status === 'Pending' ? '审核备注信息' : (audit.status === 'Approved' ? '审核建议与确认' : '驳回说明')}
              </label>
              {audit.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
                  >
                    <Paperclip size={14} />
                    添加附件
                  </button>
                  <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </>
              )}
            </div>
            
            {audit.status === 'Pending' ? (
              <div className="space-y-2">
                <textarea 
                  value={remark}
                  onChange={(e) => {
                    setRemark(e.target.value);
                    if (showError) setShowError(false);
                  }}
                  placeholder="请输入审核意见或驳回说明..."
                  className={`w-full p-4 rounded-xl border h-32 outline-none transition-all resize-none text-sm ${
                    showError && !remark.trim()
                      ? 'border-rose-500 ring-4 ring-rose-500/10 bg-rose-50/10'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50/30'
                  }`}
                ></textarea>
                {showError && !remark.trim() && (
                  <p className="text-rose-500 text-xs font-bold animate-in fade-in slide-in-from-top-1">请填写审核备注信息</p>
                )}
              </div>
            ) : (
              <div className={`w-full p-6 rounded-2xl text-sm leading-relaxed border min-h-[100px] ${
                audit.status === 'Approved' ? 'bg-white border-emerald-100 text-emerald-800' : 'bg-white border-rose-100 text-rose-800'
              }`}>
                {remark || '未填写相关备注'}
              </div>
            )}

            {(attachments.length > 0 || audit.status === 'Pending') && (
              <div className="mt-4 flex flex-wrap gap-3">
                {attachments.map((file, idx) => (
                  <div key={idx} className={`group relative flex items-center gap-2 border pl-2 py-2 rounded-xl transition-all ${
                    audit.status === 'Approved' ? 'bg-white border-emerald-100' : 'bg-white border-slate-200'
                  } ${audit.status === 'Pending' ? 'pr-8' : 'pr-4'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      audit.status === 'Approved' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {file.type === 'image' ? <ImageIcon size={16} /> : <Paperclip size={16} />}
                    </div>
                    <span className="text-xs font-medium text-slate-600 truncate max-w-[120px]">{file.name}</span>
                    {audit.status === 'Pending' && (
                      <button 
                        onClick={() => removeAttachment(idx)}
                        className="absolute right-2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {audit.status === 'Pending' && (
            <div className="flex items-center justify-end gap-4">
              <button 
                onClick={() => navigate('/initiators')}
                className="px-6 py-2.5 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200"
              >
                取消
              </button>
              <button 
                onClick={handleReject}
                className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all border border-red-100 flex items-center gap-2"
              >
                <XCircle size={18} />
                审核驳回
              </button>
              <button 
                onClick={handleApprove}
                className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                <CheckCircle2 size={18} />
                通过审核
              </button>
            </div>
          )}
        </div>

          {audit.status === 'Pending' && (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex gap-3 text-amber-700">
              <AlertTriangle className="shrink-0 mt-0.5" size={18} />
              <div className="text-xs leading-relaxed">
                <p className="font-bold mb-1">审核规范：</p>
                <p className="mb-2">请核对申请人填写的身份证号与其真实姓名是否匹配；验证联系电话是否真实有效；并根据其从业履历评估其作为项目发起人的潜力。</p>
                <div className="flex items-center gap-1.5 py-1 px-2 bg-amber-200/50 rounded-lg w-fit text-amber-900 font-bold">
                  <CheckCircle2 size={14} className="text-amber-700" />
                  审核通过后该用户会自动打上“项目发起人”标签
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast Feedback */}
        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300">
            <div className={`px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                : 'bg-rose-50 border-rose-100 text-rose-600'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle2 size={20} className="text-emerald-500" />
              ) : (
                <AlertTriangle size={20} className="text-rose-500" />
              )}
              <span className="font-bold text-sm">{toast.message}</span>
            </div>
          </div>
        )}
    </div>
  );
}
