import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  FileText
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
  idCardFront: string;
  idCardBack: string;
  skillCertImg?: string;
  experienceYears: number;
}

// Mock data getter
const getMockCert = (id: string): Certification => ({
  id: id || 'C1001',
  userName: '张师傅',
  phone: '138****0001',
  role: '水电工',
  userType: 'Worker',
  certType: 'Skill',
  status: 'Pending',
  submittedAt: '2026-04-16 09:15',
  idCardFront: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
  idCardBack: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
  skillCertImg: 'https://images.unsplash.com/photo-1589330694653-76cf64731c36?w=400&q=80',
  experienceYears: 8
});

export default function CertificationAuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cert] = useState(getMockCert(id || ''));
  const [remark, setRemark] = useState('');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/certs')}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200 transition-colors text-slate-500 bg-white border border-slate-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">认证审核详情</h1>
          <p className="text-slate-500 text-sm mt-0.5">申请编号：{cert.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Remark */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={18} />
              基本资料
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400">申请人</span>
                <span className="text-sm font-bold text-slate-800">{cert.userName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400">联系电话</span>
                <span className="text-sm font-bold text-slate-800">{cert.phone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400">申请岗位</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{cert.role}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400">从业工龄</span>
                <span className="text-sm font-bold text-slate-800">{cert.experienceYears} 年</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400">申请时间</span>
                <span className="text-sm font-bold text-slate-800">{cert.submittedAt}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="text-blue-600" size={18} />
              审核评语
            </h3>
            <textarea 
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="请输入审核意见、通过理由或驳回原因..."
              className="w-full text-sm p-4 rounded-xl border border-slate-200 h-40 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none bg-slate-50/30"
            ></textarea>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex gap-3 text-amber-700">
            <AlertTriangle className="shrink-0 mt-0.5" size={18} />
            <div className="text-xs leading-relaxed">
              <p className="font-bold mb-1">审核规范提示：</p>
              请务必仔细核对手持证件照片与身份证原件照片的一致性，确保资质证书真实有效且在有效期内。
            </div>
          </div>
        </div>

        {/* Right Column: Evidence Photos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <ImageIcon className="text-blue-600" size={18} />
              核验材料扫描件/照片
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">身份证正面</span>
                  <button className="text-blue-600 text-xs font-bold hover:underline">查看大图</button>
                </div>
                <div className="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group relative">
                  <img src={cert.idCardFront} alt="ID Front" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">身份证反面</span>
                  <button className="text-blue-600 text-xs font-bold hover:underline">查看大图</button>
                </div>
                <div className="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group relative">
                  <img src={cert.idCardBack} alt="ID Back" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
              </div>

              {cert.skillCertImg && (
                <div className="md:col-span-2 space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">岗位专项技能证书</span>
                    <button className="text-blue-600 text-xs font-bold hover:underline">查看原件</button>
                  </div>
                  <div className="aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group relative">
                    <img src={cert.skillCertImg} alt="Skill Cert" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pb-12">
            <button 
              onClick={() => navigate('/certs')}
              className="px-8 py-3 rounded-2xl text-slate-600 font-bold text-sm bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
            >
              取消
            </button>
            <button 
              className="px-8 py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100 flex items-center gap-2"
            >
              <XCircle size={18} />
              驳回申请
            </button>
            <button 
              className="px-12 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              <CheckCircle2 size={18} />
              确认通过审核
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
