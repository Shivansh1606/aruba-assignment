import { useState, useEffect } from 'react';
import { getFromStorage } from '../../utils/storage';
import { FileSpreadsheet, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

function Pagination() {
  const [allItems, setAllItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const languages = getFromStorage('languages').map(item => ({ ...item, type: 'Language' }));
    const countries = getFromStorage('countries').map(item => ({ ...item, type: 'Country' }));
    const states = getFromStorage('states').map(item => ({ ...item, type: 'State' }));
    const districts = getFromStorage('districts').map(item => ({ ...item, type: 'District' }));
    
    const combined = [...languages, ...countries, ...states, ...districts];
    setAllItems(combined);
  }, []);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allItems.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getTypeColor = (type) => {
    const colors = {
      Language: 'bg-blue-100 text-blue-700',
      Country: 'bg-green-100 text-green-700',
      State: 'bg-orange-100 text-orange-700',
      District: 'bg-purple-100 text-purple-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileSpreadsheet size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Pagination Example</h1>
              <p className="text-teal-100">Browse through data with pagination controls</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-teal-600 mb-1">{allItems.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-cyan-600 mb-1">{totalPages}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-1">{currentPage}</div>
            <div className="text-sm text-gray-600">Current Page</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-1">{currentItems.length}</div>
            <div className="text-sm text-gray-600">Items on Page</div>
          </div>
        </div>

        {/* Items Per Page Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Items per page:</span>
            <div className="flex space-x-2">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    itemsPerPage === num
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">#</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Date Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-600">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <FileSpreadsheet className="mx-auto text-gray-300 mb-4" size={64} />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No data available</h3>
                      <p className="text-gray-500">Add some data to see pagination in action</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Page Info */}
              <div className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-gray-900">{Math.min(endIndex, allItems.length)}</span> of{' '}
                <span className="font-semibold text-gray-900">{allItems.length}</span> items
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center space-x-2">
                {/* First Page */}
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsLeft size={20} />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    disabled={page === '...'}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      page === currentPage
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                        : page === '...'
                        ? 'cursor-default text-gray-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Page */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronsRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
