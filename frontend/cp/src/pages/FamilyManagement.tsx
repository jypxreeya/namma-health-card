import { ChevronLeft, Menu, User, ShieldCheck, ChevronRight, UserPlus, Info, Verified } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { cn } from '../lib/utils';

export default function FamilyManagement() {
  const navigate = useNavigate();

  const members = [
    {
      name: 'Aditi Sharma',
      relation: 'Self (Primary)',
      status: 'Active',
      kyc: 'Verified KYC',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2z1jIKwYarZQsma9cGKPPqMpjtT46ZsdvSyZ1uKkbjwBOHrWGhX0Co_LgEIPqLTQezd8K56CYk3IJ1NXPBsPuFe23U1eVvssRB2JegbrZrzzyRr6MYDgcGXrLzULj9ugUzQBDZsbo1C6zsH5UmpiQv6_vg_95FkVyENeG4IyjjomhrXLEZoYrJXdX6Js47i3kY5-sQhDumW4EESGwL23f3L7ghJlEwiz1msP6xrHa2VTUiC32OMMv7vRDZCQx9AAg5rpi0hSTBbg',
      verified: true
    },
    {
       name: 'Rajesh Sharma',
       relation: 'Spouse',
       status: 'Active',
       kyc: 'Verified KYC',
       img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7BZ5p7ufrKABZHAAgVEsalOUQce3mGiJ_CC0C9B7kVpbquHh8MwidgQ-ZXqA83mtR9PEGEy6qzcdVWgjvv7BFVRm_d7XGzVu9XcyYVRlt423Cq8EAFSiNX69EZaQrGL7JGA5NS2BDfh_K3F2xwuLb41zYhme1EFo8-qXeQhGzmH1sd58FElMa0XVrdnK9b3HqA2PWd69MwG0yC6rbUEJmFD15CD2NV7taDMEdMo9FoppD9_YBrZXH-yyfKYEjfFANMIiD520Ziwc',
       verified: true
    },
    {
       name: 'Arjun Sharma',
       relation: 'Son',
       status: 'Peding',
       kyc: 'KYC In Progress',
       img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCARcdIm_FMHWFdrsa7ZC6Ld5p93E_FPJ-9tLnuCLY8PVOlaiQhzeJhbGpXLBkmIZvfs_3iE7R1GqoUh3dirHOa-owpfVJmQ0XOoGd3GwI7iNlfXM0blj7NxuCEdGQZY4PSGwQH9DxltKMwkmxtarlTqo6c1-da_UK6D8TwW5sNc_3Zo0LmYuPhI04NJqdPNtGtxCUmx_3JcrMQdTadayAnhigaMpg4rnrzPkKFp-0gGbn_bb-n9mGn9xMiY9B58SS3Q0xXfAX6KS0',
       verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white border-b border-zinc-100 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 text-primary cursor-pointer hover:bg-rose-50 rounded-full" />
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Family Management</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-50">
           <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjM8gol8z0HIuHkep7ADGf4NjRdwcEjW45oR8HiNjChzGKfuIBjAw2TlZW0yM-rhGvqTpgtq77Ykt9uDTCbzuFaHbJ5M-yHgc2P0fryJvvgbgFDnZ7HIB9Zv_Fhjw4k4GeGD-GYK4cW2JBOusHKVgomq7HiEh8MU_opZFA08ELizXP05SxiDLFhLcwVk0JOgUxakl0_lHvln5w50gURfq_F4sVHUt9nkgf1Jo47wVT-oBv3-gK1hVmRjbkNIxAXldoqb88neW_t4g" alt="profile" />
        </div>
      </header>

      <main className="pt-20 px-4 max-w-2xl mx-auto space-y-8">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-50">
           <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-display font-bold text-xl mb-1">Membership Summary</h2>
                <p className="text-zinc-500 font-medium text-xs">Family Premium Plan</p>
              </div>
              <div className="text-right">
                <span className="font-display font-extrabold text-3xl text-primary tracking-tight">4 <span className="text-zinc-400 text-lg">/ 6</span></span>
                <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">Slots Used</p>
              </div>
           </div>
           <div className="w-full bg-zinc-100 rounded-full h-2.5 mb-4 overflow-hidden">
             <div className="bg-primary h-full rounded-full transition-all w-2/3"></div>
           </div>
           <p className="text-[10px] font-bold text-zinc-500 flex items-center gap-2 uppercase tracking-wider">
             <Info className="w-3.5 h-3.5 text-primary" />
             You can add 2 more members to your current plan.
           </p>
        </section>

        <section className="space-y-6">
           <div className="flex justify-between items-center px-1">
              <h2 className="font-display font-bold text-xl uppercase tracking-tight">Family Members</h2>
              <span className="text-primary font-extrabold text-xs uppercase tracking-widest hover:underline cursor-pointer">Manage All</span>
           </div>
           
           <div className="space-y-4">
              {members.map((member, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-[28px] p-5 border border-zinc-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/10">
                      <img src={member.img} className="w-full h-full object-cover" alt={member.name} />
                    </div>
                    {member.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <Verified className="w-5 h-5 text-emerald-600 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="font-display font-bold text-on-surface truncate tracking-tight">{member.name}</h3>
                       <span className={cn(
                         "text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                         member.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                       )}>
                         {member.status}
                       </span>
                    </div>
                    <p className="text-xs font-bold text-zinc-400 mb-2">{member.relation}</p>
                    <div className="flex">
                       <span className={cn(
                         "text-[8px] font-extrabold px-2 py-1 rounded bg-zinc-50 border border-zinc-100 uppercase tracking-widest flex items-center gap-1",
                         member.verified ? "text-primary bg-rose-50 border-rose-100" : "text-zinc-500"
                       )}>
                         <ShieldCheck className="w-3 h-3" />
                         {member.kyc}
                       </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-200" />
                </div>
              ))}
           </div>
        </section>

        <section>
           <button className="w-full bg-primary text-white font-display font-bold py-5 rounded-3xl shadow-xl shadow-rose-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
              <UserPlus className="w-6 h-6" />
              Add Member
           </button>
           <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-6 px-10 leading-relaxed">
             Adding more than 6 members requires a plan upgrade.
           </p>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
