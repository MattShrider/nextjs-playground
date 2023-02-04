import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "@/styles/createEmotionCache";
import theme from "@/styles/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ReactQueryDevtools } from "react-query/devtools";
import { AppBar } from "@/components/AppBar";
import { PageWithMetadata } from "@/lib/makePage";

const clientSideEmtionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: PageWithMetadata;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmtionCache,
}: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {!Component?.pageMetadata?.hideAppBar && <AppBar />}
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
