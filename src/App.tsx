import { useState } from "react";

const App = () => {

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string); // Save the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header/>

      {/* Main Content Area */}
      <main className="flex-grow p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-400 file:py-2 file:px-4 file:rounded file:border file:border-gray-600 file:text-white"
            />
          </div>

          {/* Original Image Preview */}
          {uploadedImage && (
              <div className="w-1/2 max-w-xs lg:max-w-md">
                <h2 className="text-center text-lg mb-2">Original Photo</h2>
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          
          {/* Lego Mosaic Grid */}
          <div
            className="grid gap-1 mx-auto"
            style={{
              gridTemplateColumns: 'repeat(48, 1fr)',  // 16 equal columns
              gridTemplateRows: 'repeat(48, 1fr)',    // 16 equal rows
              width: '80%',                            // Set width to 80% of the container
              maxWidth: '600px',                       // Limit the width to 600px
              height: 'auto',
            }}
          >
            {/* Placeholder grid for Lego mosaic */}
            {Array.from({ length: 48* 48 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-600"
                style={{
                  width: '100%',        // Ensuring 100% width for grid cells
                  height: '0',          // The height will be based on the width
                  paddingBottom: '100%', // Ensures the div stays square (height = width)
                }}
              ></div>
            ))}
          </div>
        </div>
      </main>

      <Footer/>
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

