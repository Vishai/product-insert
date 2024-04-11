import React, { useState } from "react";

const FileInput = ({ label, fieldName, handleImageUpload }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input type="file" onChange={(e) => handleImageUpload(e, fieldName)} className="mt-1 file:mr-4 file:py-2 file:px-4
      file:rounded file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" />
  </div>
);

const ProductForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    productName: "",
    message: "",
    companyName: "",
    destinationUrl: "", // Ensuring destinationUrl is part of the formValues state
    backgroundImage: null,
    logo: null,
    backgroundColor: "#ffffff", // Default background color
    productNameColor: "#000000", // Default product name text color
    messageColor: "#000000", // Default custom message text color
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues(prevState => ({ ...prevState, [fieldName]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues); // Pass the entire formValues state up to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" name="productName" id="productName" value={formValues.productName} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        <input type="color" name="productNameColor" value={formValues.productNameColor} onChange={handleInputChange} className="mt-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Custom Message</label>
        <textarea name="message" id="message" rows="3" value={formValues.message} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
        <input type="color" name="messageColor" value={formValues.messageColor} onChange={handleInputChange} className="mt-2" />
      </div>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
        <input type="text" name="companyName" id="companyName" value={formValues.companyName} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
      </div>
      <div>
        <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700">Destination URL</label>
        <input type="url" name="destinationUrl" id="destinationUrl" value={formValues.destinationUrl} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="https://" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Background Color</label>
        <input type="color" name="backgroundColor" value={formValues.backgroundColor} onChange={handleInputChange} className="mt-1" />
      </div>
      <FileInput label="Background Image" fieldName="backgroundImage" handleImageUpload={handleImageUpload} />
      <FileInput label="Logo" fieldName="logo" handleImageUpload={handleImageUpload} />
      <button type="submit" className="px-4 py-2 bg-violet-500 text-white font-semibold rounded-md border border-violet-700 hover:bg-blue-600">Generate QR Code</button>
    </form>
  );
};


export default ProductForm;
