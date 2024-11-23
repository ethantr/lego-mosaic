export function processImage(canvas: HTMLCanvasElement, imageSrc: string) {


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
        // const imageData = ctx.getImageData(0, 0, 48, 48);

        // // Create a pixelated version of the image
        // const pixelatedColours = createPixelatedColours(imageData, 48);

        // // Set the pixelated colours in the state
        // setPixelatedColours(pixelatedColours);
    }
}