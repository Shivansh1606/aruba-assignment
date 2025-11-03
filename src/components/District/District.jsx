import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Plus, Trash2, Edit2, Download, Eye, X, Search } from 'lucide-react';
import { getFromStorage, saveToStorage } from '../../utils/storage';

function District() {
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({ name: '', state: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // States list
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Load districts from storage
  useEffect(() => {
    const stored = getFromStorage('districts');
    setDistricts(stored);
  }, []);

  // Save to storage
  const saveDistricts = (data) => {
    saveToStorage('districts', data);
    setDistricts(data);
  };

  const handleAddOrUpdate = () => {
    if (!formData.name.trim() || !formData.state) {
      toast.error('Please fill all fields!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (editingId) {
        // Update
        const updated = districts.map(d =>
          d.id === editingId ? { ...d, ...formData } : d
        );
        saveDistricts(updated);
        toast.success('District updated successfully!');
        setEditingId(null);
      } else {
        // Add
        const newDistrict = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toLocaleDateString('en-IN')
        };
        saveDistricts([...districts, newDistrict]);
        toast.success('District added successfully!');
      }
      setFormData({ name: '', state: '' });
      setIsModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleEdit = (district) => {
    setFormData({ name: district.name, state: district.state });
    setEditingId(district.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this district?')) {
      const filtered = districts.filter(d => d.id !== id);
      saveDistricts(filtered);
      toast.success('District deleted successfully!');
    }
  };

  // Filter districts
  const filteredDistricts = districts.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterState === 'all' || d.state === filterState;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Districts Management
              </h1>
              <p className="text-gray-600">Manage all districts efficiently</p>
            </div>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', state: '' });
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold"
            >
              <Plus size={20} />
              <span>Add District</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">{districts.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Districts</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-green-600">{new Set(districts.map(d => d.state)).size}</div>
              <div className="text-sm text-gray-600 mt-1">States</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">{filteredDistricts.length}</div>
              <div className="text-sm text-gray-600 mt-1">Filtered</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-orange-600">{districts.length > 0 ? (filteredDistricts.length / districts.length * 100).toFixed(0) : 0}%</div>
              <div className="text-sm text-gray-600 mt-1">Match Rate</div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              />
            </div>

            {/* Filter */}
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
            >
              <option value="all">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredDistricts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">S.No</th>
                    <th className="px-6 py-4 text-left font-semibold">District Name</th>
                    <th className="px-6 py-4 text-left font-semibold">State</th>
                    <th className="px-6 py-4 text-left font-semibold">Created</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDistricts.map((district, index) => (
                    <tr key={district.id} className="border-t border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-700">{district.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {district.state}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{district.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(district)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(district.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Districts Found</h3>
              <p className="text-gray-500 mb-4">Add your first district to get started</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                <span>Add District</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {editingId ? 'Edit District' : 'Add New District'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* District Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    District Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter district name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="">Select a state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddOrUpdate}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : editingId ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default District;
