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
  const [pixelatedColours] = useState<string[][]>(colors);

  const canvasRef = useRef<HTMLCanvasElement>(null);



  const handleImageUpload = (imageSrc: string) => {
    setUploadedImage(imageSrc);
    processImage(canvasRef.current!, imageSrc);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow p-6">
        <div className="flex flex-col items-center space-y-6">
          <ImageUploader onImageUpload={handleImageUpload} />

          {/* Original Image Preview */}
          {uploadedImage && <OriginalImage imageSrc={uploadedImage} />}
          <BrickMosaic pixelatedColours={pixelatedColours} />
        </div>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </main>

      <Footer />
    </div>
  );
};

export default App;


function Footer() {
  return <footer className="bg-gray-800 p-4 text-center text-sm">
    <p>&copy; 2024 Lego Mosaic Generator. All rights reserved.</p>
  </footer>;
}

function Header() {
  return <header className="bg-gray-800 p-4">
    <h1 className="text-3xl font-bold text-center">Lego Mosaic Generator</h1>
  </header>;
}

