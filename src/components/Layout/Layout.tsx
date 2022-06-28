import { FC } from "react";
import Main from "./Main/Main";

type LayoutProps = React.HTMLAttributes<HTMLElement>;

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return <Main>{children}</Main>;
};

export default Layout;
