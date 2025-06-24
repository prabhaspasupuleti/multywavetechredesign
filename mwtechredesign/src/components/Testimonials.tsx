import React, { useState } from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "SHRI GOVIND SINGH IPS ",
      title: "Ex DGP CID,TS",
      organization: "State Police Department",
      // Replaced base64 image with a placeholder due to "Unterminated string literal" error
      image: "data:image/jpeg;base64,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",
      quote: "Multywave Technologies has been instrumental in modernizing our fingerprint identification capabilities. The Papillon AFIS implementation has significantly enhanced our investigative efficiency and accuracy in criminal identification.",
      rating: 5
    },
    {
      name: "SHRI ANURAG SHARMA IPS",
      title: "Ex DGP, TS",
      organization: "State Police Department",
      // Replaced base64 image with a placeholder due to "Unterminated string literal" error
      image: "data:image/jpeg;base64,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",
      quote: "The biometric access control system implemented by Multywave has transformed our security infrastructure. The reliability and accuracy of their solutions have exceeded our expectations.",
      rating: 5
    },
    {
      name: "SHRI N SAMBASIVA RAO IPS",
      title: "Ex DGP, AP",
      organization: "State Police Department",
      // Retained external URL, but ensure it's properly formatted and accessible.
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbePk9KWFu6L-EGjlrMLiRZwg3JCR-v141A&s",
      quote: "Working with Multywave Technologies has been a game-changer for our organization. Their expertise in biometric solutions and professional support make them our go-to partner for security technology.",
      rating: 5
    },
    {
      name: "MAHENDER REDDY IPS",
      title: "Ex. DGP",
      organization: "State Police Departmentr",
      // Retained external URL, but ensure it's properly formatted and accessible.
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6IJ-Y-FcM9P7gieeUht_gPiAWCuAgK5OhRA&s",
      quote: "The technical documentation and SDK support provided by Multywave are exceptional. Their solutions integrate seamlessly with our existing infrastructure, making implementation smooth and efficient.",
      rating: 5
    },
    {
      name: "Anonymous Manager",
      title: "Operations Head",
      organization: "Government Department",
      image: "https://placehold.co/80x80/8A2BE2/FFFFFF?text=AM", // Placeholder image URL
      quote: "The iris recognition system deployed by Multywave provides the highest level of security we require. Their ongoing support and maintenance services are exemplary.",
      rating: 5
    }
  ];

  // Duplicate testimonials for a seamless continuous scroll effect
  const allTestimonials = [...testimonials, ...testimonials];

  // State to keep track of the currently hovered card's index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      {/* Inline style for the continuous scroll animation */}
      <style>
        {`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%); /* Scrolls one full set of testimonials left */
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 25s linear infinite; /* Adjust duration for speed */
        }

        /* Pause animation on hover for better readability */
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-inter">Testimonials</h2>
          <p className="text-2xl text-slate-600 font-medium mb-2 font-inter">What our clients say</p>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto font-inter">
            Trusted by government agencies, law enforcement departments, and enterprise organizations
            across India for delivering reliable, secure, and innovative biometric solutions.
          </p>
        </div>

        {/* Testimonials Scroller */}
        <div className="relative flex items-center justify-center flex-col">
          {/* Viewport for the scrolling testimonials, providing a fixed window */}
          <div className="w-full max-w-7xl h-[380px] overflow-hidden rounded-2xl shadow-lg border border-slate-100 p-4">
            {/* Container that will be animated to create the scrolling effect */}
            <div className="flex flex-row gap-8 animate-scroll-horizontal">
              {allTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`
                    w-[400px] flex-shrink-0 p-6 bg-white rounded-xl shadow-md
                    relative transition-all duration-400 ease-in-out cursor-pointer
                    ${hoveredIndex === index ? 'scale-110 z-10' : ''}
                    ${hoveredIndex !== null && hoveredIndex !== index ? 'blur-sm scale-90' : ''}
                  `}
                  style={{ minHeight: '280px' }} // Ensures consistent height for all cards
                  onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
                  onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index on mouse leave
                >
                  {/* Testimonial Card Content */}
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="h-8 w-8 text-blue-600 opacity-50" />
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed mb-6 italic font-inter">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    {/* User Image */}
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-blue-600"
                      // Fallback for broken images, displays initial if image fails
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.onerror = null; // Prevents infinite loop if fallback also fails
                        // Replace with a placeholder or default avatar.
                        // For this example, we'll revert to the initial if image fails.
                        // In a real app, you might use a generic avatar image.
                        const nameInitial = testimonial.name.charAt(0);
                        const placeholderUrl = `https://placehold.co/80x80/D3D3D3/000000?text=${nameInitial}`;
                        img.src = placeholderUrl;
                        img.className = "h-16 w-16 rounded-full flex items-center justify-center mr-4 bg-gray-300 text-white font-semibold text-xl font-inter";
                      }}
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 font-inter">{testimonial.name}</h4>
                      <p className="text-slate-600 font-inter">{testimonial.title}</p>
                      <p className="text-sm text-slate-500 font-inter">{testimonial.organization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
