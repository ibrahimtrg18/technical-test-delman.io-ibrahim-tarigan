import { FC } from "react";

type MainProps = React.HTMLAttributes<HTMLElement>;

const Main: FC<MainProps> = (props) => {
  const { children } = props;

  return <main>{children}</main>;
};

export default Main;
