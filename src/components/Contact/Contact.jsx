'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const projectTypes = ['Game Icons / Symbols','Character Design','Background Art','UI & Frame Design','Full Game Skin','Animation-Ready Assets','Other'];
const budgets      = ['Under $500','$500 - $1,000','$1,000 - $3,000','$3,000 - $10,000','$10,000+','Let\'s Discuss'];

const contactDetails = [
  { icon:'📧', label:'Email',    value:'hello@slotartist.com', href:'mailto:hello@slotartist.com' },
  { icon:'💬', label:'Telegram', value:'@slotartist',          href:'#' },
  { icon:'🎨', label:'Behance',  value:'behance.net/slotartist',href:'#' },
  { icon:'🌐', label:'LinkedIn', value:'linkedin.com/slotartist',href:'#' },
];

export default function Contact() {
  const [form,      setForm]      = useState({ name:'', email:'', projectType:'', budget:'', message:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const headerRef                 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const inputCls = `w-full px-5 py-3.5 bg-white/70 border border-violet-200/60 rounded-2xl
                    text-[.92rem] text-slate-800 placeholder-gray-400 font-medium outline-none
                    transition-all duration-300 focus:border-violet-500 focus:bg-white/90 focus:ring-4 focus:ring-violet-100/60
                    font-[Outfit]`;

  return (
    <section id="contact" className="py-36 relative overflow-hidden">
      {/* Blobs */}
      <div className="pointer-events-none absolute top-0 -right-36 w-[600px] h-[600px] rounded-full opacity-50"
           style={{ background:'radial-gradient(circle, rgba(124,58,237,.07), transparent 70%)', filter:'blur(80px)' }} />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full opacity-40"
           style={{ background:'radial-gradient(circle, rgba(236,72,153,.06), transparent 70%)', filter:'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="reveal text-center mb-16 flex flex-col items-center gap-5" ref={headerRef}>
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Contact
          </div>
          <h2 className="text-[clamp(2.2rem,3.5vw,3.2rem)] font-black text-slate-900 tracking-tight">
            Let&apos;s Build Something <span className="gradient-text">Incredible</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 leading-relaxed max-w-[460px]">
            Ready to elevate your game&apos;s visuals? Reach out and let&apos;s discuss your project.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">

          {/* ── Left ── */}
          <div className="flex flex-col gap-7">
            {/* Illustration */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/85 shadow-xl shadow-violet-100/40 group">
              <Image src="https://picsum.photos/480/320?random=950" alt="Contact"
                     width={480} height={320} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <div className="absolute inset-0"
                   style={{ background:'linear-gradient(to bottom, transparent 40%, rgba(30,27,75,.45))' }} />
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5
                              bg-white/90 backdrop-blur-md rounded-full text-[.8rem] font-bold text-violet-600 whitespace-nowrap">
                🎨 Let&apos;s Create Together
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              {contactDetails.map((d, i) => (
                <a key={i} href={d.href}
                   className="flex items-center gap-4 px-5 py-4 bg-white/60 backdrop-blur-xl border border-white/85
                              rounded-2xl no-underline shadow-sm shadow-violet-100/40
                              transition-all duration-300 hover:translate-x-2 hover:border-violet-200/60 hover:shadow-md hover:shadow-violet-100/50">
                  <span className="text-xl">{d.icon}</span>
                  <div>
                    <p className="text-[.7rem] text-gray-400 font-bold uppercase tracking-[.07em]">{d.label}</p>
                    <p className="text-[.88rem] font-semibold text-slate-800">{d.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="relative bg-white/65 backdrop-blur-2xl border border-white/90 rounded-[28px] p-12
                          shadow-xl shadow-violet-100/50">
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-[28px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center min-h-[360px]">
                <div className="text-6xl animate-bounce-in">🎉</div>
                <h3 className="text-[1.7rem] font-extrabold text-slate-900">Message Sent!</h3>
                <p className="text-gray-500 leading-relaxed max-w-[320px]">
                  Thanks for reaching out! I&apos;ll review your project details and get back to you within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',projectType:'',budget:'',message:'' }); }}
                        className="mt-2 px-7 py-3 bg-violet-100 text-violet-600 font-bold text-[.9rem] rounded-full
                                   border border-violet-200/60 transition-all duration-300 hover:bg-violet-200/60 cursor-pointer">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-[1.35rem] font-extrabold text-slate-900 mb-2">Send a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[.76rem] font-extrabold text-slate-600 uppercase tracking-[.05em]">Your Name *</label>
                    <input type="text" placeholder="John Doe" required className={inputCls}
                           value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[.76rem] font-extrabold text-slate-600 uppercase tracking-[.05em]">Email Address *</label>
                    <input type="email" placeholder="john@studio.com" required className={inputCls}
                           value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[.76rem] font-extrabold text-slate-600 uppercase tracking-[.05em]">Project Type</label>
                    <select className={inputCls} value={form.projectType}
                            onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}>
                      <option value="">Select type...</option>
                      {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[.76rem] font-extrabold text-slate-600 uppercase tracking-[.05em]">Budget Range</label>
                    <select className={inputCls} value={form.budget}
                            onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}>
                      <option value="">Select budget...</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[.76rem] font-extrabold text-slate-600 uppercase tracking-[.05em]">Tell Me About Your Project *</label>
                  <textarea placeholder="Describe your game's theme, assets needed, timeline..." required rows={5}
                            className={inputCls} style={{ resize:'vertical', minHeight:'120px' }}
                            value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                </div>

                <button type="submit" disabled={loading}
                        className="relative overflow-hidden w-full flex items-center justify-center gap-3 py-4 mt-2
                                   bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 text-white font-bold text-[1rem] rounded-full
                                   shadow-xl shadow-violet-300/50
                                   transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-300/60
                                   disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
