import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Upload, Image as ImageIcon, Trash2, X, Download, Eye, FolderOpen } from 'lucide-react';

function ImageUpload() {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const storedImages = getFromStorage('images');
    setImages(storedImages);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now().toString(),
        name: file.name,
        data: reader.result,
        size: (file.size / 1024).toFixed(2),
        type: file.type,
        uploadedAt: new Date().toISOString()
      };

      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      saveToStorage('images', updatedImages);
      toast.success('Image uploaded successfully!');
      e.target.value = '';
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      saveToStorage('images', updatedImages);
      toast.success('Image deleted successfully!');
    }
  };

  const handleDownload = (image) => {
    const link = document.createElement('a');
    link.href = image.data;
    link.download = image.name;
    link.click();
    toast.success('Image downloaded!');
  };

  const totalSizeKB = images.reduce((acc, img) => acc + parseFloat(img.size), 0);
  const totalSizeMB = (totalSizeKB / 1024).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <ImageIcon size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Image Upload</h1>
              <p className="text-cyan-100">Upload and manage your images (Max 5MB per image)</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 to-white hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-cyan-600" />
              </div>
              <p className="mb-2 text-xl font-bold text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
              <p className="text-xs text-gray-400 mt-2">
                Supports: .jpg, .jpeg, .png, .gif, .webp
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                <ImageIcon className="text-cyan-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{images.length}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <FolderOpen className="text-blue-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{totalSizeKB.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Size (KB)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Upload className="text-purple-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{totalSizeMB}</div>
                <div className="text-sm text-gray-600">Total Size (MB)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Eye className="text-emerald-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">5 MB</div>
                <div className="text-sm text-gray-600">Max File Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <ImageIcon className="text-cyan-600" size={28} />
              <span>Uploaded Images ({images.length})</span>
            </h2>
            {images.length > 0 && (
              <div className="text-sm text-gray-600">
                Showing {images.length} {images.length === 1 ? 'image' : 'images'}
              </div>
            )}
          </div>

          {images.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300"
                >
                  {/* Image Number Badge */}
                  <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={image.data}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPreviewImage(image)}
                        className="p-3 bg-white text-gray-800 rounded-full hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="View"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDownload(image)}
                        className="p-3 bg-white text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="Download"
                      >
                        <Download size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-3 bg-white text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-white">
                    <p className="font-semibold text-sm text-gray-800 truncate mb-1" title={image.name}>
                      {image.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{image.size} KB</span>
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full font-semibold">
                        {image.type.split('/')[1].toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="text-cyan-600" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No images uploaded yet</h3>
              <p className="text-gray-500 mb-6">Upload your first image to get started!</p>
              <label className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all cursor-pointer font-semibold">
                <Upload size={20} />
                <span>Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {previewImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-5xl w-full animate-fadeIn" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-14 right-0 p-3 bg-white text-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
              >
                <X size={24} />
              </button>
              
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={previewImage.data}
                  alt={previewImage.name}
                  className="w-full h-auto max-h-[70vh] object-contain bg-gray-900"
                />
                <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl text-gray-800">{previewImage.name}</h3>
                    <button
                      onClick={() => handleDownload(previewImage)}
                      className="flex items-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all"
                    >
                      <Download size={18} />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">File Size</p>
                      <p className="font-semibold text-gray-800">{previewImage.size} KB</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Type</p>
                      <p className="font-semibold text-gray-800">{previewImage.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Uploaded</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(previewImage.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ImageUpload;
