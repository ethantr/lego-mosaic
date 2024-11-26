import { BrickColour } from "./colourMapping";

export const countOccurrences = (data: BrickColour[][]): Map<BrickColour, number> => {
  const counterMap: Map<BrickColour, number> = new Map(); // Create a new Map to store the count of each brick

  // Iterate over each row in the 2D array
  for (const row of data) {
    // Iterate over each item in the row
    for (const brick of row) {
      // Check if the brick already exists in the Map
      const existingCount = counterMap.get(brick) || 0;
      counterMap.set(brick, existingCount + 1);
    }
  }

  return counterMap;
};


