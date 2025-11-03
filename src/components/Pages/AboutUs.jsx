import { useNavigate } from 'react-router-dom';
import { Target, Heart, Users, Award, ArrowLeft } from 'lucide-react';

function AboutUs() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: 'Mission Driven',
      description: 'We are committed to helping businesses succeed through innovative technology solutions.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'We believe in the power of teamwork and collaboration.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every project we undertake.'
    }
  ];

  const team = [
    { name: 'Sanjay Mishra', role: 'CEO', image: '👨‍💼' },
    { name: 'Priya Sharma', role: 'CTO', image: '👩‍💻' },
    { name: 'Rahul Verma', role: 'Head of Design', image: '👨‍🎨' },
    { name: 'Anjali Singh', role: 'Head of Marketing', image: '👩‍💼' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold text-blue-600">Aruba Network</h1>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Aruba Network </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're on a mission to empower businesses with cutting-edge technology solutions
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2020, Aruba Network is a leading technology solutions provider based in Mumbai, 
              India. We have started with a simple vision: to make enterprise-grade 
              technology accessible to businesses of all sizes. What began as a small team of passionate 
              developers has grown into a leading technology solutions provider.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Today, we serve thousands of customers worldwide, helping them streamline their operations, 
              improve productivity, and achieve their business goals through innovative software solutions.
            </p>
            <p className="text-lg text-gray-700">
              Our commitment to excellence, customer satisfaction, and continuous innovation has made us 
              a trusted partner for businesses across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Projects Delivered</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
