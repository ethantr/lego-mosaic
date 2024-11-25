interface OriginalImageProps {
    imageSrc: string;
}

export default function OriginalImage({ imageSrc }: OriginalImageProps) {
    return (
        <div className="w-full max-w-xs mx-auto">
            <h3 className="text-lg text-lego-dark-blue font-semibold mb-2 text-center">Original Image</h3>
            <div className="relative aspect-square">
                <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="w-full h-auto rounded-md" />
            </div>
        </div>
    );
}
