
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

const RiskAssessment = () => {
  const creditScoreData = [
    { month: 'Jan', score: 680 },
    { month: 'Feb', score: 695 },
    { month: 'Mar', score: 710 },
    { month: 'Apr', score: 705 },
    { month: 'May', score: 725 },
    { month: 'Jun', score: 735 }
  ];

  const riskMetrics = {
    creditScore: 735,
    debtToIncome: 28,
    defaultRisk: 'Low',
    creditUtilization: 35
  };

  return (
    <div className="space-y-6">
      {/* Risk Score Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">Credit Score</p>
                <h3 className="text-3xl font-bold mt-2">{riskMetrics.creditScore}</h3>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <TrendingUp className="text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">Debt-to-Income</p>
                <h3 className="text-3xl font-bold mt-2">{riskMetrics.debtToIncome}%</h3>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Activity className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">Default Risk</p>
                <h3 className="text-3xl font-bold mt-2">{riskMetrics.defaultRisk}</h3>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <ShieldCheck className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400">Credit Utilization</p>
                <h3 className="text-3xl font-bold mt-2">{riskMetrics.creditUtilization}%</h3>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Score Trend */}
      <Card className="bg-gray-800 border-0">
        <CardHeader>
          <CardTitle>Credit Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={creditScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;