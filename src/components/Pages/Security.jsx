import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

function Security() {
  const navigate = useNavigate();

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Encryption',
      description: 'All data is encrypted with AES-256 encryption both at rest and in transit.'
    },
    {
      icon: Lock,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security with 2FA for all user accounts.'
    },
    {
      icon: Eye,
      title: 'Security Monitoring',
      description: '24/7 monitoring and real-time alerts for suspicious activities.'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Ready',
      description: 'GDPR, SOC 2, ISO 27001 compliant infrastructure.'
    }
  ];

  const certifications = [
    'SOC 2 Type II',
    'ISO 27001',
    'GDPR Compliant',
    'HIPAA Ready',
    'PCI DSS Level 1'
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
          <Shield size={64} className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Enterprise-Level Security</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your data security is our top priority. We use industry-leading security measures to protect your information.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Security Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <Icon className="text-blue-600 mb-4" size={40} />
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Certifications & Compliance</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
                <p className="font-semibold">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Security Practices</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3">Regular Security Audits</h3>
              <p className="text-gray-600">We conduct regular third-party security audits and penetration testing to ensure our systems are secure.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3">Data Backup & Recovery</h3>
              <p className="text-gray-600">Automated daily backups with point-in-time recovery options to protect against data loss.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-3">Access Control</h3>
              <p className="text-gray-600">Role-based access control (RBAC) ensures users only have access to what they need.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Security;
