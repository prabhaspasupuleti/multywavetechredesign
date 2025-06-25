import React, { useEffect, useState } from 'react'; // Import useState for button visibility
import { Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react'; // Import ArrowUp icon

// Import your components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Products from './components/Products';
import News from './components/News';
import './app.css'; // Fixed: Changed from './App.css' to './app.css' to match actual file name

function App() {
  const location = useLocation();
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for scroll-to-top button visibility

  // Effect for scrolling to hash links and managing scroll-to-top button visibility
  useEffect(() => {
    // --- Hash Scrolling Logic ---
    // Scroll to top on route change if no hash is present in the URL
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return; // Exit early if no hash, as we've already scrolled to the top
    }

    // Handle hash scrolling for specific sections
    // Decode the hash to handle potential special characters in IDs
    const id = decodeURIComponent(location.hash.substring(1));
    const element = document.getElementById(id);

    if (element) {
      const scrollRAF = requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => cancelAnimationFrame(scrollRAF);
    } else {
      console.warn(`Element with ID "${id}" not found for scrolling.`);
    }
  }, [location]); // Re-run this effect whenever the location object changes

  // --- Scroll-to-Top Button Visibility Logic ---
  useEffect(() => {
    /**
     * Handles the scroll event to determine scroll-to-top button visibility.
     * The button becomes visible when the scroll position is beyond 300 pixels from the top.
     */
    const handleScroll = () => {
      // Check if the current scroll position is greater than 300 pixels
      if (window.pageYOffset > 300) {
        setShowScrollToTop(true); // Show the button
      } else {
        setShowScrollToTop(false); // Hide the button
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  /**
   * Scrolls the window smoothly to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll animation
    });
  };

  return (
    // Main container div for the entire application.
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col overflow-x-hidden m-0 p-0">
      {/* Header component, typically containing navigation */}
      <Header />

      {/* Main content area */}
      <main id="main-content" className="flex-grow">
        {/* React Router Routes for declarative navigation */}
        <Routes>
          {/* Default route for the homepage */}
          <Route
            path="/"
            element={
              <>
                {/* Components rendered on the homepage */}
                <Hero />
                <About />
                <Services />
                <Clients />
                <Testimonials />
                <Contact />
              </>
            }
          />
          {/* Route for the Products page */}
          <Route path="/products" element={<Products />} />
          {/* Route for the News page */}
          <Route path="/news" element={<News />} />
          {/* Catch-all route for any undefined paths (404 Not Found) */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[calc(100vh-200px)] text-2xl text-gray-600">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer component at the bottom of the page */}
      <Footer />

      {/* Scroll-to-Top Button - Rendered directly in App.js */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          // Tailwind CSS classes for styling:
          // fixed: Positions the button relative to the viewport
          // bottom-4 right-4: Places it 1rem from the bottom and right edges
          // p-3: Padding inside the button
          // bg-blue-600: Blue background color
          // text-white: White text/icon color
          // rounded-full: Makes the button circular
          // shadow-lg: Adds a large shadow for depth
          // hover:bg-blue-700: Darker blue on hover
          // focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75: Focus styles for accessibility
          // transition-all duration-300 ease-in-out: Smooth transition for all properties
          // z-50: Ensures the button stays on top of other content
          // animate-bounce: Adds a subtle vertical floating effect
          // hover:scale-110: Makes the button scale up on hover
          // hover:shadow-xl: Adds a larger shadow on hover
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out z-50 animate-bounce hover:scale-110 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} /> {/* Lucide icon for an upward arrow */}
        </button>
      )}
    </div>
  );
}

export default App;