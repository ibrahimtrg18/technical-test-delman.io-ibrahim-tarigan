import Link from "next/link";
import { FC } from "react";
import { Box } from "@chakra-ui/react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Sidebar.module.css";
import { IMenu } from "../Layout";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  menus: Array<IMenu>;
  expandSidebar: boolean;
  setExpandSidebar: (value: boolean) => void;
  menuActive: string;
  setMenuActive: (value: string) => void;
}

const Sidebar: FC<SidebarProps> = (props) => {
  const { menus, expandSidebar, setExpandSidebar, menuActive, setMenuActive } =
    props;

  const renderMenuList = () => {
    return (
      <ul className={styles.sidebarMenuList}>
        {menus.map((menu) => (
          <li
            key={menu.title}
            className={classNames(styles.sidebarMenuItem, {
              [styles.sidebarMenuItemActive]: menuActive === menu.title,
            })}
            onClick={() => menu.onClick()}
          >
            <Link href={menu.link}>
              <a href={menu.link}>
                <FontAwesomeIcon
                  icon={menu.icon}
                  color={
                    menuActive === menu.title
                      ? "var(--chakra-colors-blue-600)"
                      : "currentColor"
                  }
                />
                <p>{menu.title}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Box
      as="aside"
      background="gray.100"
      borderRight="1px"
      borderColor="gray.200"
      className={classNames(styles.sidebar, {
        [styles.sidebarExpand]: expandSidebar,
        [styles.sidebarShrink]: !expandSidebar,
      })}
    >
      {renderMenuList()}
    </Box>
  );
};

export default Sidebar;
