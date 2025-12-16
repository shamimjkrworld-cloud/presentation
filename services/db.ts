import { Doctor, Appointment, Patient, UserRole } from '../types';

// Keys for LocalStorage
const KEYS = {
  DOCTORS: 'mediconnect_doctors',
  APPOINTMENTS: 'mediconnect_appointments',
  PATIENTS: 'mediconnect_patients'
};

// Reliable, high-quality professional headshots
const DOCTOR_IMAGES = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop', // Male
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop', // Female
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop', // Male
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop', // Female
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop', // Male
  'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=400&auto=format&fit=crop', // Female
  'https://images.unsplash.com/photo-1582752948679-17fa05ad4014?q=80&w=400&auto=format&fit=crop', // Male
  'https://images.unsplash.com/photo-1651008325506-71d380891623?q=80&w=400&auto=format&fit=crop', // Female
  'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=400&auto=format&fit=crop', // Male
  'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&auto=format&fit=crop', // Female
];

// Initial Seed Data (Simulating a fresh DB install)
const generateDoctors = (): Doctor[] => {
  const specs = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'General Physician', 'Orthopedics'];
  return Array.from({ length: 20 }).map((_, i) => ({
    id: `doc-${i + 1}`,
    name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][i % 10]} ${String.fromCharCode(65 + i)}`,
    email: `doctor${i + 1}@example.com`,
    role: UserRole.DOCTOR,
    specialization: specs[i % specs.length],
    experience: Math.floor(Math.random() * 20) + 5,
    rating: Number((4 + Math.random()).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 500) + 50,
    consultationFee: Math.floor(Math.random() * 100) + 50,
    available: Math.random() > 0.2,
    hospital: ['City Heart Institute', 'General Hospital', 'Kids Care Center', 'Ortho Clinic', 'Metropolitan Health'][i % 5],
    about: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]} is a highly skilled ${specs[i % specs.length]} with over ${Math.floor(Math.random() * 20) + 5} years of experience in diagnosing and treating complex conditions. Completed residency at Johns Hopkins and is dedicated to patient-centered care.`,
    avatar: DOCTOR_IMAGES[i % DOCTOR_IMAGES.length]
  }));
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-1',
    doctorId: 'doc-1',
    doctorName: 'Dr. Smith A',
    doctorSpecialization: 'Cardiology',
    patientId: 'pat-1',
    patientName: 'Jane Doe',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    status: 'UPCOMING',
    type: 'VIDEO'
  },
  {
    id: 'appt-2',
    doctorId: 'doc-1',
    doctorName: 'Dr. Smith A',
    doctorSpecialization: 'Cardiology',
    patientId: 'pat-2',
    patientName: 'John Smith',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    status: 'UPCOMING',
    type: 'VIDEO'
  }
];

// --- Database Operations ---

export const db = {
  // Initialize DB if empty
  init: () => {
    if (!localStorage.getItem(KEYS.DOCTORS)) {
      localStorage.setItem(KEYS.DOCTORS, JSON.stringify(generateDoctors()));
    }
    if (!localStorage.getItem(KEYS.APPOINTMENTS)) {
      localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    }
    if (!localStorage.getItem(KEYS.PATIENTS)) {
      localStorage.setItem(KEYS.PATIENTS, JSON.stringify([]));
    }
  },

  // Doctors CRUD
  getDoctors: (): Doctor[] => {
    return JSON.parse(localStorage.getItem(KEYS.DOCTORS) || '[]');
  },
  saveDoctors: (doctors: Doctor[]) => {
    localStorage.setItem(KEYS.DOCTORS, JSON.stringify(doctors));
  },

  // Appointments CRUD
  getAppointments: (): Appointment[] => {
    return JSON.parse(localStorage.getItem(KEYS.APPOINTMENTS) || '[]');
  },
  saveAppointments: (appointments: Appointment[]) => {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },

  // Patients CRUD
  getPatients: (): Patient[] => {
    return JSON.parse(localStorage.getItem(KEYS.PATIENTS) || '[]');
  },
  savePatients: (patients: Patient[]) => {
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(patients));
  }
};
