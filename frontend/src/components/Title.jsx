export const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3 uppercase">
      <p className="text-customeNormPurple">
        {text1}{" "}
        <span className="text-customeDarkPurple font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-customeDarkPurple"></p>
    </div>
  );
};
