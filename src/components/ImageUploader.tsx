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
      <input
        type="file"
        accept="image/*"
        value=""
        onChange={handleFileChange}
        className="text-sm text-gray-400 file:py-2 file:px-4 file:rounded file:border file:border-gray-600 file:text-white" 
        />
      <p className="text-xs text-gray-400">Upload an image</p>
    </div>
  );
}

export default ImageUploader;
