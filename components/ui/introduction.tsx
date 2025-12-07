interface IntroductionBlock {
  title: string;
  description: string;
}

const IntroductionBlock = (props: IntroductionBlock) => {
  const { title, description } = props;
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl lg:text-3xl ">{title}</p>
        <p className="text-lg lg:text-xl text-gray-400">{description}</p>
      </div>
    </>
  );
};

export default IntroductionBlock;
