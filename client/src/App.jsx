import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light"
};

function App() {
  return (
    <div className="min-h-screen text-white bg-black">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer {...toastOptions} />
    </div>
  );
}

export default App;