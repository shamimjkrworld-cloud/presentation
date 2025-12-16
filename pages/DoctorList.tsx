import React, { useState } from 'react';
import { Doctor } from '../types';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';

interface DoctorListProps {
  onBook: (doctor: Doctor) => void;
  onViewDoctor: (doctor: Doctor) => void;
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ onBook, onViewDoctor, doctors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialization)))];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Search Doctor</label>
            <input
              type="text"
              className="w-full border-slate-300 rounded-md shadow-sm p-2 border focus:ring-brand-500 focus:border-brand-500"
              placeholder="Name or Hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
            <select
              className="w-full border-slate-300 rounded-md shadow-sm p-2 border focus:ring-brand-500 focus:border-brand-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-slate-100 flex flex-col group">
            <div 
                className="p-6 flex-1 cursor-pointer"
                onClick={() => onViewDoctor(doctor)}
            >
              <div className="flex items-center mb-4">
                <img className="h-16 w-16 rounded-full object-cover border-2 border-brand-100 group-hover:scale-110 transition-transform" src={doctor.avatar} alt={doctor.name} />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{doctor.name}</h3>
                  <p className="text-sm text-brand-600 font-medium">{doctor.specialization}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                  {doctor.hospital}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </div>
                 <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-slate-400" />
                  {doctor.experience} Years Exp.
                </div>
                <div className="flex items-center font-semibold text-slate-900">
                  <DollarSign className="h-4 w-4 mr-2 text-slate-400" />
                  ${doctor.consultationFee} / Consult
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500 line-clamp-2">
                {doctor.about}
              </p>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => onViewDoctor(doctor)}
                className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => onBook(doctor)}
                className="flex-1 bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;