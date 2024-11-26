import React from "react";

const GRID_PRESETS = [
    { width: 32, height: 32 },
    { width: 48, height: 32 },
    { width: 48, height: 48 },
    { width: 48, height: 96 },
    { width: 64, height: 64 },
    { width: 96, height: 96 },
];

type ControlsProps = {
    gridWidth: number;
    gridHeight: number;
    onWidthChange: (newWidth: number) => void;
    onHeightChange: (newHeight: number) => void;
    onChangeGridSize: (newWidth: number, newHeight: number) => void;
    onEditColours: () => void;
};

const Controls: React.FC<ControlsProps> = ({
    gridWidth,
    gridHeight,
    onWidthChange,
    onHeightChange,
    onEditColours,
    onChangeGridSize
}) => {
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onWidthChange(Number(e.target.value));
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onHeightChange(Number(e.target.value));
    };

    return (
        <div className="bg-lego-dark-blue p-4 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fredoka One', sans-serif" }}>Controls</h2>

            {/* Grid Size Control */}
            <div>
                <label className="block text-sm mb-2">Grid Size:</label>
                <div className="grid grid-cols-2 gap-2">
                    {GRID_PRESETS.map((preset, index) => (
                        <button
                            key={index}
                            onClick={() => { onChangeGridSize(preset.width, preset.height); }}
                            className={`p-2 rounded-md text-sm font-medium ${gridWidth === preset.width && gridHeight === preset.height
                                    ? 'bg-lego-yellow text-lego-dark-blue'
                                    : 'bg-lego-blue text-white hover:bg-lego-yellow hover:text-lego-dark-blue'
                                } transition-colors`}
                        >
                            {preset.width}x{preset.height}
                        </button>
                    ))}
                </div>
                <div className="flex space-x-2 mt-4">
                    <input
                        type="number"
                        min="1"
                        value={gridWidth}
                        className="w-16 p-2 bg-lego-blue rounded-lg text-white text-center"
                        onChange={handleWidthChange}
                    />
                    <span className="self-center">x</span>
                    <input
                        type="number"
                        min="1"
                        value={gridHeight}
                        className="w-16 p-2 bg-lego-blue rounded-lg text-white text-center"
                        onChange={handleHeightChange}
                    />
                </div>
            </div>

            {/* Colour Options Control */}
            <div>
                <label className="block text-sm mb-2">Colour Options:</label>
                <button
                    className="bg-yellow-500 px-3 py-2 rounded-lg text-blue-800 hover:bg-gray-600 transition duration-300"
                    onClick={onEditColours}
                >
                    Edit Colours
                </button>
            </div>
        </div>
    );
};

export default Controls;
