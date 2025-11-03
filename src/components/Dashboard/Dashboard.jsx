import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Languages, Globe, Map, MapPin, Upload, Circle, Search, 
  FileSpreadsheet, FileDown, CheckSquare, ListChecks, Shield,
  Menu, Phone, User, LogOut, HardDrive, Settings, 
  Users as UsersIcon, Bell, ChevronRight, Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Import all existing components
import Language from '../Language/Language';
import Country from '../Country/Country';
import State from '../State/State';
import District from '../District/District';
import ImageUpload from '../ImageUpload/ImageUpload';
import RadioButton from '../RadioButton/RadioButton';
import Searching from '../Searching/Searching';
import Pagination from '../Pagination/Pagination';
import ExportCSV from '../ExportCSV/ExportCSV';
import Checkbox from '../Checkbox/Checkbox';
import StorageMonitor from '../StorageMonitor/StorageMonitor';
import MultiSelect from '../MultiSelect/MultiSelect';

// Role-specific dashboard components
import UserDashboard from './UserDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Define menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      { path: '/dashboard', name: 'Dashboard', icon: Home, roles: ['user', 'manager', 'admin'], color: 'blue' },
      { path: '/dashboard/language', name: 'Language', icon: Languages, roles: ['user', 'manager', 'admin'], color: 'purple' },
      { path: '/dashboard/country', name: 'Country', icon: Globe, roles: ['user', 'manager', 'admin'], color: 'green' },
      { path: '/dashboard/state', name: 'State', icon: Map, roles: ['user', 'manager', 'admin'], color: 'orange' },
      { path: '/dashboard/district', name: 'District', icon: MapPin, roles: ['user', 'manager', 'admin'], color: 'pink' },
    ];

    const managerItems = [
      { path: '/dashboard/imageupload', name: 'Image Upload', icon: Upload, roles: ['manager', 'admin'], color: 'cyan' },
      { path: '/dashboard/searching', name: 'Searching', icon: Search, roles: ['manager', 'admin'], color: 'indigo' },
      { path: '/dashboard/pagination', name: 'Pagination', icon: FileSpreadsheet, roles: ['manager', 'admin'], color: 'teal' },
      { path: '/dashboard/exportcsv', name: 'Export CSV', icon: FileDown, roles: ['manager', 'admin'], color: 'emerald' },
    ];

    const adminItems = [
      { path: '/dashboard/radiobutton', name: 'Radio Button', icon: Circle, roles: ['admin'], color: 'rose' },
      { path: '/dashboard/checkbox', name: 'Checkbox', icon: CheckSquare, roles: ['admin'], color: 'violet' },
      { path: '/dashboard/multiselect', name: 'Multi Select', icon: ListChecks, roles: ['admin'], color: 'fuchsia' },
      { path: '/dashboard/storage', name: 'Storage Monitor', icon: HardDrive, roles: ['admin'], color: 'amber' },
      { path: '/dashboard/users', name: 'User Management', icon: UsersIcon, roles: ['admin'], color: 'red' },
      { path: '/dashboard/settings', name: 'Settings', icon: Settings, roles: ['admin'], color: 'slate' },
    ];

    const allItems = [...commonItems, ...managerItems, ...adminItems];
    return allItems.filter(item => item.roles.includes(user?.role));
  };

  const menuItems = getMenuItems();

  const techButtons = [
    { name: 'Projects', color: 'bg-teal-500' },
    { name: 'Fullstack', color: 'bg-purple-500' },
    { name: '.NET Core', color: 'bg-gray-700' },
    { name: 'Spring Boot', color: 'bg-green-500' },
    { name: 'Node', color: 'bg-lime-500' },
    { name: 'Python', color: 'bg-yellow-500' },
    { name: 'DSA', color: 'bg-red-500' },
    { name: 'SQL Server', color: 'bg-gray-800' },
    { name: 'AWS', color: 'bg-orange-500' },
    { name: 'Azure', color: 'bg-blue-600' },
    { name: 'DevOps', color: 'bg-cyan-500' },
    { name: 'React', color: 'bg-sky-400' },
    { name: 'Next', color: 'bg-black' },
    { name: 'Angular', color: 'bg-red-600' },
    { name: 'QA', color: 'bg-pink-500' }
  ];

  const getRoleBadgeColor = () => {
    switch(user?.role) {
      case 'admin': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'manager': return 'bg-gradient-to-r from-green-500 to-teal-500';
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b-4 border-blue-500">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                Aruba Networks
              </span>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <button className="hidden sm:flex items-center space-x-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 lg:px-4 py-2 rounded-xl transition-colors font-semibold text-sm">
              <Phone size={18} />
              <span className="hidden lg:inline">7078496801</span>
            </button>

            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border-2 border-gray-200">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-800">{user?.name}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor()} text-white font-semibold inline-block`}>
                  {user?.role?.toUpperCase()}
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 px-3 lg:px-4 py-2 rounded-xl transition-colors font-semibold"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="hidden lg:inline text-sm">Logout</span>
            </button>
          </div>
        </div>

        {/* Technology Buttons Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 px-4 py-2.5 overflow-x-auto">
          <div className="flex space-x-2">
            {techButtons.map((tech) => (
              <button
                key={tech.name}
                className={`${tech.color} text-white px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap hover:shadow-lg hover:scale-105 transition-all`}
              >
                {tech.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex pt-[130px]">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-[130px] left-0 h-[calc(100vh-130px)] w-72
            bg-gradient-to-b from-gray-900 to-gray-800 text-white 
            transition-all duration-300 ease-in-out 
            z-40 overflow-y-auto
            shadow-2xl
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 #1F2937'
          }}
        >
          <nav className="p-4">
            {/* User Info Card - Mobile */}
            <div className="lg:hidden mb-6 p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-white">{user?.name}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor()} text-white font-semibold inline-block mt-1`}>
                    {user?.role?.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3.5 rounded-xl mb-2 transition-all ${
                    isActive 
                      ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg scale-105` 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive 
                        ? 'bg-white/20' 
                        : `bg-${item.color}-500/20`
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                  <ChevronRight size={18} className={`transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 mt-4 border-t border-white/10">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-xs font-bold text-white">PRO FEATURES</span>
              </div>
              <p className="text-xs text-gray-300 mb-3">Upgrade to unlock advanced features</p>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                Upgrade Now
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 w-full lg:ml-0 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={
                <>
                  {user?.role === 'admin' && <AdminDashboard />}
                  {user?.role === 'manager' && <ManagerDashboard />}
                  {user?.role === 'user' && <UserDashboard />}
                </>
              } />
              <Route path="/language" element={<Language />} />
              <Route path="/country" element={<Country />} />
              <Route path="/state" element={<State />} />
              <Route path="/district" element={<District />} />
              
              {/* Manager & Admin Routes */}
              {(user?.role === 'manager' || user?.role === 'admin') && (
                <>
                  <Route path="/imageupload" element={<ImageUpload />} />
                  <Route path="/searching" element={<Searching />} />
                  <Route path="/pagination" element={<Pagination />} />
                  <Route path="/exportcsv" element={<ExportCSV />} />
                </>
              )}

              {/* Admin Only Routes */}
              {user?.role === 'admin' && (
                <>
                  <Route path="/radiobutton" element={<RadioButton />} />
                  <Route path="/checkbox" element={<Checkbox />} />
                  <Route path="/multiselect" element={<MultiSelect />} />
                  <Route path="/storage" element={<StorageMonitor />} />
                </>
              )}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
