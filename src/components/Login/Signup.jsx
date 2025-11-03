import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, ArrowRight, Sparkles, CheckCircle, Phone, MapPin, Briefcase, ArrowLeft } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    company: '',
    designation: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Other'];
  const designations = ['Student', 'Fresher', 'Junior Developer', 'Senior Developer', 'Manager', 'CTO', 'CEO', 'Entrepreneur', 'Other'];

  const passwordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/)) return 'strong';
    return 'medium';
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Name, Email, and Password are required!');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      setIsLoading(false);
      return;
    }

    if (formData.phone && formData.phone.length < 10) {
      toast.error('Please enter a valid phone number!');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const user = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: 'user',
        phone: formData.phone || 'Not provided',
        country: formData.country || 'Not provided',
        city: formData.city || 'Not provided',
        company: formData.company || 'Not provided',
        designation: formData.designation || 'Not provided'
      };
      login(user);
      toast.success('Account created successfully!');
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const strength = passwordStrength(formData.password);
  const strengthColor = strength === 'weak' ? 'bg-red-500' : strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start lg:items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h1 className="text-5xl font-bold mb-4">
                  Join
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Aruba Network
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Create an account and start building amazing projects with our platform.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Instant project creation',
                  'Collaborate with teams',
                  'Real-time analytics',
                  'Enterprise security'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <span className="text-gray-700 font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Already have an account?</p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold text-sm sm:text-base">Back to Home</span>
            </button>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-600 text-sm sm:text-base">Register as a User</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-4 w-full">
              {/* Names Row - MOBILE FIX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                      className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full pl-12 pr-12 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthColor} transition-all`} style={{ width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600 capitalize">{strength}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4 sm:my-6"></div>

              {/* Phone */}
              <div className="w-full">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">Phone Number</label>
                <div className="relative w-full">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Location Row - MOBILE FIX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">Country</label>
                  <div className="relative w-full">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">City</label>
                  <div className="relative w-full">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Enter your city"
                      className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Company Row - MOBILE FIX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">Company</label>
                  <div className="relative w-full">
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Enter company name"
                      className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">Designation</label>
                  <div className="relative w-full">
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">Select Designation</option>
                      {designations.map((des) => (
                        <option key={des} value={des}>{des}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 disabled:opacity-50 mt-6"
              >
                <span>{isLoading ? 'Creating Account...' : 'Register'}</span>
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Login Link - Mobile */}
            <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-3 text-sm">Already have an account?</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold text-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
