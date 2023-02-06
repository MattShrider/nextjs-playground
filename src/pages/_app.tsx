import { ReactQueryDevtools } from "react-query/devtools";
import type { MyAppProps } from "@/types/types";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "@/styles/createEmotionCache";
import theme from "@/styles/theme";
import { AppBar } from "@/components/AppBar";
import { stateDeserializers } from "@/lib/deserializers";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase.types";

const clientSideEmtionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmtionCache,
}: MyAppProps) {
  const [supabaseClient] = React.useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  const [queryClient] = React.useState(() => new QueryClient());

  let dehydratedState = pageProps.dehydratedState;
  if (dehydratedState) {
    if (pageProps.stateDeserializer) {
      dehydratedState =
        stateDeserializers[pageProps.stateDeserializer](dehydratedState);
    }
  }

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
              {!Component?.pageMetadata?.hideAppBar && <AppBar />}
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </SessionContextProvider>
  );
}
