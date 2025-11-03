import { useNavigate } from 'react-router-dom';
import { Building2, Users, Shield, Zap, HeadphonesIcon, TrendingUp, ArrowLeft } from 'lucide-react';

function Enterprise() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Unlimited Team Members',
      description: 'Add unlimited users and teams without any restrictions.'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with SSO, SAML, and custom permissions.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Dedicated Support',
      description: '24/7 priority support with dedicated account manager.'
    },
    {
      icon: Zap,
      title: 'Custom Integration',
      description: 'Custom API integrations and white-label options.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Custom reports, dashboards, and business intelligence tools.'
    },
    {
      icon: Building2,
      title: 'On-Premise Deployment',
      description: 'Deploy on your own infrastructure for complete control.'
    }
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
            onClick={() => navigate('/contact')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Contact Sales
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Building2 size={64} className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Enterprise Solutions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Powerful tools and dedicated support for large organizations
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl"
          >
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Enterprise Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <Icon className="text-blue-600 mb-4" size={40} />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Trusted by Leading Organizations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Company A', 'Company B', 'Company C', 'Company D'].map((company, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Scale Your Business?</h2>
          <p className="text-xl mb-8 text-blue-100">Talk to our enterprise team today</p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl"
          >
            Contact Sales Team
          </button>
        </div>
      </section>
    </div>
  );
}

export default Enterprise;
