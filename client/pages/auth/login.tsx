import { loginUser } from "@/api";
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

function LoginPage() {
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
    Parameters<typeof loginUser>["0"]
  >(loginUser, {
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>

      <Container>
        <Title>Login</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="email@example.com"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Type in your password"
                required
                {...form.getInputProps("password")}
              />
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoginPage;