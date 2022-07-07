import React, { useContext, useEffect, useRef, useState } from "react";
import { FixedSizeList, FixedSizeListProps } from "react-window";

/** Context for cross component communication */
const VirtualTableContext = React.createContext<{
  top: number;
  setTop: (top: number) => void;
  header: React.ReactNode;
  footer: React.ReactNode;
}>({
  top: 0,
  setTop: (value: number) => {},
  header: <></>,
  footer: <></>,
});

const Inner = React.forwardRef<
  HTMLTableElement,
  React.HTMLProps<HTMLTableElement>
>(function Inner({ children, ...rest }, ref) {
  const { header, footer, top } = useContext(VirtualTableContext);

  return (
    <table
      {...rest}
      ref={ref}
      style={{ top, position: "absolute", width: "100%" }}
    >
      {header}
      <tbody>{children}</tbody>
      {footer}
    </table>
  );
});

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/
function VirtualTable({
  row,
  header,
  footer,
  ...rest
}: {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  row: FixedSizeListProps["children"];
} & Omit<FixedSizeListProps, "children" | "innerElementType">) {
  const listRef = useRef<FixedSizeList | null>();
  const [top, setTop] = useState(0);

  useEffect(() => {
    listRef.current?.scrollTo(1);
  }, []);

  return (
    <VirtualTableContext.Provider value={{ top, setTop, header, footer }}>
      <FixedSizeList
        {...rest}
        innerElementType={Inner}
        onItemsRendered={(props) => {
          const style =
            listRef.current &&
            // @ts-ignore private method access
            listRef.current._getItemStyle(props.overscanStartIndex);
          setTop((style && style.top) || 0);

          // Call the original callback
          rest.onItemsRendered && rest.onItemsRendered(props);
        }}
        ref={(el) => (listRef.current = el)}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
}

export default VirtualTable;
