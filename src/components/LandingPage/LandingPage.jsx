import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Users, BarChart3, Shield, 
  Zap, Globe, Sparkles, Star, TrendingUp, Award,
  Code, Database, Cloud, Lock, Menu, X, Phone
} from 'lucide-react';
import { useState } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Build modern web applications with React, Node.js, and cutting-edge technologies.'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Master SQL, MongoDB, and data modeling for robust backend solutions.'
    },
    {
      icon: Cloud,
      title: 'Cloud Deployment',
      description: 'Deploy applications on AWS, Azure, and modern cloud platforms.'
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Implement role-based access control and secure user management.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimize applications for speed, scalability, and user experience.'
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'Production-ready code with best practices and security standards.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '50+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO, Tech Solutions',
      image: '👨‍💼',
      text: 'Outstanding platform! Helped us streamline our entire workflow and increase productivity by 300%.'
    },
    {
      name: 'Priya Sharma',
      role: 'Manager, Digital India',
      image: '👩‍💼',
      text: 'The best investment we made this year. The team is professional and the results speak for themselves.'
    },
    {
      name: 'Amit Patel',
      role: 'Developer, StartupHub',
      image: '👨‍💻',
      text: 'Incredible features and seamless integration. Made our development process 10x faster!'
    }
  ];

  const techStack = [
    'React', 'Node.js', 'Python', 'Django', 'MongoDB', 'PostgreSQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'CI/CD'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
      {/* Modern Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                Aruba Network
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors">
                Features
              </a>
              <a href="#stats" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors">
                Stats
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors">
                Testimonials
              </a>
              <a href="#tech" className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors">
                Tech Stack
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Right Side - CTA Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button className="hidden sm:flex items-center space-x-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 sm:px-5 py-2 sm:py-3 rounded-xl transition-colors font-bold text-xs sm:text-base">
                <Phone size={18} />
                <span className="hidden lg:inline">7078496801</span>
              </button>

              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-lg flex items-center space-x-2"
              >
                <span>Login</span>
                <ArrowRight size={18} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
              <a 
                href="#features" 
                className="block px-4 py-2 text-base text-gray-700 hover:bg-blue-50 rounded-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#stats" 
                className="block px-4 py-2 text-base text-gray-700 hover:bg-blue-50 rounded-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stats
              </a>
              <a 
                href="#testimonials" 
                className="block px-4 py-2 text-base text-gray-700 hover:bg-blue-50 rounded-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#tech" 
                className="block px-4 py-2 text-base text-gray-700 hover:bg-blue-50 rounded-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tech Stack
              </a>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-blue-50 rounded-lg font-semibold"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 sm:pt-40 pb-12 sm:pb-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-64 sm:w-80 h-64 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-64 sm:w-80 h-64 sm:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-20 sm:left-40 w-64 sm:w-80 h-64 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 w-full">
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 sm:px-4 py-2 rounded-full">
                <Star className="text-yellow-500" size={18} />
                <span className="text-xs sm:text-sm font-semibold text-blue-700">
                  #1 Development Platform in India
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your Dream
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Solution
                </span>
              </h1>

              <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
                Empower your business with cutting-edge technology solutions. 
                From web development to cloud deployment, we've got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-bold text-sm sm:text-lg"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-bold text-sm sm:text-lg"
                >
                  Learn More
                </button>
              </div>

              {/* Stats - FIXED FOR MOBILE */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-6 w-full">
                <div className="flex-1 min-w-[100px]">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">10,000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Active Users</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Projects Done</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Satisfied</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Animation - HIDDEN ON MOBILE */}
            <div className="hidden lg:block relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="font-semibold">Real-time Collaboration</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="font-semibold">Advanced Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="font-semibold">24/7 Support</span>
                  </div>
                  <div className="mt-6 p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm opacity-90">Performance</span>
                      <TrendingUp size={20} />
                    </div>
                    <div className="text-3xl font-bold">98.9%</div>
                    <div className="text-sm opacity-90">Uptime Guaranteed</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-base sm:text-xl text-gray-600">Everything you need to build amazing applications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl sm:text-5xl font-bold">{stat.number}</div>
                <div className="text-xs sm:text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-12 sm:py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-base sm:text-xl text-gray-600">Built with industry-leading technologies</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 font-semibold text-gray-700 text-xs sm:text-base"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 sm:py-20 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-base sm:text-xl text-gray-600">Trusted by thousands of businesses worldwide</p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-12">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4">{testimonials[activeTestimonial].image}</div>
                <p className="text-base sm:text-xl text-gray-700 mb-6 italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
                <div className="text-gray-600 text-sm sm:text-base">{testimonials[activeTestimonial].role}</div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="mx-auto mb-6" size={48} />
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">
            Join thousands of businesses already using our platform
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles size={24} />
                <span className="text-lg font-bold">Aruba Network</span>
              </div>
              <p className="text-gray-400 text-sm">Building the future of digital solutions</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm sm:text-base">Product</h3>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><button onClick={() => navigate('/features')} className="hover:text-white">Features</button></li>
                <li><button onClick={() => navigate('/pricing')} className="hover:text-white">Pricing</button></li>
                <li><button onClick={() => navigate('/security')} className="hover:text-white">Security</button></li>
                <li><button onClick={() => navigate('/enterprise')} className="hover:text-white">Enterprise</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><button onClick={() => navigate('/about')} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => navigate('/careers')} className="hover:text-white">Careers</button></li>
                <li><button onClick={() => navigate('/blog')} className="hover:text-white">Blog</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-sm sm:text-base">Connect</h3>
              <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>© 2025 Aruba Network. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
