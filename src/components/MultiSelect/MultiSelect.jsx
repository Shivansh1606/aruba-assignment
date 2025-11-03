import { useState } from 'react';
import { toast } from 'react-toastify';
import { ListChecks, X, Check, ChevronDown } from 'lucide-react';

function MultiSelect() {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(false);

  const languages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 
    'Go', 'Rust', 'TypeScript', 'PHP', 'Swift', 'Kotlin'
  ];

  const countries = [
    'India', 'USA', 'UK', 'Canada', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'Brazil', 'Russia', 'Italy'
  ];

  const frameworks = [
    'React', 'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte',
    'Django', 'Flask', 'Express.js', 'Spring Boot', 'Laravel', 'Rails'
  ];

  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const toggleCountry = (country) => {
    setSelectedCountries(prev =>
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  const toggleFramework = (framework) => {
    setSelectedFrameworks(prev =>
      prev.includes(framework) ? prev.filter(f => f !== framework) : [...prev, framework]
    );
  };

  const removeLanguage = (lang) => {
    setSelectedLanguages(prev => prev.filter(l => l !== lang));
  };

  const removeCountry = (country) => {
    setSelectedCountries(prev => prev.filter(c => c !== country));
  };

  const removeFramework = (framework) => {
    setSelectedFrameworks(prev => prev.filter(f => f !== framework));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLanguages.length === 0 && selectedCountries.length === 0 && selectedFrameworks.length === 0) {
      toast.error('Please select at least one option!');
      return;
    }
    toast.success(`Selected: ${selectedLanguages.length} languages, ${selectedCountries.length} countries, ${selectedFrameworks.length} frameworks`);
  };

  const MultiSelectDropdown = ({ label, options, selected, isOpen, setIsOpen, toggle, remove, color }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((item) => (
            <span key={item} className={`inline-flex items-center space-x-1 px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full text-sm font-semibold`}>
              <span>{item}</span>
              <button
                type="button"
                onClick={() => remove(item)}
                className={`hover:bg-${color}-200 rounded-full p-0.5`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <span className="text-gray-700">
          {selected.length > 0 ? `${selected.length} selected` : `Select ${label}`}
        </span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${
                selected.includes(option) ? `bg-${color}-500 border-${color}-500` : 'border-gray-300'
              }`}>
                {selected.includes(option) && <Check className="text-white" size={14} />}
              </div>
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <ListChecks size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Multi Select Dropdown</h1>
              <p className="text-sky-100">Select multiple options from dropdown lists</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <ListChecks className="text-blue-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{selectedLanguages.length}</div>
                <div className="text-sm text-gray-600">Languages Selected</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <ListChecks className="text-green-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{selectedCountries.length}</div>
                <div className="text-sm text-gray-600">Countries Selected</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <ListChecks className="text-purple-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{selectedFrameworks.length}</div>
                <div className="text-sm text-gray-600">Frameworks Selected</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Languages Dropdown */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <MultiSelectDropdown
              label="Programming Languages"
              options={languages}
              selected={selectedLanguages}
              isOpen={isLanguageOpen}
              setIsOpen={setIsLanguageOpen}
              toggle={toggleLanguage}
              remove={removeLanguage}
              color="blue"
            />
          </div>

          {/* Countries Dropdown */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <MultiSelectDropdown
              label="Countries"
              options={countries}
              selected={selectedCountries}
              isOpen={isCountryOpen}
              setIsOpen={setIsCountryOpen}
              toggle={toggleCountry}
              remove={removeCountry}
              color="green"
            />
          </div>

          {/* Frameworks Dropdown */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <MultiSelectDropdown
              label="Frameworks"
              options={frameworks}
              selected={selectedFrameworks}
              isOpen={isFrameworkOpen}
              setIsOpen={setIsFrameworkOpen}
              toggle={toggleFramework}
              remove={removeFramework}
              color="purple"
            />
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg"
            >
              Submit Selection
            </button>
          </div>
        </form>

        {/* Summary */}
        {(selectedLanguages.length > 0 || selectedCountries.length > 0 || selectedFrameworks.length > 0) && (
          <div className="bg-gradient-to-r from-sky-100 to-indigo-100 rounded-2xl shadow-lg p-8 mt-8">
            <h3 className="text-xl font-bold mb-4">Your Selection Summary:</h3>
            <div className="space-y-4">
              {selectedLanguages.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Programming Languages ({selectedLanguages.length}):</h4>
                  <p className="text-gray-700">{selectedLanguages.join(', ')}</p>
                </div>
              )}
              {selectedCountries.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Countries ({selectedCountries.length}):</h4>
                  <p className="text-gray-700">{selectedCountries.join(', ')}</p>
                </div>
              )}
              {selectedFrameworks.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Frameworks ({selectedFrameworks.length}):</h4>
                  <p className="text-gray-700">{selectedFrameworks.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
