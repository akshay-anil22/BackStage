import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Onboarding() {
  const navigate = useNavigate();

  // This is the core logic for improving the user experience.
  // It runs once when the component loads to check the user's login status.
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // If a token exists, it means the user is already logged in.
    // We immediately redirect them to their dashboard, providing a seamless
    // experience for returning users.
    if (token) {
      navigate('/dashboard');
    }
    // The empty dependency array [] ensures this effect runs only once on mount.
  }, [navigate]);

  return (
    // We use the same consistent theme and fonts for a cohesive design.
    <div className="bg-gray-400 min-h-screen flex flex-col items-start justify-start  pt-12">
      

      
        <Link 
          to="/login" 
          className=' absolute left-4 bottom-100 font-mourand text-black text-6xl ml-10'
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className='absolute left-4 bottom-85 font-mourand text-black text-6xl ml-10'
        >
          Register
        </Link>
        
      <p className="absolute left-12 bottom-60 text-6xl text-gray-800 animate-fade-in-up">
          Your stage, your events.
        </p>
      {/* Hero Section */}
      <main className="absolute left-12 bottom-0">
        <h1 className="text-8xl md:text-[220px] font-golden text-gray-900 dark:text-black animate-fade-in-down">
          Backstage
        </h1>

      </main>
      {/* Simple, in-component CSS for the animations to keep the file self-contained */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out 0.4s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}

export default Onboarding;