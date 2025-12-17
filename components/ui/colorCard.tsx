interface ColorCardProps {
  colorName: string;
  colorHex: string;
  onSelect: (colorHex: string) => void;
}

const ColorCard = ({ colorName, colorHex, onSelect }: ColorCardProps) => {
  return (
    <button
      onClick={() => onSelect(colorHex)}
      className="bg-white border-2 border-gray-400 rounded-lg p-3 transition hover:shadow-lg hover:-translate-y-1 cursor-pointer focus:border-blue-500 focus:shadow-md"
    >
      <div
        className="w-full h-16 border border-gray-300 rounded-md mb-3 mt-2"
        style={{ backgroundColor: colorHex }}
      ></div>
      <div className="font-semibold text-center mt-1 mb-2">{colorName}</div>
    </button>
  );
};

export default ColorCard;
