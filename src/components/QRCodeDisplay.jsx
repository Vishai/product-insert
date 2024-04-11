import React from "react";
import QRCode from "qrcode.react";

const QRCodeDisplay = ({ url }) => {
  return (
    <div className="mt-8">
      {url && <QRCode value={url} size={256} includeMargin={true} />}
      {!url && <p>No QR Code generated yet.</p>}
    </div>
  );
};

export default QRCodeDisplay;
