import React, { useState } from "react";
import { FaImage, FaPalette, FaFont, FaLink, FaRulerHorizontal, FaRulerVertical } from 'react-icons/fa';

const FileInput = ({ label, fieldName, handleImageUpload }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 flex items-center">
      <input type="file" onChange={(e) => handleImageUpload(e, fieldName)} className="sr-only" />
      <button type="button" className="px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Choose File
      </button>
    </div>
  </div>
);

const ProductForm = ({ formState, onFormChange, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    productName: "",
    productNameFontSize: "1.5",
    message: "",
    messageFontSize: "1",
    destinationUrl: "",
    backgroundImage: null,
    logo: null,
    backgroundColor: "#ffffff",
    productNameColor: "#000000",
    messageColor: "#000000",
    width: "",
    height: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormValues = { ...formValues, [name]: value };
    setFormValues(updatedFormValues);
    onFormChange(updatedFormValues);
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
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Product Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input type="text" name="productName" id="productName" value={formValues.productName} onChange={handleInputChange} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300" />
              <input type="color" name="productNameColor" value={formValues.productNameColor} onChange={handleInputChange} className="h-full p-1 border-gray-300 rounded-r-md" />
            </div>
          </div>
          <div>
            <label htmlFor="productNameFontSize" className="block text-sm font-medium text-gray-700">Product Name Font Size</label>
            <select
              name="productNameFontSize"
              id="productNameFontSize"
              value={formValues.productNameFontSize}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="1">1 rem</option>
              <option value="1.5">1.5 rem</option>
              <option value="2">2 rem</option>
              <option value="2.5">2.5 rem</option>
              <option value="3">3 rem</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Custom Message</label>
            <div className="mt-1">
              <textarea name="message" id="message" rows="3" value={formValues.message} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
            </div>
            <div className="mt-2 flex items-center">
              <input type="color" name="messageColor" value={formValues.messageColor} onChange={handleInputChange} className="h-8 w-8 border-gray-300 rounded-md" />
              <select
                name="messageFontSize"
                id="messageFontSize"
                value={formValues.messageFontSize}
                onChange={handleInputChange}
                className="ml-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0.75">0.75 rem</option>
                <option value="1">1 rem</option>
                <option value="1.25">1.25 rem</option>
                <option value="1.5">1.5 rem</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Destination URL</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700">URL</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                <FaLink />
              </span>
              <input type="url" name="destinationUrl" id="destinationUrl" value={formValues.destinationUrl} onChange={handleInputChange} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="https://example.com" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <div className="mt-1 flex items-center">
              <input type="color" name="backgroundColor" value={formValues.backgroundColor} onChange={handleInputChange} className="h-8 w-8 border-gray-300 rounded-md" />
              <span className="ml-2 text-sm text-gray-500">Select color</span>
            </div>
          </div>
          <FileInput label="Background Image" fieldName="backgroundImage" handleImageUpload={handleImageUpload} />
          <FileInput label="Logo" fieldName="logo" handleImageUpload={handleImageUpload} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Dimensions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width (inches)</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="width"
                id="width"
                min="1"
                value={formState.width || ''}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="e.g., 8"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                <FaRulerHorizontal />
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (inches)</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="height"
                id="height"
                min="1"
                value={formState.height || ''}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="e.g., 10"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                <FaRulerVertical />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Generate QR Code
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;