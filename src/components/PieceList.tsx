import { BrickColour } from "../utils/colourMapping";

type PieceListProps = {
  finalPieces: Map<BrickColour, number>;
  onGenerate: () => void;
};

const PieceList: React.FC<PieceListProps> = ({ finalPieces, onGenerate }) => {

  if (finalPieces.size === 0) {
    return <div className="bg-red-500 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fredoka One', sans-serif" }}>List of Pieces</h2>
      <div className="text-center text-gray-200"> There are no pieces to display. Generate a mosiac to see the pieces needed.
      </div>
      <button
        onClick={onGenerate}
        className="bg-yellow-500 px-3 py-2 rounded-lg text-gray-900 hover:bg-yellow-600 transition duration-300"
      >
        Generate Piece List
      </button>
    </div>
  }

  return (
    <div className="bg-red-500 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fredoka One', sans-serif" }}>List of Pieces</h2>

      <button
        onClick={onGenerate}
        className="bg-yellow-500 px-3 py-2 rounded-lg text-gray-900 hover:bg-yellow-600 transition duration-300"
      >
        Generate Piece List
      </button>
      {finalPieces.size > 0 && (
        <ul className="mt-4 space-y-2">
          {[...finalPieces.entries()].map(([brick, count]) => (
            <li key={brick.name}>
              <span
                className="inline-block w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: brick.hexColour }}
              ></span>
              {brick.name}: {count}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PieceList;
