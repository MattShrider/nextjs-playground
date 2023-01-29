import { useEffect } from "react";
import Router from "next/router";
import { User } from "@/pages/api/user";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import type { LoginBody } from "@/pages/api/login";

const USE_USER_QUERY_KEY = "/api/user";

export function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const queryClient = useQueryClient();
  const mutateLogin = useMutation<User, unknown, LoginBody>(
    (body) => axios.post<User>("/api/login", body).then((r) => r.data),
    {
      onSuccess: async (loginUserInfo) => {
        queryClient.setQueryData(USE_USER_QUERY_KEY, () => loginUserInfo);
      },
    }
  );
  const mutateLogout = useMutation<User>(
    () => axios.post<User>("/api/logout").then((r) => r.data),
    {
      onSuccess(logoutUserInfo) {
        queryClient.invalidateQueries(undefined, { cancelRefetch: true });
        queryClient.setQueriesData(USE_USER_QUERY_KEY, logoutUserInfo);
      },
    }
  );

  const { data: user } = useQuery<User>(USE_USER_QUERY_KEY, () =>
    axios.get<User>("/api/user").then((r) => r.data)
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateLogin, mutateLogout };
}
