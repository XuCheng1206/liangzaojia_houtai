import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Briefcase, 
  UsersRound,
  LayoutTemplate, 
  MapPin, 
  Settings, 
  LayoutDashboard,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Loader2
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import UserManagement from './pages/UserManagement';
import LeadManagement from './pages/LeadManagement';
import AddLead from './pages/AddLead';
import LeadDetails from './pages/LeadDetails';
import CertificationManagement from './pages/CertificationManagement';
import CertificationAuditDetail from './pages/CertificationAuditDetail';
import PractitionerManagement from './pages/PractitionerManagement';
import ProjectInitiatorManagement from './pages/ProjectInitiatorManagement';
import ProjectInitiatorAuditDetail from './pages/ProjectInitiatorAuditDetail';
import TemplateManagement from './pages/TemplateManagement';
import CityOperations from './pages/CityOperations';
import SystemSettings from './pages/SystemSettings';
import AddCityOperation from './pages/AddCityOperation';
import TradingCenterConfig from './pages/TradingCenterConfig';
import ContentOperation from './pages/ContentOperation';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Mock Page Placeholder
const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
    <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-slate-400">
      <LayoutTemplate className="w-16 h-16 mb-4 opacity-20" />
      <p className="text-lg font-medium">{title} 模块开发中...</p>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="p-8">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-[20px] font-semibold text-slate-900">运行概况</h2>
      </div>
      <div className="flex gap-3">
        <button className="bg-white border border-slate-200 px-4 py-2 rounded text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">导出数据</button>
        <button className="bg-[#2563eb] text-white px-4 py-2 rounded text-[13px] font-medium hover:bg-blue-700 transition-colors">新建条目</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: '活跃用户', value: '1,284', change: '+12%', icon: Users },
        { label: '新增线索', value: '156', change: '+5%', icon: Target },
        { label: '待处理认证', value: '23', change: '-2', icon: ShieldCheck },
        { label: '运营中心', value: '12', change: '0', icon: MapPin },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <stat.icon size={20} className="text-slate-400" />
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
              {stat.change}
            </span>
          </div>
          <p className="text-slate-500 text-[13px] font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800 text-[16px]">最近线索</h2>
          <button className="text-[#2563eb] text-[13px] font-medium hover:underline">查看全部</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-6 py-3 text-[13px] font-semibold text-slate-500 border-b border-slate-200">线索名称</th>
                <th className="px-6 py-3 text-[13px] font-semibold text-slate-500 border-b border-slate-200">来源</th>
                <th className="px-6 py-3 text-[13px] font-semibold text-slate-500 border-b border-slate-200">状态</th>
                <th className="px-6 py-3 text-[13px] font-semibold text-slate-500 border-b border-slate-200">创建日期</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 border-b border-slate-100 font-medium text-slate-700">潜在客户 {i}</td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-500 text-[13px]">线上推广</td>
                  <td className="px-6 py-4 border-b border-slate-100">
                    <span className="status-tag status-active">跟进中</span>
                  </td>
                  <td className="px-6 py-4 border-b border-slate-100 text-slate-400 text-[13px] font-mono">2026-04-1{i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <h2 className="font-semibold text-slate-800 mb-6 text-[16px]">待办通知</h2>
        <div className="space-y-5">
          {[
            { msg: '张某提交了从业者认证申请', time: '10分钟前' },
            { msg: '上海运营中心数据异常提醒', time: '1小时前' },
            { msg: '新模板「入职协议V2」已发布', time: '3小时前' },
          ].map((note, i) => (
            <div key={i} className="flex gap-4 p-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-slate-800 leading-relaxed">{note.msg}</p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium underline decoration-slate-200 underline-offset-4">{note.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SidebarItem = ({ to, icon: Icon, label, active, ...props }: { to: string, icon: any, label: string, active: boolean, [key: string]: any }) => (
  <Link to={to} {...props} className={`sidebar-link ${active ? 'active' : ''}`}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto" />}
  </Link>
);

const LoginPage = () => {
  const { user, loading, login } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    </div>
  );
  if (user) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5 p-8 text-center"
      >
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-500/20 mx-auto mb-6">
          良
        </div>
        <h1 className="text-2xl font-bold text-slate-900">良造家平台管理系统</h1>
        <p className="text-slate-500 mt-2 mb-8">请登录您的管理员账号以继续管理平台</p>
        
        <button 
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          使用 Google 账号登录
        </button>
        
        <p className="text-[10px] text-slate-400 mt-8 uppercase tracking-widest font-bold">
          Protected by 良造家 Security
        </p>
      </motion.div>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AppLayout = () => {
  const { user, isStaff, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return null;

  const menuItems = [
    { title: '控制台', path: '/', icon: LayoutDashboard },
    { title: '用户管理', path: '/users', icon: Users },
    { title: '线索管理', path: '/leads', icon: Target },
    { title: '认证管理', path: '/certs', icon: ShieldCheck },
    { title: '从业者管理', path: '/practitioners', icon: Briefcase },
    { title: '项目发起人', path: '/initiators', icon: UsersRound },
    { title: '模板管理', path: '/templates', icon: LayoutTemplate },
    { title: '城市运营', path: '/cities', icon: MapPin },
    { title: '内容运营', path: '/content', icon: LayoutTemplate },
    { title: '系统设置', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Overlay */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(true)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-slate-200 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-2 px-6 h-16 border-b border-slate-200">
            <div className="w-2.5 h-6 bg-blue-600 rounded-[2px]"></div>
            <div className="leading-tight">
              <p className="text-slate-900 font-bold tracking-tight text-[17px] whitespace-nowrap">良造家平台管理</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-slate-400 p-1 hover:bg-slate-50 rounded">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.path} 
                to={item.path} 
                icon={item.icon} 
                label={item.title} 
                active={location.pathname === item.path} 
              />
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button onClick={logout} className="flex items-center gap-3 px-4 py-2 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium">
              <LogOut size={18} />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-slate-500 p-2 hover:bg-slate-50 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="flex items-center text-[14px] text-slate-500">
              <span className="capitalize">{location.pathname === '/' ? '控制台' : menuItems.find(m => m.path === location.pathname)?.title || '管理'}</span>
              <ChevronRight size={14} className="mx-2 opacity-50" />
              <span className="text-slate-400">实时列表</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-64">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索..." 
                className="bg-transparent border-none outline-none text-sm w-full ml-2 text-slate-600 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{user.displayName || '管理员'}</p>
                <p className="text-[11px] text-slate-500 font-medium">超级管理员</p>
              </div>
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="min-h-full"
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/leads" element={<LeadManagement />} />
                <Route path="/leads/add" element={<AddLead />} />
                <Route path="/leads/:id" element={<LeadDetails />} />
                <Route path="/certs" element={<CertificationManagement />} />
                <Route path="/certs/:id" element={<CertificationAuditDetail />} />
                <Route path="/practitioners" element={<PractitionerManagement />} />
                <Route path="/initiators" element={<ProjectInitiatorManagement />} />
                <Route path="/initiators/:id" element={<ProjectInitiatorAuditDetail />} />
                <Route path="/templates" element={<TemplateManagement />} />
                <Route path="/cities" element={<CityOperations />} />
                <Route path="/cities/add" element={<AddCityOperation />} />
                <Route path="/cities/edit/:id" element={<AddCityOperation />} />
                <Route path="/cities/trading-config/:id" element={<TradingCenterConfig />} />
                <Route path="/content" element={<ContentOperation />} />
                <Route path="/settings" element={<SystemSettings />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
