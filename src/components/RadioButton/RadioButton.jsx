import { useState } from 'react';
import { toast } from 'react-toastify';
import { Circle, CheckCircle, Plus, User, Briefcase, MapPin, Award, Trash2 } from 'lucide-react';

function RadioButton() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    preference: '',
    experience: ''
  });
  const [submissions, setSubmissions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.gender || !formData.preference || !formData.experience) {
      toast.error('Please fill all fields and select all options!');
      return;
    }

    const newSubmission = {
      ...formData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    
    setSubmissions([...submissions, newSubmission]);
    toast.success('Form submitted successfully!');
    setFormData({ name: '', gender: '', preference: '', experience: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      setSubmissions(submissions.filter(sub => sub.id !== id));
      toast.success('Submission deleted successfully!');
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male', icon: '👨' },
    { value: 'female', label: 'Female', icon: '👩' },
    { value: 'other', label: 'Other', icon: '🧑' },
  ];

  const preferenceOptions = [
    { value: 'remote', label: 'Remote', icon: '🏠' },
    { value: 'office', label: 'Office', icon: '🏢' },
    { value: 'hybrid', label: 'Hybrid', icon: '🔄' },
  ];

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher', badge: '0 Years' },
    { value: '1-3years', label: '1-3 Years', badge: 'Junior' },
    { value: '3-5years', label: '3-5 Years', badge: 'Mid-level' },
    { value: '5+years', label: '5+ Years', badge: 'Senior' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Circle size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Radio Button Form</h1>
              <p className="text-pink-100">Submit your information using radio button selections</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
                <User className="text-pink-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{submissions.length}</div>
                <div className="text-sm text-gray-600">Total Submissions</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-rose-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">4</div>
                <div className="text-sm text-gray-600">Required Fields</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Circle className="text-purple-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">10</div>
                <div className="text-sm text-gray-600">Total Options</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          {/* Name Input */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <User className="text-pink-600" size={24} />
              <span>Your Name *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-lg"
              placeholder="Enter your full name"
            />
          </div>

          {/* Gender Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <label className="block text-lg font-bold text-gray-800 mb-6">
              Select Gender *
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {genderOptions.map((option) => (
                <label
                  key={option.value}
                  className="relative cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={formData.gender === option.value}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="sr-only"
                  />
                  <div className={`p-6 rounded-xl border-2 transition-all ${
                    formData.gender === option.value
                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}>
                    <div className="flex flex-col items-center space-y-3">
                      <span className="text-4xl">{option.icon}</span>
                      <span className="font-semibold text-gray-800">{option.label}</span>
                      {formData.gender === option.value && (
                        <CheckCircle className="text-pink-500" size={24} />
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Work Preference */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <label className="block text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <MapPin className="text-rose-600" size={24} />
              <span>Work Preference *</span>
            </label>
            <div className="space-y-3">
              {preferenceOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50"
                  style={{
                    borderColor: formData.preference === option.value ? '#f43f5e' : '#e5e7eb',
                    backgroundColor: formData.preference === option.value ? '#fff1f2' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="preference"
                    value={option.value}
                    checked={formData.preference === option.value}
                    onChange={(e) => setFormData({...formData, preference: e.target.value})}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                    formData.preference === option.value ? 'border-rose-500' : 'border-gray-300'
                  }`}>
                    {formData.preference === option.value && (
                      <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-3xl mr-3">{option.icon}</span>
                  <span className="font-semibold text-gray-800 text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <label className="block text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Award className="text-purple-600" size={24} />
              <span>Experience Level *</span>
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {experienceOptions.map((option) => (
                <label
                  key={option.value}
                  className="relative cursor-pointer"
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option.value}
                    checked={formData.experience === option.value}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="sr-only"
                  />
                  <div className={`p-5 rounded-xl border-2 transition-all ${
                    formData.experience === option.value
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.experience === option.value ? 'border-purple-500' : 'border-gray-300'
                        }`}>
                          {formData.experience === option.value && (
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="font-semibold text-gray-800">{option.label}</span>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {option.badge}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center space-x-2"
            >
              <Plus size={24} />
              <span>Submit Form</span>
            </button>
          </div>
        </form>

        {/* Display Submissions */}
        {submissions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <Briefcase className="text-pink-600" size={28} />
              <span>Submitted Forms ({submissions.length})</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">#</th>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Gender</th>
                    <th className="px-6 py-4 text-left font-semibold">Preference</th>
                    <th className="px-6 py-4 text-left font-semibold">Experience</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((sub, index) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{sub.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold capitalize">
                          {sub.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold capitalize">
                          {sub.preference}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          {sub.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Submissions Message */}
        {submissions.length === 0 && (
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-lg p-12 text-center">
            <Circle className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Submissions Yet</h3>
            <p className="text-gray-600">Fill out the form above to see your submissions here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RadioButton;
