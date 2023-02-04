import { useEffect } from "react";
import Router from "next/router";
import { User } from "@/pages/api/user";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import type { LoginBody } from "@/pages/api/login";

const USE_USER_QUERY_KEY = "/api/user";

interface UseUserArgs {
  /** If truthy, any time a user is logged in the router will redirect to this url */
  redirectWhenLoggedIn?: string;
  /** If truthy, any time a user is not logged in the router will redirect to this url */
  redirectWhenLoggedOut?: string;
  /** When performing a logout action, redirect on success */
  redirectOnLogout?: string;
  /** When performing a login action, redirect on success */
  redirectOnLogin?: string;
}

export function useUser({
  redirectOnLogout = "",
  redirectOnLogin = "",
  redirectWhenLoggedIn = "",
  redirectWhenLoggedOut = "",
}: UseUserArgs = {}) {
  const queryClient = useQueryClient();
  const mutateLogin = useMutation<User, unknown, LoginBody>(
    (body) => axios.post<User>("/api/login", body).then((r) => r.data),
    {
      onSuccess: async (loginUserInfo) => {
        queryClient.setQueryData(USE_USER_QUERY_KEY, () => loginUserInfo);
        if (redirectOnLogin) Router.push(redirectOnLogin);
      },
    }
  );
  const mutateLogout = useMutation<User>(
    () => axios.post<User>("/api/logout").then((r) => r.data),
    {
      onSuccess(logoutUserInfo) {
        queryClient.invalidateQueries(undefined, { cancelRefetch: true });
        queryClient.setQueriesData(USE_USER_QUERY_KEY, logoutUserInfo);
        if (redirectOnLogout) Router.push(redirectOnLogout);
      },
      onError(error) {
        console.error("FATAL Could not logout, this is unhandled", error);
      },
    }
  );

  const { data: user } = useQuery<User>(USE_USER_QUERY_KEY, () =>
    axios.get<User>("/api/user").then((r) => r.data)
  );

  useEffect(() => {
    if (user) {
      if (user.isLoggedIn && redirectWhenLoggedIn) {
        console.log(
          `Redirect --> redirectWhenLoggedIn --> ${redirectWhenLoggedIn}`
        );
        Router.push(redirectWhenLoggedIn);
        return;
      }

      if (!user.isLoggedIn && redirectWhenLoggedOut) {
        console.log(
          `Redirect --> redirectWhenLoggedOut --> ${redirectWhenLoggedIn}`
        );
        Router.push(redirectWhenLoggedOut);
        return;
      }
    }
  }, [user, redirectWhenLoggedIn, redirectWhenLoggedOut]);

  return { user, mutateLogin, mutateLogout };
}
