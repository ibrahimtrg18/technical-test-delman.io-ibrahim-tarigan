import { Box, Heading } from "@chakra-ui/react";
import styles from "./Appbar.module.css";

const Appbar = () => {
  return (
    <Box
      as="nav"
      borderBottom="1px"
      borderColor="gray.200"
      className={styles.appbar}
    >
      <Heading as="h1" size="md">
        Appbar
      </Heading>
    </Box>
  );
};

export default Appbar;
