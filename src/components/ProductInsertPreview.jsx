import React from "react";
import QRCode from "qrcode.react"; // Ensure QRCode is imported

const ProductInsertPreview = ({
  backgroundImage,
  logo,
  companyName,
  productName,
  productNameColor, // New prop for product name color
  message,
  messageColor, // New prop for message color
  qrCodeUrl,
  backgroundColor // New prop for background color
}) => {
  return (
    <div className={`preview-container relative bg-center bg-cover p-8 rounded-lg shadow-lg ${backgroundImage ? '' : 'bg-gray-200'}`} style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined, backgroundColor: !backgroundImage ? backgroundColor : undefined }}>
      <div className="overlay bg-black bg-opacity-20 rounded-lg absolute top-0 right-0 bottom-0 left-0"></div>
      {logo && <img src={logo} alt="Company Logo" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 z-10" />}
      <div className="text-center z-10">
        <h2 className="text-2xl font-bold mb-2 text-white shadow-md">{companyName}</h2>
        <h3 className="text-xl font-semibold mb-4" style={{ color: productNameColor, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{productName}</h3>
        <p className="text-md" style={{ color: messageColor, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{message}</p>
        {qrCodeUrl && (
          <div className="mt-4">
            <QRCode value={qrCodeUrl} size={128} level={"H"} includeMargin={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInsertPreview;
