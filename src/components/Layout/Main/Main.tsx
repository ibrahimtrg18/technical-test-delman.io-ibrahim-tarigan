import { FC } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Main.module.css";
import { IMenu } from "../Layout";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  menus: Array<IMenu>;
  expandSidebar: boolean;
  setExpandSidebar: (value: boolean) => void;
  menuActive: string;
  setMenuActive: (value: string) => void;
}

const Main: FC<MainProps> = (props) => {
  const {
    children,
    menus,
    expandSidebar,
    setExpandSidebar,
    menuActive,
    setMenuActive,
  } = props;

  return (
    <main className={styles.main}>
      <Sidebar
        menus={menus}
        expandSidebar={expandSidebar}
        setExpandSidebar={setExpandSidebar}
        menuActive={menuActive}
        setMenuActive={setMenuActive}
      />
      <div className={styles.container}>
        <Box padding="0.5rem 0.5rem" borderBottom="1px" borderColor="gray.200">
          <Heading as="h1" size="lg">
            {menus.find((menu) => menu.title === menuActive)?.heading}
          </Heading>
          <Text>
            {menus.find((menu) => menu.title === menuActive)?.subHeading}
          </Text>
        </Box>
        <Box padding="0.5rem 0.5rem">{children}</Box>
      </div>
    </main>
  );
};

export default Main;
