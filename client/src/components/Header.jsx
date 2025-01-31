
import atlas2 from '../assets/atlas2.png'
const Header = () => {
  return (
    <>
    <div className='flex justify-between items-center p-4 bg-gray-200'>
      <div className=''>
       {/* <span className='text-4xl'> Atlas</span> */}
       <img src={atlas2} alt="" className='w-[120px] h-[70px]' />
      </div>
      <div>
        <ul className='flex space-x-4'>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/risk">RiskAssessment</a></li>
          <li><a href="/approval">approval</a></li>
          <li><a href="/loan">loan</a></li>
          <li><a href="/chatbot">chatbot</a></li>
          <li><a href="/documentverification">documentverification</a></li>
        </ul>
      </div>
      <div className=''>

<div className="relative inline-flex  group">
    </div>
    <a href="/signup"
         className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
        SignUp
      
    </a>
</div>
</div>
     
    </>
  )
}

export default Header