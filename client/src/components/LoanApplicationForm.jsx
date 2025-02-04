import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Upload, FileText } from 'lucide-react';

const LoanApplicationForm = () => {
  const [step, setStep] = useState(1);
  // const [formData, setFormData] = useState({
  //   personalInfo: {},
  //   employmentInfo: {},
  //   loanDetails: {},
  //   documents: []
  // });

  const steps = [
    { id: 1, title: 'Personal Information' },
    { id: 2, title: 'Employment & Income' },
    { id: 3, title: 'Loan Details' },
    { id: 4, title: 'Document Upload' },
    { id: 5, title: 'Review & Submit' }
  ];
  const employmentTypes = [
    'Agriculture/Farming',
    'Private Sector',
    'Public Sector',
    'Defence',
    'Business Owner',
    'Self Employed Professional',
    'Government Service',
    'Retired',
    'Homemaker',
    'Student'
  ];

  // Updated income categories in INR
  const incomeCategories = [
    'Below ₹2.5 Lakhs',
    '₹2.5 Lakhs - ₹5 Lakhs',
    '₹5 Lakhs - ₹7.5 Lakhs',
    '₹7.5 Lakhs - ₹10 Lakhs',
    '₹10 Lakhs - ₹15 Lakhs',
    '₹15 Lakhs - ₹25 Lakhs',
    'Above ₹25 Lakhs'
  ];

  const loanTypes = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Education Loan',
    'Business Loan',
    'Agriculture Loan',
    'Gold Loan'
  ];

  const loanReasons = [
    'Debt Consolidation',
    'Home Purchase/Construction',
    'Business Expansion',
    'Education',
    'Marriage',
    'Medical Emergency',
    'Agriculture',
    'Vehicle Purchase',
    'Home Renovation',
    'Travel'
  ];

  return (
    <div className=" bg-gray-800 text-white p-6 rounded-2xl">
      {/* Progress Tracker */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${step > s.id ? 'bg-emerald-500' : step === s.id ? 'bg-emerald-500' : 'bg-gray-700'}
              `}>
                {step > s.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  s.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-24 h-1 mx-2
                  ${step > s.id ? 'bg-emerald-500' : 'bg-gray-700'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map(s => (
            <span key={s.id} className="text-sm text-gray-400 w-20 text-center">
              {s.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="bg-gray-800 border-0">
        <CardHeader>
          <CardTitle>{steps.find(s => s.id === step)?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-gray-700 rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full p-3 bg-gray-700 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input 
                  type="tel"
                  className="w-full p-3 bg-gray-700 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-gray-700 rounded-lg"
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" >Gender</label>
                <select className="w-full p-3 bg-gray-700 text-gray-400 rounded-lg">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <input 
                  type="date"
                  className="w-full p-3 bg-gray-700 rounded-lg text-gray-400"
                />
              </div>
            </div>
          )}

{step === 2 && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Employment Type</label>
                <select className="w-full p-3 bg-gray-700 rounded-lg text-gray-400">
                  <option value="">Select employment type</option>
                  {employmentTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Annual Income</label>
                <select className="w-full p-3 bg-gray-700 rounded-lg text-gray-400">
                  <option value="">Select income category</option>
                  {incomeCategories.map(category => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Loan Type</label>
                <select className="w-full p-3 bg-gray-700 rounded-lg text-gray-400">
                  <option value="">Select loan type</option>
                  {loanTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Loan Amount</label>
                <input 
                  type="number"
                  className="w-full p-3 bg-gray-700 rounded-lg"
                  placeholder="Enter loan amount in ₹"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2 ">Reason for Loan</label>
                <select className="w-full p-3 bg-gray-700 rounded-lg text-gray-400">
                  <option value="">Select reason for loan</option>
                  {loanReasons.map(reason => (
                    <option key={reason} value={reason.toLowerCase()}>{reason}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload className="mx-auto mb-4 text-gray-400" size={40} />
                <p className="text-gray-400">Drag and drop your documents here, or click to browse</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="text-emerald-500" />
                    <span>ID Proof.pdf</span>
                  </div>
                  <CheckCircle className="text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="text-emerald-500" />
                    <span>Income Proof.pdf</span>
                  </div>
                  <CheckCircle className="text-emerald-500" />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button 
                className="px-6 py-2 bg-gray-700 rounded-lg"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            <button 
              className="px-6 py-2 bg-emerald-500 rounded-lg ml-auto"
              onClick={() => step < 5 ? setStep(step + 1) : null}
            >
              {step === 5 ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanApplicationForm;