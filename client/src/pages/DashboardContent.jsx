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
  BarChart2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { name: 'Jan', applications: 65, processed: 45, approved: 35 },
  { name: 'Feb', applications: 75, processed: 55, approved: 42 },
  { name: 'Mar', applications: 85, processed: 65, approved: 48 },
  { name: 'Apr', applications: 95, processed: 75, approved: 58 },
  { name: 'May', applications: 105, processed: 85, approved: 68 },
  { name: 'Jun', applications: 115, processed: 95, approved: 78 },
];

const recentApplications = [
  { id: 'APP001', applicant: 'John Doe', amount: 50000, status: 'Processing', date: '2025-02-08' },
  { id: 'APP002', applicant: 'Jane Smith', amount: 75000, status: 'Approved', date: '2025-02-07' },
  { id: 'APP003', applicant: 'Bob Wilson', amount: 25000, status: 'Document Verification', date: '2025-02-06' },
  { id: 'APP004', applicant: 'Alice Brown', amount: 100000, status: 'Processing', date: '2025-02-05' },
  { id: 'APP005', applicant: 'Charlie Davis', amount: 150000, status: 'Approved', date: '2025-02-04' },
];

const DashboardOverview = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Total Applications',
      value: '1,284',
      change: '+14.5%',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-500',
      link: '/applications'
    },
    {
      title: 'Processing',
      value: '284',
      change: '+23.1%',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-yellow-500',
      link: '/processing'
    },
    {
      title: 'Approved',
      value: '862',
      change: '+18.7%',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'text-emerald-500',
      link: '/approved'
    },
    {
      title: 'Documents Verified',
      value: '978',
      change: '+32.1%',
      icon: <FileCheck className="w-6 h-6" />,
      color: 'text-purple-500',
      link: '/documents'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-800  rounded-3xl ">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-b-lg">
        {metrics.map((metric, index) => (
          <Card 
            key={index} 
            className="bg-gray-700 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
            onClick={() => navigate(metric.link)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-medium text-gray-200">
                {metric.title}
              </CardTitle>
              <div className={`${metric.color} bg-zinc-800 p-2 rounded-lg`}>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold  text-gray-200">{metric.value}</div>
              <p className="text-s text-zinc-400 mt-1">
                <span className={`${metric.color}`}>{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-700 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl text-gray-200">Application Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#18181b', 
                      border: '1px solid #27272a' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="processed" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-200">Recent Applications</CardTitle>
            <button 
              onClick={() => navigate('/applications')}
              className="text-sm text-zinc-400 hover:text-white flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-gray-200">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 text-sm font-medium text-zinc-400">ID</th>
                    <th className="text-left py-3 text-sm font-medium text-zinc-400">Applicant</th>
                    <th className="text-left py-3 text-sm font-medium text-zinc-400">Amount</th>
                    <th className="text-left py-3 text-sm font-medium text-zinc-400">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-zinc-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app) => (
                    <tr 
                      key={app.id} 
                      className="border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer"
                      onClick={() => navigate(`/application/${app.id}`)}
                    >
                      <td className="py-3 text-sm">{app.id}</td>
                      <td className="py-3 text-sm">{app.applicant}</td>
                      <td className="py-3 text-sm">${app.amount.toLocaleString()}</td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          app.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-500' :
                          app.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-zinc-400">{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="bg-gray-700 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
          onClick={() => navigate('/insights/risk')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-gray-200 font-medium">Risk Analysis</CardTitle>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 text-sm">3 applications flagged for high risk</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gray-700 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
          onClick={() => navigate('/insights/performance')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl  text-gray-200 font-medium">Processing Performance</CardTitle>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 text-sm">Average processing time reduced by 25%</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gray-700 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
          onClick={() => navigate('/insights/analytics')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl text-gray-200 font-medium">Analytics Overview</CardTitle>
            <BarChart2 className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 text-sm">View detailed analytics and reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;