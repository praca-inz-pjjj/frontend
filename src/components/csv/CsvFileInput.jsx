import Papa from "papaparse";
import React, { useState } from "react";

const CsvFileInput = ({ onFileLoad }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      parseCsvFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      parseCsvFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const parseCsvFile = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        onFileLoad(result.data);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
  };

  return (
    <div
      className={`flex items-center justify-center w-full ${isDragging ? "bg-blue-50 border-blue-500" : "bg-gray-50"
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center px-2 pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 text-center">
            <span className="font-semibold">Kliknij, aby przesłać</span> lub
            przeciągnij i upuść plik
          </p>
          <p className="text-xs text-gray-500">CSV (MAX. 10MB)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileChange} // Handle file input
        />
      </label>
    </div>
  );
};

export default CsvFileInput;
