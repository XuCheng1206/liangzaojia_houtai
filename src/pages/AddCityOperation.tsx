import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Building2, MapPin, User, FileText, Upload, CheckCircle2, ClipboardList, Plus, Trash2, ShieldCheck } from 'lucide-react';

export default function AddCityOperation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    orgName: '',
    city: '',
    adminName: '',
    contractName: '',
    contractUploaded: false,
    tasks: [{ description: '', deadline: '' }],
    tradingCenters: { b: true, c: true },
  });

  useEffect(() => {
    if (isEdit) {
      // In a real app, you would fetch data by ID
      // For now, we'll mock some data if it's an edit mode
      setFormData({
        orgName: id === 'C-SH' ? '上海运营中心' : (id === 'C-HZ' ? '杭州运营中心' : '运营中心'),
        city: id === 'C-SH' ? 'shanghai' : 'beijing',
        adminName: '管理员',
        contractName: '2026年独家代理协议',
        contractUploaded: true,
        tasks: [
          { description: '完成首批50名服务人员招募', deadline: '2026-06-30' },
          { description: '正式开业并上线系统', deadline: '2026-07-15' }
        ],
        tradingCenters: { b: true, c: true },
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index: number, field: 'description' | 'deadline', value: string) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setFormData({ ...formData, tasks: newTasks });
  };

  const addTask = () => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { description: '', deadline: '' }]
    });
  };

  const removeTask = (index: number) => {
    const newTasks = formData.tasks.filter((_, i) => i !== index);
    setFormData({ ...formData, tasks: newTasks });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save data
    console.log('Submitting:', formData);
    alert(isEdit ? '运营中心信息已成功保存！' : '运营中心添加成功！(测试)');
    navigate('/cities');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-64px)]">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/cities')}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{isEdit ? '配置城市运营中心' : '新增城市运营中心'}</h1>
          <p className="text-slate-500 text-sm mt-1">{isEdit ? '修改城市运营中心的基本信息、负责人及任务配置' : '创建新的城市运营中心并配置相关负责人、交易中心及合约'}</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1"
      >
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-8">
          
          {/* Section 1: Org Info */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Building2 className="text-blue-600" size={20} />
              1. 运营中心信息
            </h2>
            <div className="max-w-md">
              <label className="block text-sm font-bold text-slate-700 mb-2">运营中心名称</label>
              <input 
                type="text"
                required
                placeholder="例如：北京良造家运营中心"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={formData.orgName}
                onChange={(e) => setFormData({...formData, orgName: e.target.value})}
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Select City */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin className="text-blue-600" size={20} />
              2. 选择开通的城市
            </h2>
            <div className="max-w-md">
              <label className="block text-sm font-bold text-slate-700 mb-2">目标城市</label>
              <div className="relative">
                <select 
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  <option value="" disabled>请选择城市...</option>
                  <option value="beijing">北京 (Beijing)</option>
                  <option value="shanghai">上海 (Shanghai)</option>
                  <option value="xian">西安 (Xi'an)</option>
                  <option value="nanyang">南阳 (Nanyang)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {formData.city && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 max-w-md"
              >
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">默认开通交易中心</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 opacity-60">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-not-allowed"
                      checked={formData.tradingCenters.b}
                      disabled
                    />
                    <span className="text-sm font-medium text-slate-700">B交易中心</span>
                  </label>
                  <label className="flex items-center gap-2 opacity-60">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-not-allowed"
                      checked={formData.tradingCenters.c}
                      disabled
                    />
                    <span className="text-sm font-medium text-slate-700">C交易中心</span>
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1">
                  <ShieldCheck size={10} />
                  交易中心为必选项，无法取消勾选
                </p>
              </motion.div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Section 3: Admin */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="text-blue-600" size={20} />
              3. 添加城市运营组织管理员
            </h2>
            <div className="max-w-md">
              <label className="block text-sm font-bold text-slate-700 mb-2">管理员姓名/系统账号</label>
              <input 
                type="text"
                required
                placeholder="输入用户名或手机号查找"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={formData.adminName}
                onChange={(e) => setFormData({...formData, adminName: e.target.value})}
              />
              <p className="text-xs text-slate-400 mt-2">该账号将获得该城市站点的所有管理权限</p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4: Contract */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              4. 上传城市合伙人合约
            </h2>
            <div className="max-w-md space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">合约名称</label>
                <input 
                  type="text"
                  required
                  placeholder="例如：2026年北京区域独家代理协议"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={formData.contractName}
                  onChange={(e) => setFormData({...formData, contractName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">上传签署的合约附件</label>
                
                {!formData.contractUploaded ? (
                <div 
                  className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group"
                  onClick={() => setFormData({...formData, contractUploaded: true})}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">点击上传合约文件</p>
                  <p className="text-xs text-slate-400 mt-1">支持 PDF, JPG, PNG 格式，最大 10MB</p>
                </div>
              ) : (
                <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-emerald-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-800">城市合作协议_已签署.pdf</p>
                      <p className="text-xs font-medium text-emerald-600/70">2.4 MB • 上传成功</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, contractUploaded: false})}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                  >
                    重新上传
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5: Tasks */}
          <div>
            <div className="flex items-center justify-between mb-6 max-w-xl">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ClipboardList className="text-blue-600" size={20} />
                5. 创建城市合伙人任务
              </h2>
              <button 
                type="button" 
                onClick={addTask}
                className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus size={16} />
                <span>添加任务</span>
              </button>
            </div>
            
            <div className="max-w-xl space-y-6">
              {formData.tasks.map((task, index) => (
                <div key={index} className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 relative group">
                  {formData.tasks.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeTask(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                      title="删除任务"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">任务简述</label>
                        <textarea 
                          required
                          placeholder="例如：完成首批50名服务人员的招募与培训..."
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none bg-white"
                          rows={2}
                          value={task.description}
                          onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">完成时间</label>
                        <input 
                          type="date"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white"
                          value={task.deadline}
                          onChange={(e) => handleTaskChange(index, 'deadline', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button 
              type="button"
              onClick={() => navigate('/cities')}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
            >
              取消
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              {isEdit ? '保存配置' : '完成创建'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
