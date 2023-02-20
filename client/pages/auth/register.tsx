import { registerUser } from "@/api";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import styles from "@/styles/Home.module.css";

function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait...",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Successfully created account",
      });

      router.push("/auth/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Could not create account",
      });
    },
  });

  return (
    <>
      <Head>
        <title>VIDSTREAM - Register</title>
      </Head>

      <div className={styles.centered_vertical}>
        <Container>
          <Title>Register</Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="email@example.com"
                  required
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Username"
                  placeholder="JohnDoe"
                  required
                  {...form.getInputProps("username")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Type in your password"
                  required
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label="Confirm password"
                  placeholder="Confirm your password"
                  required
                  {...form.getInputProps("confirmPassword")}
                />

                <Button type="submit" variant="filled" color="gray">
                  Register
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default RegisterPage;
