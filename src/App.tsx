import { useRef, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import OriginalImage from "./components/OriginalImage";
import BrickMosaic from "./components/BrickGrid";
import { processImage } from "./utils/imageProcessing";

const App = () => {
  // fill pixelatedColours with random colors
  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const colors = Array.from({ length: 48 }, () => Array.from({ length: 48 }, randomColor));
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pixelatedColours, setPixelatedColours] = useState<string[][]>(colors);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (imageSrc: string) => {
    setUploadedImage(imageSrc);
    processImage(canvasRef.current!, imageSrc, setPixelatedColours);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Left Column: Upload & Settings */}
        <div className="flex flex-col md:w-1/3 space-y-6">
          <div className="bg-gray-800 p-4 rounded shadow-lg">
            <ImageUploader onImageUpload={handleImageUpload} />

            {/* Original Image Preview */}
            {uploadedImage && (
              <div className="mt-4">
                <OriginalImage imageSrc={uploadedImage} />
              </div>
            )}
          </div>

          {/* Controls for Grid Size and Color Options */}
          <div className="bg-gray-800 p-4 rounded shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Controls</h2>

            {/* Grid Size Control */}
            <div>
              <label className="block text-sm mb-2">Grid Size:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="1"
                  defaultValue="48"
                  className="w-16 p-2 bg-gray-700 rounded text-white text-center"
                />
                <span className="self-center">x</span>
                <input
                  type="number"
                  min="1"
                  defaultValue="48"
                  className="w-16 p-2 bg-gray-700 rounded text-white text-center"
                />
              </div>
            </div>

            {/* Colour Options Control */}
            <div>
              <label className="block text-sm mb-2">Colour Options:</label>
              {/* Placeholder for colour options. Future implementation could add a dropdown or colour picker */}
              <button className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-600">
                Edit Colours
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Brick Mosaic and Piece List */}
        <div className="flex flex-col md:w-2/3 space-y-6">
          <div className="bg-gray-800 p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Brick Mosaic</h2>
            <BrickMosaic pixelatedColours={pixelatedColours} />
          </div>

          {/* Final List of Pieces (Placeholder for now) */}
          <div className="bg-gray-800 p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">List of Pieces</h2>
            <p className="text-sm text-gray-400">
              This section will display the final list of Lego pieces needed for the mosaic.
            </p>
          </div>
        </div>

        {/* Hidden Canvas for Image Processing */}
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
      <p>&copy; 2024 Lego Mosaic Generator. All rights reserved.</p>
    </footer>
  );
}

function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <h1 className="text-3xl font-bold text-center">Lego Mosaic Generator</h1>
    </header>
  );
}
