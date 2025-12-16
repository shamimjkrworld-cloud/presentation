import React from 'react';
import { Video, ShieldCheck } from 'lucide-react';
import { Doctor } from '../types';

interface HomeProps {
  navigate: (page: string) => void;
  doctors?: Doctor[];
  onViewDoctor: (doctor: Doctor) => void;
}

const Home: React.FC<HomeProps> = ({ navigate, doctors = [], onViewDoctor }) => {
  const specialties = [
    { name: 'General Physician', icon: '🩺', count: '120+' },
    { name: 'Cardiology', icon: '❤️', count: '45+' },
    { name: 'Dermatology', icon: '🧴', count: '60+' },
    { name: 'Neurology', icon: '🧠', count: '30+' },
    { name: 'Pediatrics', icon: '👶', count: '80+' },
    { name: 'Psychiatry', icon: '🧠', count: '50+' },
  ];

  // Get first 15 doctors for the grid
  const topDoctors = doctors.slice(0, 15);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-brand-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-brand-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Consult top doctors</span>{' '}
                  <span className="block text-brand-600 xl:inline">anytime, anywhere.</span>
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Secure video consultations with verified specialists. Get digital prescriptions and medical advice without leaving your home.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('doctors')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10"
                    >
                      Find a Doctor
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigate('symptom-checker')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-700 bg-brand-100 hover:bg-brand-200 md:py-4 md:text-lg md:px-10"
                    >
                      Check Symptoms
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          {/* Changed to a very reliable medical team image */}
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            alt="Doctor Team"
          />
        </div>
      </div>

      {/* Search Bar Placeholder */}
      <div className="bg-white py-8 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 -mt-16 relative z-20">
                  <input type="text" placeholder="Search Doctor by Name..." className="flex-1 border-slate-200 rounded-lg" />
                  <input type="text" placeholder="Specialization..." className="flex-1 border-slate-200 rounded-lg" />
                  <input type="text" placeholder="Location..." className="flex-1 border-slate-200 rounded-lg" />
                  <button onClick={() => navigate('doctors')} className="bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700">Search</button>
              </div>
          </div>
      </div>

      {/* Top Doctors Section (Grid 5x3) */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Top Doctors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {topDoctors.map((doc) => (
                    <div 
                        key={doc.id} 
                        onClick={() => onViewDoctor(doc)} 
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 group"
                    >
                        <div className="h-48 overflow-hidden">
                            <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h3>
                            <p className="text-xs text-brand-600 font-medium mt-1 truncate">{doc.specialization}</p>
                            <p className="text-xs text-slate-500 mt-2">{doc.experience} Yrs Exp.</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10">
                <button onClick={() => navigate('doctors')} className="text-brand-600 font-semibold hover:text-brand-700">View All Doctors &rarr;</button>
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A better way to get care
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                    <Video className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Instant Video Consult</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-slate-500">
                  Connect with a doctor face-to-face in minutes using our secure high-definition video platform.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-slate-900">100% Safe & Secure</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-slate-500">
                  Your medical data is encrypted and HIPAA compliant. Private conversations, always.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Popular Specialties */}
      <div className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {specialties.map((spec) => (
                    <div key={spec.name} className="bg-slate-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100 flex flex-col items-center text-center">
                        <span className="text-4xl mb-3">{spec.icon}</span>
                        <h3 className="text-sm font-semibold text-slate-800">{spec.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{spec.count} Doctors</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;