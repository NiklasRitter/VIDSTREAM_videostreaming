import { AppShell, Header, Navbar, Box, Anchor } from "@mantine/core";
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
        navbar={
          <Navbar width={{ base: 100 }} height={500} p="xs">
            Side items
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <Box sx={() => ({ display: "flex" })}>
              <Box sx={() => ({ flex: "1" })}>
                <Image src="/logo.png" alt="logo" width={100} height={40} />
              </Box>

              {!user && (
                <>
                  <Link href="/auth/login" passHref>
                    <Anchor ml="lg" mr="lr">
                      Login
                    </Anchor>
                  </Link>
                  <Link href="/auth/register" passHref>
                    <Anchor ml="lg" mr="lr">
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
