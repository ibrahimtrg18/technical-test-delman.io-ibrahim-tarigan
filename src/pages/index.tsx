import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Draggable from "react-draggable";
import APIClient from "../apis/ApiClient";
import { Sale } from "../ts/intefaces";
import VirtualTable from "../components/Table/VirtualTable";

import styles from "../styles/Index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HomeProps {
  sales: Array<Sale>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { sales } = props;
  const [widthColumns, setWidthColumns] = useState(
    Array(Object.keys(sales[0]).length).fill(150)
  );

  const Row = ({ index }: { index: number }) => {
    return (
      <tr>
        <td style={{ maxWidth: widthColumns[0] }} className="text-right">
          {sales[index].id}
        </td>
        <td style={{ maxWidth: widthColumns[1] }}>{sales[index].name}</td>
        <td style={{ maxWidth: widthColumns[2] }}>{sales[index].sales_id}</td>
        <td style={{ maxWidth: widthColumns[3] }} className="text-right">
          {sales[index].item_id}
        </td>
        <td style={{ maxWidth: widthColumns[4] }} className="text-right">
          {sales[index].qty}
        </td>
        <td style={{ maxWidth: widthColumns[5] }}>
          {sales[index].consumen_name}
        </td>
        <td style={{ maxWidth: widthColumns[6] }}>
          {sales[index].transaction_date}
        </td>
      </tr>
    );
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
          height={550}
          itemCount={sales.length}
          itemSize={10}
          header={
            <thead>
              <tr>
                <th style={{ minWidth: widthColumns[0] }}>
                  id
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 0,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
                <th style={{ minWidth: widthColumns[1] }}>
                  name
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 1,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
                <th style={{ minWidth: widthColumns[2] }}>
                  sales_id
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 2,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
                <th style={{ minWidth: widthColumns[3] }}>
                  item_id
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 3,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
                <th style={{ minWidth: widthColumns[4] }}>
                  qty
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 4,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
                <th style={{ minWidth: widthColumns[5] }}>
                  consumen_name
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 5,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
                <th style={{ minWidth: widthColumns[6] }}>
                  transaction_date
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      resizeColumn({
                        index: 6,
                        deltaX,
                      })
                    }
                    position={{ x: 0, y: 0 }}
                  >
                    <FontAwesomeIcon icon="grip-lines-vertical" />
                  </Draggable>
                </th>
              </tr>
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
