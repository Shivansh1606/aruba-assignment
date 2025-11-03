import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '₹999',
      period: '/month',
      description: 'Perfect for small projects',
      features: [
        '5 Projects',
        '10 GB Storage',
        'Basic Support',
        'Standard Security',
        'Community Access'
      ],
      color: 'blue',
      popular: false
    },
    {
      name: 'Professional',
      price: '₹2,999',
      period: '/month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited Projects',
        '100 GB Storage',
        'Priority Support',
        'Advanced Security',
        'Team Collaboration',
        'Custom Domain',
        'Analytics Dashboard'
      ],
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Unlimited Storage',
        'Dedicated Support',
        'SLA Guarantee',
        'Custom Integration',
        'Advanced Analytics',
        'White Label Option'
      ],
      color: 'orange',
      popular: false
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
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                  plan.popular ? 'border-4 border-purple-500 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className={`text-${plan.color}-500 flex-shrink-0 mt-0.5`} size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/login')}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">Can I change plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time.</p>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a 14-day free trial with no credit card required.</p>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, UPI, and bank transfers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
