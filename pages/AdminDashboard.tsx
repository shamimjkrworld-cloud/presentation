import React, { useState } from 'react';
import { Doctor } from '../types';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';

interface AdminDashboardProps {
  doctors: Doctor[];
  onAddDoctor: (doctor: Doctor) => void;
  onUpdateDoctor: (doctor: Doctor) => void;
  onDeleteDoctor: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ doctors, onAddDoctor, onUpdateDoctor, onDeleteDoctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Doctor>>({
    name: '',
    email: '',
    specialization: 'General Physician',
    hospital: '',
    experience: 0,
    consultationFee: 0,
  });

  const openAddModal = () => {
    setEditingDoctor(null);
    setFormData({
      name: '', email: '', specialization: 'General Physician', hospital: '', experience: 0, consultationFee: 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFormData(doc);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      // Update
      onUpdateDoctor({ ...editingDoctor, ...formData } as Doctor);
    } else {
      // Add
      const newDoc: Doctor = {
        id: `doc-${Date.now()}`,
        role: 'DOCTOR' as any,
        available: true,
        rating: 5.0,
        reviewCount: 0,
        about: 'Newly added doctor',
        // Default professional avatar
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&h=300&q=80',
        ...formData as any
      };
      onAddDoctor(newDoc);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
           <p className="text-slate-500">Manage Doctors & System Data</p>
        </div>
        <button onClick={openAddModal} className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-700">
           <Plus className="h-5 w-5 mr-2" /> Add New Doctor
        </button>
      </div>

      {/* Doctor List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fee</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={doc.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{doc.name}</div>
                        <div className="text-sm text-slate-500">{doc.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.hospital}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">${doc.consultationFee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openEditModal(doc)} className="text-brand-600 hover:text-brand-900 mr-4"><Edit className="h-4 w-4"/></button>
                    <button onClick={() => onDeleteDoctor(doc.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-slate-400"/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input required type="text" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input required type="email" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Specialization</label>
                    <input required type="text" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" value={formData.specialization || ''} onChange={e => setFormData({...formData, specialization: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Experience (Years)</label>
                    <input required type="number" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" value={formData.experience || 0} onChange={e => setFormData({...formData, experience: Number(e.target.value)})} />
                 </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Hospital</label>
                <input required type="text" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" value={formData.hospital || ''} onChange={e => setFormData({...formData, hospital: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Consultation Fee ($)</label>
                <input required type="number" className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2" value={formData.consultationFee || 0} onChange={e => setFormData({...formData, consultationFee: Number(e.target.value)})} />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50">Cancel</button>
                <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700">Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;