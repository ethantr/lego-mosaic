import { BrickColour } from "./colourMapping";

type BrickInstruction = {
    number: number;
    colour: string;
};

export function generateInstructions(pixelatedColours: BrickColour[][], colourMap: Map<BrickColour, number>, chunkSize: number, width: number, height: number) {
    //Map colours in the map to numbers
    const colourMapNumbers = coloursToNumbers(colourMap);

    const chunks = getChunks(pixelatedColours, chunkSize);
    const instructions: { instructions: BrickInstruction[][][], colourMap: Map<BrickColour, number> } = { instructions: [], colourMap: colourMapNumbers };
    const totalBricks = width * height;


    // For each chunk, make an grid with numbers and the colours
    for (const chunk of chunks) {

        // Map the numbers to the chunk grid
        const chunkGrid = generateChunk(chunk, colourMapNumbers);
        instructions['instructions'].push(chunkGrid); 

    }




    console.log(`Total bricks: ${totalBricks}`);
    console.log(instructions);
    return instructions;




}

function generateChunk(chunk: BrickColour[][], colourNumberMap: Map<BrickColour, number>) {
    // Generate the chunk grid by mapping each colour to its number
    return chunk.map(row =>
        row.map(colour => {
            const brickNumber = colourNumberMap.get(colour);
            return {
                number: brickNumber ?? 0,    // Assign brick number based on the colour map, default to 0 if undefined
                colour: colour.hexColour // Colour in hex code
            };
        })
    );
}

export function coloursToNumbers(colourMap: Map<BrickColour, number>) {
    const colourMapNumbers = new Map<BrickColour, number>();
    let i = 1;
    for (const [colour] of colourMap) {
        colourMapNumbers.set(colour, i);
        i++;
    }
    return colourMapNumbers;
}

function getChunks(pixelatedColours: BrickColour[][], chunkSize: number) {
    const chunks = [];
    // Split the grid into chunks
    for (let row = 0; row < pixelatedColours.length; row += chunkSize) {
        for (let col = 0; col < pixelatedColours[row].length; col += chunkSize) {
            const chunk: BrickColour[][] = [];
            for (let r = row; r < row + chunkSize; r++) {
                const chunkRow = pixelatedColours[r].slice(col, col + chunkSize);
                chunk.push(chunkRow);
            }
            chunks.push(chunk);
        }
    }

    return chunks;
}