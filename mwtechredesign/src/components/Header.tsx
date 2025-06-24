import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone mr-2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.95-3.95A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72c.1.72.35 1.43.71 2.11L8.27 9.87a2 2 0 0 0 .73 2.19 2.07 2.07 0 0 0 2.19.73l1.82-1.82c.68.36 1.39.61 2.11.71a2 2 0 0 1 1.72 2v3Z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mr-2">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerBgClass, setHeaderBgClass] = useState('bg-white/95 backdrop-blur-sm'); 
  const location = useLocation();

  const navigation = [
    { name: 'Home', to: '/', sectionId: 'home', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'About', to: '/#about', sectionId: 'about', bgClass: 'bg-purple-100/95 backdrop-blur-sm' },
    { name: 'Services', to: '/#services', sectionId: 'services', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'Products', to: '/products', sectionId: 'products', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'Clients', to: '/#clients', sectionId: 'clients', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'Testimonials', to: '/#testimonials', sectionId: 'testimonials', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'News', to: '/news', sectionId: 'news', bgClass: 'bg-blue-100/95 backdrop-blur-sm' },
    { name: 'Contact', to: '/#contact', sectionId: 'contact', bgClass: 'bg-gray-100/95 backdrop-blur-sm' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; 

      let currentBgClass = 'bg-white/95 backdrop-blur-sm';

      const currentPath = location.pathname;
      const matchingNavItem = navigation.find(item => item.to === currentPath);

      if (matchingNavItem) {
        currentBgClass = matchingNavItem.bgClass;
      } else {
        for (let i = navigation.length - 1; i >= 0; i--) {
          const item = navigation[i];
          const hash = item.to.split('#')[1];

          if (hash) {
            const el = document.getElementById(hash);
            if (el) {
              const elTop = el.offsetTop;
              const elBottom = elTop + el.offsetHeight;

              if (scrollPosition >= elTop && scrollPosition < elBottom) {
                currentBgClass = item.bgClass;
                break;
              }
            }
          } else if (item.to === '/' && scrollPosition < (document.getElementById(navigation[1]?.sectionId)?.offsetTop || Infinity)) {
            currentBgClass = item.bgClass;
            break;
          }
        }
      }
      setHeaderBgClass(currentBgClass);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, navigation]);

  const handleNavLinkClick = (to: string) => {
    setIsMenuOpen(false);

    const [path, hash] = to.split('#');
    const currentPath = location.pathname;

    if (path && path !== currentPath && path !== '/') {
      return; 
    }

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element with ID "${hash}" not found for scrolling.`);
        }
      }, 100);
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-3">
        Skip to main content
      </a>

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-y-2">
          <div className="flex items-center space-x-4">
            <a href="tel:+919876543210" className="flex items-center hover:text-blue-200 transition-colors">
              <PhoneIcon /> +91 98765 43210
            </a>
            <a href="mailto:info@multywave.co.in" className="flex items-center hover:text-blue-200 transition-colors">
              <MailIcon /> info@multywave.co.in
            </a>
          </div>
          <div className="flex items-center">
            <MapPinIcon /> Hyderabad, Telangana, India
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${headerBgClass} shadow-lg rounded-b-md`}> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2 shrink-0" onClick={() => handleNavLinkClick('/')}>
              <img 
                src="/src/logo/f5051e09-97a0-41fb-8167-6a88c1ddebc7-removebg-preview.png" 
                alt="Multywave Logo" 
                className="h-10 w-10 rounded-full" 
                onError={(e) => { 
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = "https://placehold.co/40x40/aabbcc/ffffff?text=Logo"; 
                }}
              />
              <div className="flex flex-col items-start">
                <span className="text-2xl text-black font-semibold">MULTYWAVE TECHNOLOGIES</span>
                <span className="text-red-600 text-sm italic">Security at your fingertips.</span>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  onClick={() => handleNavLinkClick(item.to)}
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-inner">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors rounded-md px-3 hover:bg-slate-50"
                  onClick={() => handleNavLinkClick(item.to)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="#contact"
                onClick={() => handleNavLinkClick('#contact')}
                className="mt-4 block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold shadow-md"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;