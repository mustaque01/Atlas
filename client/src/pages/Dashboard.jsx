import { IoMenu } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import DashboardContent from "./DashboardContent";
import DocumentVerification from "@/components/DocumentVerificationInterface";
import ApprovalWorkflow from "@/components/ApprovalWorkflowInterface";
import RiskAssessment from "@/components/RiskAssessmentDashboard";
const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeContent, setActiveContent] = useState('dashboardContent');

  // Moved renderContent inside the component
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
      // case 'settings':
      //   return <Settings />;
      // default:
        return <DashboardContent/>;
    }
  } 
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* <!-- Mobile menu toggle button --> */}
        <input type="checkbox" id="menu-toggle" className="hidden peer" />

        {/* <!-- Sidebar --> */}
        <div className="hidden peer-checked:flex md:flex flex-col w-64 bg-gray-800 transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
            <span className="text-white font-bold uppercase ml-5">Atlas</span>
            <label htmlFor="menu-toggle" className="text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <button
                onClick={() => setActiveContent('dashboardContent')}
                className="flex items-center px-6 gap-2 py-2 text-gray-100 hover:bg-gray-700 cursor-pointer w-full"
              >
                <IoMenu size={25} className="" />
                Dashboard
              </button>

              {/* <!-- Application with subitems --> */}
              <div className="mb-2 relative group">
                <input
                  type="checkbox"
                  id="messages-toggle"
                  className="hidden peer"
                />

                {/* <!-- SVG Icons op hetzelfde niveau als input --> */}
                <a
                  href="#"
                  onClick={() => setIsVisible(!isVisible)}
                  className="flex items-center px-6 gap-2 py-2 text-gray-100 hover:bg-gray-700 cursor-pointer w-full"
                >
                  <SiGoogleforms size={25} />
                  Application
                </a>

                {isVisible && (
                  <div className="flex flex-col bg-white text-gray-800 mt-1 transition-all duration-300">
                    <button onClick={() => setActiveContent('loanApplication')} className="block px-4 py-2 hover:bg-gray-200 text-left">
                     Loan Application
                    </button>
                    <button onClick={() => setActiveContent('documentVerification')} className="block px-4 py-2 hover:bg-gray-200 text-left">
                     Document Verification
                    </button>
                    <button onClick={() => setActiveContent('loanApproval')} className="block px-4 py-2 hover:bg-gray-200 al text-left">
                        Approval
                    </button>
                  </div>
                )}
                {/* <!-- Arrow Icon --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-auto transition-transform  peer-checked:rotate-180 absolute right-4 top-3 transform #dis--translate-y-1/2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* <!-- Favourites --> */}
              <button
                onClick={() => setActiveContent('riskassessment')}
                className="flex items-center px-6 gap-2 py-2 text-gray-100 hover:bg-gray-700 cursor-pointer w-full"
              >
                <IoMenu size={25} className="" />
                Risk Assessment
              </button>
              
              {/* <!-- Logout --> */}
              <a
                href="/"
                className="flex items-center px-6 py-2 text-gray-100 hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="group-hover:hidden h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden group-hover:block h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Logout
              </a>
            </nav>
          </div>
        </div>

        {/* <!-- Main content --> */}
        <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex-1 p-6">
        {renderContent()}
      </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;