import QRCode from "qrcode.react";

const ProductInsertPreview = ({ formState, qrCodeUrl }) => {
  const {
    backgroundImage,
    logo,
    productName,
    productNameColor,
    message,
    messageColor,
    backgroundColor,
    width,
    height,
  } = formState;

  const containerStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundColor: !backgroundImage ? backgroundColor : undefined,
    width: width ? `${width}in` : 'auto',
    height: height ? `${height}in` : 'auto',
    position: 'relative',
  };

  const logoSize = width && height ? Math.min(width, height) * 0.3 : 32;
  const qrCodeSize = width && height ? Math.max(Math.min(width, height) * 0.10, 64) : 128;
  const fontSizeRatio = width && height ? Math.min(width, height) / 10 : 1;

  return (
    <div
      className={`preview-container bg-center bg-cover p-8 rounded-lg shadow-lg ${
        backgroundImage ? '' : 'bg-gray-200'
      }`}
      style={containerStyle}
    >
      <div className="overlay bg-black bg-opacity-20 rounded-lg absolute top-0 right-0 bottom-0 left-0"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {logo && (
          <img
            src={logo}
            alt="Company Logo"
            className="object-cover rounded-full mb-4"
            style={{ width: `${logoSize}in`, height: `${logoSize}in` }}
          />
        )}
        <div className="text-center">
          <h3
            className="font-semibold mb-4"
            style={{
              color: productNameColor || 'inherit',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              fontSize: `${1.5 * fontSizeRatio}rem`,
            }}
          >
            {productName}
          </h3>
          <p
            className="text-md"
            style={{
              color: messageColor || 'inherit',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              fontSize: `${1 * fontSizeRatio}rem`,
            }}
          >
            {message}
          </p>
        </div>
        {qrCodeUrl && (
          <div className="mt-4">
            <QRCode
              value={qrCodeUrl}
              size={qrCodeSize}
              level={"H"}
              includeMargin={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInsertPreview;