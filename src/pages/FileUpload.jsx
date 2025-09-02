import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, FileText } from 'lucide-react';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      setUploadedFiles(JSON.parse(storedFiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newFile = {
          id: Date.now() + index,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + "mb",
          type: file.type,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          What have you been working on?
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Add your documents here, and you can upload up to 5 files max
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 sm:p-12 lg:p-16 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-gray-400'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-xl mx-auto flex items-center justify-center">
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
            Drag and drop a file
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Max 10MB each (20MB for videos)
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Browse Button */}
        <button
          onClick={openFileDialog}
          className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-sm sm:text-base"
        >
          Browse Files
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        />
      </div>

      {/* Uploaded Files Section */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Uploaded Files
          </h2>
          
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {/* File Icon or Preview */}
                  {file.type.startsWith("image/") ? (
                    <img src={file.data} alt={file.name} className="w-12 h-12 object-cover rounded" />
                  ) : file.type.startsWith("video/") ? (
                    <video src={file.data} className="w-12 h-12 rounded" />
                  ) : (
                    <FileText className="w-8 h-8 text-gray-400" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {file.size}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 ml-3"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
