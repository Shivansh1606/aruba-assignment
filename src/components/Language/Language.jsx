import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Languages, Plus, Edit2, Trash2, Save, X, Search } from 'lucide-react';

function Language() {
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedLanguages = getFromStorage('languages');
    setLanguages(storedLanguages);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter language name!');
      return;
    }

    if (isEditing) {
      const updatedLanguages = languages.map(lang =>
        lang.id === formData.id ? formData : lang
      );
      setLanguages(updatedLanguages);
      saveToStorage('languages', updatedLanguages);
      toast.success('Language updated successfully!');
    } else {
      const newLanguage = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const updatedLanguages = [...languages, newLanguage];
      setLanguages(updatedLanguages);
      saveToStorage('languages', updatedLanguages);
      toast.success('Language added successfully!');
    }

    setFormData({ id: '', name: '' });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      const updatedLanguages = languages.filter(lang => lang.id !== id);
      setLanguages(updatedLanguages);
      saveToStorage('languages', updatedLanguages);
      toast.success('Language deleted successfully!');
    }
  };

  const handleEdit = (language) => {
    setFormData(language);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({ id: '', name: '' });
    setIsEditing(false);
  };

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Languages size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Language Management</h1>
              <p className="text-blue-100">Manage and organize your languages</p>
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
                    <span>Edit Language</span>
                  </>
                ) : (
                  <>
                    <Plus className="text-blue-500" size={24} />
                    <span>Add Language</span>
                  </>
                )}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., English, Hindi, Spanish"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
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
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{languages.length}</div>
                  <div className="text-sm text-gray-600">Total Languages</div>
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
                    placeholder="Search languages..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Languages Grid */}
              {filteredLanguages.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredLanguages.map((lang, index) => (
                    <div
                      key={lang.id}
                      className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{lang.name}</h3>
                          </div>
                          {lang.createdAt && (
                            <p className="text-xs text-gray-500 ml-13">
                              Added {new Date(lang.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(lang)}
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(lang.id)}
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
                  <Languages className="mx-auto text-gray-300 mb-4" size={64} />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm ? 'No languages found' : 'No languages yet'}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Try a different search term' : 'Add your first language to get started!'}
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

export default Language;
