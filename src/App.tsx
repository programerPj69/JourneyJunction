import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation, Menu, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Accommodations from './pages/Accommodations';
import ExpenseTracker from './pages/ExpenseTracker';
import Food from './pages/Food';
import TripPlanner from './pages/TripPlanner';
import Auth from './pages/Auth';
import Contact from './pages/Contact';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        <nav className="bg-gray-900 text-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Navigation className="h-8 w-8" />
                <span className="text-xl font-bold">JourneyJunction</span>
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-white hover:text-yellow-400 focus:outline-none"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex space-x-6">
                <Link to="/destinations" className="hover:text-yellow-400">Destinations</Link>
                <Link to="/accommodations" className="hover:text-yellow-400">Accommodations</Link>
                <Link to="/expense-tracker" className="hover:text-yellow-400">Expense Tracker</Link>
                <Link to="/food" className="hover:text-yellow-400">Food</Link>
                <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
                <Link to="/auth" className="hover:text-yellow-400">Login</Link>
              </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
              <div className="px-2 pt-2 pb-4 space-y-2 bg-gray-900">
                <Link
                  to="/destinations"
                  className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Destinations
                </Link>
                <Link
                  to="/accommodations"
                  className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Accommodations
                </Link>
                <Link
                  to="/expense-tracker"
                  className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Expense Tracker
                </Link>
                <Link
                  to="/food"
                  className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Food
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md hover:bg-gray-800"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/food" element={<Food />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Navigation className="h-6 w-6" />
                <span className="text-xl font-bold">JourneyJunction</span>
              </div>
              <p className="text-gray-400">Your complete guide to exploring Uttarakhand</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/destinations" className="hover:text-yellow-400">Destinations</Link></li>
                <li><Link to="/accommodations" className="hover:text-yellow-400">Accommodations</Link></li>
                <li><Link to="/expense-tracker" className="hover:text-yellow-400">Expense Tracker</Link></li>
                <li><Link to="/food" className="hover:text-yellow-400">Food Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Destinations</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/destinations" className="hover:text-yellow-400">Kedarnath</Link></li>
                <li><Link to="/destinations" className="hover:text-yellow-400">Rishikesh</Link></li>
                <li><Link to="/destinations" className="hover:text-yellow-400">Nainital</Link></li>
                <li><Link to="/destinations" className="hover:text-yellow-400">Mussoorie</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: pjsofonic2024@gmail.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Dehradun, Uttarakhand</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;