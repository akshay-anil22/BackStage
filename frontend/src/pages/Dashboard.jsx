import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Crown, Calendar, MapPin, Frown, Compass, ListChecks, UserCheck } from 'lucide-react';

 import API from '../api/service'; 
 import Navbar from '../components/Navbar';


const SECTIONS = {
  ALL: { id: 'all-events', title: 'All Events', icon: Compass },
  ORGANIZED: { id: 'my-events', title: 'My Events', icon: ListChecks },
  REGISTERED: { id: 'registered-events', title: 'Registered', icon: UserCheck },
};


// Custom hook for Intersection Observer logic
const useIntersectionObserver = (setActiveSection) => {
    const observer = useRef(null);
    const sectionRefs = useRef({});

    useEffect(() => {
        // Create an observer that triggers when a section is 50% in view
        observer.current = new IntersectionObserver((entries) => {
            const intersectingEntry = entries.find(entry => entry.isIntersecting);
            if (intersectingEntry) {
                setActiveSection(intersectingEntry.target.id);
            }
        }, { rootMargin: '-30% 0px -70% 0px' }); // Activates when section is in the middle 30% of the screen

        const currentObserver = observer.current;
        const currentRefs = sectionRefs.current;

        // Observe all registered section refs
        Object.values(currentRefs).forEach(ref => {
            if (ref) currentObserver.observe(ref);
        });

        // Cleanup function to disconnect the observer
        return () => {
            Object.values(currentRefs).forEach(ref => {
                if (ref) currentObserver.unobserve(ref);
            });
        };
    }, [setActiveSection]);

    return (el, id) => {
        if (el) {
            sectionRefs.current[id] = el;
        }
    };
};
const EventCard = ({ event }) => (
  <div className="theme-dawn2 border border-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1.5 hover:shadow-xl">
      <div>
          <p className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-1">{event.category}</p>
          {/* The 'truncate' class was replaced with 'line-clamp-2' to allow the title 
            to span two lines before showing an ellipsis. A min-height is added
            using an arbitrary value to keep card layouts consistent.
          */}
          <h3 
            className="font-mourand text-3xl text-black mb-3 line-clamp-2 min-h-[4.5rem]" 
            title={event.title}
          >
            {event.title}
          </h3>
          <div className="space-y-2 text-sm text-gray-800">
              <div className="flex items-center font-visueit gap-2">
                  <Calendar size={16} />
                  <span>{new Date(event.dateTime).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center font-visueit gap-2">
                  <MapPin size={16} />
                  <span className="truncate" title={event.location}>{event.location}</span>
              </div>
          </div>
      </div>
      <Link 
          to={`/event/${event.event_id || event._id}`} 
          className="mt-5 block w-full text-center py-1 border-2 border-black font-mourand text-2xl rounded-lg text-black bg-transparent hover:bg-black hover:text-white transition-all duration-300"
      >
          View Details
      </Link>
  </div>
);
const EmptyState = ({ sectionTitle }) => (
    <div className="text-center py-16 px-6 rounded-2xl bg-white/5 border border-white/20 col-span-full">
        <Frown className="mx-auto h-12 w-12 text-gray-500" />
        <h3 className="mt-4 font-mourand text-2xl text-black">No Events Found</h3>
        <p className="mt-1 text-gray-600">You have no {sectionTitle.toLowerCase()} events yet.</p>
    </div>
);

const LoadingSkeleton = () => (
    Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white/10 border border-white/20 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-2/3"></div>
            <div className="mt-6 h-12 bg-gray-300 rounded-lg"></div>
        </div>
    ))
);


// ## 2. New Vertical Navigation Component
const VerticalNav = ({ activeSection }) => {
    return (
        <nav className="w-full">
            <ul className="space-y-2">
                {Object.values(SECTIONS).map(section => {
                    const isActive = activeSection === section.id;
                    
                    return (
                        <li key={section.id}>
                            <a 
                                href={`#${section.id}`}
                                className={`flex items-center gap-3 p-3 rounded-lg font-mourand text-xl transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-black text-white shadow-lg' 
                                    : 'text-gray-700 hover:bg-black/10'
                                }`}
                            >
                                
                                {section.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};


// ## 3. Main Dashboard Component (Refactored for new layout)
function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState({ all: [], organized: [], registered: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(SECTIONS.ALL.id);
    
    // Setup intersection observer
    const sectionRefCallback = useIntersectionObserver(setActiveSection);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [userData, allEventsData, organizedData, registeredData] = await Promise.all([
                    API.get("/api/dashboard"),
                    API.get("/event"),
                    API.get("/event/organized"),
                    API.get("/event/joined")
                ]);
                
                setUser(userData.user);
                setEvents({
                    all: allEventsData,
                    organized: organizedData,
                    registered: registeredData
                });
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                if (err.response?.status === 401 || err.message.includes("token")) {
                    navigate("/login");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [navigate]);
    
    return (
        <div className="theme-dawn min-h-screen bg-cover bg-center font-sans">
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-4xl font-mourand text-gray-900 sm:truncate">
                            Welcome back, {user?.username || '...'}
                        </h2>
                        <p className="mt-1 text-lg text-gray-600">Here's what's happening in your world.</p>
                    </div>
                    {user?.role !== 'organizer' && (
                        <button className="flex-shrink-0 inline-flex items-center gap-2 py-2 px-4 border-2 border-black font-mourand text-lg rounded-lg text-black bg-transparent hover:bg-black hover:text-white transition-all duration-300">
                            <Crown size={20} />
                            Become an Organizer
                        </button>
                    )}
                </header>

                {/* Main Content Grid (Sidebar + Event Sections) */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:block self-start sticky top-24">
                       <VerticalNav activeSection={activeSection} />
                    </aside>

                    {/* Right Content */}
                    <main className="space-y-16">
                        {/* All Events Section */}
                        <section id={SECTIONS.ALL.id} ref={(el) => sectionRefCallback(el, SECTIONS.ALL.id)}>
                            <h3 className="text-3xl font-mourand text-black pb-2 mb-6 border-b-2 border-black/20">{SECTIONS.ALL.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {isLoading ? <LoadingSkeleton /> : events.all.length > 0 ? events.all.map(event => (
                                    <EventCard key={event._id} event={event} />
                                )) : <EmptyState sectionTitle="all" />}
                            </div>
                        </section>

                        {/* Organized Events Section */}
                        <section id={SECTIONS.ORGANIZED.id} ref={(el) => sectionRefCallback(el, SECTIONS.ORGANIZED.id)}>
                             <h3 className="text-3xl font-mourand text-black pb-2 mb-6 border-b-2 border-black/20">{SECTIONS.ORGANIZED.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {isLoading ? <LoadingSkeleton /> : events.organized.length > 0 ? events.organized.map(event => (
                                    <EventCard key={event._id} event={event} />
                                )) : <EmptyState sectionTitle="organized" />}
                            </div>
                        </section>

                         {/* Registered Events Section */}
                        <section id={SECTIONS.REGISTERED.id} ref={(el) => sectionRefCallback(el, SECTIONS.REGISTERED.id)}>
                             <h3 className="text-3xl font-mourand text-black pb-2 mb-6 border-b-2 border-black/20">{SECTIONS.REGISTERED.title}</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {isLoading ? <LoadingSkeleton /> : events.registered.length > 0 ? events.registered.map(event => (
                                    <EventCard key={event._id} event={event} />
                                )) : <EmptyState sectionTitle="registered" />}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
