import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DoctorList from './pages/DoctorList';
import SymptomChecker from './pages/SymptomChecker';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VideoCall from './pages/VideoCall';
import Login from './pages/Login';
import { UserRole, Doctor, Appointment, Patient } from './types';
import { Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { db } from './services/db';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [isLoading, setIsLoading] = useState(true);
  
  // Global State (Synced with "DB")
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeCall, setActiveCall] = useState(false);

  // --- Initialization (Simulating DB Connection) ---
  useEffect(() => {
    const loadData = () => {
      db.init(); // Ensure DB is seeded
      setDoctors(db.getDoctors());
      setAppointments(db.getAppointments());
      setPatients(db.getPatients());
      setIsLoading(false);
    };
    loadData();
  }, []);

  // --- Persistence Wrappers ---
  // Whenever state changes, we sync to our "DB"
  useEffect(() => { if (!isLoading) db.saveDoctors(doctors); }, [doctors, isLoading]);
  useEffect(() => { if (!isLoading) db.saveAppointments(appointments); }, [appointments, isLoading]);
  useEffect(() => { if (!isLoading) db.savePatients(patients); }, [patients, isLoading]);


  // Simple Router
  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.DOCTOR || role === UserRole.ADMIN) {
        navigate('login');
    } else {
        setUserRole(role);
        navigate('home');
    }
  };
  
  const handleAuthSuccess = (role: UserRole) => {
      setUserRole(role);
      if (role === UserRole.DOCTOR) navigate('doctor-dashboard');
      else if (role === UserRole.ADMIN) navigate('admin-dashboard');
      else navigate('home');
  };

  const handleLogout = () => {
    setUserRole(UserRole.GUEST);
    navigate('home');
  };

  const handleBookDoctor = (doctor: Doctor) => {
    if (userRole === UserRole.GUEST) {
      alert("Please login as a patient to book an appointment.");
      return;
    }
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    setShowBookingModal(false);
    const newAppt: Appointment = {
        id: `appt-${Date.now()}`,
        doctorId: selectedDoctor!.id,
        doctorName: selectedDoctor!.name,
        doctorSpecialization: selectedDoctor!.specialization,
        patientId: 'current-user',
        patientName: 'Current User', 
        date: new Date().toISOString().split('T')[0],
        time: '02:00 PM', 
        status: 'UPCOMING',
        type: 'VIDEO'
    };
    // This will trigger the useEffect to save to DB
    setAppointments([...appointments, newAppt]);
    navigate('patient-dashboard');
    alert(`Appointment confirmed with ${selectedDoctor?.name}`);
  };

  // --- CRUD Operations (Admin) ---
  const handleAddDoctor = (doc: Doctor) => {
    setDoctors(prev => [...prev, doc]);
  };
  
  const handleUpdateDoctor = (updatedDoc: Doctor) => {
    setDoctors(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
  };
  
  const handleDeleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  // --- CRUD Operations (Doctor) ---
  const handleAddPatient = (pat: Patient) => {
    setPatients(prev => [...prev, pat]);
  };

  // Patient Dashboard Component
  const PatientDashboard = () => (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       <h1 className="text-2xl font-bold text-slate-900 mb-6">Patient Dashboard</h1>
       
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.filter(a => a.status === 'UPCOMING').slice(0, 1).map(appt => (
              <div key={appt.id} className="flex items-start p-4 bg-brand-50 rounded-lg border border-brand-100">
                <div className="p-3 bg-white rounded-full shadow-sm">
                    <Calendar className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-slate-900">{appt.doctorName}</h3>
                            <p className="text-sm text-slate-600">{appt.doctorSpecialization}</p>
                            <p className="text-sm text-slate-500 mt-1">{appt.date}, {appt.time}</p>
                        </div>
                        <button 
                            onClick={() => setActiveCall(true)}
                            className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 animate-pulse"
                        >
                            Join Video Call
                        </button>
                    </div>
                </div>
              </div>
          ))}
          {appointments.filter(a => a.status === 'UPCOMING').length === 0 && <p className="text-slate-500">No upcoming appointments.</p>}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-semibold mb-3">Recent Prescriptions</h3>
               <div className="space-y-3">
                   <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-700">Antibiotics (Amoxicillin)</span>
                       <span className="text-slate-400">12 Oct 2023</span>
                   </div>
                    <div className="flex items-center justify-between text-sm">
                       <span className="text-slate-700">Vitamin D3</span>
                       <span className="text-slate-400">10 Sep 2023</span>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-10 w-10 text-brand-600 animate-spin" /></div>;
  }

  if (activeCall) {
      return <VideoCall onEndCall={() => setActiveCall(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar 
        userRole={userRole} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
        navigate={navigate}
        currentPage={currentPage}
      />

      {currentPage === 'home' && <Home navigate={navigate} doctors={doctors} />}
      {currentPage === 'login' && <Login onLoginSuccess={handleAuthSuccess} />}
      {currentPage === 'doctors' && <DoctorList doctors={doctors} onBook={handleBookDoctor} />}
      {currentPage === 'symptom-checker' && <SymptomChecker />}
      
      {currentPage === 'doctor-dashboard' && (
        <DoctorDashboard 
            appointments={appointments} 
            patients={patients}
            onAddPatient={handleAddPatient}
        />
      )}
      
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard 
            doctors={doctors} 
            onAddDoctor={handleAddDoctor}
            onUpdateDoctor={handleUpdateDoctor}
            onDeleteDoctor={handleDeleteDoctor}
        />
      )}
      
      {currentPage === 'patient-dashboard' && <PatientDashboard />}

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Book Appointment</h3>
                <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <div className="flex items-center mb-6 bg-slate-50 p-4 rounded-lg">
                <img src={selectedDoctor.avatar} alt="Doc" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                    <p className="font-bold text-slate-900">{selectedDoctor.name}</p>
                    <p className="text-sm text-brand-600">{selectedDoctor.specialization}</p>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                    <input type="date" className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['09:00 AM', '10:30 AM', '02:00 PM'].map(time => (
                            <button key={time} className="border border-slate-300 rounded-md py-2 text-sm hover:border-brand-500 hover:bg-brand-50 focus:bg-brand-600 focus:text-white transition-colors">
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
                    <select className="w-full border border-slate-300 rounded-lg p-2.5">
                        <option>Credit Card</option>
                        <option>Mobile Banking</option>
                        <option>Pay Later / Cash</option>
                    </select>
                </div>
            </div>

            <div className="flex space-x-3">
                <button 
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button 
                    onClick={confirmBooking}
                    className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 shadow-sm"
                >
                    Confirm Booking
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4 flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-brand-400"/> MediConnect</h3>
                <p className="text-slate-400 text-sm">Making healthcare accessible, secure, and intelligent for everyone.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li className="hover:text-white cursor-pointer">Video Consultation</li>
                    <li className="hover:text-white cursor-pointer">Doctor Search</li>
                    <li className="hover:text-white cursor-pointer">Health Records</li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                    <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-white cursor-pointer">Terms of Service</li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-slate-400 text-sm">support@mediconnect.com</p>
                <p className="text-slate-400 text-sm mt-1">+1 (555) 123-4567</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;