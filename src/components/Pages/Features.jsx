import { useNavigate } from 'react-router-dom';
import { 
  Zap, Shield, Globe, Code, Database, Cloud, 
  Lock, Users, TrendingUp, CheckCircle, ArrowLeft 
} from 'lucide-react';

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized code and CDN delivery.',
      color: 'yellow'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols to keep your data safe.',
      color: 'purple'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Content delivered from servers closest to your users worldwide.',
      color: 'blue'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Clean APIs and comprehensive documentation for easy integration.',
      color: 'green'
    },
    {
      icon: Database,
      title: 'Real-time Database',
      description: 'Sync data in real-time across all devices and platforms.',
      color: 'orange'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Scalable cloud storage with automatic backups and redundancy.',
      color: 'cyan'
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'GDPR compliant with end-to-end encryption for all data.',
      color: 'red'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time collaboration tools.',
      color: 'pink'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Gain insights with powerful analytics and reporting tools.',
      color: 'indigo'
    }
  ];

  const benefits = [
    'Unlimited projects and team members',
    '99.9% uptime guarantee',
    'Automated backups every hour',
    '24/7 customer support',
    'Free SSL certificates',
    'Custom domain support'
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
          <h1 className="text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications with confidence
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`text-${feature.color}-600`} size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of businesses already using our platform</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}

export default Features;
