import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session";

export function makeGetServerSidePropsRedirect<P = unknown>(
  destination: string,
  redirectWhenLoggedIn: boolean,
  props = {}
) {
  return withIronSessionSsr(async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (user?.isLoggedIn && redirectWhenLoggedIn) {
      return {
        redirect: {
          permanent: false,
          destination,
        },
      };
    } else if (!user?.isLoggedIn && !redirectWhenLoggedIn) {
      return {
        redirect: {
          permanent: false,
          destination,
        },
      };
    }

    return {
      props,
    };
  }, sessionOptions);
}
