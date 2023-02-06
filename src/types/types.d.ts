import type { Database } from "./supabase.types";
import type { GetServerSideProps } from "next";
import type { DehydratedState } from "react-query";
import type { Session } from "@supabase/supabase-js";
import { ParsedUrlQuery } from "querystring";

export type TodoRow = Database["public"]["Tables"]["todos"]["Row"];
export type TodoInsert = Database["public"]["Tables"]["todos"]["Insert"];

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
  dehydratedState?: DehydratedState;
  stateDeserializer?: string;
  initialSession?: Session | undefined | null;
  user?: User | null;
}

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: PageWithMetadata;
  pageProps: MyPageProps;
}

export type MyGetServerSideProps<
  PageProps = MyPageProps,
  QueryParams = ParsedUrlQuery
> = GetServerSideProps<PageProps, QueryParams>;

export type User = Session["user"];
