import { Doctor, Appointment, Patient, UserRole } from '../types';

// Keys for LocalStorage
const KEYS = {
  DOCTORS: 'mediconnect_doctors',
  APPOINTMENTS: 'mediconnect_appointments',
  PATIENTS: 'mediconnect_patients'
};

// Initial Seed Data (Simulating a fresh DB install)
const generateDoctors = (): Doctor[] => {
  const specs = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'General Physician', 'Orthopedics'];
  return Array.from({ length: 20 }).map((_, i) => ({
    id: `doc-${i + 1}`,
    name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][i % 10]} ${String.fromCharCode(65 + i)}`,
    email: `doctor${i + 1}@example.com`,
    role: UserRole.DOCTOR,
    specialization: specs[i % specs.length],
    experience: Math.floor(Math.random() * 20) + 2,
    rating: Number((4 + Math.random()).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 500) + 50,
    consultationFee: Math.floor(Math.random() * 100) + 30,
    available: Math.random() > 0.3,
    hospital: ['City Heart Institute', 'General Hospital', 'Kids Care Center', 'Ortho Clinic'][i % 4],
    about: 'Experienced specialist dedicated to providing top-quality healthcare services.',
    avatar: `https://picsum.photos/200/200?random=${i + 100}`
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
