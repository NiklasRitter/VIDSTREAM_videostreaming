import { AppShell, Header, Box, Anchor } from "@mantine/core";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCurrenUser } from "@/context/currentuser";
import UploadVideo from "@/components/UploadVideo";
import { VideosContextProvider } from "@/context/videos";

function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { user, refetch } = useCurrenUser();

  return (
    <VideosContextProvider>
      <AppShell
        padding="md"
        header={
          <Header height={120} p="xs">
            <Box sx={() => ({ display: "flex", alignItems: "center" })}>
              <Box sx={() => ({ flex: "1" })}>
                <Link href={`/`} passHref>
                  <Image src="/logo.png" alt="logo" width={250} height={100} />
                </Link>
              </Box>
              {!user && (
                <>
                  <Link href="/auth/login" passHref>
                    <Anchor ml="lg" mr="lr" color={"dimmed"}>
                      Login
                    </Anchor>
                  </Link>
                  <Link href="/auth/register" passHref>
                    <Anchor ml="lg" mr="lr" color={"dimmed"}>
                      Register
                    </Anchor>
                  </Link>
                </>
              )}
              {user && <UploadVideo />}
            </Box>
          </Header>
        }
      >
        {children}
      </AppShell>
    </VideosContextProvider>
  );
}

export default HomePageLayout;
