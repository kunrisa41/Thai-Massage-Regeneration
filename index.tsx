
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Phone, MapPin, Menu, X, 
  Award, Check, ShieldCheck, 
  Thermometer, Heart, Info
} from 'lucide-react';

const colors = {
  darkBrown: "#3D261C",
  lightBrown: "#8B5E3C",
  gold: "#D4AF37",
  darkGold: "#B8860B", 
  darkRed: "#7C0A02",
  veryDarkRed: "#2A0401",
  cream: "#F9F6F0",
  white: "#FFFFFF",
  black: "#0D0705"
};

type Language = 'de' | 'en';

const translations: Record<Language, any> = {
  de: {
    nav_home: "Start",
    nav_treatments: "Anwendungen",
    nav_contact: "Kontakt",
    nav_book: "Anfragen",
    hero_title: "Thai Wellness für Frauen",
    hero_subtitle: "Ihre persönliche Wohlfühlzeit in Erkelenz",
    hero_tagline: "Regeneration · Wärme · Individuelle Betreuung",
    hero_btn: "Anwendungen entdecken",
    phil_label: "🌿 Ihre private Auszeit",
    phil_title: "Ruhe und neue Energie finden",
    phil_desc: "In meinem behaglichen Wohlfühlraum im Oerather Mühlenfeld biete ich Ihnen einen Rückzugsort vom Alltag. Jede Anwendung wird mit viel Ruhe und Sorgfalt durchgeführt, um gezielt Verspannungen im Nacken- und Rückenbereich zu lösen. Hier stehen Sie als Frau im Mittelpunkt – ganz ohne Hektik, in einer privaten und vertrauensvollen Atmosphäre.",
    quality_title: "Persönlicher Qualitätsanspruch",
    quality_item1_title: "Fachkundig",
    quality_item1_desc: "Zertifizierte Ausbildung mit Liebe zum Detail.",
    quality_item2_title: "Individuell",
    quality_item2_desc: "Keine Massenabfertigung, nur Zeit für Sie.",
    quality_item3_title: "Geborgenheit",
    quality_item3_desc: "Ein warmer, privater Ort zum Entspannen.",
    quality_item4_title: "Exklusiv",
    quality_item4_desc: "Ein geschützter Raum ausschließlich für Frauen.",
    hinweis_title: "Gut zu wissen",
    hinweis_line1: "Meine Anwendungen dienen der reinen Entspannung und Gesundheitsvorsorge.",
    hinweis_line2: "Termine finden ausschließlich nach vorheriger Vereinbarung statt.",
    hinweis_line3: "Professionelle Wellness-Anwendungen in privatem Ambiente.",
    treatments_label: "Meine Anwendungen",
    treatments_title: "Wohlfühlmomente",
    price_label: "HONORAR",
    contact_label: "ANFAHRT",
    contact_title: "Kontakt & Ort",
    reservation_label: "TERMINE NUR NACH VEREINBARUNG",
    opening_label: "ZEITEN: DIENSTAG – FREITAG",
    opening_note: "TELEFONISCHE ANFRAGE ERFORDERLICH.",
    call_btn: "TERMIN ANFRAGEN",
    book_now: "TERMIN ANFRAGEN",
    service1_title: "Nacken- & Rücken-Fokus",
    service1_tag: "Gezielte Entspannung",
    service1_intro: "BESONDERS WOHLTUEND BEI:",
    service1_bullets: [
      "Verspannter Schultermuskulatur",
      "Belastung durch Büroarbeit",
      "Wunsch nach tieเฟอร์ Ruhe",
      "Alltagssorgen einfach loslassen"
    ],
    service1_note: "Mit sanftem Druck und fließenden Bewegungen sorge ich für spürbare Erleichterung und Momente der Stille.",
    service1_effect_title: "Das Gefühl danach:",
    service1_effects: ["Leichtigkeit", "Innere Ruhe", "Vitalität"],
    service2_title: "Kombinations-Auszeit",
    service2_tag: "Das Rundum-Wohlfühlpaket",
    service2_intro: "EINE HARMONISCHE EINHEIT AUS:",
    service2_bullets: [
      "Achtsamer Wellness-Massage",
      "Tiefenwärme durch Hot-Stones",
      "Duftenden Kräuterstempeln"
    ],
    service2_note: "Gönnen Sie sich diese intensive Zeit der Regeneration – ideal zum Auftanken Ihrer Energiereserves."
  },
  en: {
    nav_home: "Home",
    nav_treatments: "Treatments",
    nav_contact: "Contact",
    nav_book: "Inquiry",
    hero_title: "Thai Wellness for Women",
    hero_subtitle: "Your personal timeout in Erkelenz",
    hero_tagline: "Regeneration · Warmth · Individual Care",
    hero_btn: "Explore Treatments",
    phil_label: "🌿 Your Private Retreat",
    phil_title: "Find Peace and New Energy",
    phil_desc: "In my cozy sanctuary in Oerather Mühlenfeld, I offer you a retreat from everyday life. Every session is performed with great peace and care, specifically to release tension in the neck and back area. Here, you are the focus – without haste, in a private and trusting atmosphere.",
    quality_title: "Personal Quality Promise",
    quality_item1_title: "Expertise",
    quality_item1_desc: "Certified training with attention to detail.",
    quality_item2_title: "Individual",
    quality_item2_desc: "No mass processing, just time for you.",
    quality_item3_title: "Cozy",
    quality_item3_desc: "A warm, private place to relax.",
    quality_item4_title: "Exclusive",
    quality_item4_desc: "A protected space exclusively for women.",
    hinweis_title: "Good to know",
    hinweis_line1: "My applications serve pure relaxation and health prevention.",
    hinweis_line2: "Appointments take place exclusively by prior arrangement.",
    hinweis_line3: "Professional wellness sessions in a private setting.",
    treatments_label: "My Services",
    treatments_title: "Moments of Well-being",
    price_label: "FEE",
    contact_label: "LOCATION",
    contact_title: "Contact & Info",
    reservation_label: "APPOINTMENTS BY ARRANGEMENT ONLY",
    opening_label: "TIMES: TUESDAY – FRIDAY",
    opening_note: "TELEPHONE INQUIRY REQUIRED.",
    call_btn: "REQUEST APPOINTMENT",
    book_now: "REQUEST APPOINTMENT",
    service1_title: "Neck & Back Focus",
    service1_tag: "Targeted Relaxation",
    service1_intro: "ESPECIALLY BENEFICIAL FOR:",
    service1_bullets: [
      "Tense shoulder muscles",
      "Strain from office work",
      "Desire for deep peace",
      "Letting go of daily worries"
    ],
    service1_note: "With gentle pressure and flowing movements, I provide noticeable relief and moments of silence.",
    service1_effect_title: "The feeling after:",
    service1_effects: ["Lightness", "Inner peace", "Vitality"],
    service2_title: "Combination Timeout",
    service2_tag: "Full Wellness Package",
    service2_intro: "A HARMONIOUS BLEND OF:",
    service2_bullets: [
      "Mindful wellness massage",
      "Deep heat with hot stones",
      "Fragrant herbal stamps"
    ],
    service2_note: "Treat yourself to this intensive time of regeneration – ideal for recharging your energy reserves."
  }
};

const shopInfo = {
  logoUrl: "https://img2.pic.in.th/logo1ceb0440312f4c5ef.png",
  address: "Dinslakener Ring 27",
  city: "41812 Erkelenz",
  country: "Germany",
  phone: "0151 64319130",
  phoneLink: "tel:015164319130",
  googleMapsUrl: "https://maps.app.goo.gl/97goEDK13nSJivCx5"
};

const App = () => {
  const [lang, setLang] = useState<Language>('de');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen antialiased" style={{ backgroundColor: colors.cream, color: colors.darkBrown }}>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-1.5 shadow-lg' : 'py-4'}`} 
           style={{ backgroundColor: scrolled ? 'rgba(249, 246, 240, 0.98)' : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <img src={shopInfo.logoUrl} alt="Logo" className={`${scrolled ? 'h-8 md:h-11' : 'h-10 md:h-15'} transition-all`} />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[9px] sm:text-xs md:text-sm tracking-wider uppercase leading-tight" style={{ color: colors.darkRed }}>Thai Wellness für Frauen</span>
              <span className="text-[6px] sm:text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-medium opacity-80" style={{ color: colors.veryDarkRed }}>Privat & Exklusiv</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-7">
            {['nav_home', 'nav_treatments', 'nav_contact'].map((key) => (
              <button 
                key={key} 
                onClick={() => key === 'nav_home' ? window.scrollTo({top:0, behavior:'smooth'}) : scrollToSection(key === 'nav_treatments' ? 'behandlungen' : 'kontakt')}
                className="text-[9px] font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
              >
                {t[key]}
              </button>
            ))}
            <div className="flex bg-black/5 p-1 rounded-full border border-black/5">
              <button onClick={() => setLang('de')} className={`px-2 py-0.5 text-[8px] font-bold rounded-full ${lang === 'de' ? 'bg-white shadow-sm' : 'opacity-40'}`}>DE</button>
              <button onClick={() => setLang('en')} className={`px-2 py-0.5 text-[8px] font-bold rounded-full ${lang === 'en' ? 'bg-white shadow-sm' : 'opacity-40'}`}>EN</button>
            </div>
            <a href={shopInfo.phoneLink} className="px-5 py-2 rounded-full text-[9px] font-bold text-white uppercase tracking-widest transition-all hover:scale-105" style={{ backgroundColor: colors.darkRed }}>{t.nav_book}</a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-darkBrown">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-[52px] z-50 flex flex-col p-8 space-y-6 animate-in slide-in-from-top duration-300" style={{ backgroundColor: colors.cream }}>
            <button onClick={() => {window.scrollTo({top:0}); setIsMenuOpen(false)}} className="text-lg font-serif font-bold text-left uppercase">{t.nav_home}</button>
            <button onClick={() => scrollToSection('behandlungen')} className="text-lg font-serif font-bold text-left uppercase">{t.nav_treatments}</button>
            <button onClick={() => scrollToSection('kontakt')} className="text-lg font-serif font-bold text-left uppercase">{t.nav_contact}</button>
            <div className="pt-4 border-t flex flex-col gap-5">
               <div className="flex gap-3">
                  <button onClick={() => setLang('de')} className={`flex-1 py-3 rounded-xl text-[9px] font-bold ${lang === 'de' ? 'bg-stone-200' : 'bg-stone-100 opacity-50'}`}>DEUTSCH</button>
                  <button onClick={() => setLang('en')} className={`flex-1 py-3 rounded-xl text-[9px] font-bold ${lang === 'en' ? 'bg-stone-200' : 'bg-stone-100 opacity-50'}`}>ENGLISH</button>
               </div>
               <a href={shopInfo.phoneLink} className="w-full py-4 text-center text-white font-bold rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-lg" style={{ backgroundColor: colors.darkRed }}>{t.nav_book}</a>
            </div>
          </div>
        )}
      </nav>

      <main>
        <section className="relative h-[45vh] md:h-screen flex items-center justify-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=2000" 
               className="absolute inset-0 w-full h-full object-cover" alt="Hot Stone Massage" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
            <img src={shopInfo.logoUrl} className="h-16 md:h-40 mb-3 drop-shadow-2xl" alt="Logo" />
            <h1 className="text-white font-serif mb-2 leading-tight">
              <span className="text-xl md:text-5xl block font-bold uppercase tracking-tight">{t.hero_title}</span>
              <span className="text-[8px] md:text-lg block italic opacity-95 uppercase tracking-[0.2em]">{t.hero_subtitle}</span>
            </h1>
            <p className="text-white text-[6px] md:text-sm font-bold uppercase tracking-[0.3em] opacity-80 mb-6">{t.hero_tagline}</p>
            <button onClick={() => scrollToSection('behandlungen')} className="px-8 py-3 rounded-full text-[8px] md:text-xs font-bold text-white uppercase tracking-[0.2em] transition-transform hover:scale-105 shadow-xl" style={{ backgroundColor: colors.darkRed }}>{t.hero_btn}</button>
          </div>
        </section>

        <section className="py-16 md:py-28 px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
           <div className="w-full md:w-[60%] space-y-4 text-left">
              <div className="flex items-center gap-2">
                 <Heart className="w-4 h-4" style={{ color: colors.darkRed }} />
                 <span className="text-[9px] md:text-[12px] font-black uppercase tracking-widest" style={{ color: colors.darkRed }}>{t.phil_label}</span>
              </div>
              <h2 className="text-xl md:text-3xl font-serif leading-tight font-bold">{t.phil_title}</h2>
              <div className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.gold }}></div>
              <p className="text-stone-600 text-sm md:text-lg leading-relaxed font-light">{t.phil_desc}</p>
           </div>
           <div className="w-full md:w-[40%]">
              <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-[3/2] border-4 md:border-6 border-white">
                <img src="https://img2.pic.in.th/2025-12-24-1.webp" className="w-full h-full object-cover" alt="Wellness Session" />
              </div>
           </div>
        </section>

        <section id="behandlungen" className="py-16 md:py-28 px-4 md:px-8" style={{ backgroundColor: colors.darkBrown }}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center text-white space-y-3 mb-12">
               <span className="text-[9px] tracking-[0.5em] uppercase opacity-60" style={{ color: colors.gold }}>{t.treatments_label}</span>
               <h2 className="text-2xl md:text-4xl font-serif font-bold">{t.treatments_title}</h2>
               <div className="w-10 h-0.5 bg-gold mx-auto opacity-30"></div>
            </div>

            <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="p-8 md:p-12 md:w-[68%] space-y-6 text-left">
                <span className="px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest" style={{ backgroundColor: colors.darkBrown, color: colors.gold }}>{t.service1_tag}</span>
                <h3 className="text-xl md:text-3xl font-serif font-bold">{t.service1_title}</h3>
                <p className="text-stone-500 text-sm md:text-base leading-relaxed">{t.service1_note}</p>
                <div className="space-y-4">
                  <span className="text-gold text-[9px] font-black uppercase tracking-widest block">{t.service1_intro}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(t.service1_bullets as string[]).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium"><Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" /> <span>{b}</span></div>
                    ))}
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <span className="text-stone-400 text-[9px] font-bold uppercase tracking-widest block">{t.service1_effect_title}</span>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {(t.service1_effects as string[]).map((e, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                         <span className="text-darkBrown text-[9px] md:text-xs font-bold uppercase tracking-widest opacity-60">{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-stone-50 p-8 md:p-12 md:w-[32%] flex flex-col justify-between items-center text-center border-t md:border-t-0 md:border-l">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">{t.price_label}</span>
                <div className="flex-1 flex flex-col justify-center py-6">
                  <div className="text-5xl md:text-6xl font-serif font-bold">€50</div>
                  <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em] mt-2">60 MIN</span>
                </div>
                <a href={shopInfo.phoneLink} className="w-full py-5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105" style={{ backgroundColor: colors.darkRed }}>{t.book_now}</a>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="p-8 md:p-12 md:w-[68%] space-y-6 text-left">
                <span className="px-3 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest" style={{ backgroundColor: colors.darkBrown, color: colors.gold }}>{t.service2_tag}</span>
                <h3 className="text-xl md:text-3xl font-serif font-bold">{t.service2_title}</h3>
                <p className="text-stone-500 text-sm md:text-base leading-relaxed">{t.service2_note}</p>
                <div className="space-y-4">
                   <span className="text-gold text-[9px] font-black uppercase tracking-widest block">{t.service2_intro}</span>
                   <div className="flex flex-wrap gap-3">
                     {(t.service2_bullets as string[]).map((b, i) => (
                       <span key={i} className="bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold text-darkBrown">{b}</span>
                     ))}
                   </div>
                </div>
              </div>
              <div className="bg-stone-50 p-8 md:p-12 md:w-[32%] flex flex-col justify-between items-center text-center border-t md:border-t-0 md:border-l">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em]">{t.price_label}</span>
                <div className="flex-1 flex flex-col justify-center py-6 w-full gap-8">
                    <div className="space-y-1">
                      <div className="text-4xl md:text-5xl font-serif font-bold">€75</div>
                      <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">90 MIN</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-4xl md:text-5xl font-serif font-bold">€100</div>
                      <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">120 MIN</span>
                    </div>
                </div>
                <a href={shopInfo.phoneLink} className="w-full py-5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105" style={{ backgroundColor: colors.darkRed }}>{t.book_now}</a>
              </div>
            </div>

            <div className="bg-white/35 backdrop-blur-md border border-white/40 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 shadow-sm">
               <div className="p-4 rounded-full bg-white/60 flex-shrink-0 shadow-sm">
                  <Info className="w-8 h-8" style={{ color: colors.darkGold }} />
               </div>
               <div className="text-center md:text-left space-y-1.5">
                  <p className="text-white text-lg font-serif font-bold uppercase tracking-wide">{t.hinweis_title}</p>
                  <p className="text-white/95 text-xs md:text-sm font-light leading-relaxed">{t.hinweis_line1} {t.hinweis_line2}</p>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] pt-0.5" style={{ color: colors.darkGold }}>{t.hinweis_line3}</p>
               </div>
            </div>
          </div>
        </section>

        <section id="qualitaet" className="py-16 md:py-28 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest">{t.quality_title}</h2>
                <div className="w-12 h-1 bg-gold mx-auto mt-3 rounded-full"></div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
               {[1,2,3,4].map(i => (
                 <div key={i} className="text-center p-6 bg-cream/30 rounded-[2rem] space-y-3 border border-cream transition-all hover:shadow-lg hover:bg-white group">
                    <div className="flex justify-center transform group-hover:scale-110 transition-transform">
                      {i===1 && <Award className="w-8 h-8" style={{ color: colors.darkGold }} />}
                      {i===2 && <Heart className="w-8 h-8" style={{ color: colors.darkGold }} />}
                      {i===3 && <Thermometer className="w-8 h-8" style={{ color: colors.darkGold }} />}
                      {i===4 && <ShieldCheck className="w-8 h-8" style={{ color: colors.darkGold }} />}
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-darkBrown">{t[`quality_item${i}_title`]}</h4>
                    <p className="text-[9px] md:text-[11px] text-stone-400 leading-relaxed font-medium">{t[`quality_item${i}_desc`]}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        <section id="kontakt" className="py-16 md:py-28 px-6" style={{ backgroundColor: colors.darkBrown }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] flex flex-col space-y-8 shadow-2xl relative overflow-hidden">
               <div className="space-y-1">
                 <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: colors.darkGold }}>{t.contact_label}</span>
                 <h2 className="text-2xl md:text-3xl font-serif font-bold">{t.contact_title}</h2>
               </div>
               <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors" onClick={() => window.open(shopInfo.googleMapsUrl)}>
                  <MapPin className="w-6 h-6" style={{ color: colors.darkGold }} />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm md:text-base leading-tight" style={{ color: colors.darkGold }}>{shopInfo.address}, {shopInfo.city}</span>
                    <span className="text-[8px] opacity-60 uppercase font-black tracking-widest">{shopInfo.country}</span>
                  </div>
               </div>
               <div className="relative flex-1 min-h-[220px] rounded-xl overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-80 transition-transform duration-1000 group-hover:scale-105" alt="Location Map" />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gold shadow-2xl flex items-center justify-center ring-6 ring-gold/20 animate-bounce cursor-pointer" onClick={() => window.open(shopInfo.googleMapsUrl)}>
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                  </div>
               </div>
               <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
            </div>

            <div className="flex flex-col justify-center items-center text-center p-10 space-y-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
               <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: colors.darkGold }}>{t.reservation_label}</span>
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 ring-6 ring-white/5">
                  <Phone className="w-10 h-10 md:w-11 md:h-11" style={{ color: colors.darkGold }} />
               </div>
               <h2 className="text-3xl md:text-6xl font-serif font-bold text-white tracking-tighter whitespace-nowrap">{shopInfo.phone}</h2>
               <a href={shopInfo.phoneLink} className="px-10 py-6 md:py-7 rounded-xl text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-xl transition-all hover:scale-105" style={{ backgroundColor: colors.darkRed }}>{t.call_btn}</a>
               <div className="space-y-1.5">
                  <p className="font-black text-[11px] md:text-[13px] tracking-widest uppercase" style={{ color: colors.darkGold }}>{t.opening_label}</p>
                  <p className="text-[9px] md:text-[10px] text-white/50 italic font-bold uppercase tracking-widest opacity-80">{t.opening_note}</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 md:py-20 px-8 border-t border-black/5" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
           <div className="space-y-6">
              <img src={shopInfo.logoUrl} alt="Footer Logo" className="h-14 w-auto" />
              <p className="text-stone-500 text-sm md:text-base font-light leading-relaxed max-w-sm italic">
                "Professionelle Wellness-Auszeiten in privater Atmosphäre – Zeit für Ruhe, Regeneration und Wohlbefinden im Herzen von Erkelenz."
              </p>
           </div>
           
           <div className="space-y-5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-darkBrown border-b border-stone-100 pb-2">Lage</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                   <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                   <p className="text-stone-500 text-[10px] font-medium leading-relaxed uppercase tracking-wider">
                     {shopInfo.address}<br />{shopInfo.city}<br />{shopInfo.country}
                   </p>
                </div>
                <div className="flex items-center gap-3">
                   <Phone className="w-4 h-4 text-gold" />
                   <p className="text-stone-500 text-[10px] font-bold tracking-wider whitespace-nowrap">{shopInfo.phone}</p>
                </div>
              </div>
           </div>
        </div>
        <div className="max-w-6xl mx-auto pt-10 mt-10 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-40">© Thai Wellness für Frauen. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const init = () => {
  const container = document.getElementById('root');
  if (container) {
    try {
      const root = createRoot(container);
      root.render(<App />);
    } catch (e) {
      console.error('Mount Error:', e);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
