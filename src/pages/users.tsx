import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import APIClient from "../apis/ApiClient";
import { User } from "../ts/intefaces";
import VirtualTable from "../components/Table/VirtualTable";

import styles from "../styles/Home.module.css";

interface HomeProps {
  users: Array<User>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { users } = props;

  /** The Row component. This should be a table row, and noted that we don't use the style that regular `react-window` examples pass in.*/
  const Row = ({ index }: { index: number }) => {
    return (
      <tr>
        {/** Make sure your table rows are the same height as what you passed into the list... */}
        <td style={{ minWidth: "150px" }}>{users[index].id}</td>
        <td style={{ minWidth: "150px" }}>{users[index].name}</td>
        <td style={{ minWidth: "150px" }}>{users[index].email}</td>
        <td style={{ minWidth: "150px" }}>{users[index].country_name}</td>
        <td style={{ minWidth: "150px" }}>{users[index].device_id}</td>
        <td style={{ minWidth: "150px" }}>{users[index].bitcoin_address}</td>
        <td style={{ minWidth: "150px" }}>{users[index].avatar}</td>
        <td style={{ minWidth: "150px" }}>{users[index].login_ip}</td>
        <td style={{ minWidth: "150px" }}>{users[index].active_device_mac}</td>
        <td style={{ minWidth: "150px" }}>{users[index].notes}</td>
        <td style={{ minWidth: "150px" }}>{users[index].age}</td>
        <td style={{ minWidth: "150px" }}>{users[index].referral_id}</td>
        <td style={{ minWidth: "150px" }}>{users[index].locale}</td>
        <td style={{ minWidth: "150px" }}>{users[index].favorite_music}</td>
        <td style={{ minWidth: "150px" }}>{users[index].phone_number}</td>
        <td style={{ minWidth: "150px" }}>{users[index].twitter_username}</td>
        <td style={{ minWidth: "150px" }}>{users[index].job}</td>
        <td style={{ minWidth: "150px" }}>
          {users[index].invoice_email_address}
        </td>
        <td style={{ minWidth: "150px" }}>{users[index].hmac_secret}</td>
        <td style={{ minWidth: "150px" }}>{users[index].favorite_quote}</td>
        <td style={{ minWidth: "150px" }}>{users[index].primary_color}</td>
        <td style={{ minWidth: "150px" }}>{users[index].secondary_color}</td>
        <td style={{ minWidth: "150px" }}>{users[index].material}</td>
        <td style={{ minWidth: "150px" }}>{users[index].shipping_address}</td>
        <td style={{ minWidth: "150px" }}>{users[index].zip_code}</td>
        <td style={{ minWidth: "150px" }}>{users[index].latitude}</td>
        <td style={{ minWidth: "150px" }}>{users[index].longitude}</td>
        <td style={{ minWidth: "150px" }}>{users[index].favorite_animal}</td>
        <td style={{ minWidth: "150px" }}>{users[index].app_version}</td>
        <td style={{ minWidth: "150px" }}>{users[index].timezone}</td>
      </tr>
    );
  };

  return (
    <Box>
      <Head>
        <title>Dashboard | List of Users</title>
      </Head>
      <VirtualTable
        width="100%"
        height={550}
        itemCount={users.length}
        itemSize={10}
        header={
          <thead>
            <tr>
              <th style={{ width: "150px" }}>id</th>
              <th style={{ width: "150px" }}>name</th>
              <th style={{ width: "150px" }}>email</th>
              <th style={{ width: "150px" }}>country_name</th>
              <th style={{ width: "150px" }}>device_id</th>
              <th style={{ width: "150px" }}>bitcoin_address</th>
              <th style={{ width: "150px" }}>avatar</th>
              <th style={{ width: "150px" }}>login_ip</th>
              <th style={{ width: "150px" }}>active_device_mac</th>
              <th style={{ width: "150px" }}>notes</th>
              <th style={{ width: "150px" }} className="text-right">
                age
              </th>
              <th style={{ width: "150px" }} className="text-right">
                referral_id
              </th>
              <th style={{ width: "150px" }}>locale</th>
              <th style={{ width: "150px" }}>favorite_music</th>
              <th style={{ width: "150px" }}>phone_number</th>
              <th style={{ width: "150px" }}>twitter_username</th>
              <th style={{ width: "150px" }}>job</th>
              <th style={{ width: "150px" }}>invoice_email_address</th>
              <th style={{ width: "150px" }}>hmac_secret</th>
              <th style={{ width: "150px" }}>favorite_quote</th>
              <th style={{ width: "150px" }}>primary_color</th>
              <th style={{ width: "150px" }}>secondary_color</th>
              <th style={{ width: "150px" }}>material</th>
              <th style={{ width: "150px" }}>shipping_address</th>
              <th style={{ width: "150px" }}>zip_code</th>
              <th style={{ width: "150px" }}>latitude</th>
              <th style={{ width: "150px" }}>longitude</th>
              <th style={{ width: "150px" }}>favorite_animal</th>
              <th style={{ width: "150px" }}>app_version</th>
              <th style={{ width: "150px" }}>timezone</th>
            </tr>
          </thead>
        }
        row={Row}
      />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiClient = new APIClient();

  const res = await apiClient.getUsers();

  if (!res) {
    return {
      props: {},
    };
  }

  return {
    props: {
      users: res.data,
    }, // will be passed to the page component as props
  };
};

export default Home;
