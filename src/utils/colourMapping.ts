interface BrickColour{
    name: string;
    hexColour: string;
}

export const brickColours: BrickColour[] = [
    { name: 'White', hexColour: '#FFFFFF' },
    { name: 'Light Bluish Gray', hexColour: '#A0A5A9' },
    { name: 'Dark Bluish Gray', hexColour: '#6C6E68' },
    { name: 'Black', hexColour: '#000000' },
    { name: 'Red', hexColour: '#C91A09' },
    { name: 'Dark Red', hexColour: '#8C1510' },
    { name: 'Blue', hexColour: '#0055BF' },
    { name: 'Dark Blue', hexColour: '#0033B2' },
    { name: 'Green', hexColour: '#237841' },
    { name: 'Dark Green', hexColour: '#004618' },
    { name: 'Yellow', hexColour: '#F2CD37' },
    { name: 'Dark Tan', hexColour: '#958A73' },
    { name: 'Tan', hexColour: '#F5F5DC' },
    { name: 'Dark Tan', hexColour: '#958A73' },
    { name: 'Orange', hexColour: '#FE8A18' },
    { name: 'Dark Orange', hexColour: '#A95500' },
    { name: 'Light Gray', hexColour: '#B3B3B3' },
    { name: 'Dark Gray', hexColour: '#6D6E5C' },
    { name: 'Light Pink', hexColour: '#FC97AC' },
    { name: 'Pink', hexColour: '#FFC0CB' },
    { name: 'Light Purple', hexColour: '#CD6298' },
    { name: 'Purple', hexColour: '#81007B' },
    { name: 'Lime', hexColour: '#A5CA52' },
    { name: 'Dark Purple', hexColour: '#701E33' },
    { name: 'Magenta', hexColour: '#923978' },
    { name: 'Brown', hexColour: '#583927' },
]


// Helper function to convert hex to RGB
export const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

export const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export const getClosestBrickColour = (hexColour: string): BrickColour => {
    const [r, g, b] = hexToRgb(hexColour);
    let closestColour = brickColours[0];
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (const brickColour of brickColours) {
        const [brickR, brickG, brickB] = hexToRgb(brickColour.hexColour);
        const distance = Math.sqrt(
            Math.pow(r - brickR, 2) +
            Math.pow(g - brickG, 2) +
            Math.pow(b - brickB, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestColour = brickColour;
        }
    }

    return closestColour;
}