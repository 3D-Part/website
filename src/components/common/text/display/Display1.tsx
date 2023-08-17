import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Display1: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`text-[56px] font-extrabold leading-[72px] lg:text-[64px] lg:leading-[84px] ${className}`}
    >
      {children}
    </p>
  );
};

export default Display1;
