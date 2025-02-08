import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Search,
  RefreshCw,
  Shield,
  Upload,
  X
} from 'lucide-react';

const DocumentVerification = () => {
  // Document states
  const [documents, setDocuments] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);

  // Required document types
  const requiredDocuments = [
    {
      type: 'Identity',
      acceptedFormats: ['Aadhaar Card', 'PAN Card', 'Passport', 'Driving License'],
      description: 'Government issued photo ID proof'
    },
    {
      type: 'Income',
      acceptedFormats: ['Salary Slip', 'Form 16', 'Bank Statement', 'ITR'],
      description: 'Proof of income for the last 3 months'
    }
  ];

  // Function to handle file upload
  const handleFileUpload = (type) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsVerifying(true);
      // Simulate verification process
      setTimeout(() => {
        const newDocument = {
          id: Date.now(),
          name: file.name,
          type: type,
          status: 'processing',
          aiScore: Math.floor(Math.random() * (98 - 75) + 75),
          lastChecked: new Date().toISOString().split('T')[0],
          fileSize: Math.round(file.size / 1024) + ' KB',
          format: file.type.split('/')[1].toUpperCase()
        };

        setDocuments(prev => [...prev.filter(doc => doc.type !== type), newDocument]);
        simulateVerification(newDocument.id);
        setIsVerifying(false);
      }, 1500);
    }
  };

  // Simulate document verification process
  const simulateVerification = (docId) => {
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => {
        if (doc.id === docId) {
          const score = doc.aiScore;
          return {
            ...doc,
            status: score > 90 ? 'verified' : score > 75 ? 'attention' : 'rejected',
            verificationDetails: {
              authenticityScore: score,
              dataQuality: Math.floor(Math.random() * (100 - 80) + 80),
              completeness: Math.floor(Math.random() * (100 - 85) + 85)
            }
          };
        }
        return doc;
      }));
    }, 3000);
  };

  // Function to handle document removal
  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  // Get status icon with color
  const getStatusIcon = (status) => {
    switch(status) {
      case 'verified':
        return <CheckCircle className="h-6 w-6 text-emerald-500" />;
      case 'processing':
        return <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />;
      case 'attention':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'rejected':
        return <X className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  // Get status text and color
  const getStatusText = (status) => {
    switch(status) {
      case 'verified':
        return <span className="text-emerald-500">Verified</span>;
      case 'processing':
        return <span className="text-blue-500">Processing</span>;
      case 'attention':
        return <span className="text-yellow-500">Needs Review</span>;
      case 'rejected':
        return <span className="text-red-500">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 ">
      <Card className="bg-gray-800 text-white rounded-3xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Document Verification</CardTitle>
          <p className="text-gray-400">Upload and verify your documents</p>
        </CardHeader>
        
        <CardContent>
          {/* Document Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-700 rounded-3xl">
            {requiredDocuments.map((docType) => (
              <div key={docType.type} className="rounded-lg p-4 ">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{docType.type} Document</h3>
                    <p className="text-sm text-gray-400">{docType.description}</p>
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileUpload(docType.type)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <button className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
                      Upload
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Accepted formats: {docType.acceptedFormats.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {documents.map(doc => (
              <div key={doc.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-emerald-500" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-400">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(doc.status)}
                    <button 
                      onClick={() => removeDocument(doc.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p>{getStatusText(doc.status)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400">AI Confidence</p>
                    <p className="text-emerald-500">{doc.aiScore}%</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Last Checked</p>
                    <p>{new Date(doc.lastChecked).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Security</p>
                    <div className="flex items-center space-x-1 text-emerald-500">
                      <Shield className="h-4 w-4" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>

                {doc.verificationDetails && (
                  <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Authenticity Score</p>
                      <p className="text-emerald-500">{doc.verificationDetails.authenticityScore}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Data Quality</p>
                      <p className="text-emerald-500">{doc.verificationDetails.dataQuality}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Completeness</p>
                      <p className="text-emerald-500">{doc.verificationDetails.completeness}%</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {documents.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded yet</p>
                <p className="text-sm">Upload your documents to begin verification</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVerification;