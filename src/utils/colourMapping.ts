interface BrickColour {
    name: string;
    hexColour: string;
}

// http://www.jennyscrayoncollection.com/2021/06/all-current-lego-colors.html

export const brickColours: { [key: string]: BrickColour[] } = {
    black: [
        { name: 'Black', hexColour: '#151515' },
        { name: 'Titanium Metallic', hexColour: '#42423E' },
    ],
    grey: [
        { name: 'Medium Stone Grey', hexColour: '#A0A19F' },
        { name: 'Dark Stone Grey', hexColour: '#646765' },
    ],
    white: [
        { name: 'White', hexColour: '#F4F4F4' },
    ],
    silver: [
        { name: 'Silver Metallic', hexColour: '#878D8F' },
    ],
    lilac: [
        { name: 'Medium Lilac', hexColour: '#4C2F92' },
    ],
    blue: [
        
  
    { name: 'Earth Blue', hexColour: '#00395E' },
        { name: 'Bright Blue', hexColour: '#006CB7' },
        { name: 'Aqua', hexColour: '#C1E4DA' },
        { name: 'Bright Bluish Green', hexColour: '#189E9F' },
        { name: 'Sand Blue', hexColour: '#678297' },
        { name: 'Medium Azur', hexColour: '#00BED3' },

    ],
    dark_green: [
        { name: 'Dark Green', hexColour: '#009247' },
        { name: 'Bright Yellowish Green', hexColour: '#9ACA3A' },
        { name: 'Olive Green', hexColour: '#828353' },
    ],
    green: [
        { name: 'Sand Green', hexColour: '#CCE197' },
        { name: 'Bright Green', hexColour: '#00AF4D' },


        { name: 'Spring Yellowish Green', hexColour: '#CCE197' },
    ],
    yellow: [
        { name: 'Flamish Yellowish Orange', hexColour: '#FBAB18' },
        { name: 'Cool Yellow', hexColour: '#FFF579' },
    ],
    gold: [
        { name: 'Warm Gold', hexColour: '#C39737' },
    ],
    bright_orange: [
        { name: 'Bright Orange', hexColour: '#F57D20' },
    ],
    reddish_brown: [

        { name: 'Dark Brown', hexColour: '#3B180D' },
        { name: 'Reddish Brown', hexColour: '#692E14' },
        { name: 'Dark Orange', hexColour: '#A65322' },

        { name: 'Medium Nougat', hexColour: '#AF7446' },
        { name: 'Nougat', hexColour: '#A5A5CB' },



        { name: 'Sand Yellow', hexColour: '#947E5F' },
        { name: 'Brick Yellow', hexColour: '#DDC48E' },


    ],
    red: [
        { name: 'Dark Red', hexColour: '#7F131B' },
        { name: 'Bright Red', hexColour: '#DD1A21' },
    ],
    purple: [
        { name: 'Bright Reddish Violet', hexColour: '#B51C7D' },
        { name: 'Bright Purple', hexColour: '#E95DA2' },
        { name: 'Light Purple', hexColour: '#F6ADCD' },
    ],
};


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

export const getClosestBrickColour = (hexColour: string): { name: string; hexColour: string } => {
    const [r, g, b] = hexToRgb(hexColour);
    let closestColour = { name: '', hexColour: '' };
    let minDistance = Number.MAX_SAFE_INTEGER;

    // Iterate over each category in legoColors
    for (const category in brickColours) {
        // Iterate over each colour in the category
        for (const brickColour of brickColours[category]) {
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
    }

    return closestColour;
};