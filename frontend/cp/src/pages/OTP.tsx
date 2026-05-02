import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, User, Smartphone } from 'lucide-react';

export default function OTP() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(29);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate a brief network verification
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center">
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary">Verification Code</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb73x5jhXWrNQCWYC8xtWSVob1ZqBrB8EKATQGHbMp8PRO81mRmkLFFGP918v32HORD0FFG76953xTr6SziwfrPjKsZDe6xRSLX1lonrkpkTFoLYZMPHCTH7NzV2b_tw0CMI42II_EYlI-NUAe4cPROPidXGcGUwlhLfectHOW3WerpaxEPjldUZpVoM8UgLiocTavlHVZYn9azsmCQ-5RL9P8rcgCtSUAsdgAMHbwWTHp3DdfYH7izGITHbpyM3Qw-3T4d-rvz_4" alt="profile" />
        </div>
      </header>

      <main className="flex-1 w-full max-w-[480px] px-6 py-12 flex flex-col gap-10">
        <section className="space-y-4">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-primary">
            <Smartphone className="w-10 h-10" />
          </div>
          <h2 className="font-display font-bold text-3xl text-on-surface">Verification Code</h2>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            We've sent a 6-digit code to <span className="font-bold text-on-surface">+91 ******7890</span>. Please enter it below to secure your medical records.
          </p>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <input
                key={i}
                disabled={isVerifying}
                className="w-12 h-14 text-center text-2xl font-bold bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all rounded-t-lg disabled:opacity-50"
                maxLength={1}
                placeholder="·"
                type="text"
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full h-14 bg-primary text-white font-display font-bold text-lg rounded-xl shadow-lg shadow-rose-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {isVerifying ? (
                <>Verifying...</>
              ) : (
                <>
                  Verify & Proceed
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-1 font-medium">
              <span className="text-on-surface-variant">Didn't receive the code?</span>
              <button className="text-primary font-bold hover:underline opacity-50 cursor-not-allowed">Resend OTP</button>
              <span className="text-primary font-bold">(0:{timer.toString().padStart(2, '0')})</span>
            </div>
          </div>
        </section>

        <section className="mt-auto pt-10">
          <div className="relative bg-tertiary-container rounded-[32px] overflow-hidden p-6 aspect-[4/3] flex flex-col justify-end">
            <img 
              alt="Healthcare background" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 grayscale" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZjW50QAONdsqyAXLwIqEWKcwjhJsjuwuUXdrU0mq0H-SESE9haMm9pBg47ht6Zp7-ZBJTs2RXyRzn2cGEjLgLcaBxA40OMnMrHeVFHp_zxpRd7OaBDRc6o4TmXNXWmCYxA9q-wQOJenyDtCtHuZXZIOVBUqi_wyqbs63xedMtn-CNtMGS992vtT7M7Iar-cdUToT0CUR_foLYr5KIcTIMlViXVobGoQX2iSGM4FQbN7aE56yidtkN8YY1_LrL-0zpoItlrN1XYdI" 
            />
            <div className="relative z-10 space-y-2">
              <div className="bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest">Security First</div>
              <h3 className="text-white font-display font-bold text-xl leading-tight">Your medical data is encrypted with bank-grade security.</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
