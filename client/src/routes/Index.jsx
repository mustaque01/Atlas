
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SignUp from '@/pages/SignUp'
import Login from '@/pages/Login'
import ApprovalWorkflow from '@/components/ApprovalWorkflowInterface'
import LoanApplicationForm from '@/components/LoanApplicationForm'
import RiskAssessment from '@/components/RiskAssessmentDashboard'
import DocumentVerification from '@/components/DocumentVerificationInterface'
import Chatbot from '@/components/Chatbot'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import PhoneVerification from '@/pages/PhoneVerification.'
import Dashboard from '@/pages/Dashboard'

const router = createBrowserRouter([
    {
        path: "/",
        element :<App/>,
        children :[
            {
              path:"/",
              element: <Home/>  
         },
         {
            path:"/about",
            element: <About/>  
       },
       {
         path:"/contact",
         element: <Contact/>  
    },
         {
            path:"/signup",
            element:<SignUp/>  
         },
         {
            path:"/login",
            element:<Login/>  
         },
         {
            path:"/dashboard/loan/approval",
            element:<ApprovalWorkflow/>  
         },
         {
            path:"/dashboard/loan",
            element:< LoanApplicationForm/>  
         },
         {
            path:"/risk",
            element:<RiskAssessment />  
         },
         {
            path:"/dashboard/loan/documentverification",
            element:<DocumentVerification />  
         },
         {
            path:"/chatbot",
            element:<Chatbot />  
         },
         {
            path:"/PhoneVerification",
            element:<PhoneVerification />  
         },
         {
            path:"/dashboard",
            element:<Dashboard />  
         },
        ]
    }
])

export default router