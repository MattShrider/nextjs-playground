import { GetServerSideProps } from "next";

export interface PageMetadata {
  hideAppBar: boolean;
}

export interface MakePageOptions {
  hideAppBar?: boolean;
}

export type PageWithMetadata<PropTypes = any> = NextComponentType<
  NextPageContext,
  any,
  PropTypes
> & {
  pageMetadata?: PageMetadata;
};

export interface MyPageProps {
  dehydratedState?: unknown;
}

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: PageWithMetadata;
  pageProps: MyPageProps;
}

export type MyGetServerSideProps = GetServerSideProps<MyPageProps>;
