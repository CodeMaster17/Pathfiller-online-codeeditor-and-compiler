import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Problem from './pages/Problem';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';


function App() {
  return (
    <>
    <div className='min-h-screen w-full border-4'>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem" element={<Problem />} />
      </Routes>
      <Footer />
      </Router>
    </div>
    </>
  )
}

export default App
