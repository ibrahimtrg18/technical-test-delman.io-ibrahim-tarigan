import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import APIClient from "../apis/ApiClient";
import { CreateUser, User } from "../ts/intefaces";

import styles from "../styles/Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface HomeProps {
  users: Array<User>;
}

type FormData = CreateUser;

const Home: NextPage<HomeProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    reset,
  } = useForm<FormData>();
  const toast = useToast();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const apiClient = new APIClient();

      const user = await apiClient.createUser(data);

      toast({
        title: "Successfully add new user",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
      reset();
      router.push("/users");
    } catch (err: any) {
      toast({
        title: err.message,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  });

  const name = watch("name");
  const email = watch("email");

  useEffect(() => {
    trigger(["name", "email"]);
  }, [name, email]);

  return (
    <Box>
      <Head>
        <title>Dashboard | List of Users</title>
      </Head>
      <Box width="50%">
        <form onSubmit={onSubmit} className={styles.form}>
          <Box marginBottom={4}>
            <Box as="label" color={errors.name ? "red.500" : "black"}>
              Name
              <Input
                type="text"
                isInvalid={Boolean(errors.name)}
                color="black"
                {...register("name", { required: "Please provide name" })}
              />
            </Box>
            {errors.name && (
              <Box
                display="flex"
                alignItems="center"
                marginTop="0.25rem"
                color="red.500"
              >
                <FontAwesomeIcon icon="circle-exclamation" />
                <span className={styles.error}>
                  {errors.name && errors.name?.message}
                </span>
              </Box>
            )}
          </Box>
          <Box marginBottom={4}>
            <Box as="label" color={errors.email ? "red.500" : "black"}>
              Email
              <Input
                type="text"
                color="black"
                isInvalid={Boolean(errors.email)}
                {...register("email", {
                  required: "Please provide email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please provide a valid email",
                  },
                })}
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
                <span className={styles.error}>{errors.email?.message}</span>
              </Box>
            )}
          </Box>
          <Button type="submit" disabled={!isValid} colorScheme="blue">
            Submit User
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Home;
