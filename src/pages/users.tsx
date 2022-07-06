import type { GetServerSideProps, NextPage } from "next";
import { useMemo, useState } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import APIClient from "../apis/ApiClient";
import { User } from "../ts/intefaces";
import VirtualTable from "../components/Table/VirtualTable";
import { isPureNumber } from "../helpers/common";

import styles from "../styles/Users.module.css";

interface UsersPageProps {
  users: Array<User>;
}

const UsersPage: NextPage<UsersPageProps> = (props) => {
  const { users } = props;
  const usersKeys = useMemo(() => Object.keys(users[0]), []);
  const [widthColumns, setWidthColumns] = useState(
    Array(usersKeys.length).fill(150)
  );

  const Row = ({ index }: { index: number }) => {
    return (
      <tr>
        {usersKeys.map((key, i) => (
          <td
            key={key}
            style={{ maxWidth: widthColumns[i], height: "36px" }}
            className={`${
              isPureNumber(users[index][key]) ? "text-right" : ""
            } `}
          >
            {users[index][key]}
          </td>
        ))}
      </tr>
    );
  };

  const renderHeadRow = () => {
    return usersKeys.map((key, i) => (
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
        <title>Dashboard | List of Users</title>
      </Head>
      <VirtualTable
        width="100%"
        height={500}
        itemCount={users.length}
        itemSize={40}
        header={
          <thead>
            <tr>{renderHeadRow()}</tr>
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
    },
  };
};

export default UsersPage;
