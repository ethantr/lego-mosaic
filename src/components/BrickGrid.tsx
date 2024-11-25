// /src/components/BrickMosaic.tsx

import React from 'react';

interface BrickMosaicProps {
  pixelatedColours: string[][];
}

const BrickMosaic: React.FC<BrickMosaicProps> = ({ pixelatedColours }) => {
  return (
    <div
      className="grid gap-0.5 mx-auto"
      style={{
        gridTemplateColumns: 'repeat(48, 1fr)',  // 16 equal columns
        gridTemplateRows: 'repeat(48, 1fr)',    // 16 equal rows
        width: '80%',                            // Set width to 80% of the container
        maxWidth: '600px',                       // Limit the width to 600px
        height: 'auto',
      }}
    >
      {/* Placeholder grid for Lego mosaic */}
      {pixelatedColours.flat().map((color, index) => (
        <div
        className=''
          key={index}
          style={{
            backgroundColor: color, // Use the pixelated color
            width: '100%',          // Ensuring 100% width for grid cells
            height: '0',            // The height will be based on the width
            paddingBottom: '100%',  // Ensures the div stays square (height = width)
          }}
        >
        </div>
      ))}
    </div>

  );
};

export default BrickMosaic;
