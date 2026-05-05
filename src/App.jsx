import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// --- IMAGE IMPORTS ---
import chargeUpImg from './assets/ChargeUp_image.png';
import estateAgentImg from './assets/Estate Agent_image.png'; 
import portfolioImg from './assets/Portfolio_image.png';
import mesithPortfolioImg from './assets/Mesith--portfolio.png'; 

// --- CUSTOM INLINE ICONS ---
const Icons = {
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
  X: () => <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Download: () => <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Linkedin: () => <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  Github: () => <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  ExternalLink: () => <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Facebook: () => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
  Instagram: () => <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const form = useRef();

  const links = {
    facebook: "https://www.facebook.com/share/1CUV4iZ9K4/",
    instagram: "https://www.instagram.com/__mesith__",
    linkedin: "https://www.linkedin.com/in/tashmith-bopage-3aa1b9295/", 
    github: "https://github.com/TashmithBopage",
    chargeUpApp: "https://www.sdgp.lk/project/f50b2c30-c598-46e6-a9e0-f40b4bbd82be",
    estateApp: "https://estate-agent-seven.vercel.app/",
    portfolioApp: "https://my-simple-portfolio-mesith.vercel.app/"
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_qpslitv', 
      'template_tiylmv9', 
      form.current, 
      'UPrRMfPhtRKnSFSf6'
    )
      .then((result) => {
          alert("Message sent successfully!");
          form.current.reset();
      }, (error) => {
          alert("Failed to send message, please try again.");
          console.log(error.text);
      })
      .finally(() => {
          setIsSending(false);
      });
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-slate-900 text-slate-100 selection:bg-[#0D9488]/30 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tighter text-[#0D9488] cursor-pointer"
            style={{ fontFamily: "'Playfair Display', serif" }}
            onClick={() => scrollTo('home')}
          >
            Mesith
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['about', 'experience', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="hover:text-[#0D9488] transition-colors capitalize"
                style={{ letterSpacing: '0.05em' }}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="md:hidden text-[#0D9488]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 flex flex-col px-6 py-4 gap-4 shadow-xl">
            {['about', 'experience', 'projects', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-left text-slate-300 capitalize hover:text-[#0D9488] py-2">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left: Profile Picture */}
          <div className="relative group justify-self-center md:justify-self-start">
            <div className="absolute -inset-4 bg-[#0D9488]/20 blur-2xl rounded-full"></div>
            <div className="relative p-2 rounded-full border-4 border-[#0D9488]/30 bg-slate-800 shadow-[0_0_50px_rgba(13,148,136,0.2)] overflow-hidden w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <img 
                src={mesithPortfolioImg} 
                alt="Mesith Bopage Profile" 
                className="w-full h-full object-cover object-top rounded-full transition-transform duration-500 hover:scale-105" 
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-center md:text-left">
            <span
              className="text-[#0D9488] text-xs tracking-widest uppercase bg-[#0D9488]/10 px-3 py-1 rounded-full border border-[#0D9488]/20"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              CS Undergraduate Student
            </span>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-medium mt-6 leading-snug text-slate-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hi, I'm <span className="text-[#0D9488] font-bold">Mesith Bopage</span> — a Computer Science student at IIT specializing in React, HTML5, CSS3, and Java.
            </h1>
            
            <div className="mt-8 flex flex-wrap gap-5 items-center justify-center md:justify-start">
              <a
                href="/CV.pdf"
                download="Mesith_Bopage_CV.pdf"
                className="flex items-center gap-2 bg-[#0D9488] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0f766e] transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                style={{ letterSpacing: '0.03em' }}
              >
                <Icons.Download /> Download CV
              </a>
              <div className="flex gap-4 text-slate-400 ml-2">
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D9488] transition-all p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-sm hover:shadow-md"><Icons.Linkedin /></a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D9488] transition-all p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-sm hover:shadow-md"><Icons.Github /></a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-24 bg-slate-800 border-y border-slate-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10 text-slate-100"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-[#0D9488]">01.</span> About Me
          </h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed" style={{ fontWeight: 400 }}>
            <p>
              I am a second-year Computer Science undergraduate at the Informatics Institute of Technology (IIT), affiliated with the University of Westminster. I am passionate about software development, with a strong interest in both Full Stack Development and Quality Assurance Engineering.
            </p>
            <p>
              Through my academic and personal projects, I have gained hands-on experience in developing web applications, working with both frontend and backend technologies, and understanding the importance of writing reliable and well-tested code.
            </p>
            <p>
              I am currently seeking an internship opportunity where I can apply my knowledge, gain industry experience, and grow as a software engineering professional.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 max-w-4xl mx-auto px-6 bg-slate-900">
        <h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-100"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-[#0D9488]">02.</span> Experience & Skills
        </h2>
        <div className="space-y-16 border-l-2 border-[#0D9488]/30 pl-8 relative ml-4 md:ml-0">
          
          <div className="relative group">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#0D9488] shadow-[0_0_10px_rgba(13,148,136,0.3)]"></div>
            <h3 className="text-2xl font-bold text-slate-100" style={{ fontFamily: "'Playfair Display', serif" }}>IIT Computer Science Undergraduate</h3>
            <p className="text-slate-400 mt-2 italic" style={{ fontFamily: "'Inter', sans-serif" }}>University of Westminster</p>
            <p className="text-slate-300 mt-4 leading-relaxed" style={{ fontWeight: 400 }}>
              I am an IIT Computer Science undergraduate at the University of Westminster with skills in Python, Java, JavaScript, React. I'm seeking for an internship oppurtunity to apply my knowledge and gain industry experience.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              {['Python', 'Java', 'JavaScript', 'TypeScript'].map(skill => (
                <span key={skill} className="text-sm bg-slate-800 border border-[#0D9488]/30 text-[#0D9488] px-4 py-1.5 rounded-md font-medium tracking-wide" style={{ fontFamily: "'Fira Code', monospace" }}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#0D9488] shadow-[0_0_10px_rgba(13,148,136,0.3)]"></div>
            <h3 className="text-2xl font-bold text-slate-100" style={{ fontFamily: "'Playfair Display', serif" }}>Software Development Group Project Member</h3>
            <p className="text-slate-300 mt-4 leading-relaxed" style={{ fontWeight: 400 }}>
              Worked as a group member on **ChargeUp**, a peer-to-peer vehicle charging app. It's a dual-role system where clients can book chargers and hosts can list chargers to earn money. Contributed to frontend, backend, QR scanning, charging sessions, and payment UI.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              {['React', 'TypeScript', 'JavaScript', 'Tailwind CSS','Node.js', 'MongoDB','Google Maps'].map(skill => (
                <span key={skill} className="text-sm bg-slate-800 border border-[#0D9488]/30 text-[#0D9488] px-4 py-1.5 rounded-md font-medium tracking-wide" style={{ fontFamily: "'Fira Code', monospace" }}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#0D9488] shadow-[0_0_10px_rgba(13,148,136,0.3)]"></div>
            <h3 className="text-2xl font-bold text-slate-100" style={{ fontFamily: "'Playfair Display', serif" }}>IEEE Society Member</h3>
            <p className="text-slate-300 mt-4 leading-relaxed" style={{ fontWeight: 400 }}>
              Member of the IIT IEEE Society, actively engaging in tech events, networking, and collaborative activities to stay updated with industry standards and engineering innovations.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <span className="text-sm bg-slate-800 border border-[#0D9488]/30 text-[#0D9488] px-4 py-1.5 rounded-md font-medium tracking-wide" style={{ fontFamily: "'Fira Code', monospace" }}>Collaboration</span>
              <span className="text-sm bg-slate-800 border border-[#0D9488]/30 text-[#0D9488] px-4 py-1.5 rounded-md font-medium tracking-wide" style={{ fontFamily: "'Fira Code', monospace" }}>Networking</span>
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 bg-slate-800 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-100"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-[#0D9488]">03.</span> Featured Projects
          </h2>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

            {/* Project 1: ChargeUp */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-[#0D9488]/50 hover:shadow-lg hover:shadow-[#0D9488]/10 transition-all flex flex-col group">
              <div className="h-48 bg-slate-800 w-full overflow-hidden border-b border-slate-700">
                <img
                  src={chargeUpImg}
                  alt="ChargeUp Project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>ChargeUp Project</h3>
                <p className="text-[#0D9488] text-sm font-semibold leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Fira Code', monospace" }}>
                  React, JavaScript, TypeScript, Google Maps, NoSQL, Firebase
                </p>
                <div className="flex gap-4">
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Icons.Github /></a>
                  <a href={links.chargeUpApp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Icons.ExternalLink /></a>
                </div>
              </div>
            </div>

            {/* Project 2: Estate Agent */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-[#0D9488]/50 hover:shadow-lg hover:shadow-[#0D9488]/10 transition-all flex flex-col group">
              <div className="h-48 bg-slate-800 w-full overflow-hidden border-b border-slate-700">
                <img
                  src={estateAgentImg}
                  alt="Estate Agent App"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Estate Agent App</h3>
                <p className="text-[#0D9488] text-sm font-semibold leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Fira Code', monospace" }}>
                  React, JavaScript, HTML5, CSS3
                </p>
                <div className="flex gap-4">
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Icons.Github /></a>
                  <a href={links.estateApp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Icons.ExternalLink /></a>
                </div>
              </div>
            </div>

            {/* Project 3: Portfolio */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-[#0D9488]/50 hover:shadow-lg hover:shadow-[#0D9488]/10 transition-all flex flex-col group">
              <div className="h-48 bg-slate-800 w-full overflow-hidden border-b border-slate-700">
                <img
                  src={portfolioImg}
                  alt="Portfolio Project"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Personal Portfolio</h3>
                <p className="text-[#0D9488] text-sm font-semibold leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Fira Code', monospace" }}>
                  HTML5, CSS3, JavaScript
                </p>
                <div className="flex gap-4">
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Icons.Github /></a>
                  <a href={links.portfolioApp} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0D9488] transition-colors"><Icons.ExternalLink /></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 max-w-xl mx-auto px-6 bg-slate-900">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-100"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-[#0D9488]">04.</span> Contact Me
        </h2>
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="text-sm text-slate-400 font-medium ml-1" style={{ letterSpacing: '0.03em' }}>Your Name</label>
              <input name="from_name" required type="text" className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 focus:outline-none focus:border-[#0D9488]/50 focus:bg-slate-800 transition-colors" placeholder="Mesith Bopage" />
            </div>
            <div>
              <label className="text-sm text-slate-400 font-medium ml-1" style={{ letterSpacing: '0.03em' }}>Your Email</label>
              <input name="from_email" required type="email" className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 focus:outline-none focus:border-[#0D9488]/50 focus:bg-slate-800 transition-colors" placeholder="tashmith.20231087@iit.ac.lk" />
            </div>
            <div>
              <label className="text-sm text-slate-400 font-medium ml-1" style={{ letterSpacing: '0.03em' }}>Message</label>
              <textarea name="message" required rows="4" className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 focus:outline-none focus:border-[#0D9488]/50 focus:bg-slate-800 transition-colors resize-none" placeholder="How can I help you?"></textarea>
            </div>
            <button 
              disabled={isSending}
              type="submit" 
              className={`w-full bg-[#0D9488] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0f766e] hover:-translate-y-1'}`} 
              style={{ letterSpacing: '0.05em' }}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-800 bg-slate-900 text-center">
        <div className="flex justify-center gap-8 mb-6 text-slate-400">
          <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D9488] transition-colors hover:scale-110 transform duration-200"><Icons.Facebook /></a>
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D9488] transition-colors hover:scale-110 transform duration-200"><Icons.Instagram /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D9488] transition-colors hover:scale-110 transform duration-200"><Icons.Linkedin /></a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#0D9488] transition-colors hover:scale-110 transform duration-200"><Icons.Github /></a>
        </div>
        <p className="text-slate-500 text-sm font-medium" style={{ letterSpacing: '0.03em' }}>© {new Date().getFullYear()} Mesith Bopage. All rights reserved.</p>
      </footer>
      
    </div>
  );
}