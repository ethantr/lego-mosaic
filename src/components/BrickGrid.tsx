// /src/components/BrickMosaic.tsx

import React from 'react';

interface BrickMosaicProps {
  pixelatedColours: string[][];
  gridWidth: number;
  gridHeight: number;
}

const BrickMosaic: React.FC<BrickMosaicProps> = ({ pixelatedColours,gridWidth,gridHeight }) => {
  if (pixelatedColours.length === 0) {
    return <div className="text-center text-gray-500">Upload an image to generate the mosaic</div>;
  }

  return (
    <div 
      className="grid gap-px bg-gray-800 p-px rounded-lg overflow-hidden max-w-2xl mx-auto" 
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
        aspectRatio: `${gridWidth} / ${gridHeight}`,
      }}
    >
      {pixelatedColours.flat().map((color, index) => (
        <div
          key={index}
          className="aspect-square"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );

};

export default BrickMosaic;
