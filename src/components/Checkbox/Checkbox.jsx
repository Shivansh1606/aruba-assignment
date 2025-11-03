import { useState } from 'react';
import { toast } from 'react-toastify';
import { CheckSquare, Check, X } from 'lucide-react';

function Checkbox() {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const hobbies = [
    { id: 'reading', label: 'Reading', icon: '📚' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'cooking', label: 'Cooking', icon: '🍳' },
    { id: 'traveling', label: 'Traveling', icon: '✈️' },
  ];

  const skills = [
    { id: 'javascript', label: 'JavaScript', level: 'Advanced' },
    { id: 'react', label: 'React', level: 'Intermediate' },
    { id: 'nodejs', label: 'Node.js', level: 'Intermediate' },
    { id: 'python', label: 'Python', level: 'Beginner' },
    { id: 'sql', label: 'SQL', level: 'Advanced' },
    { id: 'mongodb', label: 'MongoDB', level: 'Intermediate' },
  ];

  const handleHobbyChange = (hobbyId) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobbyId)
        ? prev.filter((id) => id !== hobbyId)
        : [...prev, hobbyId]
    );
  };

  const handleSkillChange = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const selectAllHobbies = () => {
    setSelectedHobbies(hobbies.map((h) => h.id));
  };

  const clearAllHobbies = () => {
    setSelectedHobbies([]);
  };

  const selectAllSkills = () => {
    setSelectedSkills(skills.map((s) => s.id));
  };

  const clearAllSkills = () => {
    setSelectedSkills([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHobbies.length === 0 && selectedSkills.length === 0) {
      toast.error('Please select at least one hobby or skill!');
      return;
    }
    if (!agreedToTerms) {
      toast.error('Please agree to terms and conditions!');
      return;
    }
    toast.success(
      `Selected: ${selectedHobbies.length} hobbies, ${selectedSkills.length} skills`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <CheckSquare size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Checkbox Examples</h1>
              <p className="text-violet-100">Interactive checkbox demonstrations</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hobbies Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Select Your Hobbies</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={selectAllHobbies}
                  className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-all font-semibold text-sm"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAllHobbies}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {hobbies.map((hobby) => (
                <label
                  key={hobby.id}
                  className={`relative cursor-pointer group`}
                >
                  <input
                    type="checkbox"
                    checked={selectedHobbies.includes(hobby.id)}
                    onChange={() => handleHobbyChange(hobby.id)}
                    className="sr-only"
                  />
                  <div
                    className={`p-5 rounded-xl border-2 transition-all ${
                      selectedHobbies.includes(hobby.id)
                        ? 'border-violet-500 bg-violet-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{hobby.icon}</span>
                        <span className="font-semibold text-gray-800">{hobby.label}</span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          selectedHobbies.includes(hobby.id)
                            ? 'bg-violet-500 border-violet-500'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {selectedHobbies.includes(hobby.id) && (
                          <Check className="text-white" size={16} />
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 p-4 bg-violet-50 rounded-xl">
              <p className="text-sm text-gray-700">
                <strong>Selected:</strong> {selectedHobbies.length} {selectedHobbies.length === 1 ? 'hobby' : 'hobbies'}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Select Your Skills</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={selectAllSkills}
                  className="px-4 py-2 bg-fuchsia-100 text-fuchsia-700 rounded-lg hover:bg-fuchsia-200 transition-all font-semibold text-sm"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAllSkills}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {skills.map((skill) => (
                <label
                  key={skill.id}
                  className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: selectedSkills.includes(skill.id) ? '#d946ef' : '#e5e7eb',
                    backgroundColor: selectedSkills.includes(skill.id) ? '#fdf4ff' : 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill.id)}
                    onChange={() => handleSkillChange(skill.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-4 transition-all ${
                      selectedSkills.includes(skill.id)
                        ? 'bg-fuchsia-500 border-fuchsia-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {selectedSkills.includes(skill.id) && (
                      <Check className="text-white" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800">{skill.label}</span>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                    {skill.level}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 p-4 bg-fuchsia-50 rounded-xl">
              <p className="text-sm text-gray-700">
                <strong>Selected:</strong> {selectedSkills.length} {selectedSkills.length === 1 ? 'skill' : 'skills'}
              </p>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Agreement</h2>
            <div className="space-y-4">
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 transition-all ${
                    agreedToTerms
                      ? 'bg-violet-500 border-violet-500'
                      : 'border-gray-300 bg-white group-hover:border-violet-300'
                  }`}
                >
                  {agreedToTerms && <Check className="text-white" size={16} />}
                </div>
                <span className="text-gray-700">
                  I agree to the <strong className="text-violet-600">Terms and Conditions</strong> *
                </span>
              </label>

              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 transition-all ${
                    newsletter
                      ? 'bg-fuchsia-500 border-fuchsia-500'
                      : 'border-gray-300 bg-white group-hover:border-fuchsia-300'
                  }`}
                >
                  {newsletter && <Check className="text-white" size={16} />}
                </div>
                <span className="text-gray-700">
                  Subscribe to our newsletter for updates and offers
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg"
            >
              Submit Selection
            </button>
          </div>
        </form>

        {/* Summary */}
        {(selectedHobbies.length > 0 || selectedSkills.length > 0) && (
          <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl shadow-lg p-8 mt-8">
            <h3 className="text-xl font-bold mb-4">Your Selection Summary:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Hobbies ({selectedHobbies.length}):</h4>
                <div className="space-y-1">
                  {selectedHobbies.map((id) => {
                    const hobby = hobbies.find((h) => h.id === id);
                    return (
                      <div key={id} className="flex items-center space-x-2">
                        <span>{hobby.icon}</span>
                        <span className="text-gray-700">{hobby.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skills ({selectedSkills.length}):</h4>
                <div className="space-y-1">
                  {selectedSkills.map((id) => {
                    const skill = skills.find((s) => s.id === id);
                    return (
                      <div key={id} className="text-gray-700">
                        {skill.label} <span className="text-xs text-gray-500">({skill.level})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkbox;
