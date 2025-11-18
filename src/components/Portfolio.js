import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Linkedin, Mail, Phone, MapPin, ChevronDown, Briefcase, GraduationCap, Award, Code, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const experience = [
    {
      id: 'benpay',
      period: "December 2024 – Present",
      role: "Software Engineer",
      company: "Aarorn Technologies Sdn Bhd",
      location: "Bukit Bintang, Kuala Lumpur",
      project: "Perkeso Core Payment System (Benpay)",
      highlights: [
        "Leading end-to-end redevelopment of legacy COBOL systems to PHP Laravel",
        "Managing large-scale data processing with sensitive citizen data",
        "Building robust back-end with complex reporting modules",
        "Optimized performance for high-volume transactions",
        "Designed intuitive UI for payment processing"
      ],
      tech: ["PHP", "Laravel", "Laravel Livewire", "Redis", "MySQL", "Laravel Queue"],
      images: [
        { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", caption: "Dashboard Overview" },
        { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", caption: "Payment Processing Interface" },
        { url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800", caption: "Reporting Module" }
      ],
      description: "Modernizing Perkeso's legacy COBOL-based payment systems into a unified platform called Benpay. This critical system manages SOCSO contributions and payments for millions of Malaysian citizens, requiring exceptional precision, scalability, and security."
    },
    {
      id: 'synergy',
      period: "July 2024 – December 2024",
      role: "PHP Programmer",
      company: "Synergy Malaysia",
      location: "Petaling Jaya, Selangor",
      project: "Event Management & Green Initiative System",
      highlights: [
        "Enhanced Event Management System using pure PHP",
        "Integrated Meta WhatsApp Business API for event registration",
        "Implemented QR code check-in system",
        "Explored wati.io for WhatsApp message blast integration"
      ],
      tech: ["PHP", "Laravel", "MySQL", "WhatsApp Business API"],
      images: [
        { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Event Management Dashboard" },
        { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800", caption: "QR Code Check-in System" },
        { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800", caption: "WhatsApp Integration" }
      ],
      description: "Developed and enhanced Synergy's internal Event Management System with a focus on the Green Initiative Program. Integrated modern communication channels for seamless participant registration and event day operations."
    },
    {
      id: 'cr8tive',
      period: "September 2022 – July 2024",
      role: "Senior Software Engineer",
      company: "Cr8tive Solutions",
      location: "Cheras, Selangor",
      project: "Parkson & Gas Malaysia Projects",
      highlights: [
        "Developed Parkson Admin Portal and Voucher System from scratch",
        "Acted as System Analyst for Gas Malaysia E-Services Portal",
        "Led UI/UX design and development",
        "Managed UAT process and client interactions",
        "System maintenance and technical support"
      ],
      tech: ["PHP", "CodeIgniter 3/4", "MySQL", "MariaDB", "RESTful API"],
      images: [
        { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", caption: "Admin Portal Interface" },
        { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800", caption: "Voucher Management System" },
        { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", caption: "Gas Malaysia E-Services Portal" }
      ],
      description: "Led multiple enterprise-level projects including Parkson's voucher management system and Gas Malaysia's industrial portal. Responsible for full-stack development, system analysis, and client communication."
    }
  ];

  const skills = [
    { category: "Backend", items: ["PHP", "Laravel", "CodeIgniter", "NodeJs", "MySQL"] },
    { category: "Frontend", items: ["ReactJs", "JavaScript", "HTML5", "CSS", "Tailwind"] },
    { category: "Tools", items: ["Git", "RESTful API", "Redis", "Figma", "VS Code"] }
  ];

  // Project Detail View Component
  const ProjectDetailView = ({ project, onClose }) => {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
        <div className="min-h-screen py-12 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors mb-6"
              >
                <ArrowLeft size={20} />
                Back to Experience
              </button>
              
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <h2 className="text-4xl font-bold text-teal-400 mb-3">{project.role}</h2>
                <h3 className="text-2xl text-cyan-400 mb-4">{project.project}</h3>
                <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                  <span>{project.company}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.period}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Portfolio Images */}
            <div className="mb-8">
              <h4 className="text-2xl font-bold mb-6 text-gray-100">Project Screenshots</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0">
                      <p className="text-gray-200 font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <h4 className="text-2xl font-bold mb-6 text-gray-100">Key Contributions</h4>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <ul className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="text-teal-400 mt-1 text-xl">▹</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-2xl font-bold mb-6 text-gray-100">Technologies Used</h4>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-teal-500/10 text-teal-400 rounded-lg text-sm border border-teal-500/20 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show project detail view if selected
  if (selectedProject) {
    return <ProjectDetailView project={selectedProject} onClose={() => setSelectedProject(null)} />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-teal-500/5' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            MA
          </h1>
          
          <div className="hidden md:flex gap-8 items-center">
            {['about', 'experience', 'skills', 'education', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-300 hover:text-teal-400 transition-colors capitalize"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => navigate('/services')}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-full font-semibold transition-all shadow-lg shadow-teal-500/20"
            >
              <Calendar size={18} />
              Book Services
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            {['about', 'experience', 'skills', 'education', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-6 py-3 text-gray-300 hover:bg-teal-500/10 hover:text-teal-400 capitalize"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => navigate('/services')}
              className="block w-full text-left px-6 py-3 text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 font-semibold"
            >
              Book Services
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-cyan-500/5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
              Muhammad Afiq Baharuddin
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Software Engineer | Full Stack Developer
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Versatile Software Engineer specializing in cutting-edge technologies and agile methodologies. 
              Proven track record of enhancing system performance and delivering user-centric solutions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:mafqqq16@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-full transition-all border border-teal-500/20">
              <Mail size={20} />
              Email
            </a>
            <a href="https://www.linkedin.com/in/afiq-baharuddin-481a98247" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-all border border-cyan-500/20">
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a href="tel:+60175894606" className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-full transition-all border border-emerald-500/20">
              <Phone size={20} />
              Call
            </a>
          </div>

          <button onClick={() => scrollToSection('about')} className="animate-bounce">
            <ChevronDown size={32} className="text-teal-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 transition-all duration-1000 ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Code className="text-teal-400" />
            </div>
            About Me
          </h3>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="text-teal-400 mt-1" size={20} />
              <div>
                <p className="text-gray-300 mb-2">Based in Selangor, Malaysia</p>
                <p className="text-gray-400 text-sm">Available to relocate anywhere</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with expertise in building scalable web applications. 
              My experience spans from modernizing legacy systems to developing cutting-edge solutions 
              using PHP, Laravel, React, and various modern technologies. I thrive on solving complex 
              problems and delivering high-quality, user-centric applications.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-6 transition-all duration-1000 ${isVisible('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Briefcase className="text-cyan-400" />
            </div>
            Work Experience
          </h3>
          <div className="space-y-8">
            {experience.map((job, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProject(job)}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-2xl font-bold text-teal-400 group-hover:text-teal-300 transition-colors">{job.role}</h4>
                    <ExternalLink className="text-gray-500 group-hover:text-teal-400 transition-colors" size={20} />
                  </div>
                  <p className="text-xl text-gray-300 mb-1">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span>{job.period}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  {job.project && (
                    <p className="text-cyan-400 mt-2 font-medium">{job.project}</p>
                  )}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {job.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-teal-400 mt-1">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm border border-teal-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-teal-400 group-hover:text-teal-300 flex items-center gap-2 font-medium">
                  View full project details
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-6 transition-all duration-1000 ${isVisible('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Award className="text-emerald-400" />
            </div>
            Skills & Technologies
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((category, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h4 className="text-xl font-bold mb-4 text-emerald-400">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-lg text-sm border border-slate-600/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-20 px-6 transition-all duration-1000 ${isVisible('education') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-emerald-400" />
            </div>
            Education
          </h3>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h4 className="text-2xl font-bold text-emerald-400 mb-2">Bachelor of Computer Science (Hons.)</h4>
              <p className="text-xl text-gray-300 mb-2">Multimedia Computing</p>
              <p className="text-gray-400 mb-2">MARA Technological University (UiTM) - Jasin, Melaka</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400">2020 – 2022</span>
                <span className="text-teal-400 font-medium">CGPA: 3.29</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h4 className="text-2xl font-bold text-emerald-400 mb-2">Diploma in Mechanical Engineering</h4>
              <p className="text-xl text-gray-300 mb-2">Manufacturing</p>
              <p className="text-gray-400 mb-2">MARA Technological University (UiTM) - Permatang Pauh, Pulau Pinang</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400">2019 – 2020</span>
                <span className="text-teal-400 font-medium">CGPA: 3.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 transition-all duration-1000 ${isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8">Let's Connect</h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="mailto:mafqqq16@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 rounded-xl transition-all border border-teal-500/30">
              <Mail size={24} />
              <span>mafqqq16@gmail.com</span>
            </a>
            <a href="tel:+60175894606" className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 rounded-xl transition-all border border-cyan-500/30">
              <Phone size={24} />
              <span>+60 17-589 4606</span>
            </a>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/services')}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-xl font-semibold transition-all shadow-lg shadow-teal-500/20 text-lg"
            >
              <Calendar size={24} />
              Book a Service
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p>© 2024 Muhammad Afiq Baharuddin. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
