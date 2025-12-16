import React from 'react';
import { Doctor } from '../types';
import { Star, MapPin, Clock, DollarSign, Award, GraduationCap, Languages, ThumbsUp, Calendar } from 'lucide-react';

interface DoctorProfileProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
  onBack: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor, onBook, onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-brand-800 to-brand-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <button onClick={onBack} className="text-brand-100 hover:text-white mb-6 flex items-center">
             &larr; Back to List
           </button>
           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img 
                src={doctor.avatar} 
                alt={doctor.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white" 
              />
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold">{doctor.name}</h1>
                <p className="text-xl text-brand-100 font-medium mt-1">{doctor.specialization}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm">
                   <span className="flex items-center"><MapPin className="h-4 w-4 mr-1"/> {doctor.hospital}</span>
                   <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400 fill-current"/> {doctor.rating} ({doctor.reviewCount} Reviews)</span>
                   <span className="flex items-center"><Clock className="h-4 w-4 mr-1"/> {doctor.experience} Years Exp.</span>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm text-center min-w-[150px]">
                 <p className="text-sm text-brand-100">Consultation Fee</p>
                 <p className="text-3xl font-bold">${doctor.consultationFee}</p>
                 <button 
                    onClick={() => onBook(doctor)}
                    className="mt-3 w-full bg-white text-brand-700 py-2 px-4 rounded font-bold hover:bg-brand-50 transition-colors shadow"
                 >
                    Book Now
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Info */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Availability</h3>
               <div className="flex items-center text-green-600 mb-2">
                   <Calendar className="h-5 w-5 mr-2" />
                   <span className="font-medium">Available Today</span>
               </div>
               <p className="text-sm text-slate-500">Mon - Fri: 09:00 AM - 05:00 PM</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Professional Info</h3>
               <ul className="space-y-3 text-sm">
                   <li className="flex items-start">
                       <Award className="h-5 w-5 mr-3 text-brand-500 shrink-0"/>
                       <div>
                           <span className="font-medium text-slate-900">Board Certified</span>
                           <p className="text-slate-500">American Board of Medical Specialties</p>
                       </div>
                   </li>
                    <li className="flex items-start">
                       <GraduationCap className="h-5 w-5 mr-3 text-brand-500 shrink-0"/>
                       <div>
                           <span className="font-medium text-slate-900">Education</span>
                           <p className="text-slate-500">MBBS, MD - Johns Hopkins University</p>
                       </div>
                   </li>
                   <li className="flex items-start">
                       <Languages className="h-5 w-5 mr-3 text-brand-500 shrink-0"/>
                       <div>
                           <span className="font-medium text-slate-900">Languages</span>
                           <p className="text-slate-500">English, Spanish</p>
                       </div>
                   </li>
               </ul>
            </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">About {doctor.name}</h2>
                <p className="text-slate-600 leading-relaxed">
                    {doctor.about}
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                    Committed to providing comprehensive medical care with a focus on preventative medicine and patient education. {doctor.name} believes in a holistic approach to health and works closely with patients to develop personalized treatment plans.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                    <p className="text-2xl font-bold text-brand-600">10k+</p>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Patients</p>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                    <p className="text-2xl font-bold text-brand-600">{doctor.experience}+</p>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Years Exp.</p>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-center">
                    <p className="text-2xl font-bold text-brand-600">4.9</p>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Rating</p>
                </div>
            </div>

            {/* Reviews Mock */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Patient Reviews</h3>
                <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current"/>)}
                            </div>
                            <span className="ml-2 font-bold text-slate-900">Excellent Doctor!</span>
                        </div>
                        <p className="text-slate-600 text-sm">"Dr. {doctor.name.split(' ')[1]} was very attentive and explained everything clearly. I felt very comfortable discussing my health issues."</p>
                        <div className="flex items-center mt-2 text-xs text-slate-400">
                            <span>Alice M.</span>
                            <span className="mx-2">•</span>
                            <span>2 weeks ago</span>
                        </div>
                    </div>

                     <div>
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current"/>)}
                            </div>
                            <span className="ml-2 font-bold text-slate-900">Highly Recommend</span>
                        </div>
                        <p className="text-slate-600 text-sm">"Great experience. The video call quality was good and the doctor was on time."</p>
                         <div className="flex items-center mt-2 text-xs text-slate-400">
                            <span>Robert T.</span>
                            <span className="mx-2">•</span>
                            <span>1 month ago</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
