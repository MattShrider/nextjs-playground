import type { Database } from "@/types/supabase.types";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { createServerSupabaseClient as _createServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient as _useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { MyGetServerSideProps, MyPageProps } from "@/types/types";

export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const createServerSupabaseClient = (
  ctx:
    | GetServerSidePropsContext
    | {
        req: NextApiRequest;
        res: NextApiResponse;
      }
) => _createServerClient<Database>(ctx);

export interface AuthGetServerSidePropsOptions {
  /** If you visit a route but do not have a session, redirect here */
  redirectWhenNoSession?: string | null | undefined;
  /** If you visit a route but already have a session, redirect here*/
  redirectWhenAuthenticated?: string | null | undefined;
}

const defaultSsrAuthOptions: AuthGetServerSidePropsOptions = {
  redirectWhenNoSession: "/",
  redirectWhenAuthenticated: undefined,
};

/** Redirects if the user does not have a session, otherwise decorates page props with user and session info */
export const getServerSideAuthProps =
  (
    options: AuthGetServerSidePropsOptions = defaultSsrAuthOptions
  ): MyGetServerSideProps =>
  async (ctx): Promise<GetServerSidePropsResult<MyPageProps>> => {
    const { redirectWhenNoSession, redirectWhenAuthenticated } = options;
    const supabase = createServerSupabaseClient(ctx);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (!session && redirectWhenNoSession) {
      console.log("redirect !session", session);
      return {
        redirect: {
          destination: redirectWhenNoSession,
          permanent: false,
        },
      };
    }

    if (session && redirectWhenAuthenticated) {
      return {
        redirect: {
          destination: redirectWhenAuthenticated,
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialSession: session,
        user: user,
      },
    };
  };

/** Redirects if the user does not have a session, otherwise decorates page props with user and session info */
export const withAuthServerSideProps =
  (
    innerFn: MyGetServerSideProps,
    options: AuthGetServerSidePropsOptions = defaultSsrAuthOptions
  ) =>
  async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<MyPageProps>> => {
    const mergedOptions = { ...defaultSsrAuthOptions, ...options };
    const authSsrResult = await getServerSideAuthProps(mergedOptions)(ctx);
    if ("redirect" in authSsrResult) {
      /* If we don't have a user no need to continue */
      return authSsrResult;
    }

    if ("props" in authSsrResult) {
      // @ts-expect-error custom types not added yet
      ctx.req.custom = {
        user: (authSsrResult.props as MyPageProps).user,
        session: (authSsrResult.props as MyPageProps).initialSession,
      };
    }
    const innerSsrResult = await innerFn(ctx);

    if ("redirect" in innerSsrResult || "notFound" in innerSsrResult) {
      /* If we're redirecting or 404ing anyways, no need to decorate props with session */
      return innerSsrResult;
    }

    /* Handles "Not Found" type */
    const authProps = "props" in authSsrResult ? authSsrResult.props : {};

    return {
      ...innerSsrResult,
      props: {
        ...innerSsrResult.props,
        ...authProps,
      },
    };
  };

export const useSupabaseClient = () => {
  return _useSupabaseClient<Database>();
};