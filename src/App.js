import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Add this line
import './styles/variables.css'; // Add this line

// Import our new Header component
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServiceAreas from './pages/ServiceAreas';
import Partnerships from './pages/Partnerships'; // Import the Partnerships page
import CustomQuote from './pages/CustomQuote'; // Import the Custom Quote page

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
  
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/quote" element={<CustomQuote />} />
          </Routes>
        </main>
        
        <Footer />

      </div>
    </Router>
  );
}

export default App;