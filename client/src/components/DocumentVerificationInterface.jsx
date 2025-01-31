import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Search,
  RefreshCw,
  Shield,
} from 'lucide-react';

const DocumentVerification = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'ID Proof.pdf',
      type: 'Identity',
      status: 'verified',
      aiScore: 98,
      lastChecked: '2024-01-28'
    },
    {
      id: 2,
      name: 'Bank_Statement.pdf',
      type: 'Financial',
      status: 'processing',
      aiScore: 85,
      lastChecked: '2024-01-28'
    },
    {
      id: 3,
      name: 'Salary_Slip.pdf',
      type: 'Income',
      status: 'attention',
      aiScore: 65,
      lastChecked: '2024-01-28'
    }
  ]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified':
        return <CheckCircle className="text-emerald-500" />;
      case 'processing':
        return <RefreshCw className="text-blue-500 animate-spin" />;
      case 'attention':
        return <AlertCircle className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Document Verification</span>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-700 rounded-lg">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-700 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map(doc => (
              <div key={doc.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="text-gray-400" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-400">{doc.type}</p>
                    </div>
                  </div>
                  {getStatusIcon(doc.status)}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400">AI Confidence</div>
                    <div className="text-lg font-medium">{doc.aiScore}%</div>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400">Last Checked</div>
                    <div className="text-lg font-medium">{doc.lastChecked}</div>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400">Security Status</div>
                    <div className="flex items-center gap-2">
                      <Shield className="text-emerald-500" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVerification;