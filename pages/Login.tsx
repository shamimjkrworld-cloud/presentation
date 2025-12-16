import React, { useState } from 'react';
import { UserRole } from '../types';
import { HeartPulse, Eye, EyeOff, Lock, Mail, Info } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Demo credentials configuration
  const getDemoCredentials = (currentRole: UserRole) => {
    switch (currentRole) {
      case UserRole.PATIENT:
        return { email: 'patient@example.com', pass: 'patient123' };
      case UserRole.DOCTOR:
        return { email: 'doctor@example.com', pass: 'doctor123' };
      case UserRole.ADMIN:
        return { email: 'admin@example.com', pass: 'admin123' };
      default:
        return { email: '', pass: '' };
    }
  };

  const demoCreds = getDemoCredentials(role);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict validation for demo purposes
    if (password === demoCreds.pass) {
        if (role === UserRole.DOCTOR) {
           alert('Welcome Doctor! Please remember to update your default password in settings.');
        }
        onLoginSuccess(role);
    } else {
        alert(`Invalid credentials. For this demo, please use Password: ${demoCreds.pass}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <HeartPulse className="h-12 w-12 text-brand-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Sign in to MediConnect
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
            Secure access for Patients, Doctors, and Admins
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Selection Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
              <button 
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${role === UserRole.PATIENT ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                onClick={() => { setRole(UserRole.PATIENT); setPassword(''); }}
              >
                  Patient
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${role === UserRole.DOCTOR ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                onClick={() => { setRole(UserRole.DOCTOR); setPassword(''); }}
              >
                  Doctor
              </button>
               <button 
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${role === UserRole.ADMIN ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                onClick={() => { setRole(UserRole.ADMIN); setPassword(''); }}
              >
                  Admin
              </button>
          </div>

          {/* Demo Credentials Hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-6 flex items-start">
             <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
             <div className="text-sm text-blue-700">
                <p className="font-bold mb-1">Demo Credentials ({role === UserRole.PATIENT ? 'Patient' : role === UserRole.DOCTOR ? 'Doctor' : 'Admin'}):</p>
                <p>Email: <span className="font-mono bg-blue-100 px-1 rounded">{demoCreds.email}</span> (or any)</p>
                <p>Password: <span className="font-mono bg-blue-100 px-1 rounded">{demoCreds.pass}</span></p>
             </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500 sm:text-sm p-2 border"
                  placeholder={demoCreds.email}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 border-slate-300 rounded-md focus:ring-brand-500 focus:border-brand-500 sm:text-sm p-2 border"
                  placeholder="Enter password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;