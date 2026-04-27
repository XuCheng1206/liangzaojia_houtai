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
  if (id === 'I2002') {
    return {
      id: 'I2002',
      name: '林如烟',
      phone: '13988883344',
      idNumber: '110101199001011234',
      city: '上海',
      professions: ['小区物业', '其他'],
      experience: '在物业公司担任客服经理5年，对小区业主装修需求有深度把握。',
      submittedAt: '2026-04-18 10:20',
      status: 'Approved',
      auditRemark: '该申请人资质匹配，从业经历真实，沟通后确认其拥有高质量线索资源，通过审核。',
      auditAttachments: [
        { name: '从业证明.jpg', type: 'image', url: '#' },
        { name: '物业资格证.pdf', type: 'file', url: '#' }
      ]
    };
  }

  if (id === 'I2004') { // Mocking a rejected one
    return {
      id: 'I2004',
      name: '王大锤',
      phone: '13866667788',
      idNumber: '110101199001018888',
      city: '深圳',
      professions: ['主材销售'],
      experience: '从事主材销售3个月，想了解一下平台。',
      submittedAt: '2026-04-19 16:45',
      status: 'Rejected',
      auditRemark: '从业经验过短，无法提供充足的证据证明其线索获取能力，暂且驳回申请，建议补充从业资历后再次申请。',
      auditAttachments: []
    };
  }

  return {
    id: id || 'I2001',
    name: '陈先生',
    phone: '13588990011',
    idNumber: '110101199001011234',
    city: '北京',
    professions: ['房产销售', '装修销售'],
    experience: '在房产中介行业工作8年，积累了大量毛坯房精准客户资源，希望能通过平台盘活这些线索。',
    submittedAt: '2026-04-20 14:30',
    status: 'Pending'
  };
};

export default function ProjectInitiatorAuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audit] = useState(getMockAudit(id || ''));
  const [remark, setRemark] = useState(audit.auditRemark || '');
  const [attachments, setAttachments] = useState<Attachment[]>(audit.auditAttachments || []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map(file => ({
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
          <h1 className="text-2xl font-bold text-slate-900">发起人审核详情</h1>
          <p className="text-slate-500 text-sm mt-0.5">申请编号：{audit.id} · 提交时间：{audit.submittedAt}</p>
        </div>
      </div>

      <div className="space-y-6">
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-slate-700">
                {audit.status === 'Pending' ? '审核备注信息' : (audit.status === 'Approved' ? '审核通过信息' : '审核驳回信息')}
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
              <textarea 
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="请输入审核意见或驳回说明..."
                className="w-full p-4 rounded-xl border border-slate-200 h-32 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none bg-slate-50/30 text-sm"
              ></textarea>
            ) : (
              <div className="w-full p-5 bg-slate-50 rounded-2xl text-slate-600 text-sm leading-relaxed border border-slate-100 min-h-[100px]">
                {remark || '无审核备注'}
              </div>
            )}

            {(attachments.length > 0 || audit.status === 'Pending') && (
              <div className="mt-4 flex flex-wrap gap-3">
                {attachments.map((file, idx) => (
                  <div key={idx} className={`group relative flex items-center gap-2 bg-slate-50 border border-slate-200 pl-2 py-2 rounded-xl ${audit.status === 'Pending' ? 'pr-8' : 'pr-4'}`}>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400">
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
                className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all border border-red-100 flex items-center gap-2"
              >
                <XCircle size={18} />
                审核驳回
              </button>
              <button 
                className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                <CheckCircle2 size={18} />
                通过审核
              </button>
            </div>
          )}
        </div>

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
      </div>
    </div>
  );
}
