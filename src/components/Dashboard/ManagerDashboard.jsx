import { Users, TrendingUp, FileText, Award, Upload, Search, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFromStorage } from '../../utils/storage';

function ManagerDashboard() {
  const { user } = useAuth();
  const languages = getFromStorage('languages');
  const countries = getFromStorage('countries');
  const images = getFromStorage('images');

  const stats = [
    { label: 'Total Languages', value: languages.length, icon: FileText, color: 'blue' },
    { label: 'Total Countries', value: countries.length, icon: TrendingUp, color: 'green' },
    { label: 'Uploaded Images', value: images.length, icon: Upload, color: 'purple' },
    { label: 'Team Members', value: '12', icon: Users, color: 'orange' },
  ];

  const recentActivities = [
    { action: 'Added new language', time: '2 hours ago' },
    { action: 'Uploaded 5 images', time: '5 hours ago' },
    { action: 'Exported CSV report', time: '1 day ago' },
    { action: 'Updated country data', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Manager Dashboard 👔</h1>
        <p className="text-green-100">Welcome back, {user?.name}! Manage your team effectively.</p>
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

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your Permissions</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <span className="text-green-500">✓</span>
              <span>All User permissions</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">✓</span>
              <span>Upload and manage images</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">✓</span>
              <span>Export data to CSV</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">✓</span>
              <span>Advanced search features</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-red-500">✗</span>
              <span>System settings (Admin only)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
          <ul className="space-y-3">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-700">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <Upload className="text-blue-600 mb-2" size={32} />
            <span className="text-sm font-semibold">Upload Image</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <Search className="text-green-600 mb-2" size={32} />
            <span className="text-sm font-semibold">Search Data</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
            <FileSpreadsheet className="text-purple-600 mb-2" size={32} />
            <span className="text-sm font-semibold">Export CSV</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
            <Users className="text-orange-600 mb-2" size={32} />
            <span className="text-sm font-semibold">Team Stats</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
