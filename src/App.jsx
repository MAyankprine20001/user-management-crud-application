import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Details from './pages/Details';
import Home from './pages/Home';
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
