import { BarChart3, FileText, Globe, Languages } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFromStorage } from '../../utils/storage';

function UserDashboard() {
  const { user } = useAuth();
  const languages = getFromStorage('languages');
  const countries = getFromStorage('countries');

  const stats = [
    { label: 'Languages', value: languages.length, icon: Languages, color: 'blue' },
    { label: 'Countries', value: countries.length, icon: Globe, color: 'green' },
    { label: 'Your Role', value: 'User', icon: FileText, color: 'purple' },
    { label: 'Access Level', value: 'Basic', icon: BarChart3, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-blue-100">You're logged in as a User</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`text-${stat.color}-600`} size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Permissions</h2>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3">
            <span className="text-green-500">✓</span>
            <span>View Languages and Countries</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-green-500">✓</span>
            <span>View States and Districts</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-red-500">✗</span>
            <span>Upload Images (Manager/Admin only)</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-red-500">✗</span>
            <span>Advanced Features (Admin only)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
