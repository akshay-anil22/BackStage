import React, { useEffect, useState ,useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
 import API from "../api/service"; // MOCKED BELOW
 import Navbar from "../components/Navbar"; // MOCKED BELOW
 import Toast from '../components/Toast';
 import { Calendar, MapPin, Ticket,Clock, CheckCircle2, XCircle, Users } from "lucide-react";

// --- SVG Icon Components ---
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconTicket = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>;
const IconDollarSign = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const IconClipboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;

const Avatar = ({ type, size = "h-12 w-12" }) => {
  const avatarStyles = [
      <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg"><mask id="avatar-1" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#avatar-1)"><rect width="36" height="36" fill="#241f31"></rect><rect x="0" y="0" width="36" height="36" transform="translate(2 6) rotate(222 18 18) scale(1)" fill="#f8e45c" rx="36"></rect><g transform="translate(-6 1) rotate(-2 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="12" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="22" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>,
      <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg"><mask id="avatar-2" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#avatar-2)"><rect width="36" height="36" fill="#c64600"></rect><rect x="0" y="0" width="36" height="36" transform="translate(4 4) rotate(100 18 18) scale(1.1)" fill="#241f31" rx="36"></rect><g transform="translate(-4 4) rotate(0 18 18)"><path d="M13,20 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path><rect x="14" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="20" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>,
      <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg"><mask id="avatar-3" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#avatar-3)"><rect width="36" height="36" fill="#c64600"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-1 5) rotate(25 18 18) scale(1.1)" fill="#241f31" rx="36"></rect><g transform="translate(-1 5) rotate(5 18 18)"><path d="M13,20 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path><rect x="14" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="20" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>,
      <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg"><mask id="avatar-4" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#avatar-4)"><rect width="36" height="36" fill="#000000"></rect><rect x="0" y="0" width="36" height="36" transform="translate(6 -2) rotate(296 18 18) scale(1.2)" fill="#e5a50a" rx="6"></rect><g transform="translate(0 -4) rotate(6 18 18)"><path d="M15 21c2 1 4 1 6 0" stroke="#000000" fill="none" strokeLinecap="round"></path><rect x="13" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="21" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>,
      <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg"><mask id="avatar-5" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#avatar-5)"><rect width="36" height="36" fill="#000000"></rect><rect x="0" y="0" width="36" height="36" transform="translate(5 5) rotate(111 18 18) scale(1)" fill="#e5a50a" rx="6"></rect><g transform="translate(7 3) rotate(-1 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="13" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="21" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
  ];
  return <div className={`${size} rounded-full overflow-hidden border-2 border-white bg-gray-200`}>{avatarStyles[type]}</div>;
};
// --- Reusable Profile Card Component ---
const ProfileCard = ({ avatar, name }) => (
    <div className="flex flex-col items-center text-center p-3 rounded-lg  border-1 border-gray-400/50">
        <div className="mb-2">
            {avatar}
        </div>
        <p className="font-mourand text-lg text-black truncate w-full">{name}</p>
    </div>
);


function EventDetails() {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
    }, 45000); // Hide after 5 seconds
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userRes, eventRes] = await Promise.all([
            API.get("/api/dashboard"),
            API.get(`/event/${eventId}`)
        ]);
        setCurrentUser(userRes.user);
        setEvent(eventRes);
        const joined = eventRes.students.some((s) => s._id === userRes.user._id);
        setAlreadyJoined(joined);
      } catch (err) {
        if (err.message.includes("token")) {
            alert("Your session has expired. Please log in again.");
            navigate("/login");
        } else {
            setMessage(`❌ ${err.message || 'Could not load event details.'}`);
            setEvent(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [eventId, navigate , showToast]);

  const handleJoin = async () => {
    try {
      const res = await API.get(`/event/join/${eventId}`);
      showToast(res.message, 'success');
      setAlreadyJoined(true);
      setEvent(prev => ({ ...prev, students: [...prev.students, currentUser] }));
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete this event?")) return;
    try {
      await API.delete(`/event/${eventId}`);
      alert("✅ Event deleted successfully.");
      navigate("/dashboard");
    } catch (err) {
       showToast(err.message, 'error');
    }
  };
  
  const isOrganizer = currentUser?.role === "organizer" && event?.organizer._id === currentUser?._id;

  if (isLoading) {
    return <div className="theme-dawn1 min-h-screen flex items-center justify-center text-black font-mourand text-3xl">Loading Event...</div>;
  }

  return (
    <div className="theme-dawn1 min-h-screen bg-cover bg-center">
       {toast.visible && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(prev => ({ ...prev, visible: false }))} />}
      <Navbar />
      
      <main className="z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl ml-40 mr-36">
          
        
          <div className="theme-dawn1 rounded-2xl p-8 border border-white/20 backdrop-blur-[80px] shadow-[inset_0_0_.5px_#ffffff80,inset_-1px_-1px_.5px_#ffffff85,1.2px_1.2px_1px_#0003,-1.2px_-1.2px_.4px_#0000002e] sm:p-10">
            {event ? (
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-8">
                <div className="lg:col-span-5">
                  <h2 className="text-6xl font-mourand text-gray-900">{event.title}</h2>
                  <p className="mt-4 text-lg text-gray-700 font-visueit-light leading-relaxed">{event.description}</p>
                  
                  <hr className="my-8 border-gray-400/50" />

                  


                  <div className="mb-8">
                      <h3 className="font-mourand text-2xl text-black mb-4">Organized By</h3>
                      <div className="max-w-[120px]">
                          <ProfileCard 
                              avatar={<Avatar type={0} size="h-16 w-16" />} 
                              name={event.organizer.username} 
                          />
                      </div>
                  </div>

                  <div>
                      <h3 className="font-mourand text-2xl text-black mb-4">Attendees ({event.students.length})</h3>
                       {event.students.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {event.students.slice(0, 4).map((student, index) => (
                                    <ProfileCard 
                                        key={student._id}
                                        avatar={<Avatar type={index % 5} size="h-16 w-16" />} 
                                        name={student.username} 
                                    />
                                ))}
                                {event.students.length > 4 && (
                                    <div className="flex flex-col items-center justify-center text-center p-3 rounded-lg bg-black/5 border border-black/10">
                                         <p className="font-mourand text-2xl text-black">+ {event.students.length - 4}</p>
                                         <p className="text-sm text-gray-600">more</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-lg font-sans text-gray-600">
                                No one has registered yet.
                            </div>
                        )}
                  </div>

                </div>

                <div className="lg:col-span-3">
                  <div className="border-2 border-black rounded-lg p-6 h-full flex flex-col justify-between">
                  <div className="text-center">
                      <p className="text-7xl font-mourand text-black">{event.students.length}</p>
                      <p className="font-mourand text-xl text-gray-600 -mt-2">Registered</p>
                      
                      <div className={`mt-4 mb-6 inline-flex items-center gap-2 border rounded-lg py-1 px-3 text-center ${event.paid ? 'border-red-500/50' : 'border-black/50'}`}>
                        <Ticket size={18} />
                        <span className="font-mourand text-md">{event.paid ? 'PAID EVENT' : 'FREE EVENT'}</span>
                      </div>
                    </div>
                        
                    <hr className=" border-gray-400/50" />
                    <div className="space-y-6 text-black font-visueit mt-6">
                              {/* Date */}
                              <div className="flex items-center gap-4">
                              <Calendar size={24} className="flex-shrink-0" />
                              <span className="text-lg font-visueit">
                                {new Date(event.dateTime).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                              </span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-4">
                              <Clock size={24} className="flex-shrink-0" />
                              <span className="text-lg font-visueit">
                                {new Date(event.dateTime).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                              </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">
                              <MapPin size={24} className="flex-shrink-0" />
                              <span className="text-lg font-visueit">{event.location}</span>
                            </div>

                            {/* Category */}
                            <div className="flex items-center gap-4">
                              <Ticket size={24} className="flex-shrink-0" />
                              <span className="text-lg font-visueit">{event.category}</span>
                            </div>


                          </div>


                          <div className="mt-6">
                        {alreadyJoined ? (
                           <button disabled className="w-full py-3 border-2 border-black font-mourand text-xl rounded-lg bg-gray-400 text-white cursor-not-allowed">REGISTERED</button>
                        ) : (
                          <button onClick={handleJoin} className="w-full py-3 border-2 border-black font-mourand text-xl rounded-lg bg-[#FDE047] hover:bg-[#FACC15] transition-colors">REGISTER NOW</button>
                        )}
                    </div>
                  </div>
                </div>

                {isOrganizer && (
                    <div className="lg:col-span-3 mt-8 border-t-2 border-gray-400/50 pt-8">
                        <h3 className="text-3xl font-mourand text-gray-800 mb-6">Organizer-Only Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-4 text-black">
                                <IconDollarSign />
                                <div>
                                    <p className="font-mourand text-xl">BUDGET</p>
                                    <span className="text-lg font-sans">${event.budget?.toLocaleString() || 'Not set'}</span>
                                </div>
                            </div>
                             <div className="flex items-start gap-4 text-black">
                                <IconClipboard />
                                <div>
                                    <p className="font-mourand text-xl">PRIVATE NOTES</p>
                                    <p className="text-lg font-sans italic text-gray-600">{event.notes || 'No private notes for this event.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
              </div>
            ) : (
                 <div className="text-center text-black font-mourand text-2xl">{message || "Event not found."}</div>
            )}

            <div className="mt-8 text-center">
                {message && event && (
                  <div className={`text-lg p-3 rounded-lg ${message.startsWith('❌') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{message}</div>
                )}
                {isOrganizer && (
                    <button onClick={handleDelete} className="mt-4 text-red-600 hover:underline">Delete This Event</button>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventDetails;

