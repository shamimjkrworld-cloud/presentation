import React, { useState } from 'react';
import { UserRole } from '../types';
import { Menu, X, HeartPulse, User as UserIcon, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
  userRole: UserRole;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  navigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onLogin, onLogout, navigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItemClass = (page: string) => 
    `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPage === page 
        ? 'bg-brand-50 text-brand-700' 
        : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <HeartPulse className="h-8 w-8 text-brand-600" />
            <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight">MediConnect</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => navigate('home')} className={navItemClass('home')}>Home</button>
            <button onClick={() => navigate('doctors')} className={navItemClass('doctors')}>Find Doctors</button>
            <button onClick={() => navigate('symptom-checker')} className={navItemClass('symptom-checker')}>AI Symptom Checker</button>
            
            {userRole === UserRole.PATIENT && (
               <button onClick={() => navigate('patient-dashboard')} className={navItemClass('patient-dashboard')}>My Dashboard</button>
            )}
            
            {userRole === UserRole.DOCTOR && (
               <button onClick={() => navigate('doctor-dashboard')} className={navItemClass('doctor-dashboard')}>Doctor Portal</button>
            )}

            {userRole === UserRole.ADMIN && (
               <button onClick={() => navigate('admin-dashboard')} className={navItemClass('admin-dashboard')}>Admin Panel</button>
            )}

            {userRole === UserRole.GUEST ? (
              <div className="flex space-x-2 ml-4">
                <button 
                  onClick={() => onLogin(UserRole.PATIENT)}
                  className="px-4 py-2 border border-brand-600 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-50 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => onLogin(UserRole.DOCTOR)}
                  className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm transition-colors"
                >
                  Doctor / Admin
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-4 space-x-3">
                 <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full">
                    {userRole === UserRole.ADMIN ? <Settings className="h-4 w-4 text-slate-500"/> : <UserIcon className="h-4 w-4 text-slate-500" />}
                    <span className="text-sm font-medium text-slate-700">
                        {userRole === UserRole.PATIENT ? 'John Doe' : userRole === UserRole.DOCTOR ? 'Dr. Smith' : 'Admin'}
                    </span>
                 </div>
                 <button onClick={onLogout} className="text-slate-400 hover:text-red-500">
                    <LogOut className="h-5 w-5" />
                 </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-brand-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => { navigate('home'); setIsMenuOpen(false); }} className={`block w-full text-left ${navItemClass('home')}`}>Home</button>
             <button onClick={() => { navigate('doctors'); setIsMenuOpen(false); }} className={`block w-full text-left ${navItemClass('doctors')}`}>Find Doctors</button>
             <button onClick={() => { navigate('symptom-checker'); setIsMenuOpen(false); }} className={`block w-full text-left ${navItemClass('symptom-checker')}`}>AI Symptom Checker</button>
             
             {userRole === UserRole.ADMIN && (
                <button onClick={() => { navigate('admin-dashboard'); setIsMenuOpen(false); }} className={`block w-full text-left ${navItemClass('admin-dashboard')}`}>Admin Panel</button>
             )}

             {userRole === UserRole.GUEST && (
                 <>
                    <button onClick={() => { onLogin(UserRole.PATIENT); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-brand-600 font-medium">Patient Login</button>
                    <button onClick={() => { onLogin(UserRole.DOCTOR); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-brand-600 font-medium">Doctor Login</button>
                 </>
             )}
              {userRole !== UserRole.GUEST && (
                 <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-red-600 font-medium">Logout</button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;