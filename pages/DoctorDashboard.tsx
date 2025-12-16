import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar as CalendarIcon, DollarSign, TrendingUp, Plus, FileText, Check, Search, Printer, Share2 } from 'lucide-react';
import { Appointment, Patient } from '../types';

const data = [
  { name: 'Mon', visits: 12 },
  { name: 'Tue', visits: 19 },
  { name: 'Wed', visits: 15 },
  { name: 'Thu', visits: 22 },
  { name: 'Fri', visits: 25 },
  { name: 'Sat', visits: 10 },
  { name: 'Sun', visits: 5 },
];

interface DoctorDashboardProps {
    appointments?: Appointment[];
    patients?: Patient[];
    onAddPatient?: (patient: Patient) => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ appointments = [], patients = [], onAddPatient }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'patients' | 'prescriptions'>('overview');
  
  // --- Calendar Logic ---
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const monthName = today.toLocaleString('default', { month: 'long' });

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(a => a.date === dateStr);
  };

  // --- Patient Add Logic ---
  const [newPatient, setNewPatient] = useState({ name: '', phone: '', symptoms: '' });
  const handlePatientSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(onAddPatient) {
          onAddPatient({
              id: `pat-manual-${Date.now()}`,
              name: newPatient.name,
              email: '',
              phone: newPatient.phone,
              symptoms: newPatient.symptoms,
              role: 'PATIENT' as any
          });
          setNewPatient({ name: '', phone: '', symptoms: '' });
          alert('Patient Added Successfully!');
      }
  };

  // --- Prescription Logic ---
  const [prescriptionForm, setPrescriptionForm] = useState({
      patientName: '',
      medication: '',
      dosage: '',
      freq: '',
      diagnosis: '',
      advice: ''
  });
  const [showPrescriptionPreview, setShowPrescriptionPreview] = useState(false);

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowPrescriptionPreview(true);
  };

  const Overview = () => (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Patients</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-2">1,234</h3>
                    </div>
                    <div className="p-3 bg-brand-50 rounded-lg text-brand-600"><Users className="h-6 w-6"/></div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Earnings</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-2">$12,450</h3>
                    </div>
                    <div className="p-3 bg-brand-50 rounded-lg text-brand-600"><DollarSign className="h-6 w-6"/></div>
                </div>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Patient Visits (Weekly)</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: '#f1f5f9' }} />
                        <Bar dataKey="visits" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
  );

  const CalendarView = () => (
      <div className="animate-fade-in bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5"/> {monthName} {today.getFullYear()}
          </h2>
          <div className="grid grid-cols-7 gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-medium text-slate-500 text-sm py-2">{day}</div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayAppts = getAppointmentsForDay(day);
                  return (
                      <div 
                        key={day} 
                        onClick={() => setSelectedDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                        className={`min-h-[100px] border border-slate-100 rounded-lg p-2 cursor-pointer transition-all hover:border-brand-300 hover:shadow-md ${selectedDate?.endsWith(String(day).padStart(2, '0')) ? 'ring-2 ring-brand-500' : ''}`}
                      >
                          <span className="text-slate-400 font-medium">{day}</span>
                          {dayAppts.length > 0 && (
                              <div className="mt-2 bg-brand-100 text-brand-700 text-xs px-2 py-1 rounded-full font-medium">
                                  {dayAppts.length} Patients
                              </div>
                          )}
                      </div>
                  );
              })}
          </div>

          {selectedDate && (
             <div className="mt-8 border-t border-slate-200 pt-6">
                 <h3 className="text-lg font-bold mb-4">Appointments for {selectedDate}</h3>
                 <div className="space-y-3">
                     {appointments.filter(a => a.date === selectedDate).length > 0 ? (
                        appointments.filter(a => a.date === selectedDate).map(appt => (
                            <div key={appt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-900">{appt.patientName}</p>
                                    <p className="text-sm text-slate-500">{appt.time} - {appt.type}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">{appt.status}</span>
                            </div>
                        ))
                     ) : (
                         <p className="text-slate-500 italic">No appointments booked for this day.</p>
                     )}
                 </div>
             </div>
          )}
      </div>
  );

  const AddPatientView = () => (
      <div className="animate-fade-in max-w-2xl">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <Plus className="mr-2 h-5 w-5"/> Manual Patient Entry
              </h2>
              <form onSubmit={handlePatientSubmit} className="space-y-5">
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Patient Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={newPatient.name}
                        onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                        className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500" 
                        placeholder="e.g. John Doe"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                      <input 
                        required
                        type="tel" 
                        value={newPatient.phone}
                        onChange={e => setNewPatient({...newPatient, phone: e.target.value})}
                        className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500" 
                        placeholder="+1 234..."
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Brief Symptoms</label>
                      <textarea 
                        rows={3}
                        value={newPatient.symptoms}
                        onChange={e => setNewPatient({...newPatient, symptoms: e.target.value})}
                        className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500" 
                        placeholder="Describe initial symptoms..."
                      />
                  </div>
                  <button type="submit" className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700">Add Patient to System</button>
              </form>
          </div>

          <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Recently Added Patients</h3>
              {patients.length > 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                      {patients.map(p => (
                          <div key={p.id} className="p-4 flex justify-between items-center">
                              <div>
                                  <p className="font-bold text-slate-900">{p.name}</p>
                                  <p className="text-sm text-slate-500">{p.phone}</p>
                              </div>
                              <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Manual Entry</span>
                          </div>
                      ))}
                  </div>
              ) : <p className="text-slate-500">No manually added patients yet.</p>}
          </div>
      </div>
  );

  const PrescriptionView = () => (
      <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <FileText className="mr-2 h-5 w-5"/> Write Prescription
              </h2>
              <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                      <input 
                        type="text" 
                        value={prescriptionForm.patientName}
                        onChange={e => setPrescriptionForm({...prescriptionForm, patientName: e.target.value})}
                        className="w-full border-slate-300 rounded-lg p-2 border" 
                        placeholder="Search patient..."
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Drug Name</label>
                        <input 
                            type="text" 
                            value={prescriptionForm.medication}
                            onChange={e => setPrescriptionForm({...prescriptionForm, medication: e.target.value})}
                            className="w-full border-slate-300 rounded-lg p-2 border" 
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Dosage</label>
                        <input 
                            type="text" 
                            value={prescriptionForm.dosage}
                            onChange={e => setPrescriptionForm({...prescriptionForm, dosage: e.target.value})}
                            className="w-full border-slate-300 rounded-lg p-2 border" 
                            placeholder="e.g. 500mg"
                        />
                     </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Frequency & Duration</label>
                      <input 
                        type="text" 
                        value={prescriptionForm.freq}
                        onChange={e => setPrescriptionForm({...prescriptionForm, freq: e.target.value})}
                        className="w-full border-slate-300 rounded-lg p-2 border" 
                        placeholder="e.g. 1-0-1 after food for 5 days"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosis</label>
                      <textarea 
                        rows={2}
                        value={prescriptionForm.diagnosis}
                        onChange={e => setPrescriptionForm({...prescriptionForm, diagnosis: e.target.value})}
                        className="w-full border-slate-300 rounded-lg p-2 border" 
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Advice / Follow-up</label>
                      <textarea 
                        rows={3}
                        value={prescriptionForm.advice}
                        onChange={e => setPrescriptionForm({...prescriptionForm, advice: e.target.value})}
                        className="w-full border-slate-300 rounded-lg p-2 border" 
                      />
                  </div>
                  <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700">Generate Prescription</button>
              </form>
          </div>

          {/* Preview */}
          {showPrescriptionPreview ? (
              <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 relative print:shadow-none">
                  <div className="border-b-2 border-brand-500 pb-4 mb-6 flex justify-between items-end">
                      <div>
                          <h1 className="text-2xl font-bold text-brand-700">Dr. Smith</h1>
                          <p className="text-sm text-slate-500">MBBS, MD (Cardiology)</p>
                          <p className="text-sm text-slate-500">Reg: 12345678</p>
                      </div>
                      <div className="text-right">
                          <p className="text-brand-600 font-bold">MediConnect Hospital</p>
                          <p className="text-xs text-slate-400">123 Health Street, NY</p>
                      </div>
                  </div>

                  <div className="mb-6 text-sm grid grid-cols-2 gap-4">
                      <p><span className="font-bold">Patient:</span> {prescriptionForm.patientName}</p>
                      <p><span className="font-bold">Date:</span> {new Date().toLocaleDateString()}</p>
                      <p><span className="font-bold">Age/Sex:</span> 32/M</p>
                      <p><span className="font-bold">Diagnosis:</span> {prescriptionForm.diagnosis}</p>
                  </div>

                  <div className="mb-8 min-h-[200px]">
                      <h3 className="font-bold text-lg mb-2">Rx</h3>
                      <ul className="list-decimal list-inside space-y-2 ml-2">
                          <li>
                              <span className="font-bold text-slate-800">{prescriptionForm.medication} {prescriptionForm.dosage}</span>
                              <p className="text-sm text-slate-600 ml-5">{prescriptionForm.freq}</p>
                          </li>
                      </ul>
                  </div>

                  <div className="mb-6 pt-4 border-t border-slate-100">
                      <h4 className="font-bold text-sm mb-1">Advice:</h4>
                      <p className="text-sm text-slate-700">{prescriptionForm.advice}</p>
                  </div>

                  <div className="flex justify-between items-end mt-12">
                      <div className="text-center">
                         {/* Digital Seal Simulation */}
                         <div className="w-24 h-24 rounded-full border-4 border-brand-200 flex items-center justify-center rotate-[-15deg] opacity-80">
                             <div className="text-center">
                                 <p className="text-[10px] font-bold text-brand-500 uppercase">MediConnect</p>
                                 <p className="text-[8px] text-brand-400">Digitally Signed</p>
                             </div>
                         </div>
                      </div>
                      <div className="text-center">
                          <p className="font-script text-2xl text-slate-800">Dr. Smith</p>
                          <div className="h-px w-32 bg-slate-800 mt-1"></div>
                          <p className="text-xs text-slate-500 mt-1">Signature</p>
                      </div>
                  </div>

                  <div className="mt-8 flex gap-3 print:hidden">
                      <button className="flex-1 flex items-center justify-center bg-slate-800 text-white py-2 rounded hover:bg-slate-700">
                          <Printer className="h-4 w-4 mr-2"/> Print
                      </button>
                      <button className="flex-1 flex items-center justify-center bg-brand-600 text-white py-2 rounded hover:bg-brand-700" onClick={() => alert('Sent to patient dashboard!')}>
                          <Share2 className="h-4 w-4 mr-2"/> Send to Patient
                      </button>
                  </div>
              </div>
          ) : (
              <div className="flex items-center justify-center h-full bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-400">
                  <p>Fill form to generate prescription</p>
              </div>
          )}
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Doctor Dashboard</h1>
            <p className="text-slate-500">Welcome back, Dr. Smith</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-8 inline-flex">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Overview</button>
          <button onClick={() => setActiveTab('calendar')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Calendar & Bookings</button>
          <button onClick={() => setActiveTab('patients')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'patients' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Add Patients</button>
          <button onClick={() => setActiveTab('prescriptions')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'prescriptions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Prescriptions</button>
      </div>

      {activeTab === 'overview' && <Overview />}
      {activeTab === 'calendar' && <CalendarView />}
      {activeTab === 'patients' && <AddPatientView />}
      {activeTab === 'prescriptions' && <PrescriptionView />}
    </div>
  );
};

export default DoctorDashboard;