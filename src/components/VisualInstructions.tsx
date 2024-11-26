import React, { useState, useEffect } from 'react';
import { BrickColour } from '../utils/colourMapping';

export interface BrickInstruction {
  number: number;
  colour: string; // Colour could be a hex value
}

interface VisualInstructionsProps { instructions: BrickInstruction[][][], colourMap: Map<BrickColour, number> }

const VisualInstructions: React.FC<VisualInstructionsProps> = ({ instructions,colourMap }) => {
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

  // Render the color reference from the BrickColourMap
  const renderColorReference = () => {
    return (
      <div className="reference-section">
        <h3>Color Reference</h3>
        <div className="color-reference-container">
          {Object.entries(colourMap).map(([color, hex], index) => (
            <div key={index} className="color-entry" style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className="color-swatch"
                style={{
                  backgroundColor: hex,
                  width: '30px',
                  height: '30px',
                  marginRight: '10px',
                }}
              ></div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Color: </span>{color}
                <br />
                <span style={{ fontWeight: 'bold' }}>Hex: </span>{hex}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Visual Instructions</h2>

      {/* Display current chunk */}
      <div className="instructions-container">
        <div className="bg-slate-900">
          {currentChunk.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((brick, colIndex) => (
                <div
                  className="brick"
                  key={colIndex}
                  style={{
                    backgroundColor: brick.colour,
                    width: '40px',
                    height: '40px',
                    display: 'inline-block',
                    position: 'relative',
                    margin: '2px',
                  }}
                >
                  <div
                    className="brick-number"
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '5px',
                      color: getContrastingTextColor(brick.colour),
                      fontSize: '10px',
                    }}
                  >
                    {brick.number}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="navigation">
        <button onClick={handlePreviousChunk} disabled={currentChunkIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNextChunk}
          disabled={currentChunkIndex === instructions.length - 1}
        >
          Next
        </button>
      </div>


        {/* Render the reference section */}
        {renderColorReference()}
    </div>
  );
};

export default VisualInstructions;


function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    // Remove the "#" symbol if it's there
    hex = hex.replace(/^#/, '');

    // Parse the hex color
    if (hex.length === 6) {
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    }
    return null; // Invalid hex color format
}

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

    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

    // If luminance is above 0.5, it's a light color, so we use black text
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}