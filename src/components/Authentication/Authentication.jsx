import { useState } from 'react';
import { toast } from 'react-toastify';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const { login, logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login Logic
      const users = getFromStorage('users');
      const foundUser = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (foundUser) {
        login(foundUser); // Use context login
        navigate('/'); // Redirect to home
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
      } else {
        toast.error('Invalid email or password!');
      }
    } else {
      // Register Logic
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Please fill all fields!');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters!');
        return;
      }

      const users = getFromStorage('users');
      const userExists = users.find(u => u.email === formData.email);

      if (userExists) {
        toast.error('User already exists!');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      users.push(newUser);
      saveToStorage('users', users);
      toast.success('Registration successful! Please login.');
      setIsLogin(true);
      setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    }
  };

  const handleLogout = () => {
    logout(); // Use context logout
    navigate('/');
  };

  if (isAuthenticated && user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Dashboard
          </h2>
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
            <p className="text-xl font-semibold text-gray-800">
              Welcome, {user.name}!
            </p>
            <p className="text-gray-600 mt-2">Email: {user.email}</p>
            <p className="text-sm text-gray-500 mt-1">User ID: {user.id}</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-sm text-blue-800">
              You are currently logged in. You can access all features from the sidebar.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200 flex items-center space-x-2"
          >
            <LogIn size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            <span>{isLogin ? 'Login' : 'Register'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ email: '', password: '', confirmPassword: '', name: '' });
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
