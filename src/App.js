import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Add this line
import './styles/variables.css'; // Add this line


// Import our new Header component
import Header from './components/Header/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use our new Header component */}
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />            <Route path="/about" element={<div className="p-5 text-center"><h1>About Us</h1></div>} />
            <Route path="/service-areas" element={<div className="p-5 text-center"><h1>Service Areas</h1></div>} />
            <Route path="/partnerships" element={<div className="p-5 text-center"><h1>Partnerships</h1></div>} />
            <Route path="/quote" element={<div className="p-5 text-center"><h1>Custom Quote</h1></div>} />
          </Routes>
        </main>
        
        <footer className="bg-dark text-white text-center p-3 mt-5">
          <p>&copy; 2024 Pro Appliance Installation</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;