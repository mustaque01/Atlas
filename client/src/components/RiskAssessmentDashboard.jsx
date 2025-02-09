import React, { useState } from 'react';
import { Upload, Activity, Wallet, TrendingUp, PiggyBank, Star, Info } from 'lucide-react';

const FinancialMetricsCalculator = () => {
  const [file, setFile] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to calculate creditworthiness score (0-100)
  const calculateCreditworthinessScore = (metrics) => {
    // This is a simplified scoring model - replace with your actual scoring logic
    const dtiScore = ((40 - metrics.dti) / 40) * 30; // DTI contributes 30%
    const savingsScore = (metrics.savingsRate / 20) * 25; // Savings rate contributes 25%
    const disposableScore = (metrics.disposableIncome / 5000) * 25; // Disposable income contributes 25%
    const creditScore = ((metrics.creditScore - 500) / 350) * 20; // Credit score contributes 20%
    
    return Math.min(Math.round(dtiScore + savingsScore + disposableScore + creditScore), 100);
  };

  const processPDFStatement = async (file) => {
    // Simulating PDF processing - replace with actual PDF processing logic
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sample calculated metrics - replace with actual calculations
        const calculatedMetrics = {
          dti: 28,
          savingsRate: 15,
          disposableIncome: 3500,
          creditScore: 735
        };
        
        // Calculate creditworthiness score
        const creditworthinessScore = calculateCreditworthinessScore(calculatedMetrics);
        
        resolve({
          ...calculatedMetrics,
          creditworthinessScore
        });
      }, 2000);
    });
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setIsProcessing(true);
      
      try {
        const calculatedMetrics = await processPDFStatement(uploadedFile);
        setMetrics(calculatedMetrics);
      } catch (error) {
        alert('Error processing the statement. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const getCreditworthinessLevel = (score) => {
    if (score >= 80) return { text: 'Excellent', color: 'text-emerald-500' };
    if (score >= 70) return { text: 'Good', color: 'text-blue-500' };
    if (score >= 60) return { text: 'Fair', color: 'text-yellow-500' };
    return { text: 'Poor', color: 'text-red-500' };
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Disclaimer Section */}
      <div className="mb-8 bg-gray-800 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-400 w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Bank Statement Requirements</h3>
            <div className="text-gray-400 space-y-2">
              <p>For accurate financial metrics calculation, your statement should include:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Monthly income details (salary, investments, other sources)</li>
                <li>All monthly debt payments (loans, credit cards, mortgages)</li>
                <li>Regular savings and investments</li>
                <li>Monthly expenses and bills</li>
                <li>Account balances and transaction history</li>
              </ul>
              <p className="mt-4 text-sm text-yellow-400">
                Note: More detailed statements lead to more accurate calculations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="mx-auto mb-4 text-gray-400" size={40} />
            <p className="text-gray-400">
              {file ? file.name : 'Upload your bank statement (PDF)'}
            </p>
          </label>
          {isProcessing && (
            <p className="text-emerald-500 mt-4">Analyzing your statement...</p>
          )}
        </div>
      </div>

      {/* Results Section */}
      {metrics && (
        <div>
          {/* Main Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">DTI Ratio</p>
                  <h3 className="text-3xl text-gray-300 font-bold mt-2">{metrics.dti}%</h3>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Activity className="text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">Savings Rate</p>
                  <h3 className="text-3xl text-gray-300 font-bold mt-2">{metrics.savingsRate}%</h3>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <PiggyBank className="text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">Disposable Income</p>
                  <h3 className="text-3xl text-gray-300 font-bold mt-2">&#8377;{metrics.disposableIncome}</h3>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Wallet className="text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">Credit Score</p>
                  <h3 className="text-3xl text-gray-300 font-bold mt-2">{metrics.creditScore}</h3>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <TrendingUp className="text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">CreditWorth</p>
                  <h3 className="text-3xl text-gray-300 font-bold mt-2">{metrics.creditworthinessScore}%</h3>
                  <p className={`text-sm mt-1 ${getCreditworthinessLevel(metrics.creditworthinessScore).color}`}>
                    {getCreditworthinessLevel(metrics.creditworthinessScore).text}
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Star className="text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Score Explanation */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-300 mb-3">Score Breakdown</h4>
            <div className="text-gray-400 space-y-2">
              <p>Your creditworthiness score is calculated based on:</p>
              <ul className="list-disc ml-4">
                <li>DTI Ratio (30%): Lower ratio indicates better debt management</li>
                <li>Savings Rate (25%): Higher savings rate shows financial responsibility</li>
                <li>Disposable Income (25%): Higher disposable income indicates better repayment capacity</li>
                <li>Credit Score (20%): Traditional credit score impact</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialMetricsCalculator;