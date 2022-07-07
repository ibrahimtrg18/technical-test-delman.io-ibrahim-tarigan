import React, { useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isPureNumber } from "../../helpers/common";

interface ColumnProps {
  widthColumn: number;
  content: string | number;
}

const Column = (props: ColumnProps) => {
  const { widthColumn, content } = props;
  const ref = useRef<HTMLTableCellElement>(null);
  const [openFullText, setOpenFullText] = useState(false);

  return (
    <Box
      as="td"
      style={{ maxWidth: widthColumn, height: "36px" }}
      className={`${isPureNumber(content) ? "text-right" : ""}`}
      position="relative"
    >
      <Box ref={ref}>
        {content}
        {ref.current && ref.current.offsetWidth < ref.current.scrollWidth && (
          <Box
            position="absolute"
            top="50%"
            right="0.5rem"
            transform="translateY(-50%)"
            zIndex={1}
          >
            <FontAwesomeIcon
              icon={`${!openFullText ? "chevron-circle-right" : "x"}`}
              onClick={() => setOpenFullText(true)}
            />
          </Box>
        )}
      </Box>
      {openFullText && (
        <Box
          position="absolute"
          left={0}
          top={0}
          right={0}
          height={100}
          zIndex={10}
          border="1px solid black"
          bgColor="white"
          padding="0.5rem"
          paddingRight="1.5rem"
          whiteSpace="initial"
        >
          {content}
          <Box
            display={
              ref.current && ref.current.offsetWidth < ref.current.scrollWidth
                ? "block"
                : "none"
            }
            position="absolute"
            top="1.25rem"
            right="0.5rem"
            transform="translateY(-50%)"
            zIndex={1}
          >
            <FontAwesomeIcon icon="x" onClick={() => setOpenFullText(false)} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Column;
