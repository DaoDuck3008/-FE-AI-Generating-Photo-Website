interface FunctionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FunctionCard = (props: FunctionCardProps) => {
  return (
    <div className="bg-[#f7f8f9] block w-xs h-xs p-6 border border-default rounded-2xl shadow-xs transition-all hover:-translate-y-2 hover:shadow-2xl">
      <div className="w-15 h-15 mb-4 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        {props.icon}
      </div>

      <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
        {props.title}
      </h5>

      <p className="text-lg">{props.description}</p>
    </div>
  );
};

export default FunctionCard;
