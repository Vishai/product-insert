import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import QRCodeDisplay from '../components/QRCodeDisplay';
import ProductInsertPreview from '../components/ProductInsertPreview';

const SellerInterface = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  // Ensure all fields are accounted for in the state
  const [formState, setFormState] = useState({
    backgroundImage: '',
    logo: '',
    companyName: '',
    productName: '',
    message: '',
    destinationUrl: '',
    backgroundColor: '#ffffff', // Default to white background
    productNameColor: '#000000', // Default to black text for product name
    messageColor: '#000000', // Default to black text for message
  });

  const handleFormSubmit = (formValues) => {
    // Process the destination URL for QR code generation
    const formattedDestinationUrl = formValues.destinationUrl.startsWith('http://') || formValues.destinationUrl.startsWith('https://') 
      ? formValues.destinationUrl 
      : `https://www.${formValues.destinationUrl}`;

    setQRCodeUrl(formattedDestinationUrl);
    setFormState(formValues); // Update the form state with submitted values
  };

  return (
    <div className="p-8">
      <ProductForm onSubmit={handleFormSubmit} />
      {/* <QRCodeDisplay url={qrCodeUrl} /> */}
      <ProductInsertPreview 
        qrCodeUrl={qrCodeUrl}
        backgroundImage={formState.backgroundImage}
        logo={formState.logo}
        companyName={formState.companyName}
        productName={formState.productName}
        message={formState.message}
        backgroundColor={formState.backgroundColor} // New
        productNameColor={formState.productNameColor} // New
        messageColor={formState.messageColor}
      />
    </div>
  );
};

export default SellerInterface;
