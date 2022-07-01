import { FC, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Appbar from "./Appbar/Appbar";
import Main from "./Main/Main";

type LayoutProps = React.HTMLAttributes<HTMLElement>;

export interface IMenu {
  icon: IconProp;
  title: string;
  link: string;
  onClick: () => void;
}

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [menuActive, setMenuActive] = useState("Dashboard");

  const menus: Array<IMenu> = [
    {
      icon: "bars",
      title: "Menu",
      link: "",
      onClick: function () {
        setExpandSidebar(!expandSidebar);
      },
    },
    {
      icon: "dashboard",
      title: "Dashboard",
      link: "/",
      onClick: function () {
        setMenuActive(this.title);
      },
    },
  ];

  return (
    <>
      <Appbar />
      <Main
        menus={menus}
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
        menuActive={menuActive}
        setMenuActive={setMenuActive}
      >
        {children}
      </Main>
    </>
  );
};

export default Layout;
