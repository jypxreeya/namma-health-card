import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [cardId, setCardId] = useState('');

  useEffect(() => {
    document.title = "Customer Portal";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest overflow-x-hidden">
      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <img 
          alt="Healthcare professionals" 
          className="w-full h-full object-cover grayscale-[0.2]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF_4r5h0ChT2k1Y9WrLqw5czPl5F-5Sl3h41garePiBoHRffeHmWHuRmJ4a7-0grRxrhWpr88jJU-3IBsj2PuP_1PJnEAW2dYpe9kMHcNzhiFU8QXxXnlBdPlAUCNR_QAKU_arJhJ-GzZUh0fl-FEgdKJxphmnC-aYF37ndN_OEBebCoTyfb_WvmPhydT-zpyjPxQ1h2LvTFARjTB0pLP3UJ91wbTB54PAhg1GXlQZDick2HZZUtEGY9HixC5qV2XVrdpCqn9-D-8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
      </div>

      {/* Content Area */}
      <div className="w-full max-w-md px-6 -mt-12 relative z-10 flex flex-col gap-6 mx-auto">
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 fill-current" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-primary">Customer Portal</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-on-surface">Login to Customer Portal</h1>
          <p className="text-on-surface-variant font-medium">Access your health card and family benefits</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/cp/otp'); }}>
          <div className="relative group">
            <div className="flex items-center bg-surface-container-high rounded-t-xl border-b-2 border-outline focus-within:border-primary transition-all duration-200 h-16 px-4">
              <Smartphone className="w-6 h-6 text-on-surface-variant mr-4" />
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="mobile_number">Mobile Number</label>
                <input 
                  className="bg-transparent border-none p-0 text-on-surface text-lg font-medium focus:ring-0 placeholder-on-surface-variant/40" 
                  id="mobile_number" 
                  placeholder="+91 00000 00000" 
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="flex items-center bg-surface-container-high rounded-t-xl border-b-2 border-outline focus-within:border-primary transition-all duration-200 h-16 px-4">
              <div className="w-6 h-6 text-on-surface-variant mr-4 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="card_id">Health Card ID</label>
                <input 
                  className="bg-transparent border-none p-0 text-on-surface text-lg font-medium focus:ring-0 placeholder-on-surface-variant/40" 
                  id="card_id" 
                  placeholder="NH-1234-5678" 
                  type="text"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-primary hover:bg-primary-container text-white font-display font-bold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center py-2">
          <a className="text-primary hover:underline transition-all font-medium" href="#">
            Don't have a card? <span className="font-bold">Register here</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
          <div className="flex flex-col items-center text-center gap-1">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">Secure Data Encryption</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">Govt. Certified Portal</span>
          </div>
        </div>

        <div className="flex justify-center gap-8 py-8 opacity-60">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Privacy Policy</span>
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Terms of Service</span>
        </div>
      </div>
    </div>
  );
}
