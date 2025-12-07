interface IntroductionBlock {
  title: string;
  description: string;
}

const IntroductionBlock = (props: IntroductionBlock) => {
  const { title, description } = props;
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl lg:text-5xl ">{title}</p>
        <p className="text-xl lg:text-2xl text-gray-400">{description}</p>
      </div>
    </>
  );
};

export default IntroductionBlock;
