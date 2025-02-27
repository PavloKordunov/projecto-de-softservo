"use client";

import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import OktaAuth, { toRelativeUrl } from "@okta/okta-auth-js";
import { useRouter } from "next/navigation";
import { Security } from "@okta/okta-react";
import oktaConfig from "@/lib/oktaConfig";
import { UserProvider } from "@/hooks/useUser";
import { useMoviesByYear } from "@/hooks/useMoviesByYear";
import { Providers } from './providers'


const oktaAuth = new OktaAuth(oktaConfig.oidc);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    router.push(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  const customAuthHandler = () => {
    router.push("/login");
  };
  const { movies } = useMoviesByYear(2025);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <Providers>
          <Security
              oktaAuth={oktaAuth}
              restoreOriginalUri={restoreOriginalUri}
              onAuthRequired={customAuthHandler}
          >
              <UserProvider>
                  <NavBar movies={movies} />
                    {children}
              </UserProvider>
          </Security>
      </Providers>
      </body>
    </html>
  );
}
