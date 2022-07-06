import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import APIClient from "../apis/ApiClient";
import { SearchUser } from "../ts/intefaces";
import { User } from "../ts/intefaces";

import styles from "../styles/Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FormData = SearchUser;

interface SearchPageProps {
  users: Array<User>;
}

const SearchPage: NextPage<SearchPageProps> = (props) => {
  let timeoutId: NodeJS.Timeout;
  const { users } = props;

  const [user, setUser] = useState<User>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>();
  const email = watch("email");
  const toast = useToast();

  const onSubmit = handleSubmit(async (data) => {
    const user = users.find((user) => user.email === data.email);

    if (!user) {
      return toast({
        title: "User not found",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }

    setUser(user);
  });

  useEffect(() => {
    timeoutId = setTimeout(() => {
      onSubmit();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [email]);

  return (
    <Box>
      <Head>
        <title>Search | Search Users</title>
      </Head>
      <Box width="50%">
        <form onSubmit={onSubmit} className={styles.form}>
          <Box marginBottom={4}>
            <Box position="relative">
              <Box
                display="flex"
                alignItems="center"
                marginTop="0.25rem"
                color={errors.email && "red.500"}
              >
                <FontAwesomeIcon
                  icon="search"
                  className={styles.searchInputIcon}
                />
              </Box>
              <Input
                type="text"
                isInvalid={Boolean(errors.email)}
                color="black"
                placeholder="Searcy by email"
                className={styles.searchInput}
                {...register("email", { required: "Please provide email" })}
              />
            </Box>
            {errors.email && (
              <Box
                display="flex"
                alignItems="center"
                marginTop="0.25rem"
                color="red.500"
              >
                <FontAwesomeIcon icon="circle-exclamation" />
                <span className={styles.error}>
                  {errors.email && errors.email?.message}
                </span>
              </Box>
            )}
          </Box>
          {!user ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgColor="gray.50"
              minHeight="15rem"
            >
              <Heading size="lg">No result was found</Heading>
              <Text color="gray.500">
                Please try again with different email
              </Text>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgColor="gray.50"
              minHeight="15rem"
            >
              <Heading size="lg">{user.name}</Heading>
              <Text color="gray.500">{user.email}</Text>
              <Divider margin="1rem 0" width="50%" />
              <Button colorScheme="blue">View User Profile</Button>
            </Box>
          )}
        </form>
      </Box>
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

export default SearchPage;
