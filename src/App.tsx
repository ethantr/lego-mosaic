import { useEffect, useRef, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import OriginalImage from "./components/OriginalImage";
import BrickMosaic from "./components/BrickGrid";
import { processImage } from "./utils/imageProcessing";
import { countOccurrences } from "./utils/countOccurrences";
import { BrickColour } from "./utils/colourMapping";
import PieceList from "./components/PieceList";
import Controls from "./components/Controls";
import { generateInstructions } from "./utils/generateInstructions";
import VisualInstructions, { BrickInstruction } from "./components/VisualInstructions";


const App = () => {

  const [gridWidth, setGridWidth] = useState<number>(48);
  const [gridHeight, setGridHeight] = useState<number>(48);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pixelatedColours, setPixelatedColours] = useState<BrickColour[][]>([]);

  const [finalPieces, setFinalPieces] = useState<Map<BrickColour, number>>(new Map());

  const [instructions, setInstructions] = useState<{ instructions: BrickInstruction[][][], colourMap: Map<BrickColour, number> } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setFinalPieces(countOccurrences(pixelatedColours))

  }, [pixelatedColours]);


  const createInstructions = () => {

    const generatedInstructions = generateInstructions(pixelatedColours, finalPieces, 16, gridWidth, gridHeight); // Adjust width/height as needed
    setInstructions(generatedInstructions);
  }

  const handleImageUpload = (imageSrc: string) => {
    setUploadedImage(imageSrc);
    processImage(canvasRef.current!, gridWidth, gridHeight, imageSrc, setPixelatedColours);
  };

  const changeWidth = (width: number) => {
    setGridWidth(width);
    processImage(canvasRef.current!, width, gridHeight, uploadedImage!, setPixelatedColours);

  }

  const changeHeight = (height: number) => {
    setGridHeight(height);
    processImage(canvasRef.current!, gridWidth, height, uploadedImage!, setPixelatedColours);

  }

  const changeGridSize = (width: number, height: number) => {
    setGridWidth(width);
    setGridHeight(height);
    processImage(canvasRef.current!, width, height, uploadedImage!, setPixelatedColours);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-white flex flex-col">
      <Header />

      <main className="flex-grow p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Left Column: Upload & Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
          <h2 style={{ fontFamily: "'Fredoka One', sans-serif" }} className="text-2xl font-bold mb-4 text-red-600">Upload & Preview</h2>
          <div className="mb-4">
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
          {uploadedImage && (
            <div className="mb-4">
              <OriginalImage imageSrc={uploadedImage} />
            </div>
          )}

          {/* Controls for Grid Size and Color Options */}
          <Controls
            gridWidth={gridWidth}
            gridHeight={gridHeight}
            onWidthChange={changeWidth}
            onHeightChange={changeHeight}
            onEditColours={() => {
              // Add logic here to handle color editing
            }}
            onChangeGridSize={changeGridSize}
          />
        </div>

        {/* Right Column: Brick Mosaic and Piece List */}
        <div className="flex flex-col md:w-2/3 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600" style={{ fontFamily: "'Fredoka One', sans-serif" }}>Brick Mosaic</h2>
            <BrickMosaic
              pixelatedColours={pixelatedColours}
              gridWidth={gridWidth}
              gridHeight={gridHeight} />
            <button onClick={createInstructions}>
              Toggle Instructions
            </button>
            {instructions && (
              <VisualInstructions instructions={instructions.instructions} colourMap={instructions.colourMap} />
            )}
          </div>

          <PieceList
            finalPieces={finalPieces}
          />
        </div>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </main>

      <Footer />
    </div>
  );
};

export default App;

function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-center text-sm">
      <p style={{ fontFamily: "'Fredoka One', sans-serif" }}>
        &copy; 2024 Brick Mosaic Generator. All rights reserved.
      </p>
    </footer>
  );
}

function Header() {
  return (
    <header className="bg-blue-500 p-4 shadow-lg rounded-b-lg">
      <h1
        className="text-4xl font-bold text-center"
        style={{ fontFamily: "'Fredoka One', sans-serif", color: "#ffffff" }}
      >
        Brick Mosaic Generator
      </h1>
    </header>
  );
}
