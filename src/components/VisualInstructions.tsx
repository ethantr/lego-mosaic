import React, { useState, useEffect } from 'react';
import { BrickColour, hexToRgb } from '../utils/colourMapping';

export interface BrickInstruction {
  number: number;
  colour: string; // Colour could be a hex value
}

interface VisualInstructionsProps { instructions: BrickInstruction[][][], colourMap: Map<BrickColour, number> }

const VisualInstructions: React.FC<VisualInstructionsProps> = ({ instructions, colourMap }) => {
  // Track the current chunk index within the component
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentChunk, setCurrentChunk] = useState<BrickInstruction[][] | null>(null);

  useEffect(() => {
    // Only set the current chunk if instructions are available
    if (instructions.length > 0) {
      setCurrentChunk(instructions[0]); // Initialize with the first chunk
    }
  }, [instructions]); // Run when instructions change

  // Show the current chunk based on the current index
  const handleNextChunk = () => {
    if (currentChunkIndex < instructions.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    }
  };

  const handlePreviousChunk = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1);
    }
  };

  // Update the current chunk when the index changes
  useEffect(() => {
    if (instructions.length > 0) {
      setCurrentChunk(instructions[currentChunkIndex]);
    }
  }, [currentChunkIndex, instructions]); // Update when chunkIndex changes

  // Ensure there is a valid current chunk
  if (!currentChunk) {
    return <div>Loading instructions...</div>;
  }


  return (<>
  
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
      {/* Instructions Grid */}
      <div className="flex flex-col items-center space-y-4">
        

        <div className="instructions-container bg-slate-800 p-4 rounded-lg shadow-lg">
          {currentChunk.map((row, rowIndex) => (
            <div className="flex justify-center" key={rowIndex}>
              {row.map((brick, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    backgroundColor: brick.colour,
                  }}
                  className="w-10 h-10 m-1 flex items-center justify-center rounded-md shadow-md"
                >
                  <span
                    style={{ color: getContrastingTextColor(brick.colour) }}
                    className="text-xs font-bold"
                  >
                    {brick.number}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Navigation & Page Info */}
        <div className="flex items-center justify-between w-full max-w-md">
          <button
            onClick={handlePreviousChunk}
            disabled={currentChunkIndex === 0}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${
              currentChunkIndex === 0
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold text-lego-dark-blue">
            {currentChunkIndex + 1}/{instructions.length}
          </span>

          <button
            onClick={handleNextChunk}
            disabled={currentChunkIndex === instructions.length - 1}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${
              currentChunkIndex === instructions.length - 1
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>


      {/* Legend Section */}
      <div className="legend bg-slate-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-lego-blue mb-4">Colour Legend</h3>
        <div className="grid gap-2">
          {Array.from(colourMap.entries()).map(([colour, number]) => (
            <div
              key={colour.hexColour.toString()}
              className="flex items-center space-x-4 p-2 rounded-md shadow-md"
              style={{
                backgroundColor: colour.hexColour,
              }}
            >
              <div
                className="w-8 h-8 rounded-md shadow-md"
                style={{
                  backgroundColor: colour.hexColour,
                }}
              ></div>
              <span
                style={{ color: getContrastingTextColor(colour.hexColour) }}
                className="text-sm font-bold"
              >
                {colour.name}: {number}
              </span>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    </>
  );
};

export default VisualInstructions;

// Calculate luminance
function calculateLuminance(r: number, g: number, b: number): number {
  const normalize = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  const rL = normalize(r);
  const gL = normalize(g);
  const bL = normalize(b);

  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
}

// Get contrasting text color (black or white)
function getContrastingTextColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000'; // If invalid color, default to black text

  const luminance = calculateLuminance(rgb[0], rgb[1], rgb[2]);

  // If luminance is above 0.5, it's a light color, so we use black text
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}