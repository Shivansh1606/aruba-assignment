import { 
  Shield, Users, Database, Activity, TrendingUp, 
  AlertCircle, CheckCircle, Clock, Settings, HardDrive 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFromStorage } from '../../utils/storage';

function AdminDashboard() {
  const { user } = useAuth();
  const users = getFromStorage('users');
  const languages = getFromStorage('languages');
  const countries = getFromStorage('countries');
  const images = getFromStorage('images');

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'blue', change: '+12%' },
    { label: 'Total Records', value: languages.length + countries.length, icon: Database, color: 'green', change: '+8%' },
    { label: 'Storage Used', value: '2.3 MB', icon: HardDrive, color: 'purple', change: '+5%' },
    { label: 'System Health', value: '98%', icon: Activity, color: 'orange', change: '+2%' },
  ];

  const systemStats = [
    { label: 'Active Users', value: users.filter(u => u.role === 'user').length, color: 'blue' },
    { label: 'Managers', value: users.filter(u => u.role === 'manager').length, color: 'green' },
    { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: 'purple' },
    { label: 'Total Images', value: images.length, color: 'orange' },
  ];

  const recentUsers = users.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield size={40} />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-purple-100">Welcome back, {user?.name}! You have full system access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
                <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">System Overview</h2>
          <div className="space-y-4">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{stat.label}</span>
                <span className={`font-bold text-${stat.color}-600`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={20} />
              <span>Database: Online</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={20} />
              <span>Storage: Healthy</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={20} />
              <span>API: Running</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="text-yellow-500" size={20} />
              <span>Backup: Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 rounded-lg transition flex items-center justify-center space-x-2">
              <Users size={20} />
              <span>Manage Users</span>
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 rounded-lg transition flex items-center justify-center space-x-2">
              <Database size={20} />
              <span>Database Backup</span>
            </button>
            <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 rounded-lg transition flex items-center justify-center space-x-2">
              <Settings size={20} />
              <span>System Settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{u.name || 'N/A'}</td>
                  <td className="py-3 px-4">{u.email || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      u.role === 'manager' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role ? u.role.toUpperCase() : 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {recentUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No users found</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Permissions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-3">Full Access To:</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>All user features</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>All manager features</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>User management</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>System settings</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Advanced Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Storage monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Advanced form controls</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Database management</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Security controls</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
