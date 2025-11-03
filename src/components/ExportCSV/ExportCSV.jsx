import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromStorage } from '../../utils/storage';
import { FileDown, Download, CheckCircle, FileSpreadsheet } from 'lucide-react';

function ExportCSV() {
  const [selectedCategories, setSelectedCategories] = useState({
    languages: false,
    countries: false,
    states: false,
    districts: false,
  });
  const [data, setData] = useState({
    languages: [],
    countries: [],
    states: [],
    districts: [],
  });

  useEffect(() => {
    setData({
      languages: getFromStorage('languages'),
      countries: getFromStorage('countries'),
      states: getFromStorage('states'),
      districts: getFromStorage('districts'),
    });
  }, []);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const convertToCSV = (dataArray, headers) => {
    if (!dataArray || dataArray.length === 0) return '';

    const csvHeaders = headers.join(',');
    const csvRows = dataArray.map((item) =>
      headers.map((header) => {
        const value = item[header] || '';
        return `"${value}"`;
      }).join(',')
    );

    return [csvHeaders, ...csvRows].join('\n');
  };

  const handleExport = () => {
    const selected = Object.keys(selectedCategories).filter(
      (key) => selectedCategories[key]
    );

    if (selected.length === 0) {
      toast.error('Please select at least one category to export!');
      return;
    }

    let csvContent = '';
    let filename = 'export.csv';

    if (selected.length === 1) {
      const category = selected[0];
      const categoryData = data[category];
      
      if (categoryData.length === 0) {
        toast.error(`No data available for ${category}!`);
        return;
      }

      const headers = Object.keys(categoryData[0]);
      csvContent = convertToCSV(categoryData, headers);
      filename = `${category}.csv`;
    } else {
      selected.forEach((category) => {
        const categoryData = data[category];
        if (categoryData.length > 0) {
          csvContent += `\n${category.toUpperCase()}\n`;
          const headers = Object.keys(categoryData[0]);
          csvContent += convertToCSV(categoryData, headers) + '\n';
        }
      });
      filename = 'combined_export.csv';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    toast.success('CSV file exported successfully!');
  };

  const categories = [
    {
      key: 'languages',
      label: 'Languages',
      count: data.languages.length,
      color: 'blue',
      description: 'Export all language data',
    },
    {
      key: 'countries',
      label: 'Countries',
      count: data.countries.length,
      color: 'green',
      description: 'Export all country data',
    },
    {
      key: 'states',
      label: 'States',
      count: data.states.length,
      color: 'orange',
      description: 'Export all state data',
    },
    {
      key: 'districts',
      label: 'Districts',
      count: data.districts.length,
      color: 'purple',
      description: 'Export all district data',
    },
  ];

  const totalSelected = Object.values(selectedCategories).filter(Boolean).length;
  const totalItems = Object.keys(selectedCategories)
    .filter((key) => selectedCategories[key])
    .reduce((sum, key) => sum + data[key].length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileDown size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Export to CSV</h1>
              <p className="text-emerald-100">Select categories and export your data</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="text-emerald-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{totalSelected}</div>
                <div className="text-sm text-gray-600">Selected Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-teal-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{totalItems}</div>
                <div className="text-sm text-gray-600">Items to Export</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Download className="text-blue-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">CSV</div>
                <div className="text-sm text-gray-600">Export Format</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Select Categories to Export</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <label
                key={category.key}
                className={`relative cursor-pointer group`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories[category.key]}
                  onChange={() => handleCheckboxChange(category.key)}
                  className="sr-only"
                />
                <div
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedCategories[category.key]
                      ? `border-${category.color}-500 bg-${category.color}-50 shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{category.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedCategories[category.key]
                          ? `bg-${category.color}-500 border-${category.color}-500`
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {selectedCategories[category.key] && (
                        <CheckCircle className="text-white" size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Available records</span>
                    <span className={`text-2xl font-bold text-${category.color}-600`}>
                      {category.count}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Ready to Export?</h3>
              <p className="text-gray-600">
                {totalSelected > 0
                  ? `${totalSelected} ${totalSelected === 1 ? 'category' : 'categories'} selected with ${totalItems} total items`
                  : 'Select categories above to begin'}
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={totalSelected === 0}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Download size={24} />
              <span>Export to CSV</span>
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-md p-6 mt-8">
          <h3 className="font-bold text-lg mb-3 text-gray-800">📋 Export Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Select one or multiple categories to export</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Single category exports will create a simple CSV file</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>Multiple categories will be combined with section headers</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-600 mt-1">•</span>
              <span>All data fields will be included in the export</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ExportCSV;
