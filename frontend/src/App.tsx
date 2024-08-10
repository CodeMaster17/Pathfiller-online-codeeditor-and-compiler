import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodingArena from './pages/CodingArena';
import CodingPlayground from './pages/CodingPlayground';
import CodingBattleGround from './pages/CodingBattleGround';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProblemSet from './pages/ProblemSet';


function App() {
  return (
    <>
    <div className='min-h-screen w-full border-4'>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codingarena" element={<CodingArena />} />
        <Route path="/codingplayground" element={<CodingPlayground />} />
        <Route path="/codingbattleground" element={<CodingBattleGround />} />
        <Route path="/problemset" element={<ProblemSet />} />
      </Routes>
      <Footer />
      </Router>
    </div>
    </>
  )
}

export default App
