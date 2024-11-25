export const countOccurrences = (data: string[][]): Record<string, number> => {
    const counterMap: Record<string, number> = {};
  
    // Iterate over each row in the 2D array
    for (const row of data) {
      // Iterate over each item in the row
      for (const name of row) {
        // If the name is already in the map, increment the count, otherwise initialize it to 1
        counterMap[name] = (counterMap[name] || 0) + 1;
      }
    }
  
    return counterMap;
  };
  

  