import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  UserCheck,
  FileText,
  ArrowRight
} from 'lucide-react';

const ApprovalWorkflow = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicant: 'John Doe',
      type: 'Personal Loan',
      amount: 25000,
      stage: 'documentation',
      riskScore: 85,
      timeInStage: '2 days',
      nextAction: 'Verify Employment'
    },
    {
      id: 2,
      applicant: 'Jane Smith',
      type: 'Home Loan',
      amount: 350000,
      stage: 'verification',
      riskScore: 92,
      timeInStage: '1 day',
      nextAction: 'Credit Check'
    }
  ]);

  const stages = [
    'application',
    'documentation',
    'verification',
    'assessment',
    'approval'
  ];

  const getStageIndicator = (currentStage, stage) => {
    const stageIndex = stages.indexOf(stage);
    const currentIndex = stages.indexOf(currentStage);

    if (stageIndex < currentIndex) {
      return <CheckCircle className="text-emerald-500" />;
    } else if (stageIndex === currentIndex) {
      return <Clock className="text-blue-500 animate-pulse" />;
    } else {
      return <div className="w-4 h-4 rounded-full bg-gray-700" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-0">
        <CardHeader>
          <CardTitle className="text-gray-300">Active Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {applications.map(app => (
              <div key={app.id} className="p-6 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-lg font-medium  text-gray-300">{app.applicant}</h4>
                    <p className="text-sm text-gray-400">
                      {app.type} - ${app.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-400">{app.timeInStage}</span>
                  </div>
                </div>

                {/* Workflow Progress */}
                <div className="relative flex justify-between mb-8">
                  {stages.map((stage, index) => (
                    <div key={stage} className="flex flex-col items-center">
                      {getStageIndicator(app.stage, stage)}
                      <span className="text-xs text-gray-400 mt-2 capitalize">
                        {stage}
                      </span>
                      {index < stages.length - 1 && (
                        <div className="absolute h-px bg-gray-700" style={{
                          width: `${100 / (stages.length - 1)}%`,
                          left: `${(100 / (stages.length - 1)) * index}%`,
                          top: '12px',
                          zIndex: -1
                        }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Required */}
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-yellow-500" />
                    <span className='text-gray-300'>Next Action: {app.nextAction}</span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 rounded-lg flex items-center gap-2">
                    Take Action
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalWorkflow;