const SizeCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div
      className="
          bg-white rounded-3xl shadow-md p-8 min-w-sm md:min-w-md 
          transition-all duration-300 
          hover:-translate-y-2 hover:shadow-xl
        "
    >
      <div
        className="
            border-4 border-dashed border-blue-300
            rounded-2xl p-10 flex flex-col items-center justify-center
            text-center
          "
      >
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-800">
          {title}
        </h3>
        <p className="mt-2 text-gray-500 text-lg md:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default SizeCard;
