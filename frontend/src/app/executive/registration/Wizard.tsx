import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  CreditCard, 
  Info, 
  ArrowRight, 
  Save, 
  Camera,
  CheckCircle,
  Smartphone,
  ChevronRight,
  ShieldAlert,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  { id: 1, name: 'Personal Details', icon: User },
  { id: 2, name: 'Family Information', icon: Users },
  { id: 3, name: 'ID Verification', icon: CreditCard },
  { id: 4, name: 'Final Review', icon: CheckCircle },
];

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    phone: '',
    idType: "Driver's License",
    address: ''
  });

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate('/register/complete');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Horizontal Stepper */}
      <div className="mb-10 overflow-x-auto py-6 hide-scrollbar">
        <div className="flex items-center justify-between min-w-[600px] px-8 relative">
          <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-slate-100 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-8 h-[2px] bg-primary -translate-y-1/2 transition-all duration-500 z-0 shadow-sm" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 90}%` }}
          ></div>
          
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            
            return (
              <div key={s.id} className="flex flex-col items-center gap-3 relative z-10">
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive || isCompleted ? '#b80035' : '#ffffff',
                    borderColor: isActive || isCompleted ? '#b80035' : '#e2e8f0',
                  }}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                    isActive || isCompleted ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </motion.div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${
                  isActive ? 'text-primary' : 'text-slate-400'
                }`}>
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Form Area */}
        <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary font-bold text-[10px] uppercase tracking-widest px-3 py-1 bg-primary-light rounded-full">Step {step} of 4</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-800 tracking-tight mb-3">
                  {step === 1 && "Personal Details"}
                  {step === 2 && "Family Information"}
                  {step === 3 && "ID Verification"}
                  {step === 4 && "Review & Submit"}
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {step === 1 && "Please provide the patient's core registration information."}
                  {step === 2 && "Add family members or dependents to the patient's record."}
                  {step === 3 && "Upload a photo and valid identity documents for verification."}
                  {step === 4 && "Review all patient details before finalizing the registration."}
                </p>
              </div>

              <div className="relative z-10">
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                        Full Legal Name <span className="text-primary">*</span>
                      </label>
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-lg font-medium placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                          Date of Birth <span className="text-primary">*</span>
                        </label>
                        <div className="relative group">
                          <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="date" 
                            className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-lg font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Gender</label>
                        <div className="flex h-16 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
                          {['Male', 'Female', 'Other'].map(g => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setFormData({...formData, gender: g})}
                              className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                                formData.gender === g ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <div className="relative group">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <input 
                            type="tel" 
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-slate-900 text-lg font-medium placeholder:text-slate-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Identity proof Type</label>
                        <select className="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-lg font-medium text-slate-900 appearance-none cursor-pointer">
                          <option>Driver's License</option>
                          <option>Aadhar Card</option>
                          <option>Passport</option>
                          <option>Voter ID</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Current Address</label>
                      <div className="relative group">
                        <MapPin className="absolute left-5 top-6 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <textarea 
                          rows={3}
                          placeholder="House No, Street, Landmark, PIN Code..."
                          className="w-full pl-14 pr-6 pt-5 bg-slate-50 border border-slate-200 rounded-[24px] focus:border-primary focus:bg-white outline-none transition-all resize-none text-slate-900 text-lg font-medium placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-slate-50 rounded-[32px] p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-6 group hover:border-primary hover:bg-primary-light/50 transition-all cursor-pointer min-h-[300px]">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                          <Camera className="w-10 h-10" />
                        </div>
                        <div className="text-center">
                          <p className="font-display font-bold text-xl text-slate-800 mb-1">Take Profile Photo</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">Front-facing clear portrait</p>
                        </div>
                        <button className="h-12 px-8 bg-white border border-slate-200 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-primary hover:border-primary transition-all shadow-sm">Enable Camera</button>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                              <CreditCard className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">Upload ID Front</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Maximum 5MB</p>
                            </div>
                          </div>
                          <button className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Select</button>
                        </div>
                        
                        <div className="bg-white p-6 rounded-[24px] border border-slate-50 flex items-center justify-between opacity-50 cursor-not-allowed">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400">
                              <CreditCard className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">Upload ID Back</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Required step</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-primary-light/50 p-6 rounded-[24px] border border-primary-light text-primary flex gap-4 items-start">
                          <Info className="w-6 h-6 flex-shrink-0" />
                          <p className="text-xs font-bold leading-relaxed">
                            Please ensure identity documents are clear and all details are visible for faster approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-100 mt-12 relative z-10">
                <button 
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`w-full sm:w-auto h-14 px-10 rounded-2xl border border-slate-200 bg-white text-slate-600 font-display font-bold uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-0`}
                >
                  Previous
                </button>
                <div className="flex gap-4 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none h-14 px-8 rounded-2xl bg-slate-50 text-slate-500 font-bold uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Draft
                  </button>
                  <button 
                    onClick={nextStep}
                    className="flex-1 sm:flex-none h-14 px-10 rounded-2xl bg-primary text-white font-display font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                  >
                    {step === 4 ? "Submit Registration" : "Next Step"}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar / Preview Column */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          {/* Card Preview */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 overflow-hidden relative">
            <h3 className="font-display font-bold text-lg text-slate-800 mb-8 border-b border-slate-50 pb-4">Digital Identity Preview</h3>
            
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden aspect-[1.586/1] flex flex-col justify-between shadow-2xl">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 rounded-full blur-[60px]"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white tracking-tight uppercase leading-none">NAMMA</h4>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-1 block">Health Card</span>
                  </div>
                </div>
                <CreditCard className="w-6 h-6 text-white/20" />
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-primary font-bold mb-1">Patient Name</p>
                  <p className="font-display font-bold text-2xl tracking-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                    {formData.name || "Awaiting Data..."}
                  </p>
                </div>
                <div className="flex gap-8 border-t border-white/5 pt-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">Registration ID</p>
                    <p className="font-mono text-xs font-bold text-white tracking-widest">####-####-####</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">Issue Date</p>
                    <p className="font-bold text-xs text-white">PENDING</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4 items-start">
                <ShieldAlert className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                  This card will be digitally shared with the patient upon successful verification.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <h4 className="font-display font-bold text-lg mb-6 text-slate-800">Quick Tips</h4>
            <ul className="space-y-5">
              {[
                "Double-check spelling of patient names.",
                "Capture ID photos in bright, indirect light.",
                "Enable location services for regional registry.",
                "Ensure emergency contact numbers are valid."
              ].map((tip, i) => (
                <li key={i} className="flex gap-4 text-sm text-slate-500 group">
                  <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="leading-relaxed font-medium transition-colors group-hover:text-slate-800">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
