import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import APIClient from "../apis/ApiClient";
import { Sale } from "../ts/intefaces";
import VirtualTable from "../components/Table/VirtualTable";

import styles from "../styles/Index.module.css";

interface HomeProps {
  sales: Array<Sale>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { sales } = props;

  const Row = ({ index }: { index: number }) => {
    return (
      <tr>
        <td style={{ maxWidth: "150px" }} className="text-right">
          {sales[index].id}
        </td>
        <td style={{ maxWidth: "150px" }}>{sales[index].name}</td>
        <td style={{ maxWidth: "150px" }}>{sales[index].sales_id}</td>
        <td style={{ maxWidth: "150px" }} className="text-right">
          {sales[index].item_id}
        </td>
        <td style={{ maxWidth: "150px" }} className="text-right">
          {sales[index].qty}
        </td>
        <td style={{ maxWidth: "150px" }}>{sales[index].consumen_name}</td>
        <td style={{ maxWidth: "150px" }}>{sales[index].transaction_date}</td>
      </tr>
    );
  };

  return (
    <Box>
      <Head>
        <title>Dashboard | Sales Data</title>
      </Head>
      {sales && (
        <VirtualTable
          width="100%"
          height={550}
          itemCount={sales.length}
          itemSize={10}
          header={
            <thead>
              <tr>
                <th style={{ width: "150px" }}>id</th>
                <th style={{ width: "150px" }}>name</th>
                <th style={{ width: "150px" }}>sales_id</th>
                <th style={{ width: "150px" }}>item_id</th>
                <th style={{ width: "150px" }}>qty</th>
                <th style={{ width: "150px" }}>consumen_name</th>
                <th style={{ width: "150px" }}>transaction_date</th>
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
