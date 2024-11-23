interface OriginalImageProps {
    imageSrc: string;
}

export default function OriginalImage({ imageSrc }: OriginalImageProps) {
    return (
        <div className="w-1/2 max-w-xs lg:max-w-md">
            <h2 className="text-center text-lg mb-2">Original Photo</h2>
            <img
                src={imageSrc}
                alt="Uploaded"
                className="w-full h-auto rounded-md" />
        </div>
    );
}
