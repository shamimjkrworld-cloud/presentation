export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string; // Added for manual patient add
}

export interface Doctor extends User {
  specialization: string;
  experience: number; // years
  rating: number;
  reviewCount: number;
  consultationFee: number;
  available: boolean;
  hospital: string;
  about: string;
}

export interface Patient extends User {
  symptoms?: string; // For manually added patients
  age?: number;
  gender?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  patientId: string;
  patientName: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  type: 'VIDEO' | 'AUDIO' | 'CHAT';
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  diagnosis: string;
  advice: string;
  followUpDate?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
