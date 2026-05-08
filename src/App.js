import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import AddProduct from './Components/Post';
import Browse from './Components/Browse';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Hero from './Components/Home';
import About from './Components/About';
import Profile from './Components/Profile';
import LoggedInBanner from './Components/LoggedInBanner';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App">
  <header className="findora-header shadow-sm">
    <div className="container text-center py-3">
      <h1 className="findora-title fw-bold mb-0">FINDORA</h1>
      <small className="findora-tagline">
        Lost Something ? Found Something ?<br />
        Let's get it back.
      </small>
    </div>
  </header>

  {/* Header-only styles */}
  <style>{`
    .findora-header {
      background: #ffffff;
      border-bottom: 3px solid #198754;
    }

    .findora-title {
      color: #198754;
      letter-spacing: 2px;
      font-size: 2.5rem;
      margin: 0;
    }

    .findora-tagline {
      display: block;
      color: #6c757d;
      font-size: 0.9rem;
      margin-top: 4px;
    }
  `}</style>
</div>
        {/* configure the navbar */}
          <NavBar/>
        {/* logged-in banner (appears below header when a user is present) */}
          <LoggedInBanner />
        {/* configure the routes to the routes */}
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post" element={<AddProduct />} />
          <Route path="/" element={<Hero/>} />
          <Route path="/browse" element={<Browse/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;                                     