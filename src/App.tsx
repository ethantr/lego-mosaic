import { useRef, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import OriginalImage from "./components/OriginalImage";
import BrickMosaic from "./components/BrickGrid";
import { processImage } from "./utils/imageProcessing";
import { countOccurrences } from "./utils/countOccurrences";


const App = () => {

  const [gridWidth, setGridWidth] = useState<number>(48);
  const [gridHeight, setGridHeight] = useState<number>(48);

  // const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // const colors = Array.from({ length: 48 }, () => Array.from({ length: 48 }, randomColor));
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pixelatedColours, setPixelatedColours] = useState<string[][]>([]);

  const [finalPieces, setFinalPieces] = useState<Record<string, number>>({});

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (imageSrc: string) => {
    setUploadedImage(imageSrc);
    processImage(canvasRef.current!, gridWidth,gridHeight, imageSrc, setPixelatedColours);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Left Column: Upload & Settings */}
        <div className="flex flex-col md:w-1/3 space-y-6">
          <div className="bg-yellow-400 p-4 rounded-lg shadow-lg">
            <ImageUploader onImageUpload={handleImageUpload} />

            {uploadedImage && (
              <div className="mt-4">
                <OriginalImage imageSrc={uploadedImage} />
              </div>
            )}
          </div>

          {/* Controls for Grid Size and Color Options */}
          <div className="bg-gray-400 p-4 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fredoka One', sans-serif" }}>Controls</h2>

            {/* Grid Size Control */}
            <div>
              <label className="block text-sm mb-2">Grid Size:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="1"
                  defaultValue="48"
                  className="w-16 p-2 bg-gray-300 rounded-lg text-gray-900 text-center"
                  onChange={(e) => setGridWidth(Number(e.target.value))}
                />
                <span className="self-center">x</span>
                <input
                  type="number"
                  min="1"
                  defaultValue="48"
                  className="w-16 p-2 bg-gray-300 rounded-lg text-gray-900 text-center"
                  onChange={(e) => setGridHeight(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Colour Options Control */}
            <div>
              <label className="block text-sm mb-2">Colour Options:</label>
              <button className="bg-gray-500 px-3 py-2 rounded-lg text-white hover:bg-gray-600 transition duration-300">
                Edit Colours
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Brick Mosaic and Piece List */}
        <div className="flex flex-col md:w-2/3 space-y-6">
          <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fredoka One', sans-serif" }}>Brick Mosaic</h2>
            <BrickMosaic pixelatedColours={pixelatedColours} gridWidth={gridWidth} 
  gridHeight={gridHeight}/>
          </div>

          {/* Final List of Pieces */}
          <div className="bg-red-400 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fredoka One', sans-serif" }}>List of Pieces</h2>
            <p className="text-sm text-gray-900">
              This section will display the final list of Lego pieces needed for the mosaic.
            </p>
            <button 
              onClick={() => setFinalPieces(countOccurrences(pixelatedColours))} 
              className="bg-yellow-500 px-3 py-2 rounded-lg text-gray-900 hover:bg-yellow-600 transition duration-300"
            >
              Generate Piece List
            </button>
            {finalPieces && (
              <ul className="mt-4 space-y-2">
                {Object.entries(finalPieces).map(([color, count]) => (
                  <li key={color}>
                    <span
                      className="inline-block w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    ></span>
                    {color}: {count}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
