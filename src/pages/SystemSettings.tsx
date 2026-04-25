import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Lock, 
  Mail, 
  Smartphone,
  ChevronRight,
  Save,
  RotateCcw
} from 'lucide-react';

export default function SystemSettings() {
  const [platformName, setPlatformName] = useState('良造家平台');
  const [serviceHotline, setServiceHotline] = useState('400-888-XXXX');
  const [icpNumber, setIcpNumber] = useState('沪ICP备XXXXXXXX号-1');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[20px] font-semibold text-slate-900">系统设置</h1>
        </div>
        <div className="flex gap-3">
          <button 
            className="bg-white border border-slate-200 px-4 py-2 rounded text-[13px] font-medium text-slate-500 hover:bg-slate-50 transition-all"
            onClick={() => {
              setPlatformName('良造家平台');
              setServiceHotline('400-888-XXXX');
              setIcpNumber('沪ICP备XXXXXXXX号-1');
            }}
          >
            重置
          </button>
          <button 
            className="bg-[#2563eb] text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-blue-700 transition-all"
            onClick={() => alert('设置已保存！(测试)')}
          >
            保存更改
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="flex flex-col gap-1">
            {[
              { label: '常规设置', icon: Globe, active: true },
              { label: '安全中心', icon: Lock, active: false },
              { label: '通知策略', icon: Bell, active: false },
              { label: '权限分配', icon: Shield, active: false },
              { label: '备份与存储', icon: Database, active: false },
            ].map((item, i) => (
              <button 
                key={i}
                className={`flex items-center justify-between px-3 py-2 rounded text-[13px] font-medium transition-all ${
                  item.active 
                    ? 'bg-white text-[#2563eb] shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.active && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-[#f8fafc]">
              <h3 className="font-semibold text-slate-800 text-[15px]">基础配置</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">平台名称</label>
                  <input 
                    type="text" 
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[13px] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">客服热线</label>
                  <input 
                    type="text" 
                    value={serviceHotline}
                    onChange={(e) => setServiceHotline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[13px] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">备案号</label>
                <input 
                  type="text" 
                  value={icpNumber}
                  onChange={(e) => setIcpNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-[13px] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-[#f8fafc]">
              <h3 className="font-semibold text-slate-800 text-[15px]">业务规则</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: '线索自动分配', desc: '开启后新线索将按区域负载自动分发至相应负责人', checked: true },
                { label: '认证二次复核', desc: '所有从业者认证在初审通过后需由超级管理员复核', checked: false },
                { label: '师徒分成比例', desc: '设定平台收取的师徒带教关系技术服务费比例', checked: true, val: '5%' },
              ].map((rule, i) => (
                <div key={i} className="flex items-start justify-between p-4 rounded border border-slate-100 bg-slate-50/20">
                  <div className="flex-1 pr-8">
                    <p className="text-[14px] font-semibold text-slate-800">{rule.label}</p>
                    <p className="text-[12px] text-slate-400 mt-1">{rule.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {rule.val && <span className="text-[11px] font-bold text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded">{rule.val}</span>}
                    <div className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${rule.checked ? 'bg-[#2563eb]' : 'bg-slate-200'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${rule.checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
