import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Map, Plus, Edit2, Trash2, Save, X, Search, Globe } from 'lucide-react';

function State() {
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', countryId: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    const storedStates = getFromStorage('states');
    const storedCountries = getFromStorage('countries');
    setStates(storedStates);
    setCountries(storedCountries);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.countryId) {
      toast.error('Please fill all fields!');
      return;
    }

    if (isEditing) {
      const updatedStates = states.map(state =>
        state.id === formData.id ? formData : state
      );
      setStates(updatedStates);
      saveToStorage('states', updatedStates);
      toast.success('State updated successfully!');
    } else {
      const newState = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const updatedStates = [...states, newState];
      setStates(updatedStates);
      saveToStorage('states', updatedStates);
      toast.success('State added successfully!');
    }

    setFormData({ id: '', name: '', countryId: '' });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      const updatedStates = states.filter(state => state.id !== id);
      setStates(updatedStates);
      saveToStorage('states', updatedStates);
      toast.success('State deleted successfully!');
    }
  };

  const handleEdit = (state) => {
    setFormData(state);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({ id: '', name: '', countryId: '' });
    setIsEditing(false);
  };

  const getCountryName = (countryId) => {
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : 'Unknown';
  };

  const filteredStates = states.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry ? state.countryId === filterCountry : true;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Map size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">State Management</h1>
              <p className="text-orange-100">Manage states and provinces by country</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Edit2 className="text-yellow-500" size={24} />
                    <span>Edit State</span>
                  </>
                ) : (
                  <>
                    <Plus className="text-orange-500" size={24} />
                    <span>Add State</span>
                  </>
                )}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    value={formData.countryId}
                    onChange={(e) => setFormData({...formData, countryId: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., California, Maharashtra"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
                  >
                    <Save size={20} />
                    <span>{isEditing ? 'Update' : 'Add'}</span>
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </form>

              {/* Stats */}
              <div className="mt-6 space-y-3">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">{states.length}</div>
                    <div className="text-sm text-gray-600">Total States</div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{countries.length}</div>
                    <div className="text-sm text-gray-600">Total Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Filters */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search states..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* States Grid */}
              {filteredStates.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredStates.map((state, index) => (
                    <div
                      key={state.id}
                      className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-orange-300 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{state.name}</h3>
                              <p className="text-sm text-gray-500">{getCountryName(state.countryId)}</p>
                            </div>
                          </div>
                          {state.createdAt && (
                            <p className="text-xs text-gray-500 ml-13">
                              Added {new Date(state.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(state)}
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(state.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Map className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm || filterCountry ? 'No states found' : 'No states yet'}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm || filterCountry ? 'Try different filters' : 'Add your first state to get started!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default State;
