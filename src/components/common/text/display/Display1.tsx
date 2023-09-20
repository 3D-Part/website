import { TextComponentInterface } from "../../../../shared/interfaces/textInterfaces";

const Display1: React.FC<TextComponentInterface> = ({
  children,
  className = "",
}) => {
  return (
    <h3
      className={`text-[40px] font-extrabold leading-[48px] lg:text-[64px] lg:leading-[84px] ${className}`}
    >
      {children}
    </h3>
  );
};

export default Display1;
