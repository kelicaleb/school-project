import { useState } from 'react';

function ImageUploader({ image, height, bodyHeight}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    height()
    bodyHeight()
    console.log("this is e " , e)
    console.log("this is the height", height)
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFileName(file.name);
      setMessage('');
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Method 1: Use onClick instead of form submission
  const handleUpload = () => {
    image.push(selectedImage)
    console.log("this is the image", image)
    setIsUploading(true);
    
    // Your upload logic here
    
    setTimeout(() => {
      setIsUploading(false);
      setMessage('Image uploaded successfully!');
    }, 2000);
    
    return false; // Additional safety measure
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/20 backdrop-blur-md rounded-lg shadow-md">
      {/* Method 2: Change form to div to avoid form submission behavior */}
      <div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Image
          </label>
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
            {fileName && (
              <p className="mt-2 text-sm text-gray-500">
                Selected file: {fileName}
              </p>
            )}
          </div>
        </div>
        {previewUrl && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Preview
            </label>
            <div className="mt-2 flex justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-lg"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="button" /* Changed from 'submit' to 'button' */
            onClick={handleUpload}
            disabled={isUploading || !selectedImage}
            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
              isUploading || !selectedImage
                ? 'bg-cyan-300 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-700'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
        {message && (
          <div className={`mt-4 text-sm font-medium text-center ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;