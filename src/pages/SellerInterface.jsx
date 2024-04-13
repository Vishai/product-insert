import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductInsertPreview from '../components/ProductInsertPreview';

const SellerInterface = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [formState, setFormState] = useState({
    backgroundImage: '',
    logo: '',
    productName: '',
    message: '',
    destinationUrl: '',
    backgroundColor: '#ffffff',
    productNameColor: '#000000',
    messageColor: '#000000',
    width: '',
    height: '',
  });

  const handleFormChange = (updatedFormValues) => {
    setFormState(updatedFormValues);
  };

  const handleFormSubmit = (formValues) => {
    const formattedDestinationUrl = formValues.destinationUrl.startsWith('http://') || formValues.destinationUrl.startsWith('https://')
      ? formValues.destinationUrl
      : `https://www.${formValues.destinationUrl}`;
    setQRCodeUrl(formattedDestinationUrl);
    setFormState(formValues);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Create Product Insert</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <ProductForm
                formState={formState}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
              <ProductInsertPreview formState={formState} qrCodeUrl={qrCodeUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInterface;