import { Pill } from "evergreen-ui";
import { MyPillProps } from "../../../utils/types/components";
import "./MyPill.scss";

const MyPill = ({ children, ...props }: MyPillProps) => {
  return (
    <Pill className="pill" {...props}>
      {children}
    </Pill>
  );
};

export default MyPill;
