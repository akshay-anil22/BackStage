import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Toast from '../components/Toast'; // <-- Import the reusable component
import API from "../api/service"; // MOCKED BELOW
import Navbar from "../components/Navbar"; // MOCKED BELOW

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    paid: false,
    notes: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
    }, 175000);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.date || !formData.time) {
        showToast("Please select both a date and a time.", "error");
        setIsSubmitting(false);
        return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      dateTime: new Date(`${formData.date}T${formData.time}`).toISOString(),
      location: formData.location,
      category: formData.category,
      paid: formData.paid,
      notes: formData.notes,
      budget: formData.budget ? parseFloat(formData.budget) : 0,
    };
    
    try {
      const res = await API.post("/event/create", eventData);
      showToast("✅ " + res.message, 'success');
      setTimeout(() => navigate(`/event/dashboard`), 1000);
    } catch (err) {
      showToast(`❌ ${err.message || 'An error occurred.'}`, 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="theme-dawn1 min-h-screen bg-cover bg-center">
      {toast.visible && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(prev => ({ ...prev, visible: false }))} />}
      <Navbar />
      
      <main className="z-10 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-4xl w-full">
            <form onSubmit={handleSubmit} className="theme-dawn1 rounded-2xl p-8 border border-white/20 backdrop-blur-[80px] shadow-[inset_0_0_.5px_#ffffff80,inset_-1px_-1px_.5px_#ffffff85,1.2px_1.2px_1px_#0003,-1.2px_-1.2px_.4px_#0000002e] sm:p-10">
                <div className="text-center mb-8">
                    <h2 className="text-5xl font-mourand text-gray-900">Your New Event</h2>
                    <p className="mt-2 text-lg text-gray-600">Fill in the details below to get your event up and running.</p>
                </div>

                <div className="space-y-6">
                    {/* Event Name */}
                    <div>
                        <label htmlFor="title" className="block font-mourand text-xl text-black mb-1">Event Name</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. Annual Tech Conference"/>
                    </div>
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block font-mourand text-xl text-black mb-1">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="4" className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-black" placeholder="A brief summary of your event."></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date */}
                        <div>
                            <label htmlFor="date" className="block font-mourand text-xl text-black mb-1">Date</label>
                            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black text-black focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        {/* Time */}
                        <div>
                            <label htmlFor="time" className="block font-mourand text-xl text-black mb-1">Time</label>
                            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black text-black focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                     {/* Location */}
                    <div>
                        <label htmlFor="location" className="block font-mourand text-xl text-black mb-1">Location</label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. Internal Auditorium, Main Block"/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category (Event Type) */}
                        <div>
                           <label htmlFor="category" className="block font-mourand text-xl text-black mb-1">Event Type</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black text-black focus:outline-none focus:ring-2 focus:ring-black">
                                <option value="">-- Select type --</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Conference">Conference</option>
                                <option value="Webinar">Webinar</option>
                            </select>
                        </div>
                        {/* Budget */}
                        <div>
                            <label htmlFor="budget" className="block font-mourand text-xl text-black mb-1">Budget ($)</label>
                            <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} min="0" className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. 5000" />
                        </div>
                    </div>

                    {/* Private Notes */}
                    <div>
                        <label htmlFor="notes" className="block font-mourand text-xl text-black mb-1">Private Notes (Optional)</label>
                        <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows="2" className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-black" placeholder="Internal notes for your team..."></textarea>
                    </div>

                    {/* Paid Checkbox */}
                    <div className="flex items-center">
                        <input type="checkbox" id="paid" name="paid" checked={formData.paid} onChange={handleChange} className="h-5 w-5 text-black border-black rounded focus:ring-black" />
                        <label htmlFor="paid" className="ml-3 block font-mourand text-xl text-black">This is a paid event</label>
                    </div>
                </div>

                <hr className="my-8 border-gray-400/50" />

                <div className="flex items-center justify-end gap-4">
                    <Link to="/dashboard" className="py-2 px-6 border-2 border-black font-mourand text-xl rounded-lg text-black bg-transparent hover:bg-black/10 transition-colors">Cancel</Link>
                    <button type="submit" disabled={isSubmitting} className="py-2 px-6 border-2 border-black font-mourand text-xl rounded-lg text-black bg-[#FDE047] hover:bg-[#FACC15] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isSubmitting ? "Creating..." : "Create Event"}
                    </button>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
}

export default CreateEvent;

