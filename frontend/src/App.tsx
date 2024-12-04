import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import CodingArena from './pages/CodingArena';
import CodingPlayground from './pages/CodingPlayground';
import Home from './pages/Home';

import Footer from './components/Footer/Footer';
import { Toaster } from './components/ui/toaster';
import { SignInForm } from './pages/Auth/SignInForm';
import NotFound from './pages/Error/NotFound';
import ProblemSet from './pages/ProblemSet';
import { SignUpForm } from './pages/Auth/SignUpForm';


function App() {

  const pathname = window.location.pathname;

  return (
    <>
      <div className='min-h-screen w-full bg-s1'>
        <Router>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/signin" element={<SignInForm />} />
            <Route path="/auth/signup" element={<SignUpForm />} />
            <Route path="/codingarena/:id" element={<CodingArena />} />
            <Route path="/codingplayground" element={<CodingPlayground />} />
            <Route path="/problemset" element={<ProblemSet />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/problemset/*" element={<NotFound />} />
          </Routes>
          <Toaster />
          {pathname.includes("/codingplayground") || pathname.includes("/codingarena") ? "" : <Footer />}
        </Router>
      </div>
    </>
  )
}

export default App
