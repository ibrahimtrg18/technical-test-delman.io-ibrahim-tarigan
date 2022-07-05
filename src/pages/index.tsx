import type { GetServerSideProps, NextPage } from "next";
import { useMemo, useState } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import APIClient from "../apis/ApiClient";
import { Sale } from "../ts/intefaces";
import VirtualTable from "../components/Table/VirtualTable";
import { isPureNumber } from "../helpers/common";

import styles from "../styles/Index.module.css";

interface HomeProps {
  sales: Array<Sale>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { sales } = props;
  const salesKeys = useMemo(() => Object.keys(sales[0]), []);
  const [widthColumns, setWidthColumns] = useState(
    Array(salesKeys.length).fill(150)
  );

  const Row = ({ index }: { index: number }) => {
    return (
      <tr>
        {salesKeys.map((key, i) => (
          <td
            key={key}
            style={{ maxWidth: widthColumns[i], height: "36px" }}
            className={`${
              isPureNumber(sales[index][key]) ? "text-right" : ""
            } `}
          >
            {sales[index][key]}
          </td>
        ))}
      </tr>
    );
  };

  const renderHeadRow = () => {
    return salesKeys.map((key, i) => (
      <th key={key} style={{ minWidth: widthColumns[i] }}>
        {key}
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) =>
            resizeColumn({
              index: i,
              deltaX,
            })
          }
          position={{ x: 0, y: 0 }}
        >
          <FontAwesomeIcon icon="grip-lines-vertical" />
        </Draggable>
      </th>
    ));
  };

  const resizeColumn = ({
    index,
    deltaX,
  }: {
    index: number;
    deltaX: number;
  }) => {
    const newWidthColumns = [...widthColumns];
    newWidthColumns[index] = deltaX + widthColumns[index];

    setWidthColumns(newWidthColumns);
  };

  return (
    <Box>
      <Head>
        <title>Dashboard | Sales Data</title>
      </Head>
      {sales && (
        <VirtualTable
          width={widthColumns.reduce((acc, v) => acc + v, 2)}
          height={500}
          itemCount={sales.length}
          itemSize={40}
          header={
            <thead>
              <tr>{renderHeadRow()}</tr>
            </thead>
          }
          row={Row}
        />
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiClient = new APIClient();

  const res = await apiClient.getSales();

  if (!res) {
    return {
      props: {},
    };
  }

  return {
    props: {
      sales: res.data,
    },
  };
};

export default Home;
