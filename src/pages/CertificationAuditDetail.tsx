import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  Briefcase,
  Users,
  Star,
  Upload,
  ShieldCheck,
  ClipboardCheck,
  HardHat,
  Search,
  FileCheck2,
  Wallet
} from 'lucide-react';

type WorkerRole = '工长' | '设计师' | '拆除工' | '水电工' | '木工' | '泥瓦工' | '油漆工';

interface CertificationDetail {
  id: string;
  userName: string;
  phone: string;
  role: WorkerRole;
  userType: 'Worker' | 'Service';
  certType: 'Identity' | 'Skill' | 'Safety';
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  idCardFront: string;
  idCardBack: string;
  skillCertImg?: string;
  experienceYears: number;
  // Foreman Data
  gender?: string;
  age?: number;
  education?: string;
  idNumber?: string;
  emergencyPhone?: string;
  nativePlace?: string;
  currentAddress?: string;
  smartphoneProficiency?: boolean;
  portfolioCases?: number;
  experienceList?: { time: string; company: string; position: string }[];
  visitableProjects?: string;
  expertTypes?: string[];
  expertHouseTypes?: string[];
  expertStyles?: string[];
  bestProjectDesc?: string;
  entityType?: '公司' | '个体户' | '无';
  hasQualification?: boolean;
  teamSize?: { water: number; wood: number; mason: number; paint: number };
  pastEvaluations?: string;
  selfEvaluation?: string;
  // Designer Specific
  graduateSchool?: string;
  major?: string;
  certificates?: string;
  designSoftware?: string[];
  constructionProjectCount?: number;
  minDesignFee?: number;
  maxDesignFee?: number;
  has3DRenderTeam?: boolean;
  hasDetailingTeam?: boolean;
  honors?: string;
  // Worker Specific
  hobbies?: string;
  auditor?: string;
  auditedAt?: string;
  auditRemark?: string;
  auditBadges?: string[];
}

// Mock data getter
const getMockCert = (id?: string): CertificationDetail => {
  if (id === 'C1005' || id === 'C1001' || id === 'C1004') {
    const isMugong = id === 'C1004';
    return {
      id: id || 'C1005',
      userName: isMugong ? '陈工' : (id === 'C1001' ? '张师傅' : '王水电'),
      phone: isMugong ? '13511114433' : (id === 'C1001' ? '13811110001' : '13811223344'),
      role: isMugong ? '木工' : '水电工',
      userType: 'Worker',
      certType: 'Skill',
      status: 'Pending',
      submittedAt: '2026-04-15 10:00',
      idCardFront: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      idCardBack: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      experienceYears: 10,
      gender: '男',
      age: 38,
      education: '高中',
      idNumber: '42010519880101XXXX',
      emergencyPhone: '13911223355',
      nativePlace: '湖北省武汉市',
      currentAddress: '上海市闵行区某某路XXX号',
      smartphoneProficiency: true,
      hobbies: isMugong ? '做木工小物件、看书' : '钓鱼、看书'
    };
  }
  if (id === 'C1002') {
    return {
      id: 'C1002',
      userName: '张设计',
      phone: '13611223344',
      role: '设计师',
      userType: 'Worker',
      certType: 'Skill',
      status: 'Pending',
      submittedAt: '2026-04-14 14:00',
      idCardFront: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      idCardBack: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      skillCertImg: 'https://images.unsplash.com/photo-1589330694653-76cf64731c36?w=400&q=80',
      experienceYears: 8,
      gender: '男',
      age: 32,
      education: '本科',
      idNumber: '32010519940808XXXX',
      emergencyPhone: '13911223344',
      nativePlace: '江苏省南京市',
      currentAddress: '上海市徐汇区田林路XXX号',
      smartphoneProficiency: true,
      portfolioCases: 32,
      experienceList: [
        { time: '2016.07-2019.05', company: '某某室内设计装饰有限公司', position: '主案设计师' },
        { time: '2019.06-至今', company: '独立设计工作室', position: '设计总监' }
      ],
      visitableProjects: '上海市徐汇区云锦路某高档小区、闵行区某别墅区。',
      constructionProjectCount: 3,
      expertHouseTypes: ['别墅', '复式', '平层', '公装'],
      expertStyles: ['现代', '极简', '法式', '中式', '工业', '日式'],
      bestProjectDesc: '主导浦东新区汤臣一品800平复式豪宅设计，采用现代极简风格，兼顾艺术审美与实用功能。',
      minDesignFee: 150,
      maxDesignFee: 800,
      has3DRenderTeam: true,
      hasDetailingTeam: true,
      pastEvaluations: '设计很有美感，空间利用率高，沟通非常顺畅。',
      selfEvaluation: '性格开朗，善于倾听客户需求。对色彩和材质敏感，注重设计细节与落地效果。',
      honors: '2023年度中国室内设计十大新锐人物',
      graduateSchool: '中央美术学院',
      major: '室内设计',
      certificates: '高级室内建筑师',
      designSoftware: ['CAD', '酷家乐', '3DMAX', 'SU', 'PS']
    };
  }
  if (id === 'C1006' || id === 'C1007' || id === 'C1008') {
    const isSjs = id === 'C1006';
    const isGz = id === 'C1007';
    return {
      id: id,
      userName: isSjs ? '刘设计' : isGz ? '李工长' : '赵泥瓦',
      phone: '13500000000',
      role: isSjs ? '设计师' : isGz ? '工长' : '泥瓦工',
      userType: 'Worker',
      certType: 'Skill',
      status: 'Approved',
      submittedAt: '2026-04-10 10:00',
      idCardFront: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      idCardBack: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      skillCertImg: 'https://images.unsplash.com/photo-1589330694653-76cf64731c36?w=400&q=80',
      experienceYears: isSjs ? 6 : isGz ? 15 : 10,
      gender: '男',
      age: 35,
      education: isSjs ? '本科' : '大专',
      idNumber: '32010519940808XXXX',
      nativePlace: '江苏省南京市',
      currentAddress: '上海市徐汇区某某路XXX号',
      emergencyPhone: '13911112222',
      smartphoneProficiency: true,
      auditor: '系统管理员Admin',
      auditedAt: '2026-04-11 14:30',
      auditRemark: '资质齐全，经验丰富，符合平台要求，准予通过。',
      auditBadges: isSjs ? ['资深大宅设计师', '良知素养', '培训已完成'] : 
                   isGz ? ['意外险已投保', '资深大宅工长', '良知素养', '培训已完成'] : 
                          ['意外险已投保', '良知素养', '培训已完成'],
      hobbies: '看书、旅游',
      portfolioCases: 10,
      experienceList: [
        { time: '2019-至今', company: '某某工作室', position: '主负责人' }
      ]
    };
  }
  if (id === 'C1009' || id === 'C1010' || id === 'C1011') {
    const isSjs = id === 'C1009';
    const isGz = id === 'C1010';
    return {
      id: id,
      userName: isSjs ? '孙设计' : isGz ? '周工长' : '吴油漆',
      phone: '13600000000',
      role: isSjs ? '设计师' : isGz ? '工长' : '油漆工',
      userType: 'Worker',
      certType: 'Skill',
      status: 'Rejected',
      submittedAt: '2026-04-10 10:00',
      idCardFront: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      idCardBack: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
      skillCertImg: 'https://images.unsplash.com/photo-1589330694653-76cf64731c36?w=400&q=80',
      experienceYears: isSjs ? 5 : isGz ? 12 : 8,
      gender: '男',
      age: 40,
      education: isSjs ? '本科' : '大专',
      idNumber: '33010519860101XXXX',
      nativePlace: '浙江省杭州市',
      currentAddress: '上海市浦东新区某某路XXX号',
      emergencyPhone: '13988889999',
      smartphoneProficiency: true,
      auditor: '审核员王五',
      auditedAt: '2026-04-11 15:30',
      auditRemark: '相关履历造假，查无此人工作记录，予以驳回。',
      auditBadges: [],
      hobbies: '跑步、健身',
      portfolioCases: 5,
      experienceList: [
        { time: '2020-至今', company: '无', position: '独立装修' }
      ]
    };
  }
  return {
    id: id || 'C1001',
    userName: '李建国',
  phone: '13588990011',
  role: '工长',
  userType: 'Worker',
  certType: 'Skill',
  status: 'Pending',
  submittedAt: '2024-03-20 14:30',
  idCardFront: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
  idCardBack: 'https://images.unsplash.com/photo-1557124355-6674cd759fd3?w=400&q=80',
  skillCertImg: 'https://images.unsplash.com/photo-1589330694653-76cf64731c36?w=400&q=80',
  experienceYears: 12,
  gender: '男',
  age: 42,
  education: '大专',
  idNumber: '37021119840101XXXX',
  emergencyPhone: '13911223344',
  nativePlace: '山东省青岛市',
  currentAddress: '上海市浦东新区张江镇亮秀路XXX号',
  smartphoneProficiency: true,
  portfolioCases: 15,
  experienceList: [
    { time: '2010.01-2015.12', company: '某某装饰有限公司', position: '施工员' },
    { time: '2016.01-至今', company: '个人工长工作室', position: '独立工长' }
  ],
  visitableProjects: '3个。分别在浦东、徐汇、长宁...',
  expertTypes: ['新房毛坯', '老房翻新', '全屋整装'],
  expertHouseTypes: ['普通300-500平', '300平以下'],
  expertStyles: ['中式', '现代', '欧式'],
  bestProjectDesc: '曾主导过某某高端别墅的全屋翻新项目，不仅在水电施工规整度上获得业主点赞，更在交付工期方面比预期提前一周，做到了零投诉。',
  entityType: '个体户',
  hasQualification: true,
  teamSize: { water: 2, wood: 3, mason: 2, paint: 2 },
  pastEvaluations: '业主张先生：李工做事非常细心，很多我们没想到的细节他都帮我们考虑到了。特别是水电改造部分，走线非常规范。',
  selfEvaluation: '本人从事装修行业12年，性格沉稳，做事利他。不仅精通水电瓦木油各环节工艺，更具备优秀的成本控制及工期协调能力。'
  };
};

export default function CertificationAuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cert = getMockCert(id);
  
  // Auditor actions state
  const [remark, setRemark] = useState('');
  const [depositStatus, setDepositStatus] = useState<'none' | 'yes' | 'not_needed'>('none');
  const [depositAmount, setDepositAmount] = useState('');
  
  // Badges state
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [customBadges, setCustomBadges] = useState<string[]>([]);
  const [newBadgeText, setNewBadgeText] = useState('');
  const [isAddingBadge, setIsAddingBadge] = useState(false);

  const defaultBadges = cert.role === '设计师' 
    ? ["资深大宅设计师", "良知素养", "培训已完成"]
    : cert.role === '工长'
      ? ["意外险已投保", "资深大宅工长", "良知素养", "培训已完成"]
      : ["意外险已投保", "良知素养", "培训已完成"];
  const allBadges = [...defaultBadges, ...customBadges];

  const handleToggleBadge = (badge: string) => {
    setSelectedBadges(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  };
  
  const handleAddCustomBadge = () => {
    if (newBadgeText.trim() && !allBadges.includes(newBadgeText.trim())) {
      setCustomBadges([...customBadges, newBadgeText.trim()]);
      setSelectedBadges([...selectedBadges, newBadgeText.trim()]);
    }
    setNewBadgeText('');
    setIsAddingBadge(false);
  };

  const [trainingRecords, setTrainingRecords] = useState<{id: string, name: string, url?: string}[]>([]);

  const handleAddTrainingRecord = () => {
    setTrainingRecords([...trainingRecords, { id: Math.random().toString(), name: `培训记录${trainingRecords.length + 1}` }]);
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-16 px-4 md:px-0">
      {/* Header - More compact */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-slate-50/80 backdrop-blur-md py-3 z-10 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/certs')}
            className="p-1.5 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 group"
          >
            <ArrowLeft className="text-slate-400 group-hover:text-slate-600" size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-800">认证审核详情</h2>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                cert.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                cert.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {cert.status === 'Approved' ? '已通过' : cert.status === 'Rejected' ? '已驳回' : '待审核'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">申请编号: {cert.id} • 申请时间: {cert.submittedAt}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {cert.role === '设计师' ? <DesignerSections cert={cert} /> : cert.role === '工长' ? <ForemanSections cert={cert} /> : <WorkerSections cert={cert} />}

        {/* Section 5 / 2: Auditor Input - More compact grid */}
        <SectionCard icon={<ClipboardCheck size={16} />} color="blue" title={['工长', '设计师'].includes(cert.role) ? "五、背调与考察 (审核人填写)" : "二、背调与考察 (审核人填写)"} isHighlight>
          <div className={`grid grid-cols-2 gap-3 mb-6 ${cert.role === '设计师' ? 'md:grid-cols-3' : (!['工长', '设计师'].includes(cert.role) ? 'md:grid-cols-2' : 'md:grid-cols-5')}`}>
            {['工长', '设计师'].includes(cert.role) && <UploadModule icon={<Search size={14} />} title="履历背调" desc="确认从业历程" />}
            {cert.role === '工长' && <UploadModule icon={<HardHat size={14} />} title="现场考察" desc="工艺水平确认" />}
            {['工长', '设计师'].includes(cert.role) && <UploadModule icon={<ImageIcon size={14} />} title="项目案例" desc="实拍交付细节" />}
            <UploadModule icon={<FileCheck2 size={14} />} title="考试结果" desc="技能考核成绩" />
            {cert.role !== '设计师' && <UploadModule icon={<ShieldCheck size={14} />} title="意外保单" desc="保单凭据" />}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">培训记录</span>
              <button 
                onClick={handleAddTrainingRecord}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-100 transition flex items-center gap-1"
              >
                <span>+</span>
                <span>新增培训记录</span>
              </button>
            </div>
            {trainingRecords.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {trainingRecords.map((record) => (
                  <UploadModule 
                    key={record.id} 
                    icon={<FileCheck2 size={14} />} 
                    title={record.name} 
                    desc="点击上传" 
                    hasImage={record.url} 
                  />
                ))}
              </div>
            ) : (
                <div className="text-center py-6 text-xs text-slate-400 font-medium bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                    暂无培训记录，点击右上角按钮添加
                </div>
            )}
          </div>

          {cert.role === '工长' && (
            <div className="flex flex-wrap items-center gap-8 p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">缴纳押金</span>
                <div className="flex bg-slate-200/50 p-0.5 rounded-lg">
                  {(['none', 'yes', 'not_needed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setDepositStatus(status)}
                      className={`px-4 py-1.5 rounded-md text-[10px] font-black transition-all ${
                        depositStatus === status 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-500'
                      }`}
                    >
                      {status === 'none' ? '否' : status === 'yes' ? '是' : '无需'}
                    </button>
                  ))}
                </div>
              </div>
              
              {depositStatus === 'yes' && (
                <div className="flex items-center gap-4 flex-1 animate-in fade-in slide-in-from-left-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0">缴纳金额</span>
                  <div className="relative flex-1 max-w-[200px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">¥</span>
                    <input 
                      type="number"
                      placeholder="请输入..."
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg pl-7 pr-3 py-1.5 text-xs font-black outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </SectionCard>

        {/* Section 6 / 3: Photos - smaller grid */}
        <SectionCard icon={<ImageIcon size={16} />} color="slate" title={['工长', '设计师'].includes(cert.role) ? "六、证照核验 (审核人上传)" : "三、证照核验 (审核人上传)"} isHighlight>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <UploadModule icon={<ImageIcon size={14} />} title="身份证正面" desc="已上传，点击重传" hasImage={cert.idCardFront} />
            <UploadModule icon={<ImageIcon size={14} />} title="身份证反面" desc="已上传，点击重传" hasImage={cert.idCardBack} />
            <UploadModule icon={<FileCheck2 size={14} />} title="执业证书" desc="已上传，点击重传" hasImage={cert.skillCertImg} />
          </div>
        </SectionCard>

        {/* Section 7: Final Decision */}
        {cert.status === 'Pending' ? (
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-xl p-6 mt-4 mb-20">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              <div className="flex-1 space-y-5 w-full">
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" />
                    审核最终意见
                  </h3>
                  <textarea 
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="请输入详细结论..."
                    className="w-full text-xs p-4 rounded-xl border border-slate-200 min-h-[100px] focus:border-blue-500 focus:bg-white outline-none transition-all resize-none bg-slate-50 font-medium"
                  ></textarea>
                </div>

                {['工长', '设计师', '拆除工', '水电工', '木工', '泥瓦工', '油漆工'].includes(cert.role) && (
                  <div className="space-y-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <h3 className="text-[11px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-slate-400" />
                      勾选认证标识
                      <span className="text-[10px] font-medium text-slate-400 normal-case tracking-normal ml-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">用于从业者数字名片上展示</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {allBadges.map((badge) => (
                        <button
                          key={badge}
                          onClick={() => handleToggleBadge(badge)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            selectedBadges.includes(badge)
                              ? 'bg-blue-50 border-blue-200 text-blue-700'
                              : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {badge} {selectedBadges.includes(badge) && '✓'}
                        </button>
                      ))}
                      {isAddingBadge ? (
                        <div className="flex items-center gap-2 animate-in fade-in zoom-in-95">
                          <input
                            type="text"
                            value={newBadgeText}
                            onChange={(e) => setNewBadgeText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomBadge()}
                            placeholder="输入标识名称"
                            autoFocus
                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-300 outline-none w-32 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                          />
                          <button
                            onClick={handleAddCustomBadge}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700 transition shadow-sm"
                          >
                            确定
                          </button>
                          <button
                            onClick={() => {
                              setIsAddingBadge(false);
                              setNewBadgeText('');
                            }}
                            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold hover:bg-slate-200 transition"
                          >
                            取消
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsAddingBadge(true)}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-black border border-dashed border-slate-300 text-slate-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-1"
                        >
                          <span>+</span>
                          <span>自定义添加</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => navigate('/certs')}
                  className="px-5 py-2.5 rounded-xl text-slate-400 font-black text-xs hover:text-slate-600 border border-transparent hover:border-slate-100 transition-all"
                >
                  取消
                </button>
                <button className="flex items-center gap-2 px-6 ml-2 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-500 font-black text-xs hover:bg-rose-50 transition-all active:scale-95">
                  <XCircle size={14} />
                  驳回
                </button>
                <button className="flex items-center gap-2 px-10 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                  <CheckCircle2 size={14} />
                  通过认证
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-xl p-6 mt-4 mb-20">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <FileText size={16} className="text-slate-400" />
                  审核结果
                </h3>
                <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg ${cert.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {cert.status === 'Approved' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  {cert.status === 'Approved' ? '已通过' : '已驳回'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold mb-1 block">审核人</span>
                  <span className="font-black text-slate-700">{cert.auditor || '未知'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold mb-1 block">审核时间</span>
                  <span className="font-black text-slate-700">{cert.auditedAt || '未知'}</span>
                </div>
                {cert.auditRemark && (
                  <div className="col-span-2 mt-2">
                    <span className="text-slate-400 font-bold mb-1 block">审核意见</span>
                    <div className="p-3 bg-slate-50 rounded-xl font-medium text-slate-600 leading-relaxed border border-slate-100">
                      {cert.auditRemark}
                    </div>
                  </div>
                )}
                {cert.status === 'Approved' && cert.auditBadges && cert.auditBadges.length > 0 && (
                  <div className="col-span-2 mt-2">
                    <span className="text-slate-400 font-bold mb-1 block">授予的认证标识</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cert.auditBadges.map(badge => (
                        <span key={badge} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-200 bg-blue-50 text-blue-700 shadow-sm">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DesignerSections({ cert }: { cert: CertificationDetail }) {
  return (
    <>
      <SectionCard icon={<User size={16} />} color="blue" title="一、基本信息 (用户填写)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5">
          <InfoItem label="姓名" value={cert.userName} />
          <InfoItem label="性别" value={cert.gender} />
          <InfoItem label="年龄" value={cert.age} />
          <InfoItem label="学历" value={cert.education} />
          <div className="md:col-span-2">
            <InfoItem label="身份证号" value={cert.idNumber} />
          </div>
          <InfoItem label="毕业院校" value={cert.graduateSchool} />
          <InfoItem label="专业" value={cert.major} />
          <div className="md:col-span-4">
            <InfoItem label="持有证书" value={cert.certificates} />
          </div>
        </div>
        {cert.designSoftware && cert.designSoftware.length > 0 && (
          <div className="mt-5 space-y-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">熟练设计软件</p>
            <div className="flex flex-wrap gap-2">
              {cert.designSoftware.map((sw, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-[10px] font-black border bg-white border-slate-200 text-slate-600 shadow-sm">
                  {sw}
                </span>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard icon={<Briefcase size={16} />} color="indigo" title="二、履历信息 (用户填写)">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6 pb-6 border-b border-slate-100 border-dashed">
          <InfoItem label="从业年限 (年)" value={cert.experienceYears} />
          <InfoItem label="提供实景案例 (套)" value={cert.portfolioCases} />
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
            从业经历
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cert.experienceList?.map((exp, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/50 hover:border-slate-300 transition-all">
                <span className="text-[9px] font-black text-slate-400 border border-slate-100 px-2 py-1 rounded-md bg-slate-50 shrink-0">{exp.time}</span>
                <span className="text-xs font-black text-slate-800 flex-1 truncate">{exp.company}</span>
                <span className="text-[10px] font-bold text-blue-600 shrink-0">{exp.position}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-6 p-4 bg-slate-50/50 rounded-xl border border-slate-100/50">
           <div className="grid grid-cols-2 gap-4 mb-3">
             <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
               <span className="text-[10px] font-bold text-slate-500">在建/可参观项目数</span>
               <span className="text-sm font-black text-slate-800">{cert.constructionProjectCount ?? 0}</span>
             </div>
           </div>
           <div className="space-y-2">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">具体展示地址</p>
             <div className="p-3 bg-white rounded-lg text-xs leading-relaxed text-slate-600 font-medium border border-slate-100 shadow-sm">
                {cert.visitableProjects}
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 border-dashed">
          <div className="space-y-2">
            <InfoItem label="擅长设计户型" value="" />
            <div className="flex flex-wrap gap-2 mt-1">
              {cert.expertHouseTypes?.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-bold text-slate-600">{t}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <InfoItem label="擅长设计风格" value="" />
            <div className="flex flex-wrap gap-2 mt-1">
              {cert.expertStyles?.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-bold text-slate-600">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">成功项目案例描述</p>
          <div className="p-4 bg-slate-50/50 rounded-xl text-xs leading-relaxed text-slate-600 font-medium border border-slate-100/50">
            {cert.bestProjectDesc}
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard icon={<Users size={16} />} color="purple" title="三、团队与价格">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1.5">
              <p className="text-[9px] font-black text-slate-400 uppercase">设计费最低 (元/m²)</p>
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 text-sm font-black text-slate-800">
                {cert.minDesignFee ?? '--'}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[9px] font-black text-slate-400 uppercase">设计费最高 (元/m²)</p>
              <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 text-sm font-black text-slate-800">
                {cert.maxDesignFee ?? '--'}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 text-xs transition-all ${cert.has3DRenderTeam ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-400'}`}>
              效果图制作团队 {cert.has3DRenderTeam ? <span className="text-blue-500">✔️</span> : '+'}
            </div>
            <div className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 text-xs transition-all ${cert.hasDetailingTeam ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-400'}`}>
              深化图团队 {cert.hasDetailingTeam ? <span className="text-blue-500">✔️</span> : '+'}
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={<Star size={16} />} color="amber" title="四、评价与荣誉">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">过往业主评价</p>
              <div className="p-4 bg-amber-50/30 rounded-xl text-xs italic text-amber-900/60 border border-amber-100/50 leading-relaxed max-h-24 overflow-y-auto">
                {cert.pastEvaluations}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">自我客观评价 (性格/做事)</p>
              <div className="p-4 bg-slate-50/50 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100/50 font-medium max-h-24 overflow-y-auto">
                {cert.selfEvaluation}
              </div>
            </div>
            {cert.honors && (
              <div className="space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">所获荣誉</p>
                <div className="p-4 bg-indigo-50/30 rounded-xl text-xs text-indigo-700/80 leading-relaxed border border-indigo-100/50 font-medium">
                  {cert.honors}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </>
  );
}

function ForemanSections({ cert }: { cert: CertificationDetail }) {
  return (
    <>
      <SectionCard icon={<User size={16} />} color="blue" title="一、基本信息 (用户填写)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5">
          <InfoItem label="姓名" value={cert.userName} />
          <InfoItem label="性别" value={cert.gender} />
          <InfoItem label="年龄" value={cert.age} />
          <InfoItem label="学历" value={cert.education} />
          <div className="col-span-1">
            <InfoItem label="身份类型" value={cert.role} isBadge />
          </div>
          <div className="md:col-span-1">
            <InfoItem label="身份证号" value={cert.idNumber} />
          </div>
          <InfoItem label="联系电话" value={cert.phone} />
          <InfoItem label="紧急联系电话" value={cert.emergencyPhone} />
          <div className="md:col-span-2">
            <InfoItem label="籍贯" value={cert.nativePlace} />
          </div>
          <div className="md:col-span-2">
            <InfoItem label="居住地址" value={cert.currentAddress} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">智能手机熟练度</span>
           <div className="flex gap-1">
             <span className={`px-3 py-1 rounded-md text-[9px] font-black border transition-all ${cert.smartphoneProficiency ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>是</span>
             <span className={`px-3 py-1 rounded-md text-[9px] font-black border transition-all ${!cert.smartphoneProficiency ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>否</span>
           </div>
        </div>
      </SectionCard>

      <SectionCard icon={<Briefcase size={16} />} color="indigo" title="二、履历信息 (用户填写)">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-6 pb-6 border-b border-slate-100 border-dashed">
          <InfoItem label="从业年限 (年)" value={cert.experienceYears} />
          <InfoItem label="可提供案例 (套)" value={cert.portfolioCases} />
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">从业历程</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cert.experienceList?.map((exp, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/50 hover:border-slate-300 transition-all">
                <span className="text-[9px] font-black text-slate-400 border border-slate-100 px-2 py-1 rounded-md bg-slate-50">{exp.time}</span>
                <span className="text-xs font-black text-slate-800 flex-1 truncate">{exp.company}</span>
                <span className="text-[10px] font-bold text-blue-600">{exp.position}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
           <InfoItem label="在建/可参观项目" value={cert.visitableProjects} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 border-dashed">
          <InfoItem label="擅长装修类型" value={cert.expertTypes?.join('、')} />
          <InfoItem label="擅长装修户型" value={cert.expertHouseTypes?.join('、')} />
          <InfoItem label="擅长装修风格" value={cert.expertStyles?.join('、')} />
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">代表项目描述</p>
          <div className="p-4 bg-slate-50/50 rounded-xl text-xs leading-relaxed text-slate-600 font-medium border border-slate-100/50">
            {cert.bestProjectDesc}
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard icon={<Users size={16} />} color="purple" title="三、团队信息">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <InfoItem label="经营主体" value={cert.entityType} />
            <InfoItem label="施工资质" value={cert.hasQualification ? '有' : '无'} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <TeamCounter label="水电" count={cert.teamSize?.water} />
            <TeamCounter label="木工" count={cert.teamSize?.wood} />
            <TeamCounter label="瓦工" count={cert.teamSize?.mason} />
            <TeamCounter label="油漆" count={cert.teamSize?.paint} />
          </div>
        </SectionCard>

        <SectionCard icon={<Star size={16} />} color="amber" title="四、评价信息">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">业主评价</p>
              <div className="p-4 bg-amber-50/30 rounded-xl text-xs italic text-amber-900/60 border border-amber-100/50 leading-relaxed">
                "{cert.pastEvaluations}"
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">自我客观评价</p>
              <div className="p-4 bg-slate-50/50 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100/50 font-medium line-clamp-3">
                {cert.selfEvaluation}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

function WorkerSections({ cert }: { cert: CertificationDetail }) {
  return (
    <>
      <SectionCard icon={<User size={16} />} color="blue" title="一、基本信息 (用户填写)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-5">
          <InfoItem label="姓名" value={cert.userName} />
          <InfoItem label="性别" value={cert.gender} />
          <InfoItem label="年龄" value={cert.age} />
          <div className="col-span-1">
            <InfoItem label="身份类型" value={cert.role} isBadge />
          </div>
          <div className="md:col-span-2">
            <InfoItem label="身份证号" value={cert.idNumber} />
          </div>
          <InfoItem label="学历" value={cert.education} />
          <InfoItem label="从业年限 (年)" value={cert.experienceYears} />
          <InfoItem label="联系电话" value={cert.phone} />
          <div className="md:col-span-4">
            <InfoItem label="日常爱好" value={cert.hobbies} />
          </div>
          <div className="md:col-span-2">
            <InfoItem label="籍贯 (精确到市)" value={cert.nativePlace} />
          </div>
          <div className="md:col-span-2">
            <InfoItem label="本市居住地址" value={cert.currentAddress} />
          </div>
          <InfoItem label="紧急联系电话" value={cert.emergencyPhone} />
        </div>
        <div className="mt-4 flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">是否可熟练操作智能手机</span>
           <div className="flex gap-1">
             <span className={`px-6 py-1.5 rounded-md text-[10px] font-black border transition-all ${cert.smartphoneProficiency ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>是</span>
             <span className={`px-6 py-1.5 rounded-md text-[10px] font-black border transition-all ${!cert.smartphoneProficiency ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>否</span>
           </div>
        </div>
      </SectionCard>
    </>
  );
}

// Reusable Components
function SectionCard({ icon, color, title, children, isHighlight = false }: { icon: React.ReactNode; color: string; title: string; children: React.ReactNode; isHighlight?: boolean }) {
  const bgColors: any = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-50 text-slate-600',
  };

  return (
    <div className={`bg-white rounded-[40px] border shadow-sm p-10 transition-all hover:shadow-md ${isHighlight ? 'border-blue-200 ring-4 ring-blue-500/5' : 'border-slate-100'}`}>
      <h3 className="text-lg font-black text-slate-800 mb-10 flex items-center gap-4">
        <span className={`w-10 h-10 rounded-2xl ${bgColors[color] || 'bg-slate-50'} flex items-center justify-center shrink-0 shadow-sm shadow-black/5`}>
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoItem({ label, value, isBadge = false }: { label: string; value: any; isBadge?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      {isBadge ? (
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-black rounded-lg border border-blue-100 lowercase first-letter:uppercase">
          {value}
        </span>
      ) : (
        <p className="text-sm font-black text-slate-800">{value ?? <span className="text-slate-200 italic">未填写</span>}</p>
      )}
    </div>
  );
}

function TeamCounter({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:border-blue-300 transition-all">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">{count ?? 0}</span>
    </div>
  );
}

function UploadModule({ icon, title, desc, hasImage }: { icon: React.ReactNode; title: string; desc: string; hasImage?: string; key?: string | number }) {
  return (
    <div className={`flex flex-col gap-4 p-5 rounded-[24px] border-2 transition-all cursor-pointer group relative overflow-hidden ${hasImage ? 'border-solid border-slate-200 hover:border-blue-500' : 'bg-slate-50/50 border-dashed border-slate-200 hover:border-blue-500 hover:bg-white'}`}>
      
      {hasImage && (
        <div className="absolute inset-0 z-0">
          <img src={hasImage} alt={title} className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
        </div>
      )}

      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center transition-all ${hasImage ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight group-hover:text-blue-700 transition-colors dropdown-title">{title}</p>
          <p className="text-[9px] text-slate-400 font-bold truncate group-hover:text-blue-400 transition-colors">{desc}</p>
        </div>
      </div>
      <div className={`mt-auto relative z-10 flex items-center justify-center gap-2 py-2 rounded-xl transition-all text-[9px] font-black ${hasImage ? 'bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white' : 'bg-white border text-slate-400 border-slate-100 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white'}`}>
        <Upload size={14} />
        {hasImage ? '重新上传' : '点击上传'}
      </div>
    </div>
  );
}
