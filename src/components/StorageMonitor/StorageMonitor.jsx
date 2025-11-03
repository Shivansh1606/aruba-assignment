import { useState, useEffect } from 'react';
import { HardDrive, AlertTriangle, CheckCircle } from 'lucide-react';

function StorageMonitor() {
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    total: 0,
    percentage: 0,
    items: []
  });

  useEffect(() => {
    calculateStorage();
  }, []);

  const calculateStorage = () => {
    let totalSize = 0;
    const items = [];

    // Calculate size for each key in localStorage
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const itemSize = new Blob([localStorage.getItem(key)]).size;
        totalSize += itemSize;
        items.push({
          key: key,
          size: itemSize,
          sizeKB: (itemSize / 1024).toFixed(2),
          count: JSON.parse(localStorage.getItem(key) || '[]').length || 'N/A'
        });
      }
    }

    // Most browsers allow 5-10 MB, we'll use 5 MB as safe limit
    const maxStorage = 5 * 1024 * 1024; // 5 MB in bytes
    const percentage = (totalSize / maxStorage) * 100;

    setStorageInfo({
      used: totalSize,
      usedKB: (totalSize / 1024).toFixed(2),
      usedMB: (totalSize / (1024 * 1024)).toFixed(2),
      total: maxStorage,
      totalMB: (maxStorage / (1024 * 1024)).toFixed(2),
      percentage: percentage.toFixed(2),
      items: items.sort((a, b) => b.size - a.size)
    });
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
      localStorage.clear();
      calculateStorage();
      alert('All data has been cleared!');
    }
  };

  const clearSpecificKey = (key) => {
    if (window.confirm(`Delete all ${key} data?`)) {
      localStorage.removeItem(key);
      calculateStorage();
      alert(`${key} data cleared!`);
    }
  };

  const getStatusColor = () => {
    if (storageInfo.percentage < 50) return 'bg-green-500';
    if (storageInfo.percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = () => {
    if (storageInfo.percentage < 80) return <CheckCircle className="text-green-600" size={24} />;
    return <AlertTriangle className="text-red-600" size={24} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <HardDrive size={32} className="text-blue-600" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Storage Monitor
        </h2>
      </div>

      {/* Storage Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Storage Usage</h3>
            <p className="text-sm text-gray-600">
              {storageInfo.usedKB} KB / {storageInfo.totalMB} MB
            </p>
          </div>
          {getStatusIcon()}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className={`${getStatusColor()} h-4 rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-right">
          {storageInfo.percentage}% used
        </p>

        {/* Warning Messages */}
        {storageInfo.percentage > 80 && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mt-4">
            <p className="text-red-700 font-semibold">⚠️ Warning: Storage Almost Full!</p>
            <p className="text-red-600 text-sm mt-1">
              You're using {storageInfo.percentage}% of available space. Consider deleting old data.
            </p>
          </div>
        )}

        {storageInfo.percentage > 50 && storageInfo.percentage <= 80 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-4">
            <p className="text-yellow-700 font-semibold">ℹ️ Notice: Storage Half Full</p>
            <p className="text-yellow-600 text-sm mt-1">
              You're using {storageInfo.percentage}% of available space.
            </p>
          </div>
        )}
      </div>

      {/* Storage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Used Space</p>
          <p className="text-2xl font-bold text-blue-600">{storageInfo.usedMB} MB</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Available Space</p>
          <p className="text-2xl font-bold text-green-600">
            {(storageInfo.totalMB - storageInfo.usedMB).toFixed(2)} MB
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Items</p>
          <p className="text-2xl font-bold text-purple-600">{storageInfo.items.length}</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Storage Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Size (KB)
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Records
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {storageInfo.items.length > 0 ? (
                storageInfo.items.map((item) => (
                  <tr key={item.key} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm font-medium capitalize">
                      {item.key}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      {item.sizeKB} KB
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      {item.count}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      <button
                        onClick={() => clearSpecificKey(item.key)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-xs"
                      >
                        Clear
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border border-gray-300 px-4 py-6 text-center text-gray-500">
                    No data stored yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={calculateStorage}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Refresh Storage Info
        </button>
        <button
          onClick={clearAllData}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Clear All Data
        </button>
      </div>

      {/* Storage Tips */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Storage Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>LocalStorage limit is approximately 5-10 MB per domain</li>
          <li>Images stored as Base64 use approximately 33% more space</li>
          <li>Regularly export and delete old data to free up space</li>
          <li>Use the Export CSV feature to backup important data</li>
        </ul>
      </div>
    </div>
  );
}

export default StorageMonitor;
