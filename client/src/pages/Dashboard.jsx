import { IoMenu } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import DashboardContent from "./DashboardContent";
import DocumentVerification from "@/components/DocumentVerificationInterface";
import ApprovalWorkflow from "@/components/ApprovalWorkflowInterface";
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
              <a
                href="#"
                className="flex items-center px-6 py-2 mt-2 text-gray-100 hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 mr-2 group-hover:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
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
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                Favourites
              </a>

              {/* <!-- Settings with subitems --> */}
              <div className="mb-2 relative group">
                <input
                  type="checkbox"
                  id="settings-toggle"
                  className="hidden peer"
                />

                <label
                  htmlFor="settings-toggle"
                  className="flex items-center px-14 py-2 mt-2 text-gray-100 hover:bg-gray-700 cursor-pointer w-full"
                >
                  Settings
                </label>

                {/* <!-- SVG Icons op hetzelfde niveau als input --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute top-2 left-6 text-white group-hover:hidden h-6 w-6 mr-2 peer-checked:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute top-2 left-6 text-white hidden group-hover:block peer-checked:block h-6 w-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>

                {/* <!-- Arrow Icon --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-auto transition-transform transform peer-checked:rotate-180 absolute right-4 top-3 text-white"
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

                {/* <!-- Subitems --> */}
                <div className="hidden peer-checked:flex flex-col bg-white text-gray-800 mt-1 transition-all duration-300">
                  <a href="#" className="block px-6 py-2 hover:bg-gray-200">
                    Subitem 1
                  </a>
                  <a href="#" className="block px-6 py-2 hover:bg-gray-200">
                    Subitem 2
                  </a>
                </div>
              </div>
              {/* <!-- Logout --> */}
              <a
                href="#"
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
