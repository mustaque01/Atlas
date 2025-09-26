import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  BarChart2,
  CreditCard,
  DollarSign,
  Activity,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const trendData = [
  { name: 'Jan', applications: 65, processed: 45, approved: 35 },
  { name: 'Feb', applications: 75, processed: 55, approved: 42 },
  { name: 'Mar', applications: 85, processed: 65, approved: 48 },
  { name: 'Apr', applications: 95, processed: 75, approved: 58 },
  { name: 'May', applications: 105, processed: 85, approved: 68 },
  { name: 'Jun', applications: 115, processed: 95, approved: 78 },
];

const recentApplications = [
  { id: 'APP001', applicant: 'John Doe', amount: 50000, status: 'Processing', date: '2025-02-08', priority: 'High' },
  { id: 'APP002', applicant: 'Jane Smith', amount: 75000, status: 'Approved', date: '2025-02-07', priority: 'Medium' },
  { id: 'APP003', applicant: 'Bob Wilson', amount: 25000, status: 'Document Verification', date: '2025-02-06', priority: 'Low' },
  { id: 'APP004', applicant: 'Alice Brown', amount: 100000, status: 'Processing', date: '2025-02-05', priority: 'High' },
  { id: 'APP005', applicant: 'Charlie Davis', amount: 150000, status: 'Approved', date: '2025-02-04', priority: 'Medium' },
];

const DashboardOverview = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Total Applications',
      value: '1,284',
      change: '+14.5%',
      icon: <Users className="w-7 h-7" />,
      color: 'text-blue-500',
      bgColor: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10',
      hoverBg: 'hover:from-blue-500/20 hover:to-blue-600/20',
      borderColor: 'border-blue-500/20',
      link: '/applications'
    },
    {
      title: 'Processing',
      value: '284',
      change: '+23.1%',
      icon: <Clock className="w-7 h-7" />,
      color: 'text-amber-500',
      bgColor: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10',
      hoverBg: 'hover:from-amber-500/20 hover:to-orange-500/20',
      borderColor: 'border-amber-500/20',
      link: '/processing'
    },
    {
      title: 'Approved',
      value: '862',
      change: '+18.7%',
      icon: <CheckCircle2 className="w-7 h-7" />,
      color: 'text-emerald-500',
      bgColor: 'bg-gradient-to-r from-emerald-500/10 to-green-500/10',
      hoverBg: 'hover:from-emerald-500/20 hover:to-green-500/20',
      borderColor: 'border-emerald-500/20',
      link: '/approved'
    },
    {
      title: 'Documents Verified',
      value: '978',
      change: '+32.1%',
      icon: <FileCheck className="w-7 h-7" />,
      color: 'text-purple-500',
      bgColor: 'bg-gradient-to-r from-purple-500/10 to-violet-500/10',
      hoverBg: 'hover:from-purple-500/20 hover:to-violet-500/20',
      borderColor: 'border-purple-500/20',
      link: '/documents'
    }
  ];

  const quickStats = [
    {
      label: 'Total Loan Value',
      value: '₹24.8M',
      icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
      trend: '+12.3%'
    },
    {
      label: 'Avg Processing Time',
      value: '2.4 days',
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      trend: '-18.2%'
    },
    {
      label: 'Success Rate',
      value: '94.7%',
      icon: <Activity className="w-5 h-5 text-purple-500" />,
      trend: '+5.1%'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Processing': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'Document Verification': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
            Welcome back, <span className="text-gradient bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">John!</span>
          </h1>
          <p className="text-gray-400 text-lg">Here's what's happening with your loan portfolio today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-4 min-w-[120px]">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
              <div className="text-white font-bold">{stat.value}</div>
              <div className={`text-xs ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card 
            key={index} 
            className={`group ${metric.bgColor} ${metric.hoverBg} ${metric.borderColor} border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden`}
            onClick={() => navigate(metric.link)}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity blur-xl`}></div>
            
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
              <CardTitle className="text-lg font-bold text-white group-hover:text-white">
                {metric.title}
              </CardTitle>
              <div className={`${metric.color} bg-black/20 p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
              <div className="flex items-center gap-2">
                <span className={`${metric.color} font-semibold`}>{metric.change}</span>
                <span className="text-gray-400">from last month</span>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-4 w-full bg-zinc-800 rounded-full h-1">
                <div className={`${metric.bgColor.replace('/10', '').replace('/10', '')} h-1 rounded-full w-0 group-hover:w-3/4 transition-all duration-1000`}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="xl:col-span-2">
          <Card className="bg-zinc-900/50 border-zinc-700/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-white">Application Trends</CardTitle>
                <p className="text-gray-400 mt-1">Monthly performance overview</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">Applications</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-400">Processed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">Approved</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181b', 
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="url(#colorApplications)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="processed" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fill="url(#colorProcessed)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="approved" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      fill="url(#colorApproved)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          {/* Performance Card */}
          <Card className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-xl font-bold text-white">Performance</CardTitle>
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Approval Rate</span>
                    <span className="text-emerald-400 font-bold">87.2%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{width: '87.2%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Processing Speed</span>
                    <span className="text-blue-400 font-bold">94.5%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '94.5%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Client Satisfaction</span>
                    <span className="text-purple-400 font-bold">96.8%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '96.8%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-zinc-900/50 border-zinc-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 hover:from-rose-500/20 hover:to-pink-500/20 transition-all text-white">
                  <Users className="w-5 h-5" />
                  <span>New Application</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all text-white">
                  <FileCheck className="w-5 h-5" />
                  <span>Review Documents</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 hover:from-emerald-500/20 hover:to-green-500/20 transition-all text-white">
                  <BarChart2 className="w-5 h-5" />
                  <span>View Reports</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Applications Table */}
      <Card className="bg-zinc-900/50 border-zinc-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-white">Recent Applications</CardTitle>
            <p className="text-gray-400 mt-1">Latest loan applications and their status</p>
          </div>
          <button 
            onClick={() => navigate('/applications')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 text-rose-400 hover:from-rose-500/20 hover:to-pink-500/20 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700/50">
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Application ID</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Applicant</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Loan Amount</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Status</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Priority</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Date</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr 
                    key={app.id} 
                    className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors group"
                  >
                    <td className="py-4 text-sm font-mono text-blue-400">{app.id}</td>
                    <td className="py-4 text-sm text-white font-medium">{app.applicant}</td>
                    <td className="py-4 text-sm text-emerald-400 font-semibold">₹{app.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(app.priority)}`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-400">{app.date}</td>
                    <td className="py-4">
                      <button 
                        onClick={() => navigate(`/application/${app.id}`)}
                        className="opacity-0 group-hover:opacity-100 px-3 py-1 rounded-lg bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-400 text-xs hover:from-rose-500/30 hover:to-pink-500/30 transition-all"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30 hover:border-amber-500/50 cursor-pointer transition-all hover:scale-105 backdrop-blur-sm"
          onClick={() => navigate('/insights/risk')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xl text-white font-bold">Risk Analysis</CardTitle>
            <AlertCircle className="w-6 h-6 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white mb-2">3</div>
            <p className="text-amber-200 text-sm">Applications flagged for high risk review</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30 hover:border-emerald-500/50 cursor-pointer transition-all hover:scale-105 backdrop-blur-sm"
          onClick={() => navigate('/insights/performance')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xl text-white font-bold">Processing Performance</CardTitle>
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white mb-2">-25%</div>
            <p className="text-emerald-200 text-sm">Average processing time improvement</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/50 cursor-pointer transition-all hover:scale-105 backdrop-blur-sm"
          onClick={() => navigate('/insights/analytics')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xl text-white font-bold">Analytics Hub</CardTitle>
            <BarChart2 className="w-6 h-6 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white mb-2">12</div>
            <p className="text-blue-200 text-sm">Detailed reports and analytics available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;