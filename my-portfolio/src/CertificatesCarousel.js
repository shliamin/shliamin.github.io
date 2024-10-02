import React from 'react';

function CertificatesCarousel() {
  return (
    <div className="certificate-carousel">
      {/* Здесь рендерятся сертификаты */}
      <div className="certificate-item">
        <a href="B.Sc. Degree Certificate - HTW Berlin.pdf" target="_blank">
          <embed src="B.Sc. Degree Certificate - HTW Berlin.pdf" width="120" height="170" />
        </a>
      </div>
    </div>
  );
}

export default CertificatesCarousel;
