import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Upload, Image as ImageIcon, Trash2, X, Download, Eye } from 'lucide-react';

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
          <label className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 to-white hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-16 h-16 mb-4 text-gray-400" />
              <p className="mb-2 text-lg font-semibold text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
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

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Upload className="text-blue-600" size={28} />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">
                  {images.reduce((acc, img) => acc + parseFloat(img.size), 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Size (KB)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="text-purple-600" size={28} />
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
          <h2 className="text-2xl font-bold mb-6">Uploaded Images</h2>
          {images.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gray-200">
                    <img
                      src={image.data}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setPreviewImage(image)}
                      className="p-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-all"
                      title="View"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDownload(image)}
                      className="p-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-all"
                      title="Download"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="font-semibold text-sm text-gray-800 truncate">{image.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{image.size} KB</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No images uploaded yet</h3>
              <p className="text-gray-500">Upload your first image to get started!</p>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {previewImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
              <img
                src={previewImage.data}
                alt={previewImage.name}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-4 bg-white rounded-xl p-4">
                <h3 className="font-bold text-lg">{previewImage.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Size: {previewImage.size} KB • Uploaded: {new Date(previewImage.uploadedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
