export function processImage(
    canvas: HTMLCanvasElement, 
    imageSrc: string, 
    setPixelatedColours: React.Dispatch<React.SetStateAction<string[][]>>) {


    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
        // Set the canvas size to match the image
        canvas.width = 48;
        canvas.height = 48;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, 48, 48);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, 48, 48);

        // // Create a pixelated version of the image
        const pixelatedColours = createPixelatedColours(imageData, 48);

        // Set the pixelated colours in the state
        setPixelatedColours(pixelatedColours);
    }
}

function createPixelatedColours(imageData: ImageData, size: number): string[][] {
    const pixelatedColours: string[][] = [];

    for (let y = 0; y < size; y++) {
        const row: string[] = [];

        for (let x = 0; x < size; x++) {
            const pixel = getPixel(imageData, x, y, size);
            row.push(pixel);
        }

        pixelatedColours.push(row);
    }

    return pixelatedColours;
}

function getPixel(imageData: ImageData, x: number, y: number, size: number): string {
    const index = (y * size + x) * 4;
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    return `rgb(${r},${g},${b})`;
}

