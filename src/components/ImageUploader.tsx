import { Upload } from "lucide-react";

interface FileUploaderProps {
  onImageUpload: (imageSrc: string) => void;
}

function ImageUploader({ onImageUpload }: FileUploaderProps) {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        onImageUpload(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="text-center">
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="bg-lego-yellow  px-3 py-2 rounded-lg text-lego-dark-blue  font-bold inline-flex items-center transition-transform hover:scale-105">
          <Upload className="mr-2" /> Upload Image
        </div>
      </label>

      <input
        type="file"
        accept="image/*"
        value=""
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <p className="text-sm text-gray-500 mt-2">Click to upload or drag and drop</p>
    </div>

  );
}

export default ImageUploader;
