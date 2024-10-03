import React, { ChangeEvent } from "react";
import upload_icon from "./../assets/Upload-icon.png";

interface FileUploadProps {
  setImage: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setImage }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]); // Pass the selected file to the parent component
    }
  };

  return (
    <div className="flex flex-col items-start">
      <input 
        type="file" 
        className="hidden" 
        id="file-upload"
        onChange={handleFileChange} 
      />
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center border-dashed border-2 border-gray-300 w-[100px] h-[100px] p-2 mb-4 bg-upload text-white bg-orange-500 rounded-md cursor-pointer hover:bg-orange-600 active:bg-orange-700"
      >
        <img src={upload_icon} alt="Upload Icon" />
      </label>
    </div>
  );
};

export default FileUpload;
