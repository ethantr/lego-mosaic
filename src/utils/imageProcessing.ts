import { BrickColour, getClosestBrickColour, rgbToHex } from "./colourMapping";

export function processImage(
    canvas: HTMLCanvasElement,
    gridWidth: number,
    gridHeight: number,
    imageSrc: string,
    setPixelatedColours: React.Dispatch<React.SetStateAction<BrickColour[][]>>) {


    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
        // Set the canvas size to match the image
        canvas.width = gridWidth;
        canvas.height = gridHeight;
        ctx.filter = 'contrast(2) saturate(1) brightness(1)'; 
        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, gridWidth, gridHeight);

        

        // Get the image data
        const imageData = ctx.getImageData(0, 0, gridWidth, gridHeight);
        ctx.filter = 'none';
        // // Create a pixelated version of the image
        const pixelatedColours = createPixelatedColours(imageData, gridWidth,gridHeight);

        // Set the pixelated colours in the state
        setPixelatedColours(pixelatedColours);
    }
}

function createPixelatedColours(imageData: ImageData, gridWidth: number, gridHeight: number): BrickColour[][] {
    const pixelatedColours: BrickColour[][] = [];

    for (let y = 0; y < gridHeight; y++) {
        const row: BrickColour[] = [];

        for (let x = 0; x < gridWidth; x++) {
            const pixel = getPixel(imageData, x, y, gridWidth);

            row.push(pixel);
        }

        pixelatedColours.push(row);
    }

    return pixelatedColours;
}

function getPixel(imageData: ImageData, x: number, y: number, gridWidth: number): BrickColour {
    const index = (y * gridWidth + x) * 4;
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const colorHex = rgbToHex(r, g, b);
    const nearestColor = getClosestBrickColour(colorHex);
    return nearestColor;
}

