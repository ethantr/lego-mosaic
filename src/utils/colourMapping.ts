interface BrickColour{
    name: string;
    hexColour: string;
}

// http://www.jennyscrayoncollection.com/2021/06/all-current-lego-colors.html
export const brickColours: BrickColour[] = [
    {name: 'Black', hexColour:'#151515'},
    {name:'Bright Yellow', hexColour:'#FFCD03'},
    {name:'Bright Red', hexColour:'#DD1A21'},
    {name:'Bright Blue', hexColour:'#006CB7'},
    {name:'Reddish Brown', hexColour:'#692E14'},
    {name:'Medium Stone Grey', hexColour:'#A0A19F'},
    {name:'Dark Stone Grey', hexColour:'#646765'},
    {name:'Bright Yellowish Green', hexColour:'#9ACA3A'},
    {name:'Brick Yellow', hexColour:'#DDC48E'},
    {name:'Bright Orange', hexColour:'#F57D20'},
    {name:'Nougat', hexColour:'#A5A5CB'},
    {name:'Aqua', hexColour:'#C1E4DA'},
    {name:'Flamish Yellowish Orange', hexColour:'#FBAB18'},
    {name:'Bright Bluish Green', hexColour:'#189E9F'},
    {name:'Cool Yellow', hexColour:'#FFF579'},
    {name:'Sand Blue', hexColour:'#678297'},
    {name:'Dark Orange', hexColour:'#A65322'},
    {name:'Sand Yellow', hexColour:'#947E5F'},
    {name:'Dark Brown', hexColour:'#3B180D'},
    {name:'Dark Red', hexColour:'#7F131B'},
    {name:'Olive Green', hexColour:'#828353'},
    {name:'Bright Reddish Violet', hexColour:'#B51C7D'},
    {name:'Bright Purple', hexColour:'#E95DA2'},
    {name:'Medium Nougat', hexColour:'#AF7446'},
    {name:'Bright Green', hexColour:'#00AF4D'},
    {name:'Medium Azur', hexColour:'#00BED3'},
    {name:'Spring Yellowish Green', hexColour:'#CCE197'},
    {name:'Titanium Metallic', hexColour:'#42423E'},
    {name:'Earth Blue', hexColour:'#00395E'},
    {name:'Titanium Metallic', hexColour:'#878D8F'},
    {name:'Dark Green', hexColour:'#009247'},
    {name:'Medium Lilac', hexColour:'#4C2F92'},
    {name:'Warm Gold', hexColour:'#C39737'},
    {name:'light Purple', hexColour:'#F6ADCD'},
    {name:'Sand Green', hexColour:'#CCE197'},
    {name:'White', hexColour:'#F4F4F4'},

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