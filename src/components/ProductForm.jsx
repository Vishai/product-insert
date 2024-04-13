import React, { useState } from "react";
import { FaImage, FaLink, FaRulerHorizontal, FaRulerVertical } from 'react-icons/fa';

const FileInput = ({ label, fieldName, handleImageUpload }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="mt-1 flex items-center">
      <label htmlFor={fieldName} className="px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        Choose File
      </label>
      <input
        id={fieldName}
        type="file"
        onChange={(e) => handleImageUpload(e, fieldName)}
        className="sr-only"
      />
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
        setFormValues((prevState) => ({ ...prevState, [fieldName]: reader.result }));
        onFormChange({ ...formValues, [fieldName]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDestinationUrlBlur = () => {
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    const updatedDestinationUrl = urlPattern.test(formValues.destinationUrl)
      ? formValues.destinationUrl.startsWith('http')
        ? formValues.destinationUrl
        : `https://${formValues.destinationUrl}`
      : `https://www.${formValues.destinationUrl}`;
  
    setFormValues((prevValues) => ({
      ...prevValues,
      destinationUrl: updatedDestinationUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={formValues.productName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="productNameFontSize" className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <select
                name="productNameFontSize"
                id="productNameFontSize"
                value={formValues.productNameFontSize}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="1">1 rem</option>
                <option value="1.5">1.5 rem</option>
                <option value="2">2 rem</option>
                <option value="2.5">2.5 rem</option>
                <option value="3">3 rem</option>
              </select>
            </div>
            <div>
              <label htmlFor="productNameColor" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="color"
                name="productNameColor"
                id="productNameColor"
                value={formValues.productNameColor}
                onChange={handleInputChange}
                className="mt-1 h-10 w-10 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Custom Message</label>
            <textarea
              name="message"
              id="message"
              rows="3"
              value={formValues.message}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="messageFontSize" className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
              <select
                name="messageFontSize"
                id="messageFontSize"
                value={formValues.messageFontSize}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="0.75">0.75 rem</option>
                <option value="1">1 rem</option>
                <option value="1.25">1.25 rem</option>
                <option value="1.5">1.5 rem</option>
              </select>
            </div>
            <div>
              <label htmlFor="messageColor" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="color"
                name="messageColor"
                id="messageColor"
                value={formValues.messageColor}
                onChange={handleInputChange}
                className="mt-1 h-10 w-10 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Destination URL</h2>
        <div>
          <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-base">
              <FaLink />
            </span>
            <input
              type="text"
              name="destinationUrl"
              id="destinationUrl"
              value={formValues.destinationUrl}
              onChange={handleInputChange}
              onBlur={handleDestinationUrlBlur}
              className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Appearance</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
            <input
              type="color"
              name="backgroundColor"
              id="backgroundColor"
              value={formValues.backgroundColor}
              onChange={handleInputChange}
              className="mt-1 h-10 w-10 border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <FileInput label="Background Image" fieldName="backgroundImage" handleImageUpload={handleImageUpload} />
          <FileInput label="Logo" fieldName="logo" handleImageUpload={handleImageUpload} />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dimensions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width (inches)</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="width"
                id="width"
                min="1"
                value={formState.width || ''}
                onChange={handleInputChange}
                className="flex-1 block w-full rounded-none rounded-l-md border border-gray-300 py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 8"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-base">
                <FaRulerHorizontal />
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (inches)</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="height"
                id="height"
                min="1"
                value={formState.height || ''}
                onChange={handleInputChange}
                className="flex-1 block w-full rounded-none rounded-l-md border border-gray-300 py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 10"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-base">
                <FaRulerVertical />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate QR Code
        </button>
      </div>
    </form>
  );
};

export default ProductForm;