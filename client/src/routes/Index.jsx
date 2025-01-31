
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import ApprovalWorkflow from '@/components/ApprovalWorkflowInterface'
import LoanApplicationForm from '@/components/LoanApplicationForm'
import RiskAssessment from '@/components/RiskAssessmentDashboard'
import DocumentVerification from '@/components/DocumentVerificationInterface'
import Chatbot from '@/components/Chatbot'
import About from '@/pages/About'
import Contact from '@/pages/Contact'


const router = createBrowserRouter([
    {
        path: "/",
        element :<App/>,
        children :[
            {
              path:"/home",
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
            element:<Signup />  
         },
         {
            path:"/approval",
            element:<ApprovalWorkflow/>  
         },
         {
            path:"/loan",
            element:< LoanApplicationForm/>  
         },
         {
            path:"/risk",
            element:<RiskAssessment />  
         },
         {
            path:"/documentverification",
            element:<DocumentVerification />  
         },
         {
            path:"/chatbot",
            element:<Chatbot />  
         },

        ]
    }
])

export default router