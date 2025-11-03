import { useState, useEffect } from 'react';
import { getFromStorage } from '../../utils/storage';
import { Search, Filter, X, Languages, Globe, Map, MapPin } from 'lucide-react';

function Searching() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const languages = getFromStorage('languages').map(item => ({ ...item, category: 'Language' }));
    const countries = getFromStorage('countries').map(item => ({ ...item, category: 'Country' }));
    const states = getFromStorage('states').map(item => ({ ...item, category: 'State' }));
    const districts = getFromStorage('districts').map(item => ({ ...item, category: 'District' }));
    
    const combined = [...languages, ...countries, ...states, ...districts];
    setAllData(combined);
    setFilteredData(combined);
  }, []);

  useEffect(() => {
    let results = allData;

    if (selectedCategory !== 'all') {
      results = results.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(results);
  }, [searchTerm, selectedCategory, allData]);

  const categories = [
    { value: 'all', label: 'All Categories', icon: Filter, color: 'gray' },
    { value: 'Language', label: 'Languages', icon: Languages, color: 'blue' },
    { value: 'Country', label: 'Countries', icon: Globe, color: 'green' },
    { value: 'State', label: 'States', icon: Map, color: 'orange' },
    { value: 'District', label: 'Districts', icon: MapPin, color: 'purple' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Language: 'bg-blue-100 text-blue-700',
      Country: 'bg-green-100 text-green-700',
      State: 'bg-orange-100 text-orange-700',
      District: 'bg-purple-100 text-purple-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Language: Languages,
      Country: Globe,
      State: Map,
      District: MapPin,
    };
    return icons[category] || Filter;
  };

  const stats = {
    all: allData.length,
    Language: allData.filter(item => item.category === 'Language').length,
    Country: allData.filter(item => item.category === 'Country').length,
    State: allData.filter(item => item.category === 'State').length,
    District: allData.filter(item => item.category === 'District').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Search size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Advanced Search</h1>
              <p className="text-indigo-100">Search across all categories with filters</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.value} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${cat.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`text-${cat.color}-600`} size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{stats[cat.value]}</div>
                    <div className="text-xs text-gray-600">{cat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-lg appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('all')} className="hover:text-indigo-900">
                  <X size={14} />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                <span>Search: "{searchTerm}"</span>
                <button onClick={() => setSearchTerm('')} className="hover:text-purple-900">
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Search Results
              <span className="ml-3 text-lg text-gray-500">({filteredData.length} found)</span>
            </h2>
          </div>

          {filteredData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((item, index) => {
                const Icon = getCategoryIcon(item.category);
                return (
                  <div
                    key={`${item.category}-${item.id}`}
                    className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        {item.createdAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            Added {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'No results found' : 'No data available'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Add some data to start searching'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searching;
