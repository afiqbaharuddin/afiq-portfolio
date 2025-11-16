import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Users, Database, Globe, Layout, Shield, CheckCircle2, Calendar, Clock, Mail, Phone, X } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

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

  const services = [
    {
      icon: Globe,
      title: "Full-Stack Web Development",
      description: "End-to-end web application development using modern frameworks like Laravel, React, and Node.js",
      features: ["Custom Web Applications", "E-commerce Platforms", "Admin Dashboards", "API Integration"]
    },
    {
      icon: Database,
      title: "Backend Systems & APIs",
      description: "Robust server-side architecture with secure authentication, database design, and RESTful APIs",
      features: ["Database Architecture", "REST API Development", "Third-party Integrations", "Performance Optimization"]
    },
    {
      icon: Layout,
      title: "Frontend Development",
      description: "Modern, responsive user interfaces with React, Tailwind CSS, and seamless UX design",
      features: ["Responsive Design", "Interactive UI/UX", "Single Page Applications", "Progressive Web Apps"]
    },
    {
      icon: Rocket,
      title: "Legacy System Modernization",
      description: "Migrate your outdated systems to modern tech stacks with zero downtime",
      features: ["COBOL to Modern Stack", "System Migration", "Code Refactoring", "Performance Enhancement"]
    },
    {
      icon: Shield,
      title: "System Maintenance & Support",
      description: "Ongoing maintenance, bug fixes, and technical support to keep your systems running smoothly",
      features: ["24/7 Support", "Bug Fixes", "Security Updates", "Performance Monitoring"]
    },
    {
      icon: Users,
      title: "Technical Consultation",
      description: "Expert guidance on technology choices, architecture design, and project planning",
      features: ["Technology Stack Selection", "Architecture Planning", "Code Review", "Best Practices"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery Call",
      description: "Free 30-minute consultation to understand your requirements and project scope"
    },
    {
      step: "02",
      title: "Proposal & Quote",
      description: "Detailed project proposal with timeline, deliverables, and transparent pricing"
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development with regular updates and your feedback incorporated"
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Smooth deployment and ongoing support to ensure success"
    }
  ];

  // Booking Modal Component
  const BookingModal = ({ onClose }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Simple alert - no backend or email service
      alert('Thank you for your interest! I will contact you within 24 hours.');
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Book a Free Consultation
            </h3>
            <p className="text-gray-400">Let's discuss your project and how I can help bring it to life</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-gray-100 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-gray-100 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+60 12-345 6789"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-gray-100 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-gray-100">
                  <option>Web Application</option>
                  <option>E-commerce Platform</option>
                  <option>Admin Dashboard</option>
                  <option>API Development</option>
                  <option>System Migration</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
              <textarea
                rows="4"
                placeholder="Tell me about your project requirements, timeline, and any specific features you need..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 text-gray-100 placeholder-gray-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              Schedule Consultation
            </button>

            <p className="text-sm text-gray-400 text-center">
              Response time: Within 24 hours • Free consultation • No commitment required
            </p>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 min-h-screen">
      {/* Booking Modal */}
      {showBookingModal && <BookingModal onClose={() => setShowBookingModal(false)} />}

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-black/80 backdrop-blur-lg shadow-lg border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>
          
          <button
            onClick={() => setShowBookingModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-full font-semibold transition-all"
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-emerald-500/10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-block mb-6 px-6 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full">
            <span className="text-teal-400 font-medium">🚀 Professional Development Services</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Transform Your Ideas
            <br />
            Into Reality
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade full-stack development solutions tailored to your business needs
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-full font-semibold transition-all text-lg shadow-lg shadow-teal-500/20"
            >
              <Rocket size={20} className="group-hover:rotate-12 transition-transform" />
              Start Your Project
            </button>
            <a
              href="mailto:mafqqq16@gmail.com"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full font-semibold transition-all text-lg backdrop-blur-sm"
            >
              <Mail size={20} />
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 px-6 transition-all duration-1000 ${isVisible('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Services I Offer</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive development solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-teal-500/20"
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                  animation: isVisible('services') ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                  opacity: isVisible('services') ? 1 : 0
                }}
              >
                <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="text-teal-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-teal-400">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className={`py-20 px-6 transition-all duration-1000 ${isVisible('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How We Work Together</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A transparent, collaborative process from concept to launch
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="relative"
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                  animation: isVisible('process') ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                  opacity: isVisible('process') ? 1 : 0
                }}
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300">
                  <div className="text-5xl font-bold text-teal-500/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-teal-400">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className={`py-20 px-6 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 transition-all duration-1000 ${isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's transform your ideas into reality. Get a free consultation and detailed project proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-full font-semibold transition-all text-lg inline-flex items-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <Calendar size={20} />
              Book Free Consultation
            </button>
            <a
              href="mailto:mafqqq16@gmail.com"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full font-semibold transition-all text-lg inline-flex items-center gap-2 backdrop-blur-sm"
            >
              <Mail size={20} />
              Send Email
            </a>
          </div>
          <p className="mt-6 text-gray-400">
            <Clock size={16} className="inline mr-2" />
            Typically responds within 24 hours
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-6 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:mafqqq16@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 rounded-xl transition-all border border-teal-500/30">
              <Mail size={20} />
              <span>mafqqq16@gmail.com</span>
            </a>
            <a href="tel:+60175894606" className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 rounded-xl transition-all border border-cyan-500/30">
              <Phone size={20} />
              <span>+60 17-589 4606</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 Muhammad Afiq Baharuddin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
