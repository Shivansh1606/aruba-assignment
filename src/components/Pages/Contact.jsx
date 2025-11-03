import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Send, ArrowLeft, Sparkles, Clock, CheckCircle } from 'lucide-react';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields!');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
      {/* Navbar */}
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

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 sm:px-5 py-2 sm:py-3 rounded-xl transition-colors font-bold text-xs sm:text-base"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Back</span>
              </button>

              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 sm:pt-40 pb-12 sm:pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-64 sm:w-80 h-64 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-64 sm:w-80 h-64 sm:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Get In
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Touch With Us
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Email</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-1">info@arubanetwork.com</p>
              <p className="text-gray-600 text-sm sm:text-base">support@arubanetwork.com</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">We reply within 24 hours</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Phone className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Phone</h3>
              <p className="text-gray-600 text-sm sm:text-base font-semibold">+91 7078496801</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">Mon-Fri, 9am-6pm IST</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Office</h3>
              <p className="text-gray-600 text-sm sm:text-base">Ghaziabad, Uttar Pradesh</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">India - 201009</p>
            </div>
          </div>

          {/* Form & Info Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your message..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send size={20} />
                  <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Right Side Info */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={20} />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={20} />
                    <span>Saturday: 10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={20} />
                    <span>Sunday: Closed</span>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Why Contact Us?</h3>

                <div className="space-y-4">
                  {[
                    'Quick response to your inquiries',
                    'Expert support team available',
                    'Partnership opportunities',
                    'Custom solutions for your needs'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-blue-600" size={18} />
                      </div>
                      <span className="text-gray-700 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: 'What is your response time?',
                  a: 'We typically respond within 24 hours during business hours.'
                },
                {
                  q: 'Do you offer phone support?',
                  a: 'Yes! Call us at +91 7078496801, Mon-Fri, 9am-6pm IST.'
                },
                {
                  q: 'How can I become a partner?',
                  a: 'Contact us directly with your proposal. We review partnerships regularly.'
                },
                {
                  q: 'What are your service hours?',
                  a: 'Mon-Fri 9am-6pm IST. We respond to emails 24/7.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-500 transition-all">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
}

export default Contact;
