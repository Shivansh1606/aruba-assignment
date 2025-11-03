import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, ArrowRight, Sparkles, Code2, ArrowLeft } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);

  const demoCredentials = {
    user: { email: 'user@demo.com', password: 'user123' },
    manager: { email: 'manager@demo.com', password: 'manager123' },
    admin: { email: 'admin@demo.com', password: 'admin123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error('Please fill in all fields!');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const user = {
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        role: selectedRole
      };
      login(user);
      toast.success(`Welcome ${user.name}!`);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const fillDemoCredentials = (role) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  const roles = [
    {
      id: 'user',
      label: 'User',
      description: 'Standard access',
      icon: UserIcon,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'manager',
      label: 'Manager',
      description: 'Team management',
      icon: Code2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'admin',
      label: 'Admin',
      description: 'Full control',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
                  <Sparkles className="text-white" size={32} />
                </div>
                <h1 className="text-5xl font-bold mb-4">
                  Welcome Back to
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Aruba Network
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Manage your projects, collaborate with your team, and build amazing solutions.
                </p>
              </div>

              <div className="space-y-4">
                {['Real-time Collaboration', 'Advanced Analytics', 'Secure & Reliable'].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700 font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Don't have an account?</p>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-600">Login to access your dashboard</p>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-800 mb-4">Select Role *</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedRole === role.id
                          ? `border-blue-500 bg-blue-50`
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Icon className={`mx-auto mb-2 ${selectedRole === role.id ? 'text-blue-600' : 'text-gray-500'}`} size={24} />
                      <div className="text-sm font-bold text-gray-800">{role.label}</div>
                      <div className="text-xs text-gray-600">{role.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Logging in...' : 'Login'}</span>
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">🔑</span>
                <h3 className="font-bold text-gray-800">Demo Login Credentials:</h3>
              </div>

              <div className="space-y-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => fillDemoCredentials(role.id)}
                    className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-all border-2 border-gray-100 hover:border-blue-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-800">{role.label}</div>
                        <div className="text-sm text-gray-600">{demoCredentials[role.id].email}</div>
                        <div className="text-xs text-gray-500">Password: {demoCredentials[role.id].password}</div>
                      </div>
                      <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-200">
                        Use
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Register Link - Mobile */}
            <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-3">Don't have an account?</p>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
