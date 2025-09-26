import { 
  IoMenu, 
  IoHomeOutline, 
  IoDocumentTextOutline, 
  IoShieldCheckmarkOutline,
  IoAnalyticsOutline,
  IoLogOutOutline,
  IoChevronDownOutline,
  IoPersonOutline
} from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { useState, useEffect } from "react";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import DashboardContent from "./DashboardContent";
import DocumentVerification from "@/components/DocumentVerificationInterface";
import ApprovalWorkflow from "@/components/ApprovalWorkflowInterface";
import RiskAssessment from "@/components/RiskAssessmentDashboard";

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('dashboardContent');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userInfo] = useState({
    name: "John Doe",
    role: "Loan Officer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
  });

  // Auto-close mobile menu on route change
  useEffect(() => {
    const checkbox = document.getElementById('menu-toggle');
    if (checkbox) checkbox.checked = false;
  }, [activeContent]);

  const renderContent = () => {
    switch(activeContent) {
      case 'dashboardContent':
        return <DashboardContent />;
      case 'loanApplication':
        return <LoanApplicationForm />;
      case 'documentVerification':
        return <DocumentVerification/>;
      case 'loanApproval':
        return <ApprovalWorkflow />;
      case 'riskassessment':
        return <RiskAssessment/>
      default:
        return <DashboardContent />;
    }
  }

  const menuItems = [
    {
      id: 'dashboardContent',
      label: 'Dashboard',
      icon: IoHomeOutline,
      action: () => setActiveContent('dashboardContent')
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: SiGoogleforms,
      hasSubmenu: true,
      submenu: [
        { id: 'loanApplication', label: 'New Application', action: () => setActiveContent('loanApplication') },
        { id: 'documentVerification', label: 'Document Verification', action: () => setActiveContent('documentVerification') },
        { id: 'loanApproval', label: 'Approval Workflow', action: () => setActiveContent('loanApproval') }
      ]
    },
    {
      id: 'riskassessment',
      label: 'Risk Assessment',
      icon: IoAnalyticsOutline,
      action: () => setActiveContent('riskassessment')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Mobile menu backdrop */}
      <input 
        type="checkbox" 
        id="menu-toggle" 
        className="hidden peer" 
      />
      
      {/* Mobile backdrop */}
      <label 
        htmlFor="menu-toggle" 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 peer-checked:block hidden lg:hidden"
      />

      <div className="flex h-screen">
        {/* Modern Sidebar */}
        <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-zinc-900/95 to-black/95 backdrop-blur-xl border-r border-zinc-700/50 transition-transform duration-300 transform peer-checked:translate-x-0 -translate-x-full lg:translate-x-0 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-80'}`}>
          
          {/* Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-zinc-700/50">
            <div className={`flex items-center gap-3 transition-opacity ${sidebarCollapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">ATLAS</h1>
                <p className="text-gray-400 text-xs">Loan Management</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <label htmlFor="menu-toggle" className="lg:hidden text-gray-400 hover:text-white cursor-pointer transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </label>

            {/* Desktop collapse button */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              <IoMenu className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className={`p-6 border-b border-zinc-700/30 ${sidebarCollapsed ? 'lg:px-2' : 'px-6'}`}>
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
              <img 
                src={userInfo.avatar} 
                alt="User avatar" 
                className="w-12 h-12 rounded-full border-2 border-rose-500/30"
              />
              <div className={`transition-opacity ${sidebarCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'}`}>
                <h3 className="text-white font-semibold">{userInfo.name}</h3>
                <p className="text-gray-400 text-sm">{userInfo.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={item.hasSubmenu ? () => setIsVisible(!isVisible) : item.action}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 hover:text-white transition-all duration-200 group ${
                    activeContent === item.id ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-white border border-rose-500/30' : ''
                  } ${sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''}`}
                >
                  <item.icon className={`w-5 h-5 ${item.hasSubmenu && isVisible ? 'text-rose-500' : ''}`} />
                  <span className={`font-medium transition-opacity ${sidebarCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'}`}>
                    {item.label}
                  </span>
                  {item.hasSubmenu && (
                    <IoChevronDownOutline 
                      className={`w-4 h-4 ml-auto transition-transform ${isVisible ? 'rotate-180 text-rose-500' : ''} ${sidebarCollapsed ? 'lg:hidden' : ''}`} 
                    />
                  )}
                </button>

                {/* Submenu */}
                {item.hasSubmenu && isVisible && (
                  <div className={`mt-2 ml-6 space-y-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:hidden' : ''}`}>
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={subItem.action}
                        className={`w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-zinc-800/50 hover:text-white transition-all ${
                          activeContent === subItem.id ? 'bg-zinc-800/80 text-white' : ''
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className={`p-4 border-t border-zinc-700/30 ${sidebarCollapsed ? 'lg:px-2' : 'px-4'}`}>
            <a
              href="/"
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group ${sidebarCollapsed ? 'lg:justify-center lg:px-3' : ''}`}
            >
              <IoLogOutOutline className="w-5 h-5" />
              <span className={`font-medium transition-opacity ${sidebarCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'}`}>
                Logout
              </span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-0'}`}>
          {/* Top Bar */}
          <header className="h-20 bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-700/50 flex items-center justify-between px-6">
            {/* Mobile menu button */}
            <label htmlFor="menu-toggle" className="lg:hidden text-white cursor-pointer">
              <IoMenu className="w-6 h-6" />
            </label>
            
            {/* Page title */}
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold text-white">
                {activeContent === 'dashboardContent' ? 'Dashboard Overview' :
                 activeContent === 'loanApplication' ? 'Loan Application' :
                 activeContent === 'documentVerification' ? 'Document Verification' :
                 activeContent === 'loanApproval' ? 'Approval Workflow' :
                 activeContent === 'riskassessment' ? 'Risk Assessment' : 'Dashboard'}
              </h2>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM13 3L8 8h5z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>
              </button>
              
              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;