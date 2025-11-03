import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Globe, Plus, Edit2, Trash2, Save, X, Search } from 'lucide-react';

function Country() {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedCountries = getFromStorage('countries');
    setCountries(storedCountries);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter country name!');
      return;
    }

    if (isEditing) {
      const updatedCountries = countries.map(country =>
        country.id === formData.id ? formData : country
      );
      setCountries(updatedCountries);
      saveToStorage('countries', updatedCountries);
      toast.success('Country updated successfully!');
    } else {
      const newCountry = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const updatedCountries = [...countries, newCountry];
      setCountries(updatedCountries);
      saveToStorage('countries', updatedCountries);
      toast.success('Country added successfully!');
    }

    setFormData({ id: '', name: '' });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      const updatedCountries = countries.filter(country => country.id !== id);
      setCountries(updatedCountries);
      saveToStorage('countries', updatedCountries);
      toast.success('Country deleted successfully!');
    }
  };

  const handleEdit = (country) => {
    setFormData(country);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({ id: '', name: '' });
    setIsEditing(false);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Globe size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Country Management</h1>
              <p className="text-green-100">Manage countries from around the world</p>
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
                    <span>Edit Country</span>
                  </>
                ) : (
                  <>
                    <Plus className="text-green-500" size={24} />
                    <span>Add Country</span>
                  </>
                )}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., India, USA, Japan"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
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
              <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{countries.length}</div>
                  <div className="text-sm text-gray-600">Total Countries</div>
                </div>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Countries Grid */}
              {filteredCountries.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredCountries.map((country, index) => (
                    <div
                      key={country.id}
                      className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{country.name}</h3>
                          </div>
                          {country.createdAt && (
                            <p className="text-xs text-gray-500 ml-13">
                              Added {new Date(country.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(country)}
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(country.id)}
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
                  <Globe className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm ? 'No countries found' : 'No countries yet'}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Try a different search term' : 'Add your first country to get started!'}
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

export default Country;
