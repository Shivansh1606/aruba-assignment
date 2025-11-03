import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

function Careers() {
  const navigate = useNavigate();

  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      location: 'Ghaziabad, India',
      type: 'Full-time',
      department: 'Engineering',
      description: 'We are looking for an experienced full stack developer to join our engineering team.'
    },
    {
      title: 'Product Manager',
      location: 'Remote',
      type: 'Full-time',
      department: 'Product',
      description: 'Lead product strategy and roadmap for our flagship products.'
    },
    {
      title: 'UI/UX Designer',
      location: 'Ghaziabad, India',
      type: 'Full-time',
      department: 'Design',
      description: 'Create beautiful and intuitive user experiences for our products.'
    },
    {
      title: 'DevOps Engineer',
      location: 'Remote',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Manage and optimize our cloud infrastructure and deployment pipelines.'
    },
    {
      title: 'Customer Success Manager',
      location: 'Ghaziabad, India',
      type: 'Full-time',
      department: 'Customer Success',
      description: 'Help our customers succeed and grow with our platform.'
    },
    {
      title: 'Marketing Manager',
      location: 'Remote',
      type: 'Full-time',
      department: 'Marketing',
      description: 'Drive marketing strategy and lead generation initiatives.'
    }
  ];

  const benefits = [
    'Competitive salary and equity',
    'Health insurance for you and your family',
    'Flexible work hours',
    'Remote work options',
    'Learning and development budget',
    'Paid time off and holidays',
    'Team outings and events',
    'Modern office with latest equipment'
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
          <Briefcase size={64} className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Help us build the future of business software. We're always looking for talented people.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <p className="font-semibold text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase size={16} />
                        <span>{job.department}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Don't See Your Role?</h2>
          <p className="text-xl mb-8 text-blue-100">
            We're always looking for talented people. Send us your resume!
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}

export default Careers;
